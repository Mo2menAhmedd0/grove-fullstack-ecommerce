import mongoose from "mongoose"
import Order from "../models/Order"
import Product from "../models/Product"

export type CreateOrderInput = {
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }

  deliveryAddress: {
    address: string
    city: string
    postalCode?: string
    notes?: string
  }

  deliverySlot: string

  items: {
    product: string
    quantity: number
  }[]
}

const FREE_DELIVERY_THRESHOLD = 45
const DELIVERY_FEE = 4.5

// =========================
// Create Order
// =========================

export const createOrder = async (
  orderData: CreateOrderInput,
  userId: string,
) => {
  // 1. Validate items

  if (
    !orderData.items ||
    orderData.items.length === 0
  ) {
    throw new Error(
      "Order must contain at least one item",
    )
  }

  // 2. Validate product IDs and quantities

  for (const item of orderData.items) {
    if (
      !mongoose.Types.ObjectId.isValid(
        item.product,
      )
    ) {
      throw new Error("Invalid product ID")
    }

    if (
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 12
    ) {
      throw new Error(
        "Invalid product quantity",
      )
    }
  }

  // 3. Prevent duplicate products

  const productIds = orderData.items.map(
    (item) => item.product,
  )

  if (
    new Set(productIds).size !==
    productIds.length
  ) {
    throw new Error(
      "Duplicate products are not allowed",
    )
  }

  // 4. Get real products from MongoDB

  const products = await Product.find({
    _id: {
      $in: productIds,
    },
  }).lean()

  if (
    products.length !== productIds.length
  ) {
    throw new Error(
      "One or more products were not found",
    )
  }

  const productMap = new Map(
    products.map((product) => [
      product._id.toString(),
      product,
    ]),
  )

  // 5. Build order items using database prices

  const items = orderData.items.map(
    (item) => {
      const product = productMap.get(
        item.product,
      )

      if (!product) {
        throw new Error(
          "Product not found",
        )
      }

      if (
        product.stock < item.quantity
      ) {
        throw new Error(
          `${product.name} does not have enough stock`,
        )
      }

      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        unit: product.unit,
        image: product.image,
      }
    },
  )

  // 6. Calculate totals from database prices

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0,
  )

  const delivery =
    subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : DELIVERY_FEE

  const total =
    subtotal + delivery

  // 7. Create order

  const order = await Order.create({
    user: userId,
    customer: orderData.customer,
    deliveryAddress:
      orderData.deliveryAddress,
    deliverySlot:
      orderData.deliverySlot,
    items,
    subtotal,
    delivery,
    total,
  })

  return order
}

// =========================
// Get One Order - User Own Order
// =========================

export const getOrderById = async (
  id: string,
  userId: string,
) => {
  return Order.findOne({
    _id: id,
    user: userId,
  }).populate(
    "items.product",
  )
}

// =========================
// Get Current User Orders
// =========================

export const getUserOrders = async (
  userId: string,
) => {
  return Order.find({
    user: userId,
  }).sort({
    createdAt: -1,
  })
}

// =========================
// Admin - Get All Orders
// =========================

export const getAllOrders = async () => {
  return Order.find()
    .populate(
      "user",
      "firstName lastName email role",
    )
    .sort({
      createdAt: -1,
    })
}

// =========================
// User - Permanently Delete Own Order
// =========================

export const cancelUserOrder = async (
  orderId: string,
  userId: string,
) => {
  if (
    !mongoose.Types.ObjectId.isValid(
      orderId,
    )
  ) {
    throw new Error("Invalid order ID")
  }

  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  })

  if (!order) {
    throw new Error("Order not found")
  }

  // Users can only delete pending or confirmed orders

  if (
    !["pending", "confirmed"].includes(
      order.status,
    )
  ) {
    throw new Error(
      "This order can no longer be cancelled",
    )
  }

  await Order.deleteOne({
    _id: orderId,
    user: userId,
  })

  return {
    id: orderId,
    deleted: true,
  }
}

// =========================
// Admin - Update Order Status
// =========================

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
) => {
  if (
    !mongoose.Types.ObjectId.isValid(
      orderId,
    )
  ) {
    throw new Error("Invalid order ID")
  }

  const validStatuses: OrderStatus[] = [
    "pending",
    "confirmed",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ]

  if (!validStatuses.includes(status)) {
    throw new Error("Invalid order status")
  }

  const order =
    await Order.findByIdAndUpdate(
      orderId,
      { status },
      {
        new: true,
        runValidators: true,
      },
    )

  if (!order) {
    throw new Error("Order not found")
  }

  return order
}
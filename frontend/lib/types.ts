export type CategoryId =
  | "produce"
  | "bakery"
  | "dairy"
  | "butcher"
  | "pantry"
  | "drinks"

export type ProductTag =
  | "New"
  | "Seasonal"
  | "Last few"
  | "Best seller"

export type Product = {
  id: string
  name: string
  slug: string
  producer: string
  origin: string
  unit: string
  price: number
  category: CategoryId
  image: string
  tag?: ProductTag
  note: string
  stock: number
  featured: boolean
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"

export type OrderItem = {
  product: string
  name: string
  price: number
  quantity: number
  unit: string
  image: string
}

export type OrderCustomer = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type DeliveryAddress = {
  address: string
  city: string
  postalCode?: string
  notes?: string
}

export type Order = {
  _id: string
  user: string | {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: "user" | "admin"
  }
  customer: OrderCustomer
  deliveryAddress: DeliveryAddress
  deliverySlot: string
  items: OrderItem[]
  subtotal: number
  delivery: number
  total: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}
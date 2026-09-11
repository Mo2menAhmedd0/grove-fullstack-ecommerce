import { Request, Response } from "express"

import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelUserOrder,
  type CreateOrderInput,
  type OrderStatus,
} from "../services/order.service"


// =========================
// Create Order
// =========================

export const addOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const order = await createOrder(
      req.body as CreateOrderInput,
      req.user!.userId,
    )

    res.status(201).json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Create order error:", error)

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create order"

    res.status(400).json({
      success: false,
      message,
    })
  }
}


// =========================
// Get My Orders
// =========================

export const getOrders = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const orders = await getUserOrders(
      req.user!.userId,
    )

    res.status(200).json({
      success: true,
      data: orders,
    })
  } catch (error) {
    console.error("Get orders error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    })
  }
}


// =========================
// Get One Order
// =========================

export const getOrder = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const order = await getOrderById(
      req.params.id,
      req.user!.userId,
    )

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      })

      return
    }

    res.status(200).json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Get order error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    })
  }
}


// =========================
// Admin - Get All Orders
// =========================

export const getAllOrdersController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const orders = await getAllOrders()

    res.status(200).json({
      success: true,
      data: orders,
    })
  } catch (error) {
    console.error("Get all orders error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
    })
  }
}

export const updateOrderStatusController = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { status } = req.body as {
      status: OrderStatus
    }

    const order = await updateOrderStatus(
      req.params.id,
      status,
    )

    res.status(200).json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Update order status error:", error)

    const message =
      error instanceof Error
        ? error.message
        : "Failed to update order status"

    res.status(400).json({
      success: false,
      message,
    })

    
  }
}

export const cancelOrder = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    await cancelUserOrder(
      req.params.id,
      req.user!.userId,
    )

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    })
  } catch (error) {
    console.error("Cancel order error:", error)

    const message =
      error instanceof Error
        ? error.message
        : "Failed to cancel order"

    const statusCode =
      message === "Order not found"
        ? 404
        : 400

    res.status(statusCode).json({
      success: false,
      message,
    })
  }
}
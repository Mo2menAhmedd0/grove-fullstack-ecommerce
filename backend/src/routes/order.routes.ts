import { Router } from "express"

import {
  addOrder,
  getOrder,
  getOrders,
  getAllOrdersController,
  updateOrderStatusController,
  cancelOrder,
} from "../controllers/order.controller"

import { protect } from "../middleware/auth.middleware"
import { requireAdmin } from "../middleware/admin.middleware"

const router = Router()


// =========================
// Customer
// =========================

router.post(
  "/",
  protect,
  addOrder,
)

router.get(
  "/",
  protect,
  getOrders,
)


// =========================
// Admin
// =========================

router.get(
  "/admin",
  protect,
  requireAdmin,
  getAllOrdersController,
)

router.patch(
  "/:id/status",
  protect,
  requireAdmin,
  updateOrderStatusController,
)


// =========================
// Customer - Own Order
// =========================
router.patch(
  "/:id/cancel",
  protect,
  cancelOrder,
)

router.get(
  "/:id",
  protect,
  getOrder,
)


export default router
import { Router } from "express"

import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/product.controller"

import { protect } from "../middleware/auth.middleware"
import { requireAdmin } from "../middleware/admin.middleware"

const router = Router()


// =========================
// Public
// =========================

router.get("/", getProducts)

router.get("/:slug", getProduct)


// =========================
// Admin
// =========================

router.post(
  "/",
  protect,
  requireAdmin,
  addProduct,
)

router.patch(
  "/:id",
  protect,
  requireAdmin,
  editProduct,
)

router.delete(
  "/:id",
  protect,
  requireAdmin,
  removeProduct,
)


export default router
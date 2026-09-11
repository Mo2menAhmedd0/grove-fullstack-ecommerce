import { Router } from "express"
import {
  getMe,
  login,
  logout,
  register,
} from "../controllers/auth.controller"
import { protect } from "../middleware/auth.middleware"

const router = Router()

// POST /api/auth/register
router.post("/register", register)

// POST /api/auth/login
router.post("/login", login)

// POST /api/auth/logout
router.post("/logout", logout)

// GET /api/auth/me
router.get("/me", protect, getMe)

export default router
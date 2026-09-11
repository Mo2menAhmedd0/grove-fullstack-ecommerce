import { Request, Response } from "express"
import {
  getUserById,
  loginUser,
  registerUser,
} from "../services/auth.service"

const COOKIE_NAME = "grove_token"

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

export const register = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await registerUser(req.body)

    res.cookie(
      COOKIE_NAME,
      result.token,
      cookieOptions,
    )

    res.status(201).json({
      success: true,
      data: result.user,
    })
  } catch (error) {
    console.error("Register error:", error)

    const message =
      error instanceof Error
        ? error.message
        : "Failed to register"

    res.status(400).json({
      success: false,
      message,
    })
  }
}

export const login = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await loginUser(req.body)

    res.cookie(
      COOKIE_NAME,
      result.token,
      cookieOptions,
    )

    res.status(200).json({
      success: true,
      data: result.user,
    })
  } catch (error) {
    console.error("Login error:", error)

    const message =
      error instanceof Error
        ? error.message
        : "Failed to login"

    res.status(401).json({
      success: false,
      message,
    })
  }
}

export const logout = (
  _req: Request,
  res: Response,
): void => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  })
}

export const getMe = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await getUserById(req.user!.userId)

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      })

      return
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Get me error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    })
  }
}
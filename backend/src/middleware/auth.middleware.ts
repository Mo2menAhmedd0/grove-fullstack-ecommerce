import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import type { UserRole } from "../models/User"

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error("JWT_SECRET is not defined")
  }

  return secret
}

type JwtPayload = {
  userId: string
  role: UserRole
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    console.log("AUTH DEBUG:", {
      cookies: req.cookies,
      hasToken: !!req.cookies?.grove_token,
    })

    const token = req.cookies?.grove_token

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      })
      return
    }

    const decoded = jwt.verify(
      token,
      getJwtSecret(),
    ) as JwtPayload

    req.user = decoded

    next()
  } catch (error) {
    console.error("Auth middleware error:", error)

    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    })
  }
}
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User, { type UserRole } from "../models/User"

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error("JWT_SECRET is not defined")
  }

  return secret
}

const JWT_EXPIRES_IN = "7d"

type RegisterInput = {
  firstName: string
  lastName: string
  email: string
  password: string
}

type LoginInput = {
  email: string
  password: string
}

const createToken = (userId: string, role: UserRole) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    getJwtSecret(),
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  )
}

export const registerUser = async (
  userData: RegisterInput,
) => {
  const firstName = userData.firstName?.trim()
  const lastName = userData.lastName?.trim()
  const email = userData.email?.trim().toLowerCase()
  const password = userData.password

  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required")
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters")
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new Error("Email is already registered")
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: "user",
  })

  const token = createToken(
    user._id.toString(),
    user.role,
  )

  return {
    user: {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    token,
  }
}

export const loginUser = async (
  loginData: LoginInput,
) => {
  const email = loginData.email?.trim().toLowerCase()
  const password = loginData.password

  if (!email || !password) {
    throw new Error("Email and password are required")
  }

  const user = await User.findOne({ email }).select(
    "+password",
  )

  if (!user) {
    throw new Error("Invalid email or password")
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password,
  )

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password")
  }

  const token = createToken(
    user._id.toString(),
    user.role,
  )

  return {
    user: {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    token,
  }
}

export const getUserById = async (userId: string) => {
  return User.findById(userId).select(
    "-password",
  )
}
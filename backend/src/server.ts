import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import connectDB from "./config/db"
import productRoutes from "./routes/product.routes"
import orderRoutes from "./routes/order.routes"
import authRoutes from "./routes/auth.routes"

dotenv.config()

const app = express()

app.use(
  cors({
    origin: "https://grove-fullstack-ecommerce.vercel.app",
    credentials: true,
  }),
)

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

connectDB()

app.get("/", (_req, res) => {
  res.json({
    message: "E-commerce API is running",
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`,
  )
})

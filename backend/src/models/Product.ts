import mongoose, { Document, Schema } from "mongoose"

export type ProductTag =
  | "New"
  | "Seasonal"
  | "Last few"
  | "Best seller"

export interface IProduct extends Document {
  name: string
  slug: string
  producer: string
  origin: string
  unit: string
  price: number
  category: string
  image: string
  tag?: ProductTag
  note: string
  stock: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    producer: {
      type: String,
      required: true,
      trim: true,
    },

    origin: {
      type: String,
      required: true,
      trim: true,
    },

    unit: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "produce",
        "bakery",
        "dairy",
        "butcher",
        "pantry",
        "drinks",
      ],
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    tag: {
      type: String,
      enum: ["New", "Seasonal", "Last few", "Best seller"],
    },

    note: {
      type: String,
      required: true,
      trim: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model<IProduct>("Product", productSchema)

export default Product
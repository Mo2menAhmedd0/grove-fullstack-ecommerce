import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;

  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  deliveryAddress: {
    address: string;
    city: string;
    postalCode?: string;
    notes?: string;
  };

  deliverySlot: string;

  items: IOrderItem[];

  subtotal: number;
  delivery: number;
  total: number;

  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";

  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unit: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customer: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },

    deliveryAddress: {
      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      postalCode: {
        type: String,
        trim: true,
      },

      notes: {
        type: String,
        trim: true,
      },
    },

    deliverySlot: {
      type: String,
      required: true,
      trim: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items: IOrderItem[]) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    delivery: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
  },

  {
    timestamps: true,
  },
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;

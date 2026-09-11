"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Check, ArrowRight } from "lucide-react"

import { formatPrice } from "@/lib/products"
import { getOrder } from "@/lib/api"

type Order = {
  _id: string

  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }

  deliveryAddress: {
    address: string
    city: string
    postalCode?: string
    notes?: string
  }

  deliverySlot: string

  items: {
    product: string
    name: string
    price: number
    quantity: number
    unit: string
    image: string
  }[]

  subtotal: number
  delivery: number
  total: number

  status: string

  createdAt: string
}

export default function OrderSuccess({
  orderId,
}: {
  orderId: string
}) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(orderId)
        setOrder(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load order",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-muted-foreground">
            Loading your order...
          </p>
        </div>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-background px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-medium">
            Order not found
          </h1>

          <p className="mt-3 text-muted-foreground">
            {error || "We couldn't find this order."}
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground"
          >
            Back to shop
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-4xl">

        {/* Success */}
        <section className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>

          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Order confirmed
          </p>

          <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            Thank you, {order.customer.firstName}.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Your order has been received and is being prepared.
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            Order #{order._id}
          </p>
        </section>

        {/* Main content */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Left */}
          <div className="space-y-6">

            {/* Items */}
            <section className="rounded-3xl border bg-card p-6">
              <h2 className="text-lg font-medium">
                Your items
              </h2>

              <div className="mt-6 space-y-5">
                {order.items.map((item) => (
                  <div
                    key={item.product}
                    className="flex gap-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.quantity} ×{" "}
                        {formatPrice(item.price)}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.unit}
                      </p>
                    </div>

                    <p className="font-medium">
                      {formatPrice(
                        item.price * item.quantity,
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Delivery */}
            <section className="rounded-3xl border bg-card p-6">
              <h2 className="text-lg font-medium">
                Delivery details
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">
                    Address
                  </p>

                  <p className="mt-1">
                    {order.deliveryAddress.address}
                    <br />
                    {order.deliveryAddress.city}
                    {order.deliveryAddress.postalCode &&
                      `, ${order.deliveryAddress.postalCode}`}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    Delivery time
                  </p>

                  <p className="mt-1">
                    {order.deliverySlot}
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Right */}
          <aside className="h-fit rounded-3xl border bg-card p-6">
            <h2 className="text-lg font-medium">
              Order summary
            </h2>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span>
                  {formatPrice(order.subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Delivery
                </span>

                <span>
                  {order.delivery === 0
                    ? "Free"
                    : formatPrice(order.delivery)}
                </span>
              </div>

              <div className="my-4 border-t" />

              <div className="flex justify-between text-base font-medium">
                <span>Total</span>

                <span>
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-muted/50 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Status
              </p>

              <p className="mt-2 capitalize font-medium">
                {order.status.replaceAll("_", " ")}
              </p>
            </div>

            <Link
              href="/"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Continue shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>

        </div>
      </div>
    </main>
  )
}
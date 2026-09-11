"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, Package, ShoppingBag } from "lucide-react"

import { getMyOrders } from "@/lib/api"
import type { Order, OrderStatus } from "@/lib/types"

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

const formatPrice = (value: number) => {
  return `£${value.toFixed(2)}`
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setError("")

        const data = await getMyOrders()

        setOrders(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load orders",
        )
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10">
          <p className="text-sm text-muted-foreground">
            Loading your orders...
          </p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10">
          <div className="rounded-3xl border border-border p-8">
            <p className="text-sm text-destructive">
              {error}
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground"
            >
              Back to shop
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-5 py-12 lg:px-10 lg:py-16">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Grove Account
            </p>

            <h1 className="mt-3 font-serif text-4xl text-primary sm:text-5xl">
              My orders
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              Keep track of your Grove deliveries and view
              your previous orders.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:bg-muted"
          >
            Continue shopping
            <ArrowRight className="size-4" strokeWidth={1.6} />
          </Link>
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag
                className="size-6 text-primary"
                strokeWidth={1.5}
              />
            </div>

            <h2 className="mt-6 font-serif text-3xl text-primary">
              No orders yet
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              Once you place an order, you&apos;ll be able
              to track it and view all the details here.
            </p>

            <Link
              href="/#shop"
              className="mt-7 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                href={`/account/orders/${order._id}`}
                className="group block rounded-3xl border border-border p-5 transition-all hover:border-primary/30 hover:shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Order info */}
                  <div className="flex items-start gap-4">
                    <div className="hidden size-11 shrink-0 items-center justify-center rounded-full bg-muted sm:flex">
                      <Package
                        className="size-5 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Order
                      </p>

                      <p className="mt-1 font-mono text-sm text-foreground">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>

                      <p className="mt-2 text-xs text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Status + total */}
                  <div className="flex items-center justify-between gap-6 lg:justify-end">
                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-primary/10 text-primary"
                            : order.status === "cancelled"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-muted text-foreground"
                        }`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        Total
                      </p>

                      <p className="mt-1 font-serif text-xl text-primary">
                        {formatPrice(order.total)}
                      </p>
                    </div>

                    <ArrowRight
                      className="hidden size-4 text-muted-foreground transition-transform group-hover:translate-x-1 sm:block"
                      strokeWidth={1.6}
                    />
                  </div>
                </div>

                {/* Items preview */}
                <div className="mt-5 border-t border-border pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      {order.items.length}{" "}
                      {order.items.length === 1
                        ? "item"
                        : "items"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {order.deliverySlot}
                    </p>
                  </div>

                  <div className="mt-3 flex gap-2 overflow-hidden">
                    {order.items
                      .slice(0, 4)
                      .map((item, index) => (
                        <div
                          key={`${item.product}-${index}`}
                          className="size-12 shrink-0 overflow-hidden rounded-xl bg-muted"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-full object-cover"
                          />
                        </div>
                      ))}

                    {order.items.length > 4 && (
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-xs text-muted-foreground">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
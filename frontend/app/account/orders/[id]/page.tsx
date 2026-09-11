"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock3,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cancelOrder, getOrder } from "@/lib/api";
import type { Order, OrderStatus } from "@/lib/types";

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const formatPrice = (value: number) => {
  return `£${value.toFixed(2)}`;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
};

const statusSteps: {
  status: OrderStatus;
  label: string;
}[] = [
  {
    status: "pending",
    label: "Order placed",
  },
  {
    status: "confirmed",
    label: "Confirmed",
  },
  {
    status: "preparing",
    label: "Preparing",
  },
  {
    status: "out_for_delivery",
    label: "Out for delivery",
  },
  {
    status: "delivered",
    label: "Delivered",
  },
];

const getStatusIndex = (status: OrderStatus) => {
  return statusSteps.findIndex((step) => step.status === status);
};

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setError("");

        const data = await getOrder(orderId);

        setOrder(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load order",
        );
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const handleCancelOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this order?",
    );

    if (!confirmed) return;

    try {
      setCancelling(true);
      setCancelError("");

      await cancelOrder(orderId);

      router.push("/account/orders");
      router.refresh();
    } catch (error) {
      setCancelError(
        error instanceof Error
          ? error.message
          : "Failed to cancel order",
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1100px] px-5 py-20 lg:px-10">
          <p className="text-sm text-muted-foreground">
            Loading order...
          </p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1100px] px-5 py-20 lg:px-10">
          <div className="rounded-3xl border border-border p-8">
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
              <Package
                className="size-5 text-destructive"
                strokeWidth={1.5}
              />
            </div>

            <h1 className="mt-6 font-serif text-3xl text-primary">
              Order not found
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              {error || "We couldn't find this order."}
            </p>

            <Link
              href="/account/orders"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground"
            >
              <ArrowLeft
                className="size-4"
                strokeWidth={1.6}
              />
              Back to orders
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentStatusIndex = getStatusIndex(order.status);

  const canCancel =
    order.status === "pending" ||
    order.status === "confirmed";

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1100px] px-5 py-12 lg:px-10 lg:py-16">
        {/* Back */}
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft
            className="size-4"
            strokeWidth={1.6}
          />
          Back to orders
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Order details
            </p>

            <h1 className="mt-3 font-serif text-4xl text-primary sm:text-5xl">
              #{order._id.slice(-8).toUpperCase()}
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span
              className={`inline-flex w-fit rounded-full px-4 py-2 text-xs font-medium ${
                order.status === "delivered"
                  ? "bg-primary/10 text-primary"
                  : order.status === "cancelled"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-foreground"
              }`}
            >
              {statusLabels[order.status]}
            </span>

            {canCancel && (
              <button
                type="button"
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="inline-flex items-center gap-2 rounded-full border border-destructive/30 px-4 py-2 text-xs text-destructive transition-colors hover:bg-destructive/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelling
                  ? "Deleting..."
                  : "Cancel order"}
              </button>
            )}
          </div>
        </div>

        {/* Cancel Error */}
        {cancelError && (
          <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-sm text-destructive">
            {cancelError}
          </div>
        )}

        {/* Status tracker */}
        {order.status !== "cancelled" && (
          <section className="mt-8 rounded-3xl border border-border p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Truck
                className="size-5 text-primary"
                strokeWidth={1.5}
              />

              <h2 className="font-serif text-2xl text-primary">
                Order status
              </h2>
            </div>

            <div className="mt-8 space-y-6">
              {statusSteps.map((step, index) => {
                const completed =
                  index <= currentStatusIndex;

                const active =
                  index === currentStatusIndex;

                return (
                  <div
                    key={step.status}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border ${
                        completed
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {completed ? (
                        <Check
                          className="size-4"
                          strokeWidth={2}
                        />
                      ) : (
                        <span className="text-xs">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="pt-1">
                      <p
                        className={`text-sm ${
                          active
                            ? "font-medium text-primary"
                            : completed
                              ? "text-foreground"
                              : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>

                      {active && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Current order status
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Cancelled State */}
        {order.status === "cancelled" && (
          <section className="mt-8 rounded-3xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Clock3
                className="size-5 text-destructive"
                strokeWidth={1.5}
              />

              <h2 className="font-serif text-2xl text-destructive">
                Order cancelled
              </h2>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              This order has been cancelled.
            </p>
          </section>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Products */}
          <section className="rounded-3xl border border-border p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Package
                className="size-5 text-primary"
                strokeWidth={1.5}
              />

              <h2 className="font-serif text-2xl text-primary">
                Items
              </h2>
            </div>

            <div className="mt-6 divide-y divide-border">
              {order.items.map((item, index) => (
                <div
                  key={`${item.product}-${index}`}
                  className="flex gap-4 py-5 first:pt-0 last:pb-0"
                >
                  <div className="size-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-foreground">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.unit}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">
                      {formatPrice(
                        item.price * item.quantity,
                      )}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="h-fit rounded-3xl border border-border p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-primary">
              Order summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span>
                  {formatPrice(order.subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  Delivery
                </span>

                <span>
                  {order.delivery === 0
                    ? "Free"
                    : formatPrice(order.delivery)}
                </span>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-medium">
                    Total
                  </span>

                  <span className="font-serif text-xl text-primary">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section className="rounded-3xl border border-border p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <MapPin
                className="size-5 text-primary"
                strokeWidth={1.5}
              />

              <h2 className="font-serif text-2xl text-primary">
                Delivery
              </h2>
            </div>

            <div className="mt-6 space-y-5 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Address
                </p>

                <p className="mt-2 leading-6">
                  {order.deliveryAddress.address}
                  <br />
                  {order.deliveryAddress.city}

                  {order.deliveryAddress.postalCode && (
                    <>
                      <br />
                      {order.deliveryAddress.postalCode}
                    </>
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Delivery slot
                </p>

                <p className="mt-2">
                  {order.deliverySlot}
                </p>
              </div>

              {order.deliveryAddress.notes && (
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Notes
                  </p>

                  <p className="mt-2 leading-6 text-muted-foreground">
                    {order.deliveryAddress.notes}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Customer */}
          <section className="h-fit rounded-3xl border border-border p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-primary">
              Customer
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">
                  Name
                </p>

                <p className="mt-1">
                  {order.customer.firstName}{" "}
                  {order.customer.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Email
                </p>

                <p className="mt-1 break-all">
                  {order.customer.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Phone
                </p>

                <p className="mt-1">
                  {order.customer.phone}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  ShoppingBasket,
  Trash2,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const router = useRouter();

  const {
    items,
    count,
    subtotal,
    delivery,
    total,
    isOpen,
    setIsOpen,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="gap-1 border-b border-border px-6 py-5">
          <SheetTitle className="font-serif text-2xl font-normal text-primary">
            Your basket
          </SheetTitle>

          <SheetDescription>
            {count === 0
              ? "Nothing picked yet."
              : `${count} item${count === 1 ? "" : "s"} from ${
                  new Set(
                    items.map(
                      (item) => item.product.producer
                    )
                  ).size
                } producers`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-10 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-muted text-primary">
              <ShoppingBasket
                className="size-6"
                strokeWidth={1.5}
              />
            </span>

            <p className="text-pretty text-muted-foreground">
              Your basket is empty. Start with the produce
              that was picked this morning.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6">
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-4 py-5"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={
                        item.product.image ||
                        "/placeholder.svg"
                      }
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {item.product.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {item.product.producer} ·{" "}
                          {item.product.unit}
                        </p>
                      </div>

                      <p className="text-sm tabular-nums">
                        {formatPrice(
                          item.product.price *
                            item.quantity
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 rounded-full border border-border p-0.5">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item.product.id
                            )
                          }
                          className="flex size-7 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-muted"
                          aria-label={`Remove one ${item.product.name}`}
                        >
                          <Minus className="size-3.5" />
                        </button>

                        <span className="w-5 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            addToCart(item.product)
                          }
                          className="flex size-7 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-muted"
                          aria-label={`Add one more ${item.product.name}`}
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(
                            item.product.id
                          )
                        }
                        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-border bg-card px-6 py-5">
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Subtotal
              </dt>

              <dd className="tabular-nums">
                {formatPrice(subtotal)}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Delivery
              </dt>

              <dd className="tabular-nums">
                {delivery === 0
                  ? "Free"
                  : formatPrice(delivery)}
              </dd>
            </div>

            <div className="flex justify-between border-t border-border pt-2 font-medium">
              <dt>Total</dt>

              <dd className="tabular-nums">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            disabled={items.length === 0}
            onClick={() => {
              setIsOpen(false);
              router.push("/checkout");
            }}
            className="mt-4 w-full rounded-full bg-primary px-6 py-3.5 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Checkout
          </button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Choose your delivery morning at checkout
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
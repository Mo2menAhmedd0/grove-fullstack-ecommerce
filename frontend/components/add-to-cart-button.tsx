"use client"

import { Check, Plus } from "lucide-react"

import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"

export default function AddToCartButton({
  product,
}: {
  product: Product
}) {
  const { addToCart, quantityOf } = useCart()

  const quantity = quantityOf(product.id)

  const isOutOfStock = product.stock <= 0

  return (
    <button
      type="button"
      disabled={isOutOfStock}
      onClick={() => addToCart(product)}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {quantity > 0 ? (
        <>
          <Check className="size-4" />
          Added to basket
        </>
      ) : (
        <>
          <Plus className="size-4" />
          Add to basket
        </>
      )}
    </button>
  )
}
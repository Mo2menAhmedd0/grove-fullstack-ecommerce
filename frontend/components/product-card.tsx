"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, quantityOf } = useCart();

  const quantity = quantityOf(product.id);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
        <Link
          href={`/products/${product.slug}`}
          className="block h-full w-full"
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {product.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium backdrop-blur">
            {product.tag}
          </span>
        )}

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105"
          aria-label={`Add ${product.name} to basket`}
        >
          <Plus className="size-5" />
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs text-muted-foreground">{product.producer}</p>

        <div className="mt-1 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl text-primary">
              <Link
                href={`/products/${product.slug}`}
                className="transition-opacity hover:opacity-70"
              >
                {product.name}
              </Link>
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {product.origin} · {product.unit}
            </p>
          </div>

          <p className="shrink-0 text-sm font-medium">
            {formatPrice(product.price)}
          </p>
        </div>

        {product.note && (
          <p className="mt-2 text-sm leading-5 text-muted-foreground">
            {product.note}
          </p>
        )}

        {quantity > 0 && (
          <p className="mt-2 text-xs font-medium text-primary">
            {quantity} in basket
          </p>
        )}
      </div>
    </article>
  );
}

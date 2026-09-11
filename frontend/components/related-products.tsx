"use client"

import { useEffect, useState } from "react"

import { ProductCard } from "@/components/product-card"
import { getProducts } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function RelatedProducts({
  productId,
  category,
}: {
  productId: string
  category: Product["category"]
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const allProducts = await getProducts()

        const related = allProducts
          .filter(
            (product: Product) =>
              product.category === category &&
              product.id !== productId
          )
          .slice(0, 4)

        setProducts(related)
      } catch (error) {
        console.error(
          "Failed to load related products:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [productId, category])

  if (loading) {
    return (
      <section className="mt-20">
        <div className="mb-8">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[4/5] rounded-3xl bg-muted" />

              <div className="mt-4 h-4 w-24 rounded bg-muted" />

              <div className="mt-2 h-6 w-32 rounded bg-muted" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="mt-16 border-t border-border pt-12">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          From the same collection
        </p>

        <h2 className="mt-2 font-serif text-3xl text-primary sm:text-4xl">
          You may also like
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}
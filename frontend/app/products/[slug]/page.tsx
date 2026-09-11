import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import RelatedProducts from "@/components/related-products"
import AddToCartButton from "@/components/add-to-cart-button"
import { getProduct } from "@/lib/api"
import { formatPrice } from "@/lib/products"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { slug } = await params

  let product

  try {
    product = await getProduct(slug)
  } catch {
    return (
      <main className="min-h-screen bg-background px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-serif text-4xl text-primary">
            Product not found
          </h1>

          <p className="mt-4 text-sm text-muted-foreground">
            We couldn't find the product you're looking for.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="size-4" />
            Back to shop
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:py-12">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to shop
        </Link>

        {/* Product */}
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {product.tag && (
              <span className="absolute left-5 top-5 rounded-full bg-background/90 px-4 py-2 text-xs font-medium backdrop-blur">
                {product.tag}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-muted-foreground">
              {product.producer}
            </p>

            <h1 className="mt-2 font-serif text-4xl leading-tight text-primary sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <span>{product.origin}</span>
              <span>·</span>
              <span>{product.unit}</span>
            </div>

            <p className="mt-8 text-2xl font-medium">
              {formatPrice(product.price)}
            </p>

            {product.note && (
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
                {product.note}
              </p>
            )}

            {/* Stock */}
            <div className="mt-8">
              {product.stock > 0 ? (
                <p className="text-sm text-muted-foreground">
                  {product.stock <= 5
                    ? `Only ${product.stock} left`
                    : "In stock"}
                </p>
              ) : (
                <p className="text-sm text-destructive">
                  Out of stock
                </p>
              )}
            </div>

            {/* Add to cart */}
            <div className="mt-6">
              <AddToCartButton product={product} />
            </div>

            {/* Product details */}
            <div className="mt-10 border-t border-border pt-6">
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between gap-6">
                  <dt className="text-muted-foreground">
                    Producer
                  </dt>

                  <dd className="text-right">
                    {product.producer}
                  </dd>
                </div>

                <div className="flex justify-between gap-6">
                  <dt className="text-muted-foreground">
                    Origin
                  </dt>

                  <dd className="text-right">
                    {product.origin}
                  </dd>
                </div>

                <div className="flex justify-between gap-6">
                  <dt className="text-muted-foreground">
                    Unit
                  </dt>

                  <dd className="text-right">
                    {product.unit}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts
          productId={product.id}
          category={product.category}
        />
      </div>
    </main>
  )
}
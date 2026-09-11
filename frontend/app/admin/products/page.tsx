"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Edit,
  Plus,
  Search,
  Trash2,
} from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import {
  deleteProduct,
  getProducts,
} from "@/lib/api"
import type { Product } from "@/lib/types"

export default function AdminProductsPage() {
  const { user, loading: authLoading } = useAuth()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!user || user.role !== "admin") {
      return
    }

    const loadProducts = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load products",
        )
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [authLoading, user])

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return products

    return products.filter((product) =>
      [
        product.name,
        product.producer,
        product.category,
      ].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [products, search])

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    )

    if (!confirmed) return

    try {
      setDeletingId(id)
      setError("")

      await deleteProduct(id)

      setProducts((current) =>
        current.filter((product) => product.id !== id),
      )
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete product",
      )
    } finally {
      setDeletingId(null)
    }
  }

  if (authLoading || loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm text-neutral-500">
          Loading products...
        </p>
      </main>
    )
  }

  if (!user || user.role !== "admin") {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8">
          <h1 className="text-2xl font-medium">
            Access denied
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            You need admin access to view this page.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block text-sm underline underline-offset-4"
          >
            Back to home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Admin
          </p>

          <h1 className="mt-2 text-4xl font-medium tracking-tight">
            Products
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Manage your Grove product catalog.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm text-white transition hover:bg-neutral-800"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      <div className="mt-10 flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4">
        <Search className="h-4 w-4 text-neutral-400" />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search products..."
          className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
        />
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-neutral-200 px-6 py-4 text-xs uppercase tracking-wider text-neutral-500 md:grid">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-neutral-500">
              No products found.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="grid gap-4 px-6 py-5 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {product.producer}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-neutral-400 md:hidden">
                    Category
                  </p>

                  <p className="text-sm capitalize">
                    {product.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-neutral-400 md:hidden">
                    Price
                  </p>

                  <p className="text-sm">
                    £{product.price.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-neutral-400 md:hidden">
                    Stock
                  </p>

                  <p
                    className={`text-sm ${
                      product.stock === 0
                        ? "text-red-600"
                        : product.stock <= 5
                          ? "text-amber-600"
                          : "text-neutral-900"
                    }`}
                  >
                    {product.stock}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 transition hover:bg-neutral-100"
                    aria-label={`Edit ${product.name}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    disabled={deletingId === product.id}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={`Delete ${product.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        Showing {filteredProducts.length} of{" "}
        {products.length} products
      </p>
    </main>
  )
}
"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categories } from "@/lib/products";
import type { CategoryId, Product } from "@/lib/types";
import { getProducts } from "@/lib/api";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";

export function ShopSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Read search query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search") || "";

    setSearchQuery(query);
  }, []);

  const visible = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        filter === "all" || product.category === filter;

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.producer.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.note.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [filter, products, searchQuery]);

  const activeBlurb =
    filter === "all"
      ? "Everything on the van this week"
      : categories.find((c) => c.id === filter)?.blurb;

  return (
    <section
      id="shop"
      className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28"
    >
      <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            The shop
          </p>

          <h2 className="mt-3 font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance text-primary">
            Twenty things worth
            <br className="hidden sm:block" /> making dinner from
          </h2>
        </div>

        <p className="max-w-xs text-sm leading-relaxed text-pretty text-muted-foreground">
          The list changes every Monday according to what our growers actually
          have. {activeBlurb}.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Product categories"
        className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[{ id: "all" as Filter, label: "All" }, ...categories].map((c) => {
          const active = filter === c.id;

          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c.id as Filter)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-primary",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {searchQuery && (
        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Search results for:{" "}
            <span className="font-medium text-foreground">
              "{searchQuery}"
            </span>
          </p>

          <button
            type="button"
            onClick={() => {
              window.history.replaceState({}, "", "/#shop");
              setSearchQuery("");
            }}
            className="text-primary underline underline-offset-4"
          >
            Clear search
          </button>
        </div>
      )}

      {loading && (
        <div className="mt-8 py-12 text-center text-sm text-muted-foreground">
          Loading fresh produce...
        </div>
      )}

      {error && (
        <div className="mt-8 py-12 text-center text-sm text-destructive">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {visible.length === 0 ? (
            <div className="mt-8 py-12 text-center text-sm text-muted-foreground">
              No products found.
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
} 
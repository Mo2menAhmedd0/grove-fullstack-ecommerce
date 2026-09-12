"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingBasket,
  X,
  User,
  LogOut,
  Shield,
} from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/components/auth-provider";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Our farms", href: "#story" },
  { label: "How it works", href: "#how" },
  { label: "Journal", href: "#journal" },
];

export function SiteHeader() {
  const { count, setIsOpen } = useCart();
  const { user, loading, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    window.location.href = `/?search=${encodeURIComponent(query)}#shop`;
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-2 text-[11px] tracking-[0.16em] uppercase lg:px-10">
          <p>Free delivery over £45</p>

          <p className="hidden sm:block">
            Order by 8pm for next-morning arrival
          </p>

          <p className="text-primary-foreground/70">London &amp; South East</p>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-border bg-background/92 backdrop-blur-md"
            : "border-transparent bg-background",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-5 py-4 lg:px-10">
          {/* Logo */}

          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl leading-none tracking-tight text-primary">
              Grove
            </span>

            <span className="hidden text-[10px] tracking-[0.22em] text-muted-foreground uppercase sm:block">
              Est. 2016
            </span>
          </a>

          {/* Desktop Navigation */}

          <nav
            aria-label="Primary"
            className="ml-6 hidden items-center gap-7 lg:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/75 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side */}

          <div className="ml-auto flex items-center gap-2">
            {/* Search */}

            {searchOpen ? (
  <form
    onSubmit={handleSearch}
    className="absolute left-5 right-5 top-full mt-3 flex items-center gap-2 rounded-2xl border border-border bg-background p-2 shadow-lg sm:static sm:m-0 sm:w-auto sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none"
  >
    <input
      type="search"
      autoFocus
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
      placeholder="Search products..."
      className="h-10 min-w-0 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary sm:w-44 sm:flex-none"
    />

    <button
      type="submit"
      aria-label="Submit search"
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
    >
      <Search className="size-4" strokeWidth={1.6} />
    </button>

    <button
      type="button"
      aria-label="Close search"
      onClick={() => {
        setSearchOpen(false);
        setSearchQuery("");
      }}
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
    >
      <X className="size-4" strokeWidth={1.6} />
    </button>
  </form>
) : (
  <button
    type="button"
    onClick={() => setSearchOpen(true)}
    aria-label="Search the shop"
    className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
  >
    <Search className="size-4" strokeWidth={1.6} />
  </button>
)}

            {/* Auth */}

            {!loading && !user && (
              <Link
                href="/auth"
                className="hidden items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary sm:flex"
              >
                <User className="size-4" strokeWidth={1.6} />

                <span>Sign in</span>
              </Link>
            )}

            {!loading && user && (
              <div className="hidden items-center gap-2 sm:flex">
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 rounded-full border border-border px-3 py-2.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Shield className="size-4" strokeWidth={1.6} />

                    <span>Admin</span>
                  </Link>
                )}

                <Link
                  href="/account/orders"
                  className="rounded-full border border-border px-3 py-2.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  My orders
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-2 rounded-full border border-border px-3 py-2.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut className="size-4" strokeWidth={1.6} />

                  <span>{loggingOut ? "Logging out..." : "Log out"}</span>
                </button>
              </div>
            )}

            {/* Basket */}

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-transform hover:-translate-y-px"
            >
              <ShoppingBasket className="size-4" strokeWidth={1.6} />

              <span className="hidden sm:inline">Basket</span>

              <span
                className="min-w-5 rounded-full bg-accent px-1.5 text-center text-xs font-medium text-accent-foreground"
                aria-label={`${count} items in basket`}
              >
                {count}
              </span>
            </button>

            {/* Mobile Menu */}

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="size-4" strokeWidth={1.6} />
              ) : (
                <Menu className="size-4" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}

        {menuOpen && (
          <nav
            aria-label="Mobile"
            className="border-t border-border bg-background px-5 pb-5 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-border/70 py-3.5 font-serif text-xl text-primary last:border-0"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Auth */}

            {!loading && !user && (
              <Link
                href="/auth"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 border-b border-border/70 py-3.5 text-sm text-primary"
              >
                <User className="size-4" strokeWidth={1.6} />
                Sign in
              </Link>
            )}

            {!loading && user && (
              <>
                <div className="border-b border-border/70 py-3.5">
                  <p className="text-xs text-muted-foreground">Signed in as</p>

                  <p className="mt-1 font-serif text-xl text-primary">
                    {user.firstName}
                  </p>
                </div>

                <Link
                  href="/account/orders"
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-border/70 py-3.5 text-sm text-primary"
                >
                  My orders
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 border-b border-border/70 py-3.5 text-sm text-primary"
                  >
                    <Shield className="size-4" strokeWidth={1.6} />
                    Admin
                  </Link>
                )}

                <button
                  type="button"
                  onClick={async () => {
                    setMenuOpen(false);
                    await handleLogout();
                  }}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-2 py-3.5 text-left text-sm text-primary disabled:opacity-50"
                >
                  <LogOut className="size-4" strokeWidth={1.6} />

                  {loggingOut ? "Logging out..." : "Log out"}
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

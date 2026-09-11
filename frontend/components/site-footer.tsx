"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

const columns = [
  {
    title: "Shop",
    links: ["Produce", "Bakery", "Dairy & eggs", "Butcher & fish", "Pantry"],
  },
  {
    title: "Grove",
    links: ["Our farms", "How it works", "Delivery areas", "Packaging", "Careers"],
  },
  {
    title: "Help",
    links: ["Contact", "Order changes", "Returns", "FAQs", "Wholesale"],
  },
]

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 border-b border-border pb-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.03] tracking-[-0.02em] text-balance text-primary">
              A note each Monday on what has just come in
            </h2>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-foreground/70">
              One email, written by the person who packed your box. Recipes,
              what is peaking, and the occasional apology about the weather.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!email) return
              setSent(true)
            }}
            className="flex flex-col justify-end gap-3"
          >
            <label
              htmlFor="newsletter-email"
              className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase"
            >
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setSent(false)
                }}
                placeholder="you@kitchen.co"
                className="w-full rounded-full border border-input bg-card px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="submit"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm text-primary-foreground transition-transform hover:-translate-y-px"
              >
                {sent ? (
                  <>
                    <Check className="size-4" strokeWidth={2} />
                    Signed up
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                    />
                  </>
                )}
              </button>
            </div>
            <p aria-live="polite" className="text-xs text-muted-foreground">
              {sent
                ? "Thanks — look out for Monday's note."
                : "No more than one email a week. Unsubscribe any time."}
            </p>
          </form>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-3xl text-primary">Grove</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-pretty text-muted-foreground">
              Unit 12, Wharf Yard, London E8. Deliveries across London and the
              South East, six mornings a week.
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-foreground/70 transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Grove Provisions Ltd.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#top" className="transition-colors hover:text-primary">
              Privacy
            </a>
            <a href="#top" className="transition-colors hover:text-primary">
              Terms
            </a>
            <a href="#top" className="transition-colors hover:text-primary">
              Organic certification
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

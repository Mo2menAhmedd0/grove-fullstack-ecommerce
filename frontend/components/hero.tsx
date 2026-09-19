import Image from "next/image"
import { ArrowRight } from "lucide-react"
import mainImage from "../public/images/pexels-arthousestudio-4589145.jpg";


const stats = [
  { value: "68", label: "Family farms" },
  { value: "24h", label: "Picked to doorstep" },
  { value: "0", label: "Air freight" },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-14 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:pt-20 lg:pb-24">
        <div className="animate-rise">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-[11px] tracking-[0.16em] uppercase">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            This week: first of the autumn apples
          </p>

          <h1 className="font-serif text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] tracking-[-0.02em] text-balance text-primary">
            Groceries with a<br />
            <span className="italic">grower&apos;s</span> name on them
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-foreground/70">
            We buy direct from sixty-eight farms, bakeries and day boats, then
            deliver in the morning. No middlemen, no cold storage months, no
            mystery about where any of it came from.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm text-primary-foreground transition-transform hover:-translate-y-px"
            >
              Shop this week&apos;s harvest
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.7}
              />
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-6 py-3.5 text-sm text-primary transition-colors hover:bg-primary/5"
            >
              Meet the farms
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-serif text-3xl text-primary">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/Images/pexels-arthousestudio-4589145.jpg"
              alt="A woven basket of freshly harvested vegetables, herbs and bread on a farm table"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <figure className="absolute -bottom-6 -left-4 w-56 rounded-xl border border-border bg-card p-4 shadow-[0_18px_40px_-24px_oklch(0.24_0.02_150_/_0.35)] sm:left-6 lg:-left-10">
            <figcaption className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              Packed today
            </figcaption>
            <p className="mt-2 font-serif text-xl leading-snug text-primary">
              Marsh Market Garden, Somerset
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Cut at 5:40am · 92 miles away
            </p>
          </figure>
        </div>
      </div>
    </section>
  )
}

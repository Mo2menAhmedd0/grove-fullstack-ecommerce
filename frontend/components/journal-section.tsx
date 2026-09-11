import { ArrowUpRight } from "lucide-react"

const entries = [
  {
    kicker: "In the kitchen",
    title: "Six ways to use a glut of chard before it wilts",
    meta: "Recipe · 4 min read",
  },
  {
    kicker: "At the farm",
    title: "Why Colby Orchard still grows apples nobody has heard of",
    meta: "Grower profile · 7 min read",
  },
  {
    kicker: "Behind the price",
    title: "What £5.50 of sourdough actually pays for",
    meta: "Notes · 5 min read",
  },
]

const quotes = [
  {
    quote:
      "The first delivery ruined supermarket tomatoes for me permanently. I am not sure whether to thank you.",
    name: "Priya N.",
    detail: "Customer since 2019",
  },
  {
    quote:
      "Grove agreed my price in February and paid in five days. That is the whole difference for a farm my size.",
    name: "Tom Marsh",
    detail: "Marsh Market Garden",
  },
]

export function JournalSection() {
  return (
    <section
      id="journal"
      className="border-y border-border bg-secondary/40 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              The journal
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.03] tracking-[-0.02em] text-balance text-primary">
              Reading from the back of the van
            </h2>

            <ul className="mt-8 border-t border-border">
              {entries.map((entry) => (
                <li key={entry.title}>
                  <a
                    href="#journal"
                    className="group flex items-start justify-between gap-6 border-b border-border py-6 transition-colors hover:text-primary"
                  >
                    <div>
                      <p className="text-[11px] tracking-[0.14em] text-accent uppercase">
                        {entry.kicker}
                      </p>
                      <h3 className="mt-2 max-w-lg font-serif text-xl leading-snug text-balance text-primary sm:text-2xl">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {entry.meta}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      strokeWidth={1.5}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            {quotes.map((q) => (
              <figure
                key={q.name}
                className="rounded-xl border border-border bg-card p-6 lg:p-8"
              >
                <blockquote className="font-serif text-xl leading-snug text-pretty text-primary">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-medium">{q.name}</span>
                  <span className="text-muted-foreground"> · {q.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const items = [
  "Certified organic",
  "Paid within 7 days",
  "Plastic-free packing",
  "Seasonal by default",
  "Whole-animal butchery",
  "Returnable glass",
  "Nothing air freighted",
  "Surplus to food banks",
]

export function ValueMarquee() {
  return (
    <section
      aria-label="What we stand for"
      className="border-y border-border bg-secondary/60 py-4"
    >
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
          {[...items, ...items].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-10 text-[11px] tracking-[0.2em] whitespace-nowrap text-primary/80 uppercase"
            >
              {item}
              <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

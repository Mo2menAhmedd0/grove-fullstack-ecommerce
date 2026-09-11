const steps = [
  {
    title: "Fill your basket",
    body: "Order individual items or start from a seasonal box and swap what you do not want. No subscription required.",
  },
  {
    title: "We tell the farms",
    body: "Orders close at 8pm. Growers, bakers and boats get their list overnight and harvest against it in the morning.",
  },
  {
    title: "It arrives before breakfast",
    body: "Packed in returnable crates and delivered by our own drivers between 6am and 10am, six days a week.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            How it works
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.03] tracking-[-0.02em] text-balance text-primary">
            Nothing is picked until you order it
          </h2>
          <p className="mt-5 max-w-sm text-pretty leading-relaxed text-foreground/70">
            Most groceries sit in a warehouse for a fortnight. Ours are still in
            the ground when you press checkout.
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col bg-card p-6 lg:p-8">
              <span className="font-serif text-2xl text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl text-balance text-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-foreground/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

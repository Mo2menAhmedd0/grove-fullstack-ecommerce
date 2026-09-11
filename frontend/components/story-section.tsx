import Image from "next/image"

export function StorySection() {
  return (
    <section id="story" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-primary-foreground/60 uppercase">
              Our farms
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance">
              We know every field this food came out of
            </h2>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-primary-foreground/75">
              Grove started as one van and four growers in Somerset. The model
              has not changed: we agree a price before the season, we pay within
              seven days, and we take the whole crop — including the ugly
              carrots that supermarkets reject.
            </p>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/75">
              That is why a Grove box looks different in March than it does in
              August, and why it tastes like something.
            </p>

            <div className="mt-10 grid gap-6 border-t border-primary-foreground/15 pt-8 sm:grid-cols-2">
              <div>
                <p className="font-serif text-3xl">7 days</p>
                <p className="mt-1 text-sm text-primary-foreground/65">
                  Average time to pay a grower
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl">92 miles</p>
                <p className="mt-1 text-sm text-primary-foreground/65">
                  Median distance to your door
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl bg-primary-foreground/10">
              <Image
                src="/images/story-field.png"
                alt="Rows of leafy vegetables in a small organic market garden at dawn"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary-foreground/10">
              <Image
                src="/images/story-farmer.png"
                alt="A farmer holding a crate of freshly harvested root vegetables"
                fill
                sizes="(max-width: 1024px) 50vw, 28vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary-foreground/10">
              <Image
                src="/images/story-box.png"
                alt="A kraft delivery box packed with vegetables, bread and bottles on a doorstep"
                fill
                sizes="(max-width: 1024px) 50vw, 28vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { CartDrawer } from "@/components/cart-drawer"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ValueMarquee } from "@/components/value-marquee"
import { ShopSection } from "@/components/shop-section"
import { StorySection } from "@/components/story-section"
import { HowItWorks } from "@/components/how-it-works"
import { JournalSection } from "@/components/journal-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />
        <ValueMarquee />
        <ShopSection />
        <StorySection />
        <HowItWorks />
        <JournalSection />
      </main>

      <SiteFooter />

      <CartDrawer />
    </>
  )
}
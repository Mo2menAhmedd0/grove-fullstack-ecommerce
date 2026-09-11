export type CategoryId =
  | "produce"
  | "bakery"
  | "dairy"
  | "butcher"
  | "pantry"
  | "drinks"

export type Product = {
  id: string
  name: string
  producer: string
  origin: string
  unit: string
  price: number
  category: CategoryId
  image: string
  tag?: "New" | "Seasonal" | "Last few" | "Best seller"
  note: string
}

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  { id: "produce", label: "Produce", blurb: "Picked within 24 hours" },
  { id: "bakery", label: "Bakery", blurb: "Baked before sunrise" },
  { id: "dairy", label: "Dairy & Eggs", blurb: "Small herd, raw milk" },
  { id: "butcher", label: "Butcher & Fish", blurb: "Whole-animal, day boat" },
  { id: "pantry", label: "Pantry", blurb: "Single origin staples" },
  { id: "drinks", label: "Drinks", blurb: "Pressed, never concentrate" },
]


export function formatPrice(value: number) {
  return `£${value.toFixed(2)}`
}

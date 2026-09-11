import type { Metadata, Viewport } from "next"
import { Fraunces, Inter, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/components/auth-provider"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Grove — Organic groceries, direct from the farm",
  description:
    "Grove buys direct from 68 family farms, bakeries and day boats, then delivers before breakfast. Nothing is picked until you order it.",
  openGraph: {
    title: "Grove — Organic groceries, direct from the farm",
    description:
      "Seasonal produce, bread, dairy and pantry staples delivered across London and the South East, six mornings a week.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#f7f5ef",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        display.variable,
        body.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="bg-background font-sans antialiased">
        <CartProvider>
          <AuthProvider>
          {children}
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  )
}
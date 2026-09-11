import Link from "next/link"
import { ArrowLeft, Leaf } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 py-20">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
          <Leaf
            className="size-6 text-primary"
            strokeWidth={1.5}
          />
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          404 error
        </p>

        <h1 className="mt-4 font-serif text-5xl text-primary sm:text-6xl">
          Page not found
        </h1>

        <p className="mt-5 text-sm leading-6 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
          It may have moved or no longer exists.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </div>
    </main>
  )
}
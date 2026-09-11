"use client"

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

type Mode = "login" | "register"

export default function AuthPage() {
  const router = useRouter()
  const {
  user,
  loading: authLoading,
  login,
  register,
  logout,
} = useAuth()

  const [mode, setMode] = useState<Mode>("login")
 

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  
  const [error, setError] = useState("")



  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setError("")
    setLoading(true)

    try {
      if (mode === "register") {
        const newUser = await register({
  firstName,
  lastName,
  email,
  password,
})

      } else {
       const loggedInUser = await login({
  email,
  password,
})
      }

      setPassword("")

      // Redirect to home immediately after successful auth
      router.push("/")
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Failed to logout",
    )
  }
}


  if (user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-md rounded-3xl border border-border bg-background p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Grove Account
          </p>

          <h1 className="mt-3 font-serif text-4xl text-primary">
            Welcome, {user.firstName}
          </h1>

          <div className="mt-8 space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground">
                Name
              </p>

              <p className="mt-1">
                {user.firstName} {user.lastName}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">
                Email
              </p>

              <p className="mt-1">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">
                Role
              </p>

              <p className="mt-1">
                {user.role}
              </p>
            </div>
          </div>

          {error && (
            <p className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex-1 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:bg-muted"
            >
              Back to shop
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="font-serif text-3xl text-primary"
          >
            Grove
          </button>

          <h1 className="mt-8 font-serif text-4xl text-primary">
            {mode === "login"
              ? "Welcome back"
              : "Create your account"}
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to manage your Grove account."
              : "Create an account to continue shopping."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-background p-8 shadow-sm"
        >
          {mode === "register" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm">
                  First name
                </label>

                <input
                  type="text"
                  value={firstName}
                  onChange={(event) =>
                    setFirstName(event.target.value)
                  }
                  required
                  autoComplete="given-name"
                  className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm">
                  Last name
                </label>

                <input
                  type="text"
                  value={lastName}
                  onChange={(event) =>
                    setLastName(event.target.value)
                  }
                  required
                  autoComplete="family-name"
                  className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          <div
            className={
              mode === "register" ? "mt-4" : ""
            }
          >
            <label className="text-sm">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              minLength={6}
              autoComplete={
                mode === "login"
                  ? "current-password"
                  : "new-password"
              }
              className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          {error && (
            <p className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-primary px-6 py-4 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </button>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={() => {
                setMode(
                  mode === "login"
                    ? "register"
                    : "login",
                )

                setError("")
              }}
              className="ml-1 font-medium text-primary underline-offset-4 hover:underline"
            >
              {mode === "login"
                ? "Create one"
                : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
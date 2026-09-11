"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  type AuthUser,
} from "@/lib/api"


type RegisterData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

type LoginData = {
  email: string
  password: string
}


type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  login: (data: LoginData) => Promise<AuthUser>
  register: (data: RegisterData) => Promise<AuthUser>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}


const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined,
  )


export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null)

  const [loading, setLoading] =
    useState(true)


  // =========================
  // Check current session
  // =========================

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser =
          await getCurrentUser()

        setUser(currentUser)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])


  // =========================
  // Login
  // =========================

  const login = async (
    data: LoginData,
  ) => {
    const loggedInUser =
      await loginUser(data)

    setUser(loggedInUser)

    return loggedInUser
  }


  // =========================
  // Register
  // =========================

  const register = async (
    data: RegisterData,
  ) => {
    const newUser =
      await registerUser(data)

    setUser(newUser)

    return newUser
  }


  // =========================
  // Logout
  // =========================

  const logout = async () => {
    await logoutUser()

    setUser(null)
  }


  // =========================
  // Refresh user
  // =========================

  const refreshUser = async () => {
    try {
      const currentUser =
        await getCurrentUser()

      setUser(currentUser)
    } catch {
      setUser(null)
    }
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    )
  }

  return context
}
// This is a simple client-side auth implementation for demo purposes
// In a real app, you would use a proper auth solution like NextAuth.js or Clerk

export type User = {
  name?: string
  email: string
  isLoggedIn: boolean
}

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("user")
  if (!userData) return null

  try {
    return JSON.parse(userData) as User
  } catch (error) {
    console.error("Failed to parse user data:", error)
    return null
  }
}

export const isAuthenticated = (): boolean => {
  const user = getUser()
  return !!user?.isLoggedIn
}

export const logout = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("user")
  window.location.href = "/login"
}


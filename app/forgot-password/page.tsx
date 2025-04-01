"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"

export default function ForgotPassword() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid")
      return
    }

    // In a real app, you would send a password reset email
    // For demo purposes, we'll just show a success message
    setIsSubmitted(true)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
        alt="Beautiful mountain landscape"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div
          className={`w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl opacity-0 ${isLoaded ? "animate-fade-in" : ""}`}
        >
          <button
            onClick={() => router.push("/login")}
            className="flex items-center text-white mb-6 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to login
          </button>

          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Reset your password</h1>
                <p className="text-white/80">We'll send you a link to reset your password</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError("")
                      }}
                      className={`pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 ${error ? "border-red-400" : ""}`}
                    />
                  </div>
                  {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                </div>

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Send reset link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Check your email</h2>
              <p className="text-white/80 mb-6">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
              <Button onClick={() => router.push("/login")} className="bg-blue-500 hover:bg-blue-600 text-white">
                Back to login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


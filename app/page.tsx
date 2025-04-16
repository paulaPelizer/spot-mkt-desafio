"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Interface para as estrelas
interface Star {
  left: string
  size: "small" | "medium" | "large"
  duration: string
  delay: string
}

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Estado para as estrelas em movimento
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Gerar estrelas com diferentes tamanhos, velocidades e posições
    const newStars = Array.from({ length: 150 }, () => ({
      left: `${Math.random() * 100}%`,
      size: ["small", "medium", "large"][Math.floor(Math.random() * 3)] as "small" | "medium" | "large",
      duration: `${Math.random() * 10 + 10}s`, // Entre 10-20 segundos para atravessar a tela
      delay: `${Math.random() * 10}s`, // Atraso aleatório para início da animação
    }))
    setStars(newStars)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulating API call with timeout
    setTimeout(() => {
      if (username === "spotmkt" && password === "123") {
        // Store login state in localStorage
        localStorage.setItem("isLoggedIn", "true")
        router.push("/dashboard")
      } else {
        setError("Credenciais inválidas. Por favor, tente novamente.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center cosmic-bg p-4 relative overflow-hidden">
      {/* Estrelas em movimento */}
      {stars.map((star, i) => (
        <div
          key={i}
          className={`star star-${star.size}`}
          style={{
            left: star.left,
            animationDuration: `${star.duration}, 3s`,
            animationDelay: `${star.delay}, ${star.delay}`,
          }}
        />
      ))}

      {/* Planets */}
      <div className="planet" style={{ width: "300px", height: "300px", top: "10%", right: "-100px" }} />
      <div className="planet" style={{ width: "200px", height: "200px", bottom: "5%", left: "-50px" }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="w-full max-w-md relative z-10">
        <Card className="glass-lighter border-none shadow-lg static-border">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center glow">
                <Rocket className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center glow-text-white text-white">SPOT MARKETING</CardTitle>
            <CardDescription className="text-center text-slate-200">
              Entre com suas credenciais para acessar o universo de marketing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">
                  Usuário
                </Label>
                <Input
                  id="username"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 glow"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "ACESSAR PAINEL"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

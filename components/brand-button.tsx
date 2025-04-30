import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

interface BrandButtonProps {
  href: string
  children: ReactNode
  variant?: "purple" | "green" | "outline"
  size?: "sm" | "md" | "lg"
  icon?: boolean
  className?: string
  target?: string
  rel?: string
}

export function BrandButton({
  href,
  children,
  variant = "purple",
  size = "md",
  icon = false,
  className = "",
  target,
  rel,
}: BrandButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2"

  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-6 text-sm",
    lg: "h-12 px-8 text-sm",
  }

  const variantClasses = {
    purple:
      "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 focus-visible:ring-purple-600",
    green:
      "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 focus-visible:ring-green-500",
    outline:
      "border border-white/30 bg-white/10 text-white shadow-lg backdrop-blur-md hover:bg-white/20 focus-visible:ring-white/50",
  }

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
      {icon && <ArrowRight className="ml-2 h-4 w-4" />}
    </Link>
  )
}

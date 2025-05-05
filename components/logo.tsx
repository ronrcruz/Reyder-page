import Image from "next/image"
import Link from "next/link"

export function Logo({
  className = "",
  size = "default",
}: { className?: string; size?: "small" | "default" | "large" }) {
  const sizes = {
    small: { width: 100, height: 33 },
    default: { width: 150, height: 50 },
    large: { width: 180, height: 60 },
  }

  const { width, height } = sizes[size]

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image src="/logo.png" alt="Reyder Enterprises Logo" width={width} height={height} className="h-auto" />
    </Link>
  )
}

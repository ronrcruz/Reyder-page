import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css" // Adjusted path for CSS
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] })

// Note: Metadata might need to be made dynamic based on lang later
export const metadata: Metadata = {
  title: "Reyder Enterprises - Premium Mobile Device Wholesale",
  description:
    "Access high-quality mobile devices through our exclusive auctions platform. Join industry professionals sourcing the best wholesale inventory.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
  params: { lang }
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
} 
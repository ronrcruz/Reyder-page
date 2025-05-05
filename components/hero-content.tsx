"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BrandButton } from "./brand-button"

export function HeroContent() {
  return (
    <div className="container relative z-10 px-4 md:px-6 py-12 md:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center space-y-8"
      >
        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
          Elevate Your Inventory with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
            Premium Devices
          </span>
        </h1>
        <p className="max-w-[800px] mx-auto text-white/90 text-lg md:text-xl">
          Access high-quality mobile devices through our exclusive auctions platform. Join industry professionals
          sourcing the best wholesale inventory.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <BrandButton
            href="https://auctions.reyderenterprises.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="green"
            size="lg"
            icon
          >
            Join Our Auctions
          </BrandButton>
          <Link
            href="#process"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Learn More
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

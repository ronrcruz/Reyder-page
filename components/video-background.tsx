"use client"

import { useEffect, useRef, useState } from "react"

interface VideoBackgroundProps {
  src: string
  className?: string
}

export function VideoBackground({ src, className = "" }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute min-h-full min-w-full object-cover w-full h-full z-0"
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
      >
        <source src={src} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Darkening overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-vignette z-20"></div>
    </div>
  )
}

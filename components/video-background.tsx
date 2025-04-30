"use client"

import { useEffect, useRef, useState } from "react"

interface VideoBackgroundProps {
  src: string
  className?: string
}

export function VideoBackground({ src, className = "" }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [playError, setPlayError] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    // Function to attempt playing the video
    const attemptPlay = () => {
      videoElement
        .play()
        .then(() => {
          setIsLoaded(true)
          setPlayError(false)
          console.log("Video playing successfully")
        })
        .catch((error) => {
          console.error("Video play error:", error)
          setPlayError(true)
        })
    }

    // Set up event listeners
    videoElement.addEventListener("loadeddata", attemptPlay)
    videoElement.addEventListener("canplaythrough", attemptPlay)

    // Clean up
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadeddata", attemptPlay)
        videoElement.removeEventListener("canplaythrough", attemptPlay)
      }
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden z-10 ${className}`}>
      <video
        ref={videoRef}
        className="absolute min-h-full min-w-full object-cover w-full h-full"
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
      >
        <source src={src} type="video/webm" />
      </video>

      {/* Darkening overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-vignette z-20"></div>

      {/* Play button if video fails to autoplay */}
      {playError && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current
                  .play()
                  .then(() => setPlayError(false))
                  .catch((err) => console.error("Manual play failed:", err))
              }
            }}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-colors"
          >
            Click to Play Video
          </button>
        </div>
      )}
    </div>
  )
}

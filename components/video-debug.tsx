"use client"

import { useEffect, useState } from "react"

interface VideoDebugProps {
  videoPath: string
}

export function VideoDebug({ videoPath }: VideoDebugProps) {
  const [status, setStatus] = useState("Checking video...")

  useEffect(() => {
    // Check if the video file exists
    fetch(videoPath)
      .then((response) => {
        if (response.ok) {
          setStatus(
            `Video file exists (${response.status}). Size: ${response.headers.get("content-length") || "unknown"} bytes`,
          )
        } else {
          setStatus(`Video file error: ${response.status} ${response.statusText}`)
        }
      })
      .catch((error) => {
        setStatus(`Error checking video: ${error.message}`)
      })
  }, [videoPath])

  return <div className="fixed bottom-4 right-4 bg-black/70 text-white p-3 rounded-lg text-xs z-50">{status}</div>
}

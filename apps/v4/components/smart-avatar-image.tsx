"use client"

import { useState } from "react"
import { AvatarImage } from "@/registry/new-york-v4/ui/avatar"

export function SmartAvatarImage({ src, fallback, alt }: {
  src: string
  fallback?: string
  alt?: string
}) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <AvatarImage
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallback || "/default-avatar.png")
      }}
    />
  )
}
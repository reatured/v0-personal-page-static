/**
 * Project Gallery Component
 * Image gallery for project detail pages
 */
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react"

interface ProjectGalleryProps {
  images: string[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div>
      <div className="relative aspect-[16/9] bg-[#f5f3e4] mb-4">
        <Image
          src={images[activeImage] || "/placeholder.svg"}
          alt={`Project image ${activeImage + 1}`}
          fill
          className="object-contain"
        />

        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevImage}
            className="rounded-full bg-white border-2 border-black"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextImage}
            className="rounded-full bg-white border-2 border-black"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full bg-white border-2 border-black">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-square rounded-md overflow-hidden border-2 ${
              index === activeImage ? "border-[#ffdd59]" : "border-gray-200"
            }`}
            onClick={() => setActiveImage(index)}
          >
            <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

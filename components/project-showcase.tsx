/**
 * Project Showcase Component
 * Interactive showcase for featured projects
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/lib/projects"

interface ProjectShowcaseProps {
  project: Project
}

export function ProjectShowcase({ project }: ProjectShowcaseProps) {
  const [activeImage, setActiveImage] = useState(0)

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-xl">
      <Tabs defaultValue="gallery" className="w-full">
        <div className="flex justify-between items-center p-4 border-b-4 border-black bg-[#ffdd59]">
          <TabsList className="bg-white border-2 border-black">
            <TabsTrigger value="gallery" className="data-[state=active]:bg-[#4cd137] data-[state=active]:text-white">
              Gallery View
            </TabsTrigger>
            <TabsTrigger value="3d" className="data-[state=active]:bg-[#4cd137] data-[state=active]:text-white">
              3D Viewer
            </TabsTrigger>
          </TabsList>
          <Link
            href={`/projects/${project.slug}`}
            className="bg-white px-3 py-1 rounded border-2 border-black font-bold text-sm hover:bg-[#4cd137] hover:text-white transition-colors"
          >
            View Full Project
          </Link>
        </div>

        <TabsContent value="gallery" className="mt-0">
          <div className="relative aspect-[16/9] bg-[#f5f3e4]">
            <Image
              src={project.images[activeImage] || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-contain"
            />

            {/* Decorative element */}
            <div className="absolute top-4 left-4 bg-white p-2 rounded-lg transform -rotate-6 border-2 border-black shadow-lg">
              <span className="text-sm font-bold">{project.category.toUpperCase()}</span>
            </div>

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
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#ffdd59] rounded-full flex items-center justify-center mr-3 border-2 border-black">
                <span className="font-bold">★</span>
              </div>
              <h3 className="text-2xl font-black">{project.title}</h3>
            </div>
            <p className="text-gray-700 mb-4">{project.description}</p>

            <div className="mt-6 flex space-x-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center ${
                    index === activeImage ? "bg-[#ffdd59]" : "bg-white"
                  }`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="3d" className="mt-0">
          <div className="aspect-[16/9] bg-[#f5f3e4] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="bg-white p-4 rounded-lg border-2 border-black transform rotate-2 shadow-lg inline-block">
                <p className="text-gray-700 mb-4 font-bold">3D Model Viewer</p>
                <p className="text-sm text-gray-500">
                  This area will embed a 3D model viewer, allowing users to interactively view and rotate 3D models.
                  <br />
                  You can integrate Three.js or other 3D viewer libraries to implement this feature.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#ffdd59] rounded-full flex items-center justify-center mr-3 border-2 border-black">
                <span className="font-bold">★</span>
              </div>
              <h3 className="text-2xl font-black">{project.title}</h3>
            </div>
            <p className="text-gray-700 mb-4">{project.description}</p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-[#f5f3e4] p-3 rounded-lg border-2 border-black">
                <h4 className="text-sm font-bold mb-2">Polygons</h4>
                <p className="text-gray-700">{project.polygons}</p>
              </div>
              <div className="bg-[#f5f3e4] p-3 rounded-lg border-2 border-black">
                <h4 className="text-sm font-bold mb-2">Materials</h4>
                <p className="text-gray-700">PBR</p>
              </div>
              <div className="bg-[#f5f3e4] p-3 rounded-lg border-2 border-black">
                <h4 className="text-sm font-bold mb-2">Formats</h4>
                <p className="text-gray-700">{project.formats.join(", ")}</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

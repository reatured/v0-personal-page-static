/**
 * Project Card Component
 * Card component for displaying project previews
 */
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  title: string
  subtitle: string
  description: string
  imageUrl: string
  slug: string
  category: string
  index: number
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  imageUrl,
  slug,
  category,
  index,
}: ProjectCardProps) {
  return (
    <div className="group relative bg-white overflow-hidden rounded-lg border-4 border-black shadow-lg transform hover:-translate-y-1 transition-all">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-[#ffdd59] rounded-full flex items-center justify-center mr-3 border-2 border-black">
            <span className="font-bold">{index}</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight">{title}</h3>
        </div>
        <Link
          href={`/categories/${category}`}
          className="text-lg mb-4 bg-[#4cd137] text-white inline-block px-2 py-1 rounded transform -rotate-1 hover:rotate-0 transition-transform"
        >
          {subtitle}
        </Link>
        <p className="text-gray-700 mb-6">{description}</p>
        <Link href={`/projects/${slug}`} className="flex items-center text-sm font-bold hover:underline">
          <span>View Details</span>
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-500">
        <div className="relative w-full h-full border-l-4 border-black">
          <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
            <span className="text-white text-xs font-bold tracking-wider">VIEW PROJECT</span>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute top-2 right-2 bg-[#ff6b6b] text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-12 border-2 border-black">
        HOT!
      </div>
    </div>
  )
}

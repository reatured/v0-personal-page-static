/**
 * Project Filters Component
 * Filter controls for the projects page
 */
"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ProjectFiltersProps {
  categories: string[]
  tags: string[]
  selectedCategory?: string
  selectedTag?: string
}

export function ProjectFilters({ categories, tags, selectedCategory, selectedTag }: ProjectFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === null) {
      params.delete(name)
    } else {
      params.set(name, value)
    }

    return params.toString()
  }

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? null : category
    router.push(`${pathname}?${createQueryString("category", newCategory)}`)
  }

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag
    router.push(`${pathname}?${createQueryString("tag", newTag)}`)
  }

  const clearFilters = () => {
    router.push(pathname)
  }

  const hasActiveFilters = selectedCategory || selectedTag

  return (
    <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg sticky top-4">
      <div className="p-4 border-b-4 border-black bg-[#ffdd59]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Filters</h2>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters} className="border-2 border-black">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <h3 className="font-bold mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-3 py-1 rounded-full text-sm border-2 border-black ${
                  selectedCategory === category ? "bg-[#4cd137] text-white" : "bg-[#f5f3e4] hover:bg-[#ffdd59]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-sm border-2 border-black ${
                  selectedTag === tag ? "bg-[#4cd137] text-white" : "bg-[#f5f3e4] hover:bg-[#ffdd59]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

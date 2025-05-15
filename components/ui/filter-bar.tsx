"use client"

/**
 * 筛选栏组件
 * 用于按类别和标签筛选项目
 */
import { useState } from "react"
import type { Category, Tag } from "@/lib/types"
import { X } from "lucide-react"

interface FilterBarProps {
  categories: Category[]
  tags: Tag[]
  selectedCategory: string | null
  selectedTag: string | null
  onCategoryChange: (category: string | null) => void
  onTagChange: (tag: string | null) => void
}

export function FilterBar({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategoryChange,
  onTagChange,
}: FilterBarProps) {
  const [showTagsMenu, setShowTagsMenu] = useState(false)

  return (
    <div className="border border-black p-4 mb-8">
      {/* Software filter at the top */}
      <div className="mb-4 relative">
        <button
          onClick={() => setShowTagsMenu(!showTagsMenu)}
          className="w-full border border-black px-3 py-2 font-mono text-sm hover:bg-black hover:text-white transition-colors flex justify-between items-center"
        >
          <span>Filter by Software</span>
          <span>{showTagsMenu ? "▲" : "▼"}</span>
        </button>

        {showTagsMenu && (
          <div className="absolute left-0 right-0 mt-2 border border-black bg-white z-10">
            <div className="p-2 max-h-60 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-1">
              {tags.map((tag) => (
                <button
                  key={tag.slug}
                  onClick={() => {
                    onTagChange(tag.slug)
                    setShowTagsMenu(false)
                  }}
                  className={`text-left px-2 py-1 font-mono text-sm ${
                    selectedTag === tag.slug ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Categories below */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            onCategoryChange(null)
            onTagChange(null)
          }}
          className={`border border-black px-3 py-1 font-mono text-sm ${
            !selectedCategory && !selectedTag ? "bg-black text-white" : "hover:bg-black hover:text-white"
          } transition-colors`}
        >
          All Projects
        </button>

        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            className={`border border-black px-3 py-1 font-mono text-sm ${
              selectedCategory === category.slug ? "bg-black text-white" : "hover:bg-black hover:text-white"
            } transition-colors`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Active filters */}
      {(selectedCategory || selectedTag) && (
        <div className="mt-4 flex items-center gap-2">
          <span className="font-mono text-sm">Active filters:</span>
          {selectedCategory && (
            <div className="flex items-center gap-1 border border-black px-2 py-1">
              <span className="font-mono text-xs">
                Category: {categories.find((c) => c.slug === selectedCategory)?.name}
              </span>
              <button onClick={() => onCategoryChange(null)} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {selectedTag && (
            <div className="flex items-center gap-1 border border-black px-2 py-1">
              <span className="font-mono text-xs">Software: {tags.find((t) => t.slug === selectedTag)?.name}</span>
              <button onClick={() => onTagChange(null)} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

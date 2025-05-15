"use client"

/**
 * 侧边栏菜单组件
 * 以宜家说明书风格展示不同的作品集类别
 */
import { useState } from "react"
import Link from "next/link"
import { Layers, Gamepad2, Headphones, Code, Menu, X } from "lucide-react"
import type { Category } from "@/lib/types"
import { CuboidIcon } from "./icons"

// 接收 categories 作为 props 而不是直接导入
// Receive categories as props instead of importing directly
interface SidebarProps {
  categories: Category[]
}

export function Sidebar({ categories }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  // 为每个类别定义图标
  const getIconForCategory = (iconName: string) => {
    switch (iconName) {
      case "cube":
        return <CuboidIcon className="w-5 h-5" />
      case "layers":
        return <Layers className="w-5 h-5" />
      case "gamepad-2":
        return <Gamepad2 className="w-5 h-5" />
      case "headphones":
        return <Headphones className="w-5 h-5" />
      case "code":
        return <Code className="w-5 h-5" />
      default:
        return <Code className="w-5 h-5" />
    }
  }

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden border border-black w-10 h-10 flex items-center justify-center bg-white"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* 侧边栏 */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-black w-64 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="border-b border-black pb-4 mb-6">
            <h2 className="font-bold text-xl tracking-tighter">CATEGORIES</h2>
            <p className="font-mono text-xs mt-1">Select your area of interest</p>
          </div>

          <div className="space-y-6">
            {categories.map((category, index) => (
              <div key={index} className="group">
                <Link
                  href={`/categories/${category.slug}`}
                  className="flex items-center gap-3 border border-black p-3 hover:bg-black hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 border border-black group-hover:border-white flex items-center justify-center bg-white group-hover:bg-black">
                    {getIconForCategory(category.icon)}
                  </div>
                  <span className="font-mono">{category.name}</span>
                </Link>

                {/* 宜家风格的装饰元素 */}
                <div className="flex justify-end mt-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 border border-black"></div>
                    <div className="w-2 h-2 border border-black bg-black"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 宜家风格的说明 */}
          <div className="mt-8 border-t border-black pt-4">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 border border-black flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-xs">i</span>
              </div>
              <p className="font-mono text-xs">Categories help organize your portfolio items by specialty area</p>
            </div>
          </div>
        </div>
      </div>

      {/* 移动端背景遮罩 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  )
}

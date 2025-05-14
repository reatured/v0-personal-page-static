/**
 * Sidebar Component
 * Main navigation sidebar with collapsible mobile menu
 */
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, User, Briefcase, Mail, Menu, X, Star, Palette, CuboidIcon as Cube, Video } from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const isActive = (href: string) => {
    if (href === "#") {
      return pathname === "/"
    }
    if (href.startsWith("#")) {
      return false
    }
    return pathname.startsWith(href)
  }

  const navItems = [
    { name: "Home", icon: Home, href: "/", badge: "" },
    { name: "About Me", icon: User, href: "#about" },
    { name: "Characters", icon: Cube, href: "/categories/character", badge: "" },
    { name: "Environments", icon: Palette, href: "/categories/environment", badge: "" },
    { name: "Animations", icon: Video, href: "/categories/animation", badge: "" },
    { name: "Featured", icon: Star, href: "#featured", badge: "" },
    { name: "All Projects", icon: Briefcase, href: "/projects", badge: "NEW" },
    { name: "Contact", icon: Mail, href: "#contact", badge: "" },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#ffdd59] p-2 rounded-full border-2 border-black shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[240px] bg-[#ffdd59] border-r-4 border-black z-40 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 border-b-4 border-black">
            <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg border-4 border-black">
              <Image src="/avatar.png" alt="3D Artist Avatar" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-white text-center">
                <span className="font-bold text-sm">3D ARTIST</span>
              </div>
            </div>
            <h2 className="text-xl font-black text-center bg-black text-white py-1 px-2 rounded transform rotate-2 mb-2">
              YOUR NAME
            </h2>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 overflow-auto p-2">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors group relative border-2 border-black ${
                      isActive(item.href) ? "bg-black text-white" : "hover:bg-black hover:text-white"
                    }`}
                    onClick={() => {
                      if (item.href.startsWith("#") || window.innerWidth < 768) {
                        setIsOpen(false)
                      }
                    }}
                  >
                    <div
                      className={`p-2 rounded-md border-2 border-black mr-3 ${
                        isActive(item.href)
                          ? "bg-[#ffdd59] text-black"
                          : "bg-white group-hover:bg-[#ffdd59] group-hover:text-black"
                      }`}
                    >
                      <item.icon size={18} />
                    </div>
                    <span className="font-bold">{item.name}</span>

                    {item.badge && (
                      <div className="absolute -top-2 -right-2 bg-[#ff6b6b] text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-black">
                        {item.badge}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t-4 border-black">
            <div className="bg-white p-3 rounded-lg border-2 border-black text-center">
              <p className="text-sm font-bold">Let's create together!</p>
              <div className="flex justify-center mt-2 space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-black"
                    style={{ backgroundColor: i === 1 ? "#ff6b6b" : i === 2 ? "#4cd137" : "#1e90ff" }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

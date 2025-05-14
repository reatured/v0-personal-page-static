import type React from "react"
/**
 * Root Layout Component
 * Provides the base structure for all pages
 */
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "3D Artist Portfolio",
  description: "Portfolio website showcasing 3D art, models, and animations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f5f3e4]`}>
        <div className="flex min-h-screen">
          <Sidebar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}

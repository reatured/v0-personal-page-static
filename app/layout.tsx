import type React from "react"
/**
 * 网站布局组件
 * 定义了网站的整体布局结构和全局样式
 */
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IKEA-Style Portfolio",
  description: "A personal portfolio website designed like an IKEA instruction manual",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

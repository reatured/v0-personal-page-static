import type React from "react"
// 这是网站的主页面组件
// 它导入并使用了侧边栏和项目展示组件
import { ProjectShowcase } from "@/components/project-showcase"
import { PortfolioSidebar } from "@/components/portfolio-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "18rem",
        } as React.CSSProperties
      }
    >
      <PortfolioSidebar />
      <SidebarInset className="bg-background">
        <main className="container py-6 md:py-12">
          <ProjectShowcase />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

import { Code, Home, Mail, User, Box, Palette, Cpu, Gamepad2, Glasses, Layers } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Update the menuItems array with proper icons and dynamic routes
const menuItems = [
  {
    title: "Home",
    icon: Home,
    url: "/",
    isActive: false,
  },
  {
    title: "About Me",
    icon: User,
    url: "/about",
  },
  {
    title: "Projects",
    icon: Layers,
    url: "/",
  },
  {
    title: "3D Design",
    icon: Box,
    url: "/category/3d-design",
  },
  {
    title: "Graphic Design",
    icon: Palette,
    url: "/category/graphic-design",
  },
  {
    title: "Creative Coding",
    icon: Cpu,
    url: "/category/creative-coding",
  },
  {
    title: "Game Dev",
    icon: Gamepad2,
    url: "/category/game-dev",
  },
  {
    title: "XR Dev",
    icon: Glasses,
    url: "/category/xr-dev",
  },
  {
    title: "Full Stack Dev",
    icon: Code,
    url: "/category/full-stack",
  },
  {
    title: "Contact",
    icon: Mail,
    url: "/contact",
  },
]

export function PortfolioSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/diverse-avatars.png" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-sm text-muted-foreground">Frontend Developer</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <Link href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button className="w-full" asChild>
          <Link href="/contact">Contact Me</Link>
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

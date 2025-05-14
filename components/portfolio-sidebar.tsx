import { Code, Home, Laptop, Mail, User } from "lucide-react"

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

// 导航菜单项数据
const menuItems = [
  {
    title: "首页",
    icon: Home,
    url: "#",
    isActive: true,
  },
  {
    title: "关于我",
    icon: User,
    url: "#about",
  },
  {
    title: "项目",
    icon: Code,
    url: "#projects",
  },
  {
    title: "技能",
    icon: Laptop,
    url: "#skills",
  },
  {
    title: "联系我",
    icon: Mail,
    url: "#contact",
  },
]

export function PortfolioSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/diverse-avatars.png" alt="头像" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">张三</h2>
            <p className="text-sm text-muted-foreground">前端开发工程师</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <a href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button className="w-full" asChild>
          <a href="#contact">联系我</a>
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

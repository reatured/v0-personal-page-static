import { ExternalLink, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// 项目数据
// 在实际应用中，这些数据可能来自数据库或CMS系统
const projects = [
  {
    id: 1,
    title: "电子商务网站",
    description: "使用Next.js和Tailwind CSS构建的现代电子商务平台，包含产品展示、购物车和支付功能。",
    image: "/ecommerce-website-homepage.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Stripe"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "任务管理应用",
    description: "一个功能齐全的任务管理应用，支持任务创建、分类、提醒和团队协作。",
    image: "/task-management-app-interface.png",
    tags: ["React", "Firebase", "Material UI"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "个人博客",
    description: "使用Gatsby构建的静态博客网站，支持Markdown内容和评论系统。",
    image: "/placeholder.svg?key=djj8g",
    tags: ["Gatsby", "GraphQL", "Netlify CMS"],
    githubUrl: "#",
    liveUrl: "#",
  },
]

export function ProjectShowcase() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">我的项目</h1>
        <p className="text-muted-foreground">
          以下是我最近完成的一些项目。每个项目都展示了我的技术能力和解决问题的方法。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  代码
                </a>
              </Button>
              <Button size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  预览
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

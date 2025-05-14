/**
 * 项目展示组件
 * 以宜家说明书的步骤形式展示个人项目
 */
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment processing and inventory management",
      image: "/placeholder.svg?key=lg8un",
      steps: [
        "Designed responsive UI with React and Tailwind",
        "Implemented secure payment processing",
        "Built inventory management system",
        "Deployed on cloud infrastructure",
      ],
      tools: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Task Management App",
      description: "A productivity application for teams to manage projects and tasks",
      image: "/placeholder.svg?key=g2wss",
      steps: [
        "Created drag-and-drop interface",
        "Implemented real-time updates",
        "Built user authentication system",
        "Added notification features",
      ],
      tools: ["Vue.js", "Firebase", "Express", "Socket.io"],
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for visualizing complex datasets",
      image: "/placeholder.svg?key=tevwp",
      steps: [
        "Designed intuitive data visualizations",
        "Implemented filtering and sorting features",
        "Created export functionality",
        "Built responsive layout for all devices",
      ],
      tools: ["D3.js", "React", "Python", "PostgreSQL"],
    },
  ]

  return (
    <div className="space-y-16">
      {projects.map((project, index) => (
        <div key={index} className="border border-black p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="font-mono mb-6">{project.description}</p>

              <div className="space-y-4 mb-6">
                {project.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="ikea-step">
                    <div className="w-8 h-8 border border-black flex items-center justify-center">{stepIndex + 1}</div>
                    <p className="font-mono text-sm">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="border border-black px-3 py-1">
                    <p className="font-mono text-xs">{tool}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black p-4">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={300}
                height={200}
                className="w-full h-auto"
              />
              <div className="flex justify-between items-center mt-4">
                <p className="font-mono text-sm">
                  Project {index + 1}/{projects.length}
                </p>
                <button className="flex items-center gap-2 border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors">
                  <span className="font-mono text-sm">View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

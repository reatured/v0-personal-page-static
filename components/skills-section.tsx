"use client"

/**
 * 技能展示组件
 * 以宜家说明书风格展示各种技能及其熟练程度（用数量表示）
 */
import { Code, Database, Globe, Palette, Cpu } from "lucide-react"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Globe className="w-8 h-8" />,
      skills: [
        { name: "JavaScript", quantity: 5 },
        { name: "React", quantity: 4 },
        { name: "HTML/CSS", quantity: 5 },
        { name: "TypeScript", quantity: 3 },
        { name: "Next.js", quantity: 3 },
      ],
    },
    {
      title: "Backend",
      icon: <Database className="w-8 h-8" />,
      skills: [
        { name: "Node.js", quantity: 4 },
        { name: "Python", quantity: 3 },
        { name: "SQL", quantity: 3 },
        { name: "REST API", quantity: 4 },
        { name: "GraphQL", quantity: 2 },
      ],
    },
    {
      title: "Design",
      icon: <Palette className="w-8 h-8" />,
      skills: [
        { name: "UI/UX", quantity: 3 },
        { name: "Figma", quantity: 3 },
        { name: "Responsive", quantity: 4 },
        { name: "Tailwind", quantity: 4 },
        { name: "Accessibility", quantity: 3 },
      ],
    },
    {
      title: "Other",
      icon: <Cpu className="w-8 h-8" />,
      skills: [
        { name: "Git", quantity: 4 },
        { name: "DevOps", quantity: 2 },
        { name: "Testing", quantity: 3 },
        { name: "Agile", quantity: 3 },
        { name: "CI/CD", quantity: 2 },
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skillCategories.map((category, index) => (
        <div key={index} className="border border-black p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="ikea-circle">{category.icon}</div>
            <h3 className="text-2xl font-bold">{category.title}</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="flex flex-col items-center">
                <div className="ikea-circle bg-white">
                  <Code className="w-6 h-6" />
                </div>
                <p className="mt-2 font-mono text-center">{skill.name}</p>
                <p className="ikea-quantity">{skill.quantity}x</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

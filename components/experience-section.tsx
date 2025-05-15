/**
 * 经验展示组件
 * 以宜家说明书的时间线形式展示工作和教育经历
 */
import { Briefcase, GraduationCap, Calendar } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2021 - Present",
      type: "work",
      description:
        "Led development of multiple web applications using React and Next.js. Implemented CI/CD pipelines and mentored junior developers.",
      achievements: [
        "Reduced page load time by 40%",
        "Implemented component library used across 5 projects",
        "Led team of 4 developers",
      ],
    },
    {
      title: "Web Developer",
      company: "Digital Agency",
      period: "2018 - 2021",
      type: "work",
      description:
        "Developed responsive websites and web applications for various clients. Worked with React, Vue.js, and vanilla JavaScript.",
      achievements: [
        "Delivered 20+ client projects",
        "Implemented accessibility standards",
        "Optimized performance for mobile devices",
      ],
    },
    {
      title: "Bachelor of Computer Science",
      company: "University of Technology",
      period: "2014 - 2018",
      type: "education",
      description: "Studied computer science with focus on web development and software engineering.",
      achievements: ["GPA: 3.8/4.0", "Senior project: E-learning platform", "Web Development Club President"],
    },
  ]

  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <div key={index} className="border border-black p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4 flex flex-col items-center md:items-start">
              <div className="ikea-circle mb-4">
                {exp.type === "work" ? <Briefcase className="w-8 h-8" /> : <GraduationCap className="w-8 h-8" />}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" />
                <p className="font-mono text-sm">{exp.period}</p>
              </div>
              <p className="font-mono text-sm text-center md:text-left">{exp.company}</p>
            </div>

            <div className="md:w-3/4">
              <h3 className="text-2xl font-bold mb-4">{exp.title}</h3>
              <p className="font-mono mb-6">{exp.description}</p>

              <div className="space-y-2">
                <p className="font-bold font-mono">Key Achievements:</p>
                {exp.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start gap-2">
                    <div className="w-6 h-6 border border-black flex items-center justify-center mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="font-mono text-sm">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assembly diagram */}
          {index < experiences.length - 1 && (
            <div className="flex justify-center my-6">
              <div className="h-12 border-l-2 border-dashed border-black"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectForm } from "@/components/admin/project-form"

/**
 * 新建项目页面
 */
export default function NewProjectPage() {
  return (
    <main className="flex-1 ml-[240px] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/admin/projects" className="flex items-center text-sm font-bold hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回项目列表
          </Link>
        </div>

        <div className="bg-white border-4 border-black rounded-lg p-6 mb-8 shadow-lg">
          <h1 className="text-4xl font-black mb-6">创建新项目</h1>
          <ProjectForm />
        </div>
      </div>
    </main>
  )
}

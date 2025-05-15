import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectForm } from "@/components/admin/project-form"
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"

/**
 * 编辑项目页面
 */
export default async function EditProjectPage({ params }: { params: { id: string } }) {
  // 获取项目数据
  const { data: project, error } = await supabase
    .from("projects")
    .select(`
      *,
      images:project_images(id, image_url, display_order),
      videos:project_videos(id, video_url, video_type, thumbnail_url, display_order)
    `)
    .eq("id", params.id)
    .single()

  if (error || !project) {
    notFound()
  }

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
          <h1 className="text-4xl font-black mb-6">编辑项目: {project.title}</h1>
          <ProjectForm project={project} isEdit={true} />
        </div>
      </div>
    </main>
  )
}

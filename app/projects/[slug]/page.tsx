import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Eye, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProjectBySlug, getAllProjects } from "@/lib/supabase"
import { ProjectGallery } from "@/components/project-gallery"
import { VideoEmbed } from "@/components/video-embed"
import ReactMarkdown from "react-markdown"

export async function generateStaticParams() {
  const projects = await getAllProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | 3D Artist Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  // 获取项目图片
  const projectImages = project.images?.map((img) => img.image_url) || []

  // 获取项目视频
  const projectVideos = project.videos || []

  return (
    <main className="flex-1 ml-[240px] py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/projects" className="flex items-center text-sm font-bold hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回项目列表
          </Link>
        </div>

        {/* Project Header */}
        <div className="bg-white border-4 border-black rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center mb-2">
                <Link
                  href={`/categories/${project.category}`}
                  className="bg-[#ffdd59] text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-black uppercase"
                >
                  {project.category}
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">{project.title}</h1>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} className="bg-[#f5f3e4] text-black border-2 border-black">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-[#ffdd59] text-black hover:bg-[#ffdd59]/90 border-2 border-black font-bold">
                <Eye className="mr-2 h-4 w-4" />
                查看AR
              </Button>
              <Button variant="outline" className="border-2 border-black font-bold">
                <Download className="mr-2 h-4 w-4" />
                下载
              </Button>
              <Button variant="outline" className="border-2 border-black font-bold">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Gallery */}
            {projectImages.length > 0 && (
              <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg mb-8">
                <h2 className="text-xl font-bold p-4 border-b-4 border-black bg-[#ffdd59]">项目图片</h2>
                <div className="p-4">
                  <ProjectGallery images={projectImages} />
                </div>
              </div>
            )}

            {/* Project Videos */}
            {projectVideos.length > 0 && (
              <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg mb-8">
                <h2 className="text-xl font-bold p-4 border-b-4 border-black bg-[#ffdd59]">项目视频</h2>
                <div className="p-4 space-y-6">
                  {projectVideos.map((video, index) => (
                    <div key={video.id} className="space-y-2">
                      <h3 className="font-bold text-lg">视频 {index + 1}</h3>
                      <VideoEmbed
                        url={video.video_url}
                        type={video.video_type}
                        title={`${project.title} - 视频 ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Description */}
            <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg">
              <h2 className="text-xl font-bold p-4 border-b-4 border-black bg-[#ffdd59]">关于此项目</h2>
              <div className="p-6">
                {project.content ? (
                  <div className="prose max-w-none">
                    <ReactMarkdown>{project.content}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <p>{project.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Project Details */}
            <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg mb-8">
              <h2 className="text-xl font-bold p-4 border-b-4 border-black bg-[#ffdd59]">项目详情</h2>
              <div className="p-4">
                <dl className="space-y-4">
                  {project.client && (
                    <div>
                      <dt className="text-sm font-bold">客户</dt>
                      <dd>{project.client}</dd>
                    </div>
                  )}
                  {project.date && (
                    <div>
                      <dt className="text-sm font-bold">日期</dt>
                      <dd>{project.date}</dd>
                    </div>
                  )}
                  {project.software && project.software.length > 0 && (
                    <div>
                      <dt className="text-sm font-bold">使用的软件</dt>
                      <dd>
                        <ul className="list-disc list-inside">
                          {project.software.map((sw) => (
                            <li key={sw}>{sw}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                  {project.polygons && (
                    <div>
                      <dt className="text-sm font-bold">多边形数量</dt>
                      <dd>{project.polygons}</dd>
                    </div>
                  )}
                  {project.formats && project.formats.length > 0 && (
                    <div>
                      <dt className="text-sm font-bold">可用格式</dt>
                      <dd>{project.formats.join(", ")}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

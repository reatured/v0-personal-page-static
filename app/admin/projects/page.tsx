"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash, Eye, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"

// 项目类型定义
interface Project {
  id: string
  title: string
  subtitle: string
  slug: string
  description: string
  category: string
  tags: string[]
  thumbnail_url: string | null
  featured: boolean
  client: string | null
  date: string | null
  created_at: string
}

/**
 * 项目管理页面
 * 显示所有项目并提供管理功能
 */
export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const [categories, setCategories] = useState<string[]>([])
  const [deleteInProgress, setDeleteInProgress] = useState<string | null>(null)

  // 定义提示文本变量
  const noProjectsText = '还没有项目。点击"新建项目"按钮创建您的第一个项目。'
  const noMatchText = "没有找到匹配的项目。尝试调整搜索条件。"

  // 加载项目数据
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true)
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching projects:", error)
      } else {
        setProjects(data || [])

        // 提取所有类别
        const uniqueCategories = [...new Set(data?.map((project) => project.category) || [])]
        setCategories(uniqueCategories)
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  // 删除项目
  const deleteProject = async (id: string) => {
    if (!confirm("确定要删除这个项目吗？此操作不可撤销。")) return

    setDeleteInProgress(id)

    try {
      // 删除项目图片
      const { data: images } = await supabase.from("project_images").select("image_url").eq("project_id", id)

      if (images && images.length > 0) {
        // 从数据库中删除图片记录
        await supabase.from("project_images").delete().eq("project_id", id)

        // 从存储中删除图片文件
        for (const image of images) {
          const filePath = image.image_url.split("/").slice(-2).join("/")
          if (filePath) {
            await supabase.storage.from("project-images").remove([filePath])
          }
        }
      }

      // 删除视频链接
      await supabase.from("project_videos").delete().eq("project_id", id)

      // 删除项目
      const { error } = await supabase.from("projects").delete().eq("id", id)

      if (error) {
        throw error
      }

      // 更新项目列表
      setProjects(projects.filter((project) => project.id !== id))
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("删除失败，请重试")
    } finally {
      setDeleteInProgress(null)
    }
  }

  // 过滤项目
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter ? project.category === categoryFilter : true

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <main className="flex-1 ml-[240px] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-gray-100">
              <div className="w-8 h-8 border-4 border-t-[#4cd137] border-gray-200 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600">加载项目中...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 ml-[240px] py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black">管理项目</h1>
          <Button className="bg-[#4cd137] text-white hover:bg-[#4cd137]/90 border-2 border-black font-bold" asChild>
            <Link href="/admin/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              新建项目
            </Link>
          </Button>
        </div>

        {/* 搜索和过滤 */}
        <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg mb-6">
          <div className="p-4 border-b-4 border-black bg-[#ffdd59]">
            <h2 className="text-xl font-bold">搜索和过滤</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="搜索项目..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-black"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-10 border-2 border-black rounded-md p-2 h-10"
                >
                  <option value="">所有类别</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 项目列表 */}
        <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg">
          <div className="p-4 border-b-4 border-black bg-[#ffdd59]">
            <h2 className="text-xl font-bold">所有项目 ({filteredProjects.length})</h2>
          </div>
          <div className="p-0">
            {filteredProjects.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {projects.length === 0 ? noProjectsText : noMatchText}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 text-left">标题</th>
                      <th className="p-4 text-left">类别</th>
                      <th className="p-4 text-left">日期</th>
                      <th className="p-4 text-left">特色</th>
                      <th className="p-4 text-left">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{project.title}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{project.category}</span>
                        </td>
                        <td className="p-4">{project.date || "-"}</td>
                        <td className="p-4">
                          {project.featured ? (
                            <span className="px-2 py-1 bg-[#ffdd59] rounded-full text-sm font-bold">是</span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">否</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="border-2 border-black" asChild>
                              <Link href={`/projects/${project.slug}`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="border-2 border-black" asChild>
                              <Link href={`/admin/projects/edit/${project.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-2 border-black text-red-500"
                              onClick={() => deleteProject(project.id)}
                              disabled={deleteInProgress === project.id}
                            >
                              {deleteInProgress === project.id ? (
                                <div className="w-4 h-4 border-2 border-t-red-500 border-red-200 rounded-full animate-spin"></div>
                              ) : (
                                <Trash className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

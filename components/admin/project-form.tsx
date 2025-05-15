"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ImageUploader } from "@/components/admin/image-uploader"
import { VideoLinksManager, type VideoLink } from "@/components/admin/video-links-manager"
import { MarkdownEditor } from "@/components/admin/markdown-editor"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

// 项目表单数据类型
interface ProjectFormData {
  title: string
  subtitle: string
  slug: string
  description: string
  category: string
  tags: string
  featured: boolean
  client: string
  date: string
  software: string
  polygons: string
  formats: string
  content: string
}

// 项目数据类型
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
  software: string[]
  polygons: string | null
  formats: string[]
  content: string | null
  images?: {
    id: string
    image_url: string
    display_order: number
  }[]
  videos?: {
    id: string
    video_url: string
    video_type: "youtube" | "drive"
    thumbnail_url: string | null
    display_order: number
  }[]
}

interface ProjectFormProps {
  project?: Project
  isEdit?: boolean
}

/**
 * 项目表单组件
 * 用于创建和编辑项目
 */
export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // 表单数据状态
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    subtitle: "",
    slug: "",
    description: "",
    category: "visualization",
    tags: "",
    featured: false,
    client: "",
    date: "",
    software: "",
    polygons: "",
    formats: "",
    content: "",
  })

  // 媒体文件状态
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [videoLinks, setVideoLinks] = useState<VideoLink[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([])

  // 如果是编辑模式，加载项目数据
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        subtitle: project.subtitle,
        slug: project.slug,
        description: project.description,
        category: project.category,
        tags: project.tags.join(", "),
        featured: project.featured,
        client: project.client || "",
        date: project.date || "",
        software: project.software.join(", "),
        polygons: project.polygons || "",
        formats: project.formats.join(", "),
        content: project.content || "",
      })

      // 加载现有图片
      if (project.images && project.images.length > 0) {
        const sortedImages = [...project.images].sort((a, b) => a.display_order - b.display_order)
        setExistingImages(sortedImages.map((img) => img.image_url))
      }

      // 加载视频链接
      if (project.videos && project.videos.length > 0) {
        const sortedVideos = [...project.videos].sort((a, b) => a.display_order - b.display_order)
        setVideoLinks(
          sortedVideos.map((video) => ({
            id: video.id,
            url: video.video_url,
            type: video.video_type,
            thumbnail_url: video.thumbnail_url,
          })),
        )
      }
    }
  }, [project])

  // 处理表单字段变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 处理复选框变化
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // 处理内容变化
  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }))
  }

  // 处理缩略图变化
  const handleThumbnailChange = (files: File[]) => {
    if (files.length > 0) {
      setThumbnailFile(files[0])
    }
  }

  // 处理项目图片变化
  const handleImagesChange = (files: File[]) => {
    setImageFiles((prev) => [...prev, ...files])
  }

  // 处理视频链接变化
  const handleVideoLinksChange = (links: VideoLink[]) => {
    setVideoLinks(links)
  }

  // 处理移除现有图片
  const handleRemoveExistingImage = (index: number) => {
    const imageUrl = existingImages[index]
    setImagesToRemove((prev) => [...prev, imageUrl])
    setExistingImages((prev) => prev.filter((_, i) => i !== index))
  }

  // 生成slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // 移除特殊字符
      .replace(/\s+/g, "-") // 空格替换为连字符
      .replace(/-+/g, "-") // 多个连字符替换为单个
  }

  // 自动生成slug
  const handleAutoGenerateSlug = () => {
    if (formData.title) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title) }))
    }
  }

  // 表单提交处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveError(null)

    try {
      // 准备项目数据
      const slug = formData.slug || generateSlug(formData.title)
      const projectData = {
        title: formData.title,
        subtitle: formData.subtitle,
        slug,
        description: formData.description,
        category: formData.category,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        featured: formData.featured,
        client: formData.client || null,
        date: formData.date || null,
        software: formData.software
          ? formData.software
              .split(",")
              .map((sw) => sw.trim())
              .filter(Boolean)
          : [],
        polygons: formData.polygons || null,
        formats: formData.formats
          ? formData.formats
              .split(",")
              .map((fmt) => fmt.trim())
              .filter(Boolean)
          : [],
        content: formData.content || null,
      }

      // 保存项目基本信息
      let projectId: string

      if (isEdit && project) {
        // 更新现有项目
        const { data, error } = await supabase.from("projects").update(projectData).eq("id", project.id).select()

        if (error) throw error
        projectId = project.id
      } else {
        // 创建新项目
        const { data, error } = await supabase.from("projects").insert([projectData]).select()

        if (error) throw error
        projectId = data[0].id
      }

      // 上传缩略图
      if (thumbnailFile) {
        const fileExt = thumbnailFile.name.split(".").pop()
        const filePath = `thumbnails/${projectId}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from("project-images").upload(filePath, thumbnailFile)

        if (uploadError) throw uploadError

        // 获取公共URL
        const { data: urlData } = supabase.storage.from("project-images").getPublicUrl(filePath)

        // 更新项目缩略图URL
        await supabase.from("projects").update({ thumbnail_url: urlData.publicUrl }).eq("id", projectId)
      }

      // 处理要移除的图片
      if (isEdit && imagesToRemove.length > 0) {
        for (const imageUrl of imagesToRemove) {
          // 从数据库中删除图片记录
          await supabase.from("project_images").delete().eq("image_url", imageUrl)

          // 从存储中删除图片文件
          // 注意：这需要从URL中提取文件路径，可能需要根据您的URL结构调整
          const filePath = imageUrl.split("/").slice(-2).join("/")
          if (filePath) {
            await supabase.storage.from("project-images").remove([filePath])
          }
        }
      }

      // 上传新项目图片
      if (imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i]
          const fileExt = file.name.split(".").pop()
          const filePath = `images/${projectId}/${Date.now()}_${i}.${fileExt}`

          const { error: uploadError } = await supabase.storage.from("project-images").upload(filePath, file)

          if (uploadError) throw uploadError

          // 获取公共URL
          const { data: urlData } = supabase.storage.from("project-images").getPublicUrl(filePath)

          // 添加图片记录
          await supabase.from("project_images").insert([
            {
              project_id: projectId,
              image_url: urlData.publicUrl,
              display_order: existingImages.length + i,
            },
          ])
        }
      }

      // 处理视频链接
      if (isEdit) {
        // 删除不在当前列表中的视频
        const currentVideoIds = videoLinks.filter((v) => v.id).map((v) => v.id)
        await supabase
          .from("project_videos")
          .delete()
          .eq("project_id", projectId)
          .not("id", "in", currentVideoIds.length > 0 ? `(${currentVideoIds.join(",")})` : "(0)")
      }

      // 添加或更新视频链接
      for (let i = 0; i < videoLinks.length; i++) {
        const { id, url, type } = videoLinks[i]
        if (!url) continue

        if (id) {
          // 更新现有视频
          await supabase
            .from("project_videos")
            .update({
              video_url: url,
              video_type: type,
              display_order: i,
            })
            .eq("id", id)
        } else {
          // 添加新视频
          await supabase.from("project_videos").insert([
            {
              project_id: projectId,
              video_url: url,
              video_type: type,
              display_order: i,
            },
          ])
        }
      }

      // 成功后重定向
      router.push("/admin/projects")
    } catch (error) {
      console.error("Error saving project:", error)
      setSaveError("保存项目时出错，请重试")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="media">媒体文件</TabsTrigger>
          <TabsTrigger value="content">项目内容</TabsTrigger>
          <TabsTrigger value="details">详细信息</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block font-bold mb-2">
                项目标题 *
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="border-2 border-black"
              />
            </div>

            <div>
              <label htmlFor="subtitle" className="block font-bold mb-2">
                副标题 *
              </label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                required
                className="border-2 border-black"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block font-bold mb-2">
                简短描述 *
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="border-2 border-black"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="category" className="block font-bold mb-2">
                类别 *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border-2 border-black rounded-md p-2"
              >
                <option value="visualization">可视化</option>
                <option value="character">角色</option>
                <option value="environment">环境</option>
                <option value="animation">动画</option>
                <option value="product">产品</option>
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="block font-bold mb-2">
                标签（用逗号分隔）
              </label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="border-2 border-black"
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block font-bold mb-2">
                URL Slug
              </label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="border-2 border-black"
                  placeholder="project-name"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAutoGenerateSlug}
                  className="border-2 border-black whitespace-nowrap"
                >
                  自动生成
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">留空将根据标题自动生成</p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="mr-2 h-5 w-5"
              />
              <label htmlFor="featured" className="font-bold">
                特色项目（在首页展示）
              </label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <ImageUploader
            label="缩略图"
            onChange={handleThumbnailChange}
            multiple={false}
            existingImages={project?.thumbnail_url ? [project.thumbnail_url] : []}
          />

          <ImageUploader
            label="项目图片"
            onChange={handleImagesChange}
            multiple={true}
            existingImages={existingImages}
            onRemoveExisting={handleRemoveExistingImage}
          />

          <VideoLinksManager videoLinks={videoLinks} onChange={handleVideoLinksChange} />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div>
            <label className="block font-bold mb-2">项目内容（Markdown格式）</label>
            <MarkdownEditor value={formData.content} onChange={handleContentChange} minHeight="500px" />
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="client" className="block font-bold mb-2">
                客户
              </label>
              <Input
                id="client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="border-2 border-black"
              />
            </div>

            <div>
              <label htmlFor="date" className="block font-bold mb-2">
                日期
              </label>
              <Input
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border-2 border-black"
                placeholder="2024年5月"
              />
            </div>

            <div>
              <label htmlFor="software" className="block font-bold mb-2">
                使用的软件（用逗号分隔）
              </label>
              <Input
                id="software"
                name="software"
                value={formData.software}
                onChange={handleChange}
                className="border-2 border-black"
                placeholder="Blender, Photoshop"
              />
            </div>

            <div>
              <label htmlFor="polygons" className="block font-bold mb-2">
                多边形数量
              </label>
              <Input
                id="polygons"
                name="polygons"
                value={formData.polygons}
                onChange={handleChange}
                className="border-2 border-black"
                placeholder="100,000"
              />
            </div>

            <div>
              <label htmlFor="formats" className="block font-bold mb-2">
                可用格式（用逗号分隔）
              </label>
              <Input
                id="formats"
                name="formats"
                value={formData.formats}
                onChange={handleChange}
                className="border-2 border-black"
                placeholder="FBX, OBJ, GLB"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {saveError && <div className="bg-red-100 border-2 border-red-400 text-red-700 p-3 rounded">{saveError}</div>}

      <div className="pt-6 border-t-2 border-gray-200 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
          className="border-2 border-black"
        >
          取消
        </Button>

        <Button
          type="submit"
          disabled={isSaving}
          className="bg-[#4cd137] text-white hover:bg-[#4cd137]/90 border-2 border-black font-bold"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : isEdit ? (
            "更新项目"
          ) : (
            "创建项目"
          )}
        </Button>
      </div>
    </form>
  )
}

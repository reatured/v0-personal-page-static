"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

interface VideoEmbedProps {
  url: string
  type: "youtube" | "drive"
  title?: string
}

/**
 * 视频嵌入组件
 * 用于在项目详情页面中嵌入YouTube或Google Drive视频
 */
export function VideoEmbed({ url, type, title = "项目视频" }: VideoEmbedProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 从YouTube URL中提取视频ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // 从Google Drive URL中提取文件ID
  const getDriveId = (url: string) => {
    const regExp = /[-\w]{25,}/
    const match = url.match(regExp)
    return match ? match[0] : null
  }

  // 处理iframe加载完成
  const handleIframeLoad = () => {
    setLoading(false)
  }

  // 处理iframe加载错误
  const handleIframeError = () => {
    setLoading(false)
    setError("视频加载失败，请检查链接是否正确")
  }

  if (type === "youtube") {
    const videoId = getYouTubeId(url)
    if (!videoId) return <div className="text-red-500">无效的YouTube链接</div>

    return (
      <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden border-2 border-black">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white bg-red-500 px-4 py-2 rounded">{error}</div>
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
      </div>
    )
  }

  if (type === "drive") {
    const fileId = getDriveId(url)
    if (!fileId) return <div className="text-red-500">无效的Google Drive链接</div>

    return (
      <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden border-2 border-black">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white bg-red-500 px-4 py-2 rounded">{error}</div>
          </div>
        )}
        <iframe
          src={`https://drive.google.com/file/d/${fileId}/preview`}
          title={title}
          allow="autoplay"
          className="w-full h-full"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
      </div>
    )
  }

  return <div className="text-red-500">不支持的视频类型</div>
}

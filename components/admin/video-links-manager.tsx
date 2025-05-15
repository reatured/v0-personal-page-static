"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash, Youtube, FileVideo } from "lucide-react"

export interface VideoLink {
  id?: string
  url: string
  type: "youtube" | "drive"
  thumbnail_url?: string | null
}

interface VideoLinksManagerProps {
  videoLinks: VideoLink[]
  onChange: (links: VideoLink[]) => void
}

/**
 * 视频链接管理组件
 * 用于管理项目中的YouTube和Google Drive视频链接
 */
export function VideoLinksManager({ videoLinks, onChange }: VideoLinksManagerProps) {
  // 添加新视频链接
  const addVideoLink = () => {
    onChange([...videoLinks, { url: "", type: "youtube" }])
  }

  // 更新视频链接
  const updateVideoLink = (index: number, field: keyof VideoLink, value: string) => {
    const newLinks = [...videoLinks]
    if (field === "type" && (value === "youtube" || value === "drive")) {
      newLinks[index].type = value
    } else if (field === "url") {
      newLinks[index].url = value
    }
    onChange(newLinks)
  }

  // 移除视频链接
  const removeVideoLink = (index: number) => {
    onChange(videoLinks.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block font-bold">视频链接</label>
        <Button
          type="button"
          onClick={addVideoLink}
          variant="outline"
          className="border-2 border-black flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加视频
        </Button>
      </div>

      {videoLinks.length === 0 && (
        <div className="text-center py-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <FileVideo className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">还没有添加视频链接</p>
          <p className="text-gray-400 text-sm">点击"添加视频"按钮来添加YouTube或Google Drive视频</p>
        </div>
      )}

      {videoLinks.map((link, index) => (
        <div key={index} className="grid grid-cols-12 gap-4 items-center p-4 border-2 border-gray-200 rounded-lg">
          <div className="col-span-1">
            {link.type === "youtube" ? (
              <Youtube className="h-6 w-6 text-red-600" />
            ) : (
              <FileVideo className="h-6 w-6 text-blue-600" />
            )}
          </div>
          <div className="col-span-3">
            <select
              value={link.type}
              onChange={(e) => updateVideoLink(index, "type", e.target.value)}
              className="w-full border-2 border-black rounded-md p-2"
            >
              <option value="youtube">YouTube</option>
              <option value="drive">Google Drive</option>
            </select>
          </div>
          <div className="col-span-7">
            <Input
              value={link.url}
              onChange={(e) => updateVideoLink(index, "url", e.target.value)}
              placeholder={`输入${link.type === "youtube" ? "YouTube" : "Google Drive"}链接`}
              className="border-2 border-black"
            />
          </div>
          <div className="col-span-1">
            <Button
              type="button"
              onClick={() => removeVideoLink(index)}
              variant="outline"
              className="border-2 border-black text-red-500 w-full"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

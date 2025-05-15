"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploaderProps {
  label: string
  onChange: (files: File[]) => void
  multiple?: boolean
  preview?: boolean
  existingImages?: string[]
  onRemoveExisting?: (index: number) => void
}

/**
 * 图片上传组件
 * 用于上传项目缩略图和图片，支持预览和多文件上传
 */
export function ImageUploader({
  label,
  onChange,
  multiple = false,
  preview = true,
  existingImages = [],
  onRemoveExisting,
}: ImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // 创建预览URL
    if (preview) {
      const newPreviews = files.map((file) => URL.createObjectURL(file))
      setPreviews((prev) => [...prev, ...newPreviews])
    }

    // 调用父组件的onChange
    onChange(files)
  }

  // 移除预览图片
  const removePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index))
    // 注意：这里应该同时通知父组件移除对应的文件
  }

  return (
    <div className="space-y-4">
      <label className="block font-bold mb-2">{label}</label>

      <div
        className="border-2 border-dashed border-black rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">点击或拖放文件到此处上传</p>
        <p className="text-xs text-gray-500">支持 JPG, PNG, WebP 格式</p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={multiple}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* 显示已上传的图片预览 */}
      {preview && (previews.length > 0 || existingImages.length > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {/* 显示现有图片 */}
          {existingImages.map((src, index) => (
            <div key={`existing-${index}`} className="relative group">
              <div className="relative aspect-square rounded-md overflow-hidden border-2 border-black">
                <Image src={src || "/placeholder.svg"} alt={`现有图片 ${index + 1}`} fill className="object-cover" />
              </div>
              {onRemoveExisting && (
                <button
                  type="button"
                  onClick={() => onRemoveExisting(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
                现有图片
              </div>
            </div>
          ))}

          {/* 显示新上传的图片预览 */}
          {previews.map((src, index) => (
            <div key={`preview-${index}`} className="relative group">
              <div className="relative aspect-square rounded-md overflow-hidden border-2 border-black">
                <Image src={src || "/placeholder.svg"} alt={`预览 ${index + 1}`} fill className="object-cover" />
              </div>
              <button
                type="button"
                onClick={() => removePreview(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
                新上传
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

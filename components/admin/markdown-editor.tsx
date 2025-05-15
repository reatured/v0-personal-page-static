"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from "react-markdown"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  minHeight?: string
}

/**
 * Markdown编辑器组件
 * 提供编辑和预览Markdown内容的功能
 */
export function MarkdownEditor({ value, onChange, minHeight = "400px" }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("edit")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-2">
        <TabsTrigger value="edit">编辑</TabsTrigger>
        <TabsTrigger value="preview">预览</TabsTrigger>
      </TabsList>

      <TabsContent value="edit" className="mt-0">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-2 border-black font-mono"
          style={{ minHeight }}
          placeholder="## 项目概述

这里是项目的详细描述...

## 过程

创作过程包括..."
        />
      </TabsContent>

      <TabsContent value="preview" className="mt-0">
        <div
          className="border-2 border-black rounded-md p-4 prose max-w-none overflow-auto bg-white"
          style={{ minHeight }}
        >
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <div className="text-gray-400 italic">预览将显示在这里...</div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

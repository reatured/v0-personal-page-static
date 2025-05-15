import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase, ImageIcon, FileVideo, Settings } from "lucide-react"

/**
 * 管理仪表盘页面
 */
export default function AdminDashboardPage() {
  return (
    <main className="flex-1 ml-[240px] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-black mb-8">管理仪表盘</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border-4 border-black rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#ffdd59] rounded-full flex items-center justify-center mr-4 border-2 border-black">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">项目</h2>
                <p className="text-gray-600">管理您的作品集项目</p>
              </div>
            </div>
            <Button
              className="w-full bg-[#4cd137] text-white hover:bg-[#4cd137]/90 border-2 border-black font-bold"
              asChild
            >
              <Link href="/admin/projects">查看项目</Link>
            </Button>
          </div>

          <div className="bg-white border-4 border-black rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#ffdd59] rounded-full flex items-center justify-center mr-4 border-2 border-black">
                <ImageIcon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">媒体库</h2>
                <p className="text-gray-600">管理图片和文件</p>
              </div>
            </div>
            <Button
              className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 border-2 border-black font-bold"
              disabled
            >
              即将推出
            </Button>
          </div>

          <div className="bg-white border-4 border-black rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#ffdd59] rounded-full flex items-center justify-center mr-4 border-2 border-black">
                <FileVideo className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">视频</h2>
                <p className="text-gray-600">管理视频链接</p>
              </div>
            </div>
            <Button
              className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 border-2 border-black font-bold"
              disabled
            >
              即将推出
            </Button>
          </div>

          <div className="bg-white border-4 border-black rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#ffdd59] rounded-full flex items-center justify-center mr-4 border-2 border-black">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">设置</h2>
                <p className="text-gray-600">网站设置和配置</p>
              </div>
            </div>
            <Button
              className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 border-2 border-black font-bold"
              disabled
            >
              即将推出
            </Button>
          </div>
        </div>

        <div className="bg-white border-4 border-black rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">快速入门指南</h2>
          <div className="prose max-w-none">
            <p>欢迎使用作品集管理系统！以下是一些帮助您入门的提示：</p>

            <h3>1. 管理项目</h3>
            <p>
              在
              <Link href="/admin/projects" className="text-blue-600 hover:underline">
                项目管理
              </Link>
              页面，您可以查看、添加、编辑和删除项目。 每个项目可以包含多张图片、视频链接和详细的Markdown格式内容。
            </p>

            <h3>2. 添加媒体文件</h3>
            <p>
              创建或编辑项目时，您可以上传图片作为项目缩略图和项目图库。 对于视频，您可以添加YouTube或Google
              Drive链接，系统会自动嵌入这些视频。
            </p>

            <h3>3. 使用Markdown编辑内容</h3>
            <p>
              项目内容支持Markdown格式，您可以使用标题、列表、链接等格式化您的内容。
              编辑器提供实时预览功能，帮助您查看最终效果。
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

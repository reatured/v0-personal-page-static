/**
 * 首页英雄区组件
 * 以宜家说明书风格展示个人作品集的介绍信息
 */
import Image from "next/image"

export function HeroSection() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="border border-black p-6">
        <Image
          src="/placeholder.svg?key=vme1o"
          alt="Developer illustration"
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 border border-black rounded-full flex items-center justify-center">
            <span>i</span>
          </div>
          <p className="font-mono">Required: 1 browser, 1 human</p>
        </div>
        <div className="flex gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="w-8 h-8 border border-black flex items-center justify-center">
              {num}
            </div>
          ))}
        </div>
        <p className="font-mono text-sm mb-4">Estimated time: 5 minutes</p>
        <p className="font-mono">
          This portfolio showcases skills, projects, and experience in a simple, easy-to-assemble format. Follow the
          instructions carefully.
        </p>
      </div>
    </div>
  )
}

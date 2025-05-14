/**
 * Hero Section Component
 * Main banner section for the homepage
 */
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-20 z-0"></div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
        <div className="max-w-5xl mx-auto relative">
          {/* Big title */}
          <div className="relative mb-12">
            <h1 className="text-[120px] font-black tracking-tighter leading-none text-center">
              <span className="inline-block transform -rotate-6 bg-[#4cd137] text-[#ffdd59] px-4 py-2 mx-1 rounded-lg shadow-lg">
                3D
              </span>
              <span className="inline-block transform rotate-3 bg-[#4cd137] text-[#ffdd59] px-4 py-2 mx-1 rounded-lg shadow-lg">
                ART
              </span>
            </h1>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 bg-[#ffdd59] rounded-full w-16 h-16 flex items-center justify-center transform rotate-12 shadow-lg">
              <span className="text-2xl">★</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-black shadow-lg">
              <span className="text-xl">!</span>
            </div>
          </div>

          {/* Main content area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left text */}
            <div className="relative">
              <div className="bg-white p-6 rounded-lg border-2 border-black shadow-lg transform rotate-1">
                <h2 className="text-2xl font-bold mb-4">3D Artist Portfolio</h2>
                <p className="mb-6 text-gray-700">
                  Welcome to my world of 3D creation! I specialize in creating high-quality 3D models, character
                  designs, and environmental art.
                </p>
                <div className="flex gap-4">
                  <Button
                    asChild
                    className="bg-[#ffdd59] text-black hover:bg-[#ffdd59]/90 border-2 border-black font-bold"
                  >
                    <Link href="/projects">
                      View Projects
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-black font-bold">
                    <Link href="#contact">Contact Me</Link>
                  </Button>
                </div>
              </div>

              {/* Decorative sticker */}
              <div className="absolute -bottom-10 -right-8 bg-[#ff6b6b] text-white px-3 py-1 rounded transform rotate-6 border-2 border-black shadow-lg">
                <span className="font-bold">LET'S GO!</span>
              </div>
            </div>

            {/* Right image */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-lg border-4 border-black shadow-xl">
                <Image src="/3d-hero-artwork.png" alt="3D artwork showcase" fill className="object-cover" priority />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 bg-white p-2 rounded-lg transform -rotate-12 border-2 border-black shadow-lg">
                <span className="text-sm font-bold">Amazing!</span>
              </div>
              <div className="absolute -bottom-4 right-12 bg-[#ffdd59] p-2 rounded-full transform rotate-12 border-2 border-black shadow-lg">
                <span className="text-xl">♥</span>
              </div>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="mt-12 bg-[#ffdd59] border-2 border-black p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-[#ff6b6b] rounded-full w-8 h-8 flex items-center justify-center border-2 border-black">
                  <span>!</span>
                </div>
                <span className="font-bold">START</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 bg-white rounded-md border-2 border-black"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

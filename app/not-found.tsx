/**
 * 404页面
 */
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto py-12 px-4 mt-10 md:mt-0 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="border-4 border-black p-8 max-w-md w-full text-center">
        <h1 className="text-6xl font-black mb-4">404</h1>
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center">
            <span className="text-3xl">!</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">ASSEMBLY ERROR</h2>
        <p className="font-mono mb-8">
          The page you are looking for could not be found. It may have been misplaced or is still in development.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border-2 border-black px-6 py-3 font-mono font-bold hover:bg-black hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN HOME</span>
        </Link>
      </div>
    </div>
  )
}

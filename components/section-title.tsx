/**
 * Section Title Component
 * Styled headings for page sections
 */
interface SectionTitleProps {
  title: string
  subtitle: string
  style?: "minimal" | "collage"
}

export function SectionTitle({ title, subtitle, style = "minimal" }: SectionTitleProps) {
  if (style === "collage") {
    return (
      <div className="relative">
        <h2 className="text-6xl md:text-7xl font-black tracking-tighter">
          <span className="inline-block bg-[#4cd137] text-[#ffdd59] px-4 py-2 rounded-lg shadow-lg transform -rotate-2 border-2 border-black">
            {title}
          </span>
        </h2>
        <div className="mt-4 ml-16 relative">
          <p className="text-lg bg-white px-4 py-2 inline-block rounded-lg border-2 border-black transform rotate-1 shadow-md">
            {subtitle}
          </p>
          <div className="absolute -top-6 -right-4 bg-[#ffdd59] rounded-full w-10 h-10 flex items-center justify-center border-2 border-black shadow-md">
            <span className="text-lg">★</span>
          </div>
        </div>
      </div>
    )
  }

  // Default minimal style
  return (
    <div>
      <h2 className="text-6xl md:text-7xl font-bold tracking-tighter">{title}</h2>
      <div className="h-1 w-16 bg-[#c9d765] my-4"></div>
      <p className="text-lg">{subtitle}</p>
    </div>
  )
}

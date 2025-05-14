/**
 * Footer Component
 * Site-wide footer with copyright and links
 */
export function Footer() {
  return (
    <footer className="py-8 bg-black text-white ml-0 md:ml-[240px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-xs tracking-widest">© {new Date().getFullYear()} 3D ARTIST PORTFOLIO</p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#ffdd59] mr-3"></div>
            <p className="text-xs tracking-widest">DESIGNED WITH PASSION</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

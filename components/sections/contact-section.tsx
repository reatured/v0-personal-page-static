/**
 * Contact Section Component
 * Contact form and information section for the homepage
 */
import { SectionTitle } from "@/components/section-title"
import { ContactForm } from "@/components/contact-form"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white border-t-4 border-black">
      <div className="container mx-auto px-4">
        <SectionTitle title="CONTACT" subtitle="Get In Touch" style="collage" />

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div>
            <div className="bg-[#f5f3e4] p-6 rounded-lg border-2 border-black transform -rotate-1 shadow-lg">
              <h3 className="text-3xl font-bold mb-6">LET'S COLLABORATE</h3>
              <div className="h-1 w-16 bg-[#ffdd59] mb-6"></div>
              <p className="mb-8 text-gray-700">
                Whether you need 3D models, character designs, environmental art, or animations, I can provide
                professional solutions for your project. Feel free to contact me to discuss your creative needs.
              </p>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#ffdd59] rounded-full flex items-center justify-center mr-3 border-2 border-black">
                    <span className="font-bold">@</span>
                  </div>
                  <a href="mailto:hello@example.com" className="hover:underline">
                    hello@example.com
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#ffdd59] rounded-full flex items-center justify-center mr-3 border-2 border-black">
                    <span className="font-bold">A</span>
                  </div>
                  <a
                    href="https://artstation.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    artstation.com/yourusername
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#ffdd59] rounded-full flex items-center justify-center mr-3 border-2 border-black">
                    <span className="font-bold">in</span>
                  </div>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    linkedin.com/in/yourusername
                  </a>
                </div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

/**
 * 联系方式组件
 * 以宜家说明书风格展示联系方式和表单
 */
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"

export function ContactSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="border border-black p-6">
        <h3 className="text-2xl font-bold mb-6">Contact Methods</h3>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="ikea-circle">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono">Email</p>
              <p className="font-mono text-sm">hello@example.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="ikea-circle">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono">Phone</p>
              <p className="font-mono text-sm">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="ikea-circle">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono">Location</p>
              <p className="font-mono text-sm">San Francisco, CA</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="font-mono mb-4">Social Profiles:</p>
          <div className="flex gap-4">
            <a href="#" className="ikea-circle hover:bg-black hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="ikea-circle hover:bg-black hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="ikea-circle hover:bg-black hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border border-black p-6">
        <h3 className="text-2xl font-bold mb-6">Send Message</h3>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-mono mb-2">
              Name
            </label>
            <input type="text" id="name" className="w-full border border-black p-2 font-mono" placeholder="Your name" />
          </div>

          <div>
            <label htmlFor="email" className="block font-mono mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-black p-2 font-mono"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-mono mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full border border-black p-2 font-mono"
              placeholder="Your message here..."
            ></textarea>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border border-black flex items-center justify-center">
              <span>!</span>
            </div>
            <p className="font-mono text-xs">All fields are required for assembly</p>
          </div>

          <button
            type="submit"
            className="w-full border-2 border-black p-3 font-mono font-bold hover:bg-black hover:text-white transition-colors"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  )
}

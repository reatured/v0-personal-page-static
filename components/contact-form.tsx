/**
 * Contact Form Component
 * Form for sending messages to the site owner
 */
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  // State management for form fields and submission status
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  /**
   * Handle form submission
   * In a real application, this would connect to a backend API or email service
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
      // This is a simulated delay, in a real app this would be replaced with an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form after successful submission
      setName("")
      setEmail("")
      setMessage("")

      // Show success message
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon.",
      })
    } catch (error) {
      // Show error message
      toast({
        title: "Sending Failed",
        description: "Sorry, there was a problem sending your message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg border-4 border-black shadow-lg transform rotate-1"
    >
      <h3 className="text-2xl font-black mb-6 tracking-tight">Send Message</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-bold">
            Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-[#f5f3e4] border-2 border-black rounded-md h-12"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-bold">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#f5f3e4] border-2 border-black rounded-md h-12"
            placeholder="Your email address"
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 font-bold">
            Message
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="bg-[#f5f3e4] border-2 border-black rounded-md min-h-[120px]"
            placeholder="Enter your message"
          />
        </div>
      </div>

      <div className="mt-6 relative">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#ffdd59] text-black hover:bg-[#ffdd59]/90 border-2 border-black font-bold h-12"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        {/* Decorative element */}
        <div className="absolute -top-4 -right-4 bg-[#ff6b6b] text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-12 border-2 border-black">
          GO!
        </div>
      </div>
    </form>
  )
}

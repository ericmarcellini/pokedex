import type { Metadata } from "next"
import Introduction from "@/components/introduction"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"

export const metadata: Metadata = {
  title: "Eric Marcellini - Web Developer Portfolio",
  description: "Showcase of web development projects and skills",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16 space-y-24">
        <Introduction />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
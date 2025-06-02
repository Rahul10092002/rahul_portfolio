"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Asterisk, Cpu, Code, Server, Languages, PenToolIcon as Tool } from "lucide-react"

interface SkillsProps {
  data: {
    frontend: string[]
    backend: string[]
    languages: string[]
    tools: string[]
    concepts?: string[]
    aiml?: string[]
    aitools?: string[]
  }
}

export default function SkillsSection({ data }: SkillsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })


  const skillCategories = [
    {
      title: "Frontend Technologies",
      icon: Code,
      skills: data.frontend,
    },
    {
      title: "Backend Technologies",
      icon: Server,
      skills: data.backend,
    },
    {
      title: "Programming Languages",
      icon: Languages,
      skills: data.languages,
    },
    {
      title: "Tools & Platforms",
      icon: Tool,
      skills: data.tools,
    },
  ]

  // Add concepts if they exist
  if (data.concepts && data.concepts.length > 0) {
    skillCategories.push({
      title: "Concepts & Methodologies",
      icon: Asterisk,
      skills: data.concepts,
    })
  }

  return (
    <section id="skills" className="py-20 bg-gray-50" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-5xl"
      >
        <h2 className="text-4xl font-bold mb-2 text-blue-900">Technical Skills</h2>

        {/* Blue underline */}
        <div className="w-12 h-1 bg-blue-500 mb-6"></div>

        <p className="text-gray-700 text-lg mb-12">
          Proficient in a diverse range of technical domains and cutting-edge tools.
        </p>

      

        {/* Other Skills Sections */}
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 + categoryIndex * 0.2, duration: 0.6 }}
            className="mb-12 last:mb-0 bg-white p-8 rounded-lg shadow-sm"
          >
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-blue-500 mb-6">
              <category.icon className="h-6 w-6" />
              {category.title}
            </h3>

            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="bg-gray-100 text-gray-800 px-5 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

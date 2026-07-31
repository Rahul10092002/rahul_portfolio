"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Asterisk,
  Code,
  Server,
  Languages,
  Wrench,
  Sparkles,
  Brain,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface SkillsProps {
  data: {
    frontend: string[];
    backend: string[];
    languages: string[];
    tools: string[];
    concepts?: string[];
    ai_genai?: string[];
    ai_ml_concepts?: string[];
    aiml?: string[];
    aitools?: string[];
  };
}

export default function SkillsSection({ data }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<string>("all");

  const skillCategories = [
    ...(data.ai_genai && data.ai_genai.length > 0
      ? [
          {
            id: "ai_genai",
            title: "AI & Generative AI",
            icon: Sparkles,
            skills: data.ai_genai,
            featured: true,
            badgeStyle:
              "bg-violet-50/80 text-violet-700 border-violet-200/80 hover:bg-violet-600 hover:text-white",
            cardBg:
              "bg-gradient-to-br from-violet-50/40 via-purple-50/20 to-white border-violet-200/80 shadow-xs",
            accentColor: "text-violet-600",
          },
        ]
      : []),
    ...(data.ai_ml_concepts && data.ai_ml_concepts.length > 0
      ? [
          {
            id: "ai_ml",
            title: "AI & ML Concepts",
            icon: Brain,
            skills: data.ai_ml_concepts,
            featured: false,
            badgeStyle:
              "bg-indigo-50/80 text-indigo-700 border-indigo-200/80 hover:bg-indigo-600 hover:text-white",
            cardBg: "bg-white border-gray-100 shadow-2xs",
            accentColor: "text-indigo-600",
          },
        ]
      : []),
    {
      id: "frontend",
      title: "Frontend Development",
      icon: Code,
      skills: data.frontend,
      featured: false,
      badgeStyle:
        "bg-blue-50/80 text-blue-700 border-blue-200/80 hover:bg-blue-600 hover:text-white",
      cardBg: "bg-white border-gray-100 shadow-2xs",
      accentColor: "text-blue-600",
    },
    {
      id: "backend",
      title: "Backend & Databases",
      icon: Server,
      skills: data.backend,
      featured: false,
      badgeStyle:
        "bg-emerald-50/80 text-emerald-700 border-emerald-200/80 hover:bg-emerald-600 hover:text-white",
      cardBg: "bg-white border-gray-100 shadow-2xs",
      accentColor: "text-emerald-600",
    },
    {
      id: "languages",
      title: "Programming Languages",
      icon: Languages,
      skills: data.languages,
      featured: false,
      badgeStyle:
        "bg-amber-50/80 text-amber-700 border-amber-200/80 hover:bg-amber-600 hover:text-white",
      cardBg: "bg-white border-gray-100 shadow-2xs",
      accentColor: "text-amber-600",
    },
    {
      id: "tools",
      title: "Tools & DevOps",
      icon: Wrench,
      skills: data.tools,
      featured: false,
      badgeStyle:
        "bg-sky-50/80 text-sky-700 border-sky-200/80 hover:bg-sky-600 hover:text-white",
      cardBg: "bg-white border-gray-100 shadow-2xs",
      accentColor: "text-sky-600",
    },
    ...(data.concepts && data.concepts.length > 0
      ? [
          {
            id: "concepts",
            title: "Architecture & Systems",
            icon: Layers,
            skills: data.concepts,
            featured: false,
            badgeStyle:
              "bg-teal-50/80 text-teal-700 border-teal-200/80 hover:bg-teal-600 hover:text-white",
            cardBg: "bg-white border-gray-100 shadow-2xs",
            accentColor: "text-teal-600",
          },
        ]
      : []),
  ];

  const filterTabs = [
    { id: "all", label: "All Skills" },
    { id: "ai_genai", label: "AI & GenAI" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "languages", label: "Languages & Tools" },
  ];

  const displayedCategories =
    activeTab === "all"
      ? skillCategories
      : activeTab === "languages"
      ? skillCategories.filter((c) => ["languages", "tools"].includes(c.id))
      : skillCategories.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="py-16 md:py-20 lg:py-24 bg-gray-50/70 relative" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-100/80 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Core Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Technical Skills & Ecosystem
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full mt-3.5" />
          </div>

          {/* Quick Filter Tabs */}
          <div
            role="tablist"
            aria-label="Skill categories filter"
            className="flex items-center gap-1 sm:gap-1.5 p-1.5 bg-slate-200/60 rounded-xl max-w-full overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                  activeTab === tab.id
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Bento Grid Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-md flex flex-col justify-between ${
                  category.featured
                    ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-violet-50/80 via-purple-50/30 to-white border-violet-200 shadow-xs"
                    : category.cardBg
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-gray-100">
                    <h3 className="flex items-center gap-2.5 text-base font-bold text-gray-900">
                      <div className={`p-1.5 rounded-lg bg-gray-100/80 ${category.accentColor}`}>
                        <category.icon className="h-4 w-4" />
                      </div>
                      <span>{category.title}</span>
                    </h3>
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {category.skills.length}
                    </span>
                  </div>

                  {/* High-Density Pill Badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all duration-200 cursor-default ${category.badgeStyle}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}

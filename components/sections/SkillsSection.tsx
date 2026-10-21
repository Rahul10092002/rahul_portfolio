"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
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
            subtitle: "Multi-agent loops, state graphs, hybrid retrieval & LLM orchestration",
            icon: Sparkles,
            skills: data.ai_genai,
            featured: true,
            badgeStyle:
              "bg-purple-500/10 text-purple-200 border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/20",
            rowGlow:
              "border-purple-500/30 bg-gradient-to-r from-purple-950/25 via-[#141414] to-[#121212] shadow-lg shadow-purple-950/20",
            accentColor: "text-purple-400",
            iconBg: "bg-purple-500/15 border-purple-500/30 text-purple-300",
            dotColor: "bg-purple-400",
          },
        ]
      : []),
    ...(data.ai_ml_concepts && data.ai_ml_concepts.length > 0
      ? [
          {
            id: "ai_ml",
            title: "AI & ML Architecture",
            subtitle: "Semantic vectors, evaluation loops & retrieval augmentation",
            icon: Brain,
            skills: data.ai_ml_concepts,
            featured: false,
            badgeStyle:
              "bg-indigo-500/10 text-indigo-200 border-indigo-500/25 hover:border-indigo-400 hover:bg-indigo-500/20",
            rowGlow:
              "border-white/10 hover:border-indigo-500/30 bg-[#141414] hover:bg-[#161616]",
            accentColor: "text-indigo-400",
            iconBg: "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",
            dotColor: "bg-indigo-400",
          },
        ]
      : []),
    {
      id: "frontend",
      title: "Frontend Engineering",
      subtitle: "App Router SSR/SSG, fluid reactive interfaces & accessible design systems",
      icon: Code,
      skills: data.frontend,
      featured: false,
      badgeStyle:
        "bg-blue-500/10 text-blue-200 border-blue-500/25 hover:border-blue-400 hover:bg-blue-500/20",
      rowGlow:
        "border-white/10 hover:border-blue-500/30 bg-[#141414] hover:bg-[#161616]",
      accentColor: "text-blue-400",
      iconBg: "bg-blue-500/15 border-blue-500/30 text-blue-300",
      dotColor: "bg-blue-400",
    },
    {
      id: "backend",
      title: "Backend & Distributed Systems",
      subtitle: "Asynchronous APIs, microservices, connection pooling & schema modeling",
      icon: Server,
      skills: data.backend,
      featured: false,
      badgeStyle:
        "bg-emerald-500/10 text-emerald-200 border-emerald-500/25 hover:border-emerald-400 hover:bg-emerald-500/20",
      rowGlow:
        "border-white/10 hover:border-emerald-500/30 bg-[#141414] hover:bg-[#161616]",
      accentColor: "text-emerald-400",
      iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
      dotColor: "bg-emerald-400",
    },
    {
      id: "languages",
      title: "Programming Languages",
      subtitle: "Type-safe architectures, systems performance & algorithmic foundations",
      icon: Languages,
      skills: data.languages,
      featured: false,
      badgeStyle:
        "bg-amber-500/10 text-amber-200 border-amber-500/25 hover:border-amber-400 hover:bg-amber-500/20",
      rowGlow:
        "border-white/10 hover:border-amber-500/30 bg-[#141414] hover:bg-[#161616]",
      accentColor: "text-amber-400",
      iconBg: "bg-amber-500/15 border-amber-500/30 text-amber-300",
      dotColor: "bg-amber-400",
    },
    {
      id: "tools",
      title: "Tools, Cloud & DevOps",
      subtitle: "Containerization, automated CI/CD, cloud deployments & developer tooling",
      icon: Wrench,
      skills: data.tools,
      featured: false,
      badgeStyle:
        "bg-cyan-500/10 text-cyan-200 border-cyan-500/25 hover:border-cyan-400 hover:bg-cyan-500/20",
      rowGlow:
        "border-white/10 hover:border-cyan-500/30 bg-[#141414] hover:bg-[#161616]",
      accentColor: "text-cyan-400",
      iconBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
      dotColor: "bg-cyan-400",
    },
    ...(data.concepts && data.concepts.length > 0
      ? [
          {
            id: "concepts",
            title: "System Design & Methodology",
            subtitle: "Scalability patterns, Clean Code, domain modeling & agile delivery",
            icon: Layers,
            skills: data.concepts,
            featured: false,
            badgeStyle:
              "bg-teal-500/10 text-teal-200 border-teal-500/25 hover:border-teal-400 hover:bg-teal-500/20",
            rowGlow:
              "border-white/10 hover:border-teal-500/30 bg-[#141414] hover:bg-[#161616]",
            accentColor: "text-teal-400",
            iconBg: "bg-teal-500/15 border-teal-500/30 text-teal-300",
            dotColor: "bg-teal-400",
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
    <section
      id="skills"
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
      ref={ref}
    >
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Core Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Technical Skills & Ecosystem
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3.5" />
          </div>

          {/* Quick Filter Tabs with Gliding Active Pill */}
          <div
            role="tablist"
            aria-label="Skill categories filter"
            className="flex items-center gap-1 p-1.5 bg-[#141414] border border-white/10 rounded-xl max-w-full overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none cursor-pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 bg-blue-600 rounded-lg shadow-md shadow-blue-600/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Option A: Linear/Stripe Horizontal Capability Rows */}
        <motion.div
          layout
          transition={{
            layout: { type: "spring", stiffness: 320, damping: 32 },
          }}
          className="flex flex-col gap-4"
        >
          <AnimatePresence initial={false}>
            {displayedCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  transition: { duration: 0.15 },
                }}
                transition={{
                  layout: { type: "spring", stiffness: 340, damping: 30 },
                  opacity: { duration: 0.22 },
                  y: { duration: 0.22 },
                }}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${category.rowGlow}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8">
                  {/* Left Column: Category Identification */}
                  <div className="lg:w-1/3 shrink-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div
                        className={`p-2 rounded-xl border shrink-0 ${category.iconBg}`}
                      >
                        <category.icon className="h-4 w-4" />
                      </div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {category.title}
                        </h3>
                        {category.featured && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            Primary
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-11">
                      {category.subtitle}
                    </p>
                  </div>

                  {/* Right Column: High-Density Interactive Pill Badges */}
                  <div className="flex-1 flex flex-wrap items-center gap-2 lg:pl-4 lg:border-l lg:border-white/10">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.04, y: -1 }}
                        transition={{ duration: 0.15 }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 cursor-default select-none ${category.badgeStyle}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${category.dotColor}`}
                        />
                        <span>{skill}</span>
                      </motion.div>
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

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";
import {
  ArrowDown,
  Sparkles,
  Copy,
  Check,
  FileText,
  Briefcase,
  Bot,
  Users,
  Code2,
  Rocket
} from "lucide-react";

interface MetricItem {
  label: string;
  value: string;
  icon: string;
}

interface HomeProps {
  data: {
    name: string;
    title: string;
    statusBadge?: string;
    heroDescription?: string;
    nicheTags?: string[];
    metrics?: MetricItem[];
    about: {
      image: string;
    };
    resume: {
      link: string;
    };
    contact?: {
      email: string;
    };
  };
}

export default function HomeSection({ data }: HomeProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = data.contact?.email || "rahulpatidar2132@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const iconMap: Record<string, any> = {
    Users,
    Bot,
    Rocket,
    Briefcase,
  };

  const statusText =
    data.statusBadge || "Available for Full-Time AI & Full-Stack Engineering Roles";
  const tagsList = data.nicheTags || [
    "⚡ LangGraph Subgraphs",
    "🛠️ FastMCP Tools",
    "🔍 Hybrid RAG (ChromaDB + BM25)",
    "🚀 Production MERN SaaS",
  ];
  const metricsList = data.metrics || [
    { label: "Active SaaS Users", value: "2k+", icon: "Users" },
    { label: "Agentic Ai Apps", value: "3+", icon: "Bot" },
    { label: "Latency Reduced", value: "87.5%", icon: "Rocket" },
    { label: "Industry Experience", value: "1+ Yrs", icon: "Briefcase" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center py-8 md:py-16 relative"
    >
      <div className="grid md:grid-cols-12 gap-10 items-center">
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1 md:col-span-7"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{statusText}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-gray-900"
          >
            Hi, I'm <span className="text-blue-600 font-extrabold">{data.name}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2"
          >
            <span>{data.title}</span>
            <Sparkles className="h-5 w-5 text-amber-500 inline" />
          </motion.h2>

          {/* Domain Niche Pill Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {tagsList.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold font-mono ${
                  idx === 0
                    ? "bg-indigo-50 border border-indigo-200 text-indigo-700"
                    : idx === 1
                    ? "bg-violet-50 border border-violet-200 text-violet-700"
                    : idx === 2
                    ? "bg-amber-50 border border-amber-200 text-amber-700"
                    : "bg-blue-50 border border-blue-200 text-blue-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed max-w-xl"
          >
            {data.heroDescription ||
              "Building production-ready Agentic AI systems using LangGraph, RAG pipelines, and custom MCP servers alongside robust Full Stack Web Applications with the MERN/Next.js stack."}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center gap-2.5 mb-10"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <ScrollLink
                to="projects"
                smooth={true}
                duration={500}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold text-sm cursor-pointer hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
              >
                <Rocket className="h-4 w-4" />
                <span>Explore Projects</span>
              </ScrollLink>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => window.open(data.resume.link, "_blank")}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-800 px-5 py-3 rounded-xl font-semibold text-sm cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-xs"
              >
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Resume</span>
              </button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="https://www.linkedin.com/in/rahul-patidar-838144234"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 px-4 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-xs"
              >
                <span>LinkedIn</span>
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="https://github.com/Rahul10092002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 px-4 py-3 rounded-xl font-semibold text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors shadow-xs"
              >
                <span>GitHub</span>
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 border border-blue-100 bg-blue-50 text-blue-700 px-4 py-3 rounded-xl font-semibold text-sm cursor-pointer hover:bg-blue-100 transition-colors"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-blue-600" />
                    <span className="hidden sm:inline">Copy Email</span>
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-200/80"
          >
            {metricsList.map((metric, idx) => {
              const IconComp = iconMap[metric.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:border-blue-200 hover:shadow-xs transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight leading-none whitespace-nowrap">
                      {metric.value}
                    </span>
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0">
                      <IconComp className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 leading-snug">
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Profile Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 md:order-2 md:col-span-5 flex justify-center"
        >
          <div className="relative">
            {/* Background Decorative Rings */}
            <div className="absolute -top-6 -left-6 w-72 h-72 md:w-88 md:h-88 bg-blue-400/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 md:w-76 md:h-76 bg-violet-400/20 rounded-full blur-2xl"></div>

            {/* Profile Image */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-10">
              <Image
                src="/images/portfolio.png"
                alt={data.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-3 -right-3 bg-white text-gray-800 px-3.5 py-2 rounded-2xl shadow-xl z-20 border border-gray-100 flex items-center gap-2"
            >
              <Bot className="h-4 w-4 text-violet-600" />
              <span className="text-xs font-bold text-gray-900">LangGraph AI</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-3 -left-3 bg-white text-gray-800 px-3.5 py-2 rounded-2xl shadow-xl z-20 border border-gray-100 flex items-center gap-2"
            >
              <Code2 className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-bold text-gray-900">Full-Stack MERN</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </ScrollLink>
      </motion.div>
    </section>
  );
}


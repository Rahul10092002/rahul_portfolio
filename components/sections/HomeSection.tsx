"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Copy,
  Check,
  Briefcase,
  Bot,
  Users,
  Rocket,
  Github,
  Linkedin,
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
    heroHeadline?: string;
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
      github?: string;
      linkedin?: string;
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

  const statusText = data.statusBadge || "Available for projects & select full-time roles";
  const tagsList = data.nicheTags || [
    "LangGraph Multi-Agent Systems",
    "RAG & Hybrid Retrieval",
    "Full Stack SaaS (MERN/Next.js)",
    "FastAPI & Python Backend",
  ];
  const metricsList = data.metrics || [
    { label: "Agentic AI Apps Built", value: "3+", icon: "Bot" },
    { label: "Latency Optimized", value: "56s → 7s", icon: "Rocket" },
    { label: "Production SaaS Shipped", value: "2+", icon: "Briefcase" },
    { label: "Industry Experience", value: "1+ Yr", icon: "Users" },
  ];

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-64px)] md:min-h-screen flex flex-col justify-center py-16 md:py-20 lg:py-24 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)' }} />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1 md:col-span-7"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                color: '#6EE7B7',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>{statusText}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {data.heroHeadline || "I Build AI-Powered Products That Solve Real Business Problems."}
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6 text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {data.heroDescription ||
                "Full Stack & AI Engineer building RAG applications, AI agents, SaaS platforms, and business automations — from architecture to deployment."}
            </motion.p>

            {/* Niche Tags */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {tagsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--accent-blue-muted)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    color: '#93C5FD',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              {/* Primary CTA */}
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 shadow-lg"
                style={{
                  backgroundColor: 'var(--accent-blue)',
                  color: '#fff',
                  boxShadow: '0 4px 14px rgba(59,130,246,0.3)',
                }}
              >
                <Briefcase className="h-4 w-4" />
                <span>Hire Me for a Project</span>
              </ScrollLink>

              {/* Secondary CTA */}
              <ScrollLink
                to="projects"
                smooth={true}
                duration={500}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4" />
              </ScrollLink>

              {/* Social links */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href={data.contact?.github || "https://github.com/Rahul10092002"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="p-2.5 rounded-lg transition-colors duration-200"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={data.contact?.linkedin || "https://www.linkedin.com/in/rahul-patidar-838144234"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-2.5 rounded-lg transition-colors duration-200"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg transition-colors duration-200"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-default)',
                    color: copiedEmail ? '#6EE7B7' : 'var(--text-secondary)',
                  }}
                  aria-label="Copy email address"
                  title={copiedEmail ? "Copied!" : "Copy email"}
                >
                  {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>

            {/* Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6"
              style={{ borderTop: '1px solid var(--border-subtle)' }}
            >
              {metricsList.map((metric, idx) => {
                const IconComp = iconMap[metric.icon] || Bot;
                return (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-xl transition-all duration-200 flex flex-col justify-between"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-default)',
                    }}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-lg sm:text-xl font-bold tracking-tight leading-none whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                        {metric.value}
                      </span>
                      <div className="p-1.5 rounded-lg flex-shrink-0" style={{ backgroundColor: 'var(--accent-blue-muted)', color: 'var(--accent-blue)' }}>
                        <IconComp className="h-3.5 w-3.5" />
                      </div>
                    </div>
                    <p className="text-xs font-medium leading-snug" style={{ color: 'var(--text-tertiary)' }}>
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
              {/* Background glow */}
              <div className="absolute -inset-4 rounded-3xl opacity-40" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)' }} />

              {/* Profile Image */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden z-10" style={{ border: '2px solid var(--border-strong)' }}>
                <Image
                  src="/images/portfolio.png"
                  alt={`${data.name} — Full Stack & AI Engineer`}
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-2 sm:-right-4 px-3 py-1.5 rounded-xl z-20 flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-strong)',
                  boxShadow: 'var(--shadow-elevated)',
                }}
              >
                <Bot className="h-3.5 w-3.5 text-violet-400 flex-shrink-0" />
                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>LangGraph AI</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-3 -left-2 sm:-left-4 px-3 py-1.5 rounded-xl z-20 flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-strong)',
                  boxShadow: 'var(--shadow-elevated)',
                }}
              >
                <Rocket className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'var(--accent-blue)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Full-Stack MERN</span>
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
          <ScrollLink to="projects" smooth={true} duration={500} className="cursor-pointer" aria-label="Scroll to projects">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
}

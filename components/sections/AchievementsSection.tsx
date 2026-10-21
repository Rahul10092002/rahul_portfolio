"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Trophy, Users, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  issuer?: string;
  tag?: string;
  icon?: any;
}

interface AchievementsProps {
  data?: Achievement[];
}

const iconMap: Record<string, any> = {
  Trophy,
  ShieldCheck,
  Users,
  Award,
};

export default function AchievementsSection({ data }: AchievementsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultAchievements = [
    {
      title: "MCA Capstone Selection (DocuMind)",
      description:
        "DocuMind selected as final-year MCA capstone project — engineered a production-grade 6-agent LangGraph system with hybrid RAG (ChromaDB + BM25) for multilingual legal document parsing.",
      issuer: "Devi Ahilya Vishwavidyalaya (DAVV)",
      tag: "Academic Excellence",
      icon: "Trophy",
    },
    {
      title: "MERN Stack Full-Stack Certification",
      description:
        "Completed intensive hands-on certification from Coding Shuttle focusing on full-stack architecture, REST APIs, Redux Toolkit, and production MERN deployment.",
      issuer: "Coding Shuttle",
      tag: "Professional Certification",
      icon: "ShieldCheck",
    },
    {
      title: "Team Lead — E-Governance Digitization Internship",
      description:
        "Led a 4-member developer team building MERN modules to digitize public service workflows, optimizing API response times and database architecture.",
      issuer: "Public Services Portal",
      tag: "Leadership & Impact",
      icon: "Users",
    },
  ];

  const items = data && data.length > 0 ? data : defaultAchievements;

  return (
    <section
      id="achievements"
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
      ref={ref}
    >
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <div className="mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/20 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Milestones & Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Key Achievements & Impact
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-3.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const IconComponent =
              (typeof item.icon === "string" ? iconMap[item.icon] : item.icon) || Award;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="bg-[#141414] p-6 rounded-2xl shadow-xl border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    {item.tag && (
                      <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2.5 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {item.issuer && (
                  <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Verified by {item.issuer}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

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
      icon: Trophy,
    },
    {
      title: "MERN Stack Full-Stack Certification",
      description:
        "Completed intensive hands-on certification from Coding Shuttle focusing on full-stack architecture, REST APIs, Redux Toolkit, and production MERN deployment.",
      issuer: "Coding Shuttle",
      tag: "Professional Certification",
      icon: ShieldCheck,
    },
    {
      title: "Team Lead — E-Governance Digitization Internship",
      description:
        "Led a 4-member developer team building MERN modules to digitize public service workflows, optimizing API response times and database architecture.",
      issuer: "Public Services Portal",
      tag: "Leadership & Impact",
      icon: Users,
    },
  ];

  const items = data && data.length > 0 ? data : defaultAchievements;

  return (
    <section id="achievements" className="py-16 bg-blue-900/5 my-12 rounded-3xl p-8 border border-blue-100" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Milestones & Recognition
          </h3>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Key Achievements & Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const IconComponent = item.icon || Award;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {item.tag && (
                      <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-md">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h4>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {item.issuer && (
                  <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
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

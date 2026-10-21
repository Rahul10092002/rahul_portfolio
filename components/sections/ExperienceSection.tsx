"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Sparkles, Calendar } from "lucide-react";

interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
  location?: string;
}

interface ExperienceProps {
  data: Experience[];
}

export default function ExperienceSection({ data }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
      ref={ref}
    >
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <div className="mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3.5" />
        </div>

        {/* Experience Card */}
        <div className="bg-[#141414] p-6 sm:p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
          <h3 className="flex items-center gap-2.5 text-lg font-bold text-white mb-8 pb-4 border-b border-white/10">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
              <Briefcase className="h-4 w-4" />
            </div>
            <span>Professional Roles & Leadership</span>
          </h3>

          <div className="space-y-8">
            {data.map((item, index) => (
              <div key={index} className="relative flex gap-4 sm:gap-6 group">
                {/* Timeline Axis */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-[#141414] shadow-md shadow-blue-500/40 z-10 flex items-center justify-center mt-1 group-hover:scale-125 transition-transform duration-200">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  {index < data.length - 1 && (
                    <div className="w-0.5 bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent flex-1 my-1.5 rounded-full"></div>
                  )}
                </div>

                {/* Content Block */}
                <div className="pb-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
                      {item.position}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                      <Calendar className="w-3 h-3" />
                      {item.duration}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mt-1.5">
                    <span className="text-blue-400 font-bold text-sm">{item.company}</span>
                    {item.location && (
                      <>
                        <span className="text-slate-600">•</span>
                        <div className="flex items-center gap-1 text-slate-400">
                          <MapPin size={12} className="text-blue-400" />
                          <span>{item.location}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Briefcase, MapPin, Calendar, Sparkles } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  year: string;
  location?: string;
  description?: string;
}

interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
  location?: string;
}

interface ResumeProps {
  education: Education[];
  experience: Experience[];
}

export default function ResumeSection({ education, experience }: ResumeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"all" | "experience" | "education">("all");

  return (
    <section id="resume" className="py-14 sm:py-16 bg-gray-50/70 relative" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* Section Header with View Filter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2.5 border border-blue-100">
              <Sparkles className="h-3.5 w-3.5" /> Career Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Experience & Education
            </h2>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-gray-200/60 rounded-xl max-w-max">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Overview
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "experience"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Experience ({experience.length})
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "education"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Education ({education.length})
            </button>
          </div>
        </div>

        {/* Dynamic Compact Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Experience Column */}
          {(activeTab === "all" || activeTab === "experience") && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`bg-white p-6 sm:p-7 rounded-2xl shadow-xs border border-gray-100 ${
                activeTab === "experience" ? "md:col-span-2" : ""
              }`}
            >
              <h3 className="flex items-center gap-2.5 text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span>Professional Experience</span>
              </h3>

              <div className="space-y-6">
                {experience.map((item, index) => (
                  <div key={index} className="relative flex gap-3.5">
                    {/* Compact Timeline Axis */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-xs z-10 flex items-center justify-center mt-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                      {index < experience.length - 1 && (
                        <div className="w-0.5 bg-blue-100 flex-1 my-1 rounded-full"></div>
                      )}
                    </div>

                    {/* Compact Content Block */}
                    <div className="pb-1 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h4 className="text-base font-bold text-gray-900 leading-snug">
                          {item.position}
                        </h4>
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                          {item.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-1">
                        <span className="text-blue-600 font-bold">{item.company}</span>
                        {item.location && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1 text-gray-500">
                              <MapPin size={12} className="text-blue-500" />
                              <span>{item.location}</span>
                            </div>
                          </>
                        )}
                      </div>

                      <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education Column */}
          {(activeTab === "all" || activeTab === "education") && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`bg-white p-6 sm:p-7 rounded-2xl shadow-xs border border-gray-100 ${
                activeTab === "education" ? "md:col-span-2" : ""
              }`}
            >
              <h3 className="flex items-center gap-2.5 text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span>Academic Education</span>
              </h3>

              <div className="space-y-6">
                {education.map((item, index) => (
                  <div key={index} className="relative flex gap-3.5">
                    {/* Compact Timeline Axis */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-xs z-10 flex items-center justify-center mt-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                      {index < education.length - 1 && (
                        <div className="w-0.5 bg-blue-100 flex-1 my-1 rounded-full"></div>
                      )}
                    </div>

                    {/* Compact Content Block */}
                    <div className="pb-1 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h4 className="text-base font-bold text-gray-900 leading-snug">
                          {item.degree}
                        </h4>
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-md border border-gray-200">
                          {item.year}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-1">
                        <span className="text-blue-600 font-bold">{item.institution}</span>
                        {item.location && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1 text-gray-500">
                              <MapPin size={12} className="text-blue-500" />
                              <span>{item.location}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

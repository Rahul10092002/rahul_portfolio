"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  year: string;
  location?: string;
  description?: string;
}

interface EducationProps {
  data: Education[];
}

export default function EducationSection({ data }: EducationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-14 sm:py-16 bg-white relative" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2.5 border border-blue-100">
            <Sparkles className="h-3.5 w-3.5" /> Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Education
          </h2>
        </div>

        {/* Education Card */}
        <div className="bg-gray-50/70 p-6 sm:p-7 rounded-2xl shadow-xs border border-gray-100">
          <h3 className="flex items-center gap-2.5 text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200/60">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span>Academic Qualifications</span>
          </h3>

          <div className="space-y-6">
            {data.map((item, index) => (
              <div key={index} className="relative flex gap-3.5">
                {/* Timeline Axis */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-xs z-10 flex items-center justify-center mt-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                  {index < data.length - 1 && (
                    <div className="w-0.5 bg-blue-100 flex-1 my-1 rounded-full"></div>
                  )}
                </div>

                {/* Content Block */}
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
        </div>
      </motion.div>
    </section>
  );
}

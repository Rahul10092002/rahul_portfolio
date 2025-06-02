"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, MapPin } from "lucide-react";

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

  return (
    <section id="resume" className="py-20 bg-gray-50" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl"
      >
        <h2 className="text-4xl font-bold mb-2 text-blue-900">Resume</h2>

        {/* Blue underline */}
        <div className="w-12 h-1 bg-blue-500 mb-6"></div>

        <p className="text-gray-700 text-lg mb-12">
          My educational background and professional experience.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-sm"
          >
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-blue-500 mb-6">
              <GraduationCap className="h-6 w-6" />
              Education
            </h3>

            <div className="space-y-6">
              {education.map((item, index) => (
                <div key={index} className="relative pl-8">
                  {/* Timeline line */}
                  {index < education.length - 1 && (
                    <div className="absolute left-3.5 top-5 bottom-0 w-0.5 bg-blue-200 h-full"></div>
                  )}

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 bg-blue-500 rounded-full p-2 shadow-md">
                    <div className="h-1 w-1 bg-white rounded-full"></div>
                  </div>

                  <div className="pb-6">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {item.degree}
                    </h4>
                    <p className="text-blue-600 font-medium mt-1">
                      {item.institution}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <span>{item.year}</span>
                      {item.location && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{item.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-gray-600 mt-3">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-sm"
          >
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-blue-500 mb-6">
              <Briefcase className="h-6 w-6" />
              Experience
            </h3>

            <div className="space-y-6">
              {experience.map((item, index) => (
                <div key={index} className="relative pl-8">
                  {/* Timeline line */}
                  {index < experience.length - 1 && (
                    <div className="absolute left-3.5 top-5 bottom-0 w-0.5 bg-blue-200 h-full"></div>
                  )}

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 bg-blue-500 rounded-full p-2 shadow-md">
                    <div className="h-1 w-1 bg-white rounded-full"></div>
                  </div>

                  <div className="pb-6">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {item.position}
                    </h4>
                    <p className="text-blue-600 font-medium mt-1">
                      {item.company}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <span>{item.duration}</span>
                      {item.location && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{item.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-gray-600 mt-3">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface EducationProps {
  data: Education[];
}

export default function EducationSection({ data }: EducationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto"
      >
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-900">
          Education
        </h2>

        <div className="max-w-3xl mx-auto">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              {index < data.length - 1 && (
                <div className="absolute left-3.5 top-5 bottom-0 w-0.5 bg-blue-200"></div>
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 bg-blue-500 rounded-full p-2 shadow-md">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.degree}
                </h3>
                <p className="text-blue-600 font-medium mt-1">
                  {item.institution}
                </p>
                <p className="text-gray-500 mt-1">{item.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

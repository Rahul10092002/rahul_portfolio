"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface AboutProps {
  data: {
    description: string;
    image: string;
  };
}

export default function AboutSection({ data }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-gray-50" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl"
      >
        <h2 className="text-4xl font-bold mb-2 text-blue-900">About Me</h2>

        {/* Blue underline */}
        <div className="w-12 h-1 bg-blue-500 mb-6"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-600 leading-relaxed"
            >
              {data.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ delay: 0.4, duration: 0.6 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/portfolio.png"
                alt="About me"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

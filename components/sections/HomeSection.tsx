"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import { ArrowDown } from "lucide-react";

interface HomeProps {
  data: {
    name: string;
    title: string;
    about: {
      image: string;
    };
    resume: {
      link: string;
    };
  };
}

export default function HomeSection({ data }: HomeProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center py-20 relative"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-blue-900"> Hi, I'm</span>{" "}
            <span className="text-blue-600">{data.name}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-6 font-medium"
          >
            {data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 mb-8 text-lg leading-relaxed max-w-lg"
          >
            I create beautiful, functional, and responsive web applications with
            modern technologies. Passionate about delivering exceptional user
            experiences and scalable solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Contact Me
              </ScrollLink>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => window.open(data.resume.link, "_blank")}
                className="inline-flex items-center justify-center border-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
              >
                Resume
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-4 -left-4 w-72 h-72 md:w-96 md:h-96 bg-blue-100 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-64 h-64 md:w-80 md:h-80 bg-cyan-100 rounded-full opacity-30"></div>

            {/* Main profile image */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
              <Image
                src="/images/portfolio.png"
                alt={data.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-2 -right-2 bg-blue-500 text-white p-3 rounded-full shadow-lg z-20"
            >
              <span className="text-sm font-bold">💻</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-2 -left-2 bg-cyan-500 text-white p-3 rounded-full shadow-lg z-20"
            >
              <span className="text-sm font-bold">🚀</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        ></motion.div>
      </motion.div>
    </section>
  );
}

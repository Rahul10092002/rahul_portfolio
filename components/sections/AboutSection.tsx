"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Database,
  Smartphone,
  Cloud,
  Zap,
  Cpu,
  Globe,
  Server,
  Palette,
  GitBranch,
  Shield,
  Layers,
} from "lucide-react";

interface AboutProps {
  data: {
    description: string;
    image: string;
  };
}

const majorSkills = [
  {
    icon: Code,
    label: "React.js",
    color: "bg-blue-500",
    position: { top: "10%", left: "15%" },
  },
  {
    icon: Server,
    label: "Node.js",
    color: "bg-green-500",
    position: { top: "20%", right: "10%" },
  },
  {
    icon: Database,
    label: "MongoDB",
    color: "bg-emerald-600",
    position: { top: "60%", left: "5%" },
  },
  {
    icon: Globe,
    label: "Next.js",
    color: "bg-gray-800",
    position: { top: "15%", left: "60%" },
  },
  {
    icon: Palette,
    label: "Tailwind",
    color: "bg-cyan-500",
    position: { top: "70%", right: "15%" },
  },
  {
    icon: GitBranch,
    label: "Git",
    color: "bg-orange-500",
    position: { top: "45%", left: "70%" },
  },
  {
    icon: Cloud,
    label: "AWS",
    color: "bg-yellow-600",
    position: { top: "80%", left: "40%" },
  },
  {
    icon: Smartphone,
    label: "React Native",
    color: "bg-purple-500",
    position: { top: "35%", right: "25%" },
  },
  {
    icon: Shield,
    label: "TypeScript",
    color: "bg-blue-600",
    position: { top: "25%", left: "35%" },
  },
  {
    icon: Layers,
    label: "Docker",
    color: "bg-blue-400",
    position: { top: "55%", right: "40%" },
  },
  {
    icon: Zap,
    label: "Redux",
    color: "bg-purple-600",
    position: { top: "40%", left: "20%" },
  },
  
];

const FloatingSkill = ({ skill, index }: { skill: any; index: number }) => {
  const IconComponent = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -90 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: [0, -8, 0],
      }}
      transition={{
        initial: { delay: index * 0.3, duration: 0.8, ease: "easeOut" },
        y: {
          duration: 6 + (index % 4),
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: index * 0.5,
        },
      }}
      className="absolute"
      style={skill.position}
    >
      <motion.div
        whileHover={{
          scale: 1.2,
          rotate: 180,
          transition: { duration: 0.6, ease: "easeOut" },
        }}
        className={`${skill.color} text-white p-4 rounded-2xl shadow-lg cursor-pointer group relative`}
      >
        <IconComponent className="h-6 w-6" />

        {/* Skill Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.3 + 1.2,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-2 py-1 rounded-md text-xs font-medium shadow-md whitespace-nowrap"
        >
          {skill.label}
        </motion.div>

        {/* Pulse Ring - Much slower */}
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.8,
          }}
          className={`absolute inset-0 ${skill.color} rounded-2xl`}
        />

        {/* Sparkle Effect - Much slower */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-60"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0.3, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-yellow-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

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
        <h2 className="text-4xl font-bold mb-2">About Me</h2>

        {/* Blue underline */}
        <div className="w-12 h-1 bg-blue-500 mb-6"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {data.description}
              </p>

             

              {/* Key Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.8, duration: 0.6 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Full-Stack Development Expertise
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Modern JavaScript Frameworks like React.js, Next.js.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Cloud & DevOps Integration
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Skills Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ delay: 0.4, duration: 0.6 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-96 h-96">
              {/* Background Decorative Elements - Much slower */}
              <div className="absolute inset-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 60,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-200 rounded-full opacity-20"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 80,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute bottom-10 right-10 w-24 h-24 border-2 border-purple-200 rounded-full opacity-20"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 100,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-200 rounded-full opacity-15"
                />
              </div>

              {/* Floating Skills */}
              {majorSkills.map((skill, index) => (
                <FloatingSkill key={index} skill={skill} index={index} />
              ))}

              {/* Center Element - Slower animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                }
                transition={{ delay: 4, duration: 1, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-6 shadow-xl border-4 border-blue-100"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="text-center"
                >
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="text-sm font-bold text-gray-800">
                    Full Stack
                  </div>
                  <div className="text-xs text-gray-600">Developer</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  name: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  liveLink?: string;
}

interface ProjectsProps {
  data: Project[];
}

export default function ProjectsSection({ data }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(data.length / getItemsPerSlide())
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(data.length / getItemsPerSlide())) %
        Math.ceil(data.length / getItemsPerSlide())
    );
  };

  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // lg screens
      if (window.innerWidth >= 768) return 2; // md screens
      return 1; // sm screens
    }
    return 3; // default for SSR
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const totalSlides = Math.ceil(data.length / getItemsPerSlide());

  return (
    <section id="projects" className="py-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-7xl"
      >
        <h2 className="text-4xl font-bold mb-2 text-blue-900">Projects</h2>

        {/* Blue underline */}
        <div className="w-12 h-1 bg-blue-500 mb-6"></div>

        <p className="text-gray-700 text-lg mb-12">
          A showcase of my recent development work and personal projects.
        </p>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            disabled={currentSlide === totalSlides - 1}
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Projects Slider */}
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {data
                      .slice(
                        slideIndex * getItemsPerSlide(),
                        (slideIndex + 1) * getItemsPerSlide()
                      )
                      .map((project, index) => (
                        <motion.div
                          key={`${slideIndex}-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            isInView
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 20 }
                          }
                          transition={{ delay: index * 0.1, duration: 0.6 }}
                          className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                          {/* Project Image */}
                          {/* <div className="relative h-56 overflow-hidden">
                          <Image
                              src={
                                project.image ||
                                `/placeholder.svg?height=224&width=400&text=${
                                  encodeURIComponent(project.name) ||
                                  "/placeholder.svg"
                                }`
                              }
                              alt={project.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            /> *
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            \
                            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                              >
                                <Github className="h-5 w-5" />
                              </motion.a>

                              {project.liveLink && (
                                <motion.a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                                >
                                  <ExternalLink className="h-5 w-5" />
                                </motion.a>
                              )}
                            </div>
                          </div> */}

                          {/* Project Content */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                              {project.name}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                              {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-200"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                              >
                                <Github className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                  Code
                                </span>
                              </motion.a>

                              {project.liveLink && (
                                <motion.a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ml-auto"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    Live Demo
                                  </span>
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        
      </motion.div>
    </section>
  );
}

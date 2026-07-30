"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  SlidersHorizontal,
  Info,
  Cpu,
  Bot,
  Users,
  Zap,
  Server,
  CheckCircle2
} from "lucide-react";
import ArchitectureFlowchart, { ArchitectureStep } from "../ArchitectureFlowchart";

interface MetricHighlight {
  value: string;
  label: string;
  color?: string;
}

interface ProjectHighlights {
  title: string;
  icon?: string;
  theme?: string;
  metrics: MetricHighlight[];
}

interface Project {
  name: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  liveLink?: string;
  badge?: string;
  architecture?: ArchitectureStep[];
  highlights?: ProjectHighlights;
}

interface ProjectsProps {
  data: Project[];
}

export default function ProjectsSection({ data }: ProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  const filterCategories = ["All", "AI & GenAI", "Full Stack"];

  const filteredProjects = data.filter((project) => {
    if (activeFilter === "All") return true;

    const isAI = project.tags.some((tag) =>
      [
        "LangGraph",
        "LangChain",
        "RAG",
        "MCP",
        "ChromaDB",
        "Groq API",
        "RAGAS",
        "BM25",
      ].includes(tag)
    );

    if (activeFilter === "AI & GenAI") {
      return isAI;
    }

    if (activeFilter === "Full Stack") {
      return !isAI; // Shows pure Full Stack & SaaS Web Apps
    }

    return true;
  });

  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // lg screens
      if (window.innerWidth >= 768) return 2; // md screens
      return 1; // sm screens
    }
    return 3;
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeFilter, viewMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProjectIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const totalSlides = Math.ceil(filteredProjects.length / itemsPerSlide) || 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleCardExpansion = (projectName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCards((prev) => ({
      ...prev,
      [projectName]: !prev[projectName],
    }));
  };

  const selectedProject =
    selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  const navigateModal = (direction: "prev" | "next") => {
    if (selectedProjectIndex === null) return;
    if (direction === "next") {
      setSelectedProjectIndex((selectedProjectIndex + 1) % filteredProjects.length);
    } else {
      setSelectedProjectIndex(
        (selectedProjectIndex - 1 + filteredProjects.length) % filteredProjects.length
      );
    }
  };

  const formatDescriptionSentences = (text: string) => {
    const sentences = text.split(/(?<=\.)\s+/).filter(Boolean);
    return sentences;
  };

  return (
    <section id="projects" className="py-20 bg-gray-50/50" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-7xl px-4"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-blue-900">Projects</h2>
            <div className="w-12 h-1 bg-blue-500 my-3 rounded-full"></div>
            <p className="text-gray-600 text-lg">
              A showcase of my AI/GenAI systems, full-stack applications, and client work.
            </p>
          </div>

          {/* Filter Tabs & View Toggle */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center bg-white shadow-xs border border-gray-200 rounded-xl p-1 gap-1 overflow-x-auto">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                    activeFilter === cat
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <div className="w-px h-5 bg-gray-200 mx-1 hidden sm:block" />
              <button
                onClick={() => setViewMode("slider")}
                title="Carousel View"
                className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                  viewMode === "slider"
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode: Carousel / Slider */}
        {viewMode === "slider" ? (
          <div className="relative">
            {/* Navigation Buttons */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white shadow-xl border border-gray-100 rounded-full p-3 hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:pointer-events-none"
                  disabled={currentSlide === 0}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white shadow-xl border border-gray-100 rounded-full p-3 hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:pointer-events-none"
                  disabled={currentSlide === totalSlides - 1}
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Slider Track */}
            <div className="overflow-hidden py-4">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                      {filteredProjects
                        .slice(
                          slideIndex * itemsPerSlide,
                          (slideIndex + 1) * itemsPerSlide
                        )
                        .map((project, index) => {
                          const isExpanded = !!expandedCards[project.name];
                          const isLongDescription = project.description.length > 120;
                          const actualIndex = slideIndex * itemsPerSlide + index;

                          return (
                            <motion.div
                              key={`${slideIndex}-${project.name}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={
                                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                              }
                              transition={{ delay: index * 0.08, duration: 0.5 }}
                              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col justify-between"
                            >
                              <div>
                                {/* Project Image Container */}
                                <div
                                  onClick={() => setSelectedProjectIndex(actualIndex)}
                                  className="relative h-52 overflow-hidden cursor-pointer group/img"
                                >
                                  <Image
                                    src={
                                      project.image ||
                                      `/placeholder.svg?height=224&width=400&text=${encodeURIComponent(
                                        project.name
                                      )}`
                                    }
                                    alt={project.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent opacity-60 group-hover/img:opacity-80 transition-opacity duration-300" />

                                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-800 p-2 rounded-full shadow hover:bg-white transition-all transform hover:scale-110">
                                    <Maximize2 className="h-4 w-4 text-blue-600" />
                                  </div>

                                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-blue-600/90 backdrop-blur-sm rounded-md shadow-sm">
                                      {project.tags[0] || "Project"}
                                    </span>
                                    <span className="text-xs text-gray-200 font-medium flex items-center gap-1 group-hover/img:text-white">
                                      View details <ChevronRight className="h-3 w-3 inline" />
                                    </span>
                                  </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                  <h3
                                    onClick={() => setSelectedProjectIndex(actualIndex)}
                                    className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                                  >
                                    {project.name}
                                  </h3>

                                  <div className="mb-4 text-gray-600 text-sm leading-relaxed">
                                    <p className="line-clamp-3">
                                      {project.description}
                                    </p>
                                  </div>

                                  {/* Tags */}
                                  <div className="flex flex-wrap gap-1.5 mb-6">
                                    {project.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-100"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Card Footer Actions */}
                              <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-2 border-t border-gray-50 pt-4">
                                <button
                                  onClick={() => setSelectedProjectIndex(actualIndex)}
                                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                                >
                                  <Info className="h-3.5 w-3.5" />
                                  <span>Details</span>
                                </button>

                                <div className="flex items-center gap-2 ml-auto">
                                  {project.link && (
                                    <a
                                      href={project.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-lg transition-all hover:bg-gray-50"
                                    >
                                      <Github className="h-3.5 w-3.5" />
                                      <span>Code</span>
                                    </a>
                                  )}

                                  {project.liveLink && (
                                    <a
                                      href={project.liveLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-xs font-medium bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                      <ExternalLink className="h-3.5 w-3.5" />
                                      <span>Live</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "w-8 bg-blue-600"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* View Mode: Full Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
            {filteredProjects.map((project, index) => {
              const isExpanded = !!expandedCards[project.name];
              const isLongDescription = project.description.length > 120;

              return (
                <motion.div
                  key={`grid-${project.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => setSelectedProjectIndex(index)}
                      className="relative h-52 overflow-hidden cursor-pointer group/img"
                    >
                      <Image
                        src={
                          project.image ||
                          `/placeholder.svg?height=224&width=400&text=${encodeURIComponent(
                            project.name
                          )}`
                        }
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent opacity-60 group-hover/img:opacity-80 transition-opacity duration-300" />
                      {project.badge && (
                        <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1.5 z-10">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>{project.badge}</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-800 p-2 rounded-full shadow hover:bg-white transition-all transform hover:scale-110">
                        <Maximize2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <span className="text-xs font-semibold px-2.5 py-1 bg-blue-600/90 backdrop-blur-sm rounded-md shadow-sm">
                          {project.tags[0] || "Project"}
                        </span>
                        <span className="text-xs text-gray-200 font-medium flex items-center gap-1 group-hover/img:text-white">
                          View details <ChevronRight className="h-3 w-3 inline" />
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3
                        onClick={() => setSelectedProjectIndex(index)}
                        className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {project.name}
                      </h3>

                      <div className="mb-4 text-gray-600 text-sm leading-relaxed">
                        <p className="line-clamp-3">
                          {project.description}
                        </p>
                        {isLongDescription && (
                          <button
                            onClick={(e) => toggleCardExpansion(project.name, e)}
                            className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 focus:outline-none transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                Show Less <ChevronUp className="h-3 w-3" />
                              </>
                            ) : (
                              <>
                                Read Full Description <ChevronDown className="h-3 w-3" />
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-2 border-t border-gray-50 pt-4">
                    <button
                      onClick={() => setSelectedProjectIndex(index)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Info className="h-3.5 w-3.5" />
                      <span>Details</span>
                    </button>

                    <div className="flex items-center gap-2 ml-auto">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-lg transition-all hover:bg-gray-50"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Code</span>
                        </a>
                      )}

                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-medium bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* FULL PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProjectIndex(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full z-10 border border-gray-100 max-h-[90vh] flex flex-col my-auto"
            >
              {/* Modal Header Image */}
              <div className="relative h-64 sm:h-72 w-full bg-gray-900 flex-shrink-0">
                <Image
                  src={
                    selectedProject.image ||
                    `/placeholder.svg?height=300&width=600&text=${encodeURIComponent(
                      selectedProject.name
                    )}`
                  }
                  alt={selectedProject.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/40" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProjectIndex(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-md border border-white/10"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Project Modal Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white drop-shadow-md">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedProject.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-600/90 text-white text-xs px-2.5 py-1 rounded-md font-semibold shadow-sm border border-blue-400/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">
                    {selectedProject.name}
                  </h3>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
                {/* Dynamic Project Architecture & Key Metrics Callout */}
                {selectedProject.highlights && (
                  <div
                    className={`p-4 rounded-2xl border space-y-2 ${
                      selectedProject.highlights.theme === "violet"
                        ? "bg-gradient-to-r from-violet-50 to-purple-50 border-violet-100/80 text-violet-900"
                        : selectedProject.highlights.theme === "emerald"
                        ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100/80 text-emerald-900"
                        : selectedProject.highlights.theme === "amber"
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100/80 text-amber-900"
                        : selectedProject.highlights.theme === "cyan"
                        ? "bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-100/80 text-cyan-900"
                        : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100/80 text-blue-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                      {selectedProject.highlights.icon === "Bot" ? (
                        <Bot className="h-4 w-4 text-violet-600" />
                      ) : selectedProject.highlights.icon === "Users" ? (
                        <Users className="h-4 w-4 text-emerald-600" />
                      ) : selectedProject.highlights.icon === "Zap" ? (
                        <Zap className="h-4 w-4 text-amber-600" />
                      ) : selectedProject.highlights.icon === "Server" ? (
                        <Server className="h-4 w-4 text-cyan-600" />
                      ) : (
                        <Cpu className="h-4 w-4 text-blue-600" />
                      )}
                      <span>{selectedProject.highlights.title}</span>
                    </div>
                    <div
                      className={`grid grid-cols-1 gap-2.5 pt-1 ${
                        selectedProject.highlights.metrics.length === 2
                          ? "sm:grid-cols-2"
                          : "sm:grid-cols-3"
                      }`}
                    >
                      {selectedProject.highlights.metrics.map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="bg-white p-3 rounded-xl border border-gray-100 shadow-2xs"
                        >
                          <span
                            className={`font-extrabold block text-sm ${
                              metric.color || "text-blue-600"
                            }`}
                          >
                            {metric.value}
                          </span>
                          <span className="text-gray-500 text-xs font-medium">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Architecture Flowchart Component */}
                {selectedProject.architecture && selectedProject.architecture.length > 0 && (
                  <ArchitectureFlowchart
                    title={`${selectedProject.name} — Interactive Architecture Flow`}
                    steps={selectedProject.architecture}
                  />
                )}

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Project Overview & Breakdown
                  </h4>
                  <div className="space-y-3">
                    {formatDescriptionSentences(selectedProject.description).map(
                      (sentence, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/50"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                            {sentence}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Technologies / Stack */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Technologies & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-800 text-xs sm:text-sm px-3.5 py-1.5 rounded-lg font-medium border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
                {/* Switch Projects inside Modal */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateModal("prev")}
                    className="p-2 text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
                    title="Previous Project"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                  <button
                    onClick={() => navigateModal("next")}
                    className="p-2 text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
                    title="Next Project"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 ml-auto">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors shadow"
                    >
                      <Github className="h-4 w-4" />
                      <span>View Code</span>
                    </a>
                  )}

                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


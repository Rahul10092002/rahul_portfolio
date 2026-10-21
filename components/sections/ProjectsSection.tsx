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
  Sparkles,
  LayoutGrid,
  SlidersHorizontal,
  Info,
  Cpu,
  Bot,
  Users,
  Zap,
  Server,
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
  tagline?: string;
  description: string;
  status?: string;
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
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance && currentSlide < totalSlides - 1) nextSlide();
    else if (distance < -minSwipeDistance && currentSlide > 0) prevSlide();
  };

  const filterCategories = ["All", "AI & GenAI", "Full Stack"];

  const filteredProjects = data.filter((project) => {
    if (activeFilter === "All") return true;
    const aiTags = ["LangGraph", "LangChain", "RAG", "MCP", "ChromaDB", "Groq", "RAGAS", "BM25", "FastMCP", "CRAG"];
    const isAI = project.tags.some((tag) => aiTags.some((at) => tag.includes(at)));
    if (activeFilter === "AI & GenAI") return isAI;
    if (activeFilter === "Full Stack") return !isAI;
    return true;
  });

  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  useEffect(() => {
    const handleResize = () => setItemsPerSlide(getItemsPerSlide());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => { setCurrentSlide(0); }, [activeFilter, viewMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProjectIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const totalSlides = Math.ceil(filteredProjects.length / itemsPerSlide) || 1;
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const selectedProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  const navigateModal = (direction: "prev" | "next") => {
    if (selectedProjectIndex === null) return;
    if (direction === "next") setSelectedProjectIndex((selectedProjectIndex + 1) % filteredProjects.length);
    else setSelectedProjectIndex((selectedProjectIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const formatDescriptionSentences = (text: string) => text.split(/(?<=\.)\s+/).filter(Boolean);

  const highlightIconMap: Record<string, any> = { Bot, Users, Zap, Server, Cpu };

  const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
      }}
    >
      <div>
        {/* Image */}
        <div onClick={onClick} className="relative h-48 sm:h-52 overflow-hidden cursor-pointer group/img">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover/img:opacity-90 transition-opacity" />
          {project.badge && (
            <div className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10"
              style={{ backgroundColor: 'rgba(59,130,246,0.9)', color: '#fff' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              <span>{project.badge}</span>
            </div>
          )}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs font-medium px-2.5 py-1 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
              {project.tags[0] || "Project"}
            </span>
            <span className="text-xs text-gray-300 font-medium flex items-center gap-1">
              View details <ChevronRight className="h-3 w-3 inline" />
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 onClick={onClick} className="text-base font-bold mb-1 cursor-pointer transition-colors" style={{ color: 'var(--text-primary)' }}>
            {project.name}
          </h3>
          {project.tagline && (
            <p className="text-xs mb-3" style={{ color: 'var(--accent-blue)' }}>{project.tagline}</p>
          )}
          <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                style={{
                  backgroundColor: 'var(--accent-blue-muted)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  color: '#93C5FD',
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[11px] px-2 py-0.5 rounded-md font-medium" style={{ color: 'var(--text-muted)' }}>
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <button onClick={onClick} className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
        >
          <Info className="h-3.5 w-3.5" />
          <span>Details</span>
        </button>
        <div className="flex items-center gap-2 ml-auto">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
              style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
            >
              <Github className="h-3.5 w-3.5" />
              <span>Code</span>
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--accent-blue)', color: '#fff' }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-16 md:py-20 lg:py-24 relative section-glow" style={{ backgroundColor: 'var(--bg-primary)' }} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ backgroundColor: 'var(--accent-blue-muted)', border: '1px solid rgba(59,130,246,0.2)', color: '#93C5FD' }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Featured Work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Projects & Case Studies
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-lg p-1 gap-0.5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
              {filterCategories.map((cat) => (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  className="px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all"
                  style={{
                    backgroundColor: activeFilter === cat ? 'var(--accent-blue)' : 'transparent',
                    color: activeFilter === cat ? '#fff' : 'var(--text-tertiary)',
                  }}
                >
                  {cat}
                </button>
              ))}
              <div className="w-px h-4 mx-1" style={{ backgroundColor: 'var(--border-default)' }} />
              <button onClick={() => setViewMode("slider")} aria-label="Carousel view"
                className="p-1.5 rounded-md transition-colors"
                style={{ color: viewMode === "slider" ? 'var(--accent-blue)' : 'var(--text-muted)' }}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setViewMode("grid")} aria-label="Grid view"
                className="p-1.5 rounded-md transition-colors"
                style={{ color: viewMode === "grid" ? 'var(--accent-blue)' : 'var(--text-muted)' }}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider View */}
        {viewMode === "slider" ? (
          <div className="relative" role="region" aria-roledescription="carousel" aria-label="Projects Carousel">
            {totalSlides > 1 && (
              <>
                <button onClick={prevSlide} disabled={currentSlide === 0} aria-label="Previous Slide"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 z-10 p-2.5 rounded-full transition-all disabled:opacity-20"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-strong)', color: 'var(--text-secondary)' }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={nextSlide} disabled={currentSlide === totalSlides - 1} aria-label="Next Slide"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 z-10 p-2.5 rounded-full transition-all disabled:opacity-20"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-strong)', color: 'var(--text-secondary)' }}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="overflow-hidden py-4 touch-pan-y" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <motion.div className="flex" style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-1">
                      {filteredProjects.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((project, index) => (
                        <ProjectCard
                          key={`${slideIndex}-${project.name}`}
                          project={project}
                          index={index}
                          onClick={() => setSelectedProjectIndex(slideIndex * itemsPerSlide + index)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {totalSlides > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button key={index} onClick={() => setCurrentSlide(index)} aria-label={`Go to slide ${index + 1}`}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: currentSlide === index ? '2rem' : '0.5rem',
                      backgroundColor: currentSlide === index ? 'var(--accent-blue)' : 'var(--border-strong)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={`grid-${project.name}`} project={project} index={index} onClick={() => setSelectedProjectIndex(index)} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProjectIndex(null)}
              className="fixed inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative rounded-2xl overflow-hidden max-w-3xl sm:max-w-4xl w-full z-10 max-h-[88vh] flex flex-col my-auto"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-elevated)' }}
            >
              {/* Modal Header */}
              <div className="relative h-36 sm:h-44 md:h-48 w-full flex-shrink-0 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <Image src={selectedProject.image} alt={selectedProject.name} fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                <button onClick={() => setSelectedProjectIndex(null)} aria-label="Close modal"
                  className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full transition-all"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <div className="absolute bottom-4 left-5 right-14 text-white">
                  {selectedProject.badge && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-2"
                      style={{ backgroundColor: 'rgba(59,130,246,0.9)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      <span>{selectedProject.badge}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    {selectedProject.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight">{selectedProject.name}</h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 min-h-0">
                {/* Highlights */}
                {selectedProject.highlights && (
                  <div className="p-4 sm:p-5 rounded-xl space-y-3" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--accent-blue)' }}>
                      {(() => { const I = highlightIconMap[selectedProject.highlights?.icon || "Cpu"] || Cpu; return <I className="h-4 w-4" />; })()}
                      <span>{selectedProject.highlights.title}</span>
                    </div>
                    <div className={`grid grid-cols-1 gap-3 pt-1 ${selectedProject.highlights.metrics.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                      {selectedProject.highlights.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                          <span className={`font-bold block text-base ${metric.color || "text-blue-400"}`}>{metric.value}</span>
                          <span className="text-xs font-medium leading-snug block mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Architecture */}
                {selectedProject.architecture && selectedProject.architecture.length > 0 && (
                  <ArchitectureFlowchart title={`${selectedProject.name} — Architecture Flow`} steps={selectedProject.architecture} />
                )}

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: 'var(--accent-blue)' }}>
                    <Sparkles className="h-3.5 w-3.5" /> Project Overview
                  </h4>
                  <div className="space-y-2">
                    {formatDescriptionSentences(selectedProject.description).map((sentence, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--accent-blue)' }} />
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{sentence}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1.5 rounded-lg font-medium"
                        style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="py-3 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 flex-shrink-0"
                style={{ backgroundColor: 'var(--bg-elevated)', borderTop: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-2">
                  <button onClick={() => navigateModal("prev")} className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1 text-xs font-medium"
                    style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
                  >
                    <ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline">Prev</span>
                  </button>
                  <span className="text-xs px-1" style={{ color: 'var(--text-muted)' }}>
                    {(selectedProjectIndex ?? 0) + 1} / {filteredProjects.length}
                  </span>
                  <button onClick={() => navigateModal("next")} className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1 text-xs font-medium"
                    style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
                  >
                    <span className="hidden sm:inline">Next</span><ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2.5 ml-auto">
                  {selectedProject.link && (
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}
                    >
                      <Github className="h-4 w-4" /><span>View Code</span>
                    </a>
                  )}
                  {selectedProject.liveLink && (
                    <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                      style={{ backgroundColor: 'var(--accent-blue)', color: '#fff' }}
                    >
                      <ExternalLink className="h-4 w-4" /><span>Live Demo</span>
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

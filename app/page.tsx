"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import portfolioData from "@/data/portfolio-data.json";
import Sidebar from "@/components/Sidebar";
import HomeSection from "@/components/sections/HomeSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Sidebar activeSection={activeSection} />

      <main className="flex-1 md:ml-64 w-full min-w-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col"
        >
          <HomeSection data={portfolioData} />
          <ProjectsSection data={portfolioData.projects} />
          <ServicesSection data={(portfolioData as any).services} />
          <ExperienceSection data={portfolioData.experience} />
          <SkillsSection data={portfolioData.skills} />
          <EducationSection data={portfolioData.education} />
          <AchievementsSection data={portfolioData.achievements} />
          <ContactSection data={portfolioData.contact} />
          <Footer />
        </motion.div>
      </main>
    </div>
  );
}

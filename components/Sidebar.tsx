"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Award,
  FileText,
  Briefcase,
  GraduationCap,
  Mail,
  Code2,
  Github,
  Linkedin,
  MailIcon,
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import portfolioData from "@/data/portfolio-data.json";

interface SidebarProps {
  activeSection: string;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Award },
  { id: "projects", label: "Portfolio", icon: Briefcase },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

const socialLinks = [
  {
    name: "GitHub",
    url: portfolioData.contact.github,
    icon: <Github className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    url: portfolioData.contact.linkedin,
    icon: <Linkedin className="w-5 h-5" />,
  },
  ...((portfolioData.contact as { leetcode?: string }).leetcode
    ? [
        {
          name: "LeetCode",
          url: (portfolioData.contact as { leetcode?: string }).leetcode,
          icon: <Code2 className="w-5 h-5" />,
        },
      ]
    : []),
  {
    name: "Email",
    url: `mailto:${portfolioData.contact.email}`,
    icon: <MailIcon className="w-5 h-5" />,
  },
];

export default function Sidebar({ activeSection }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Navigation Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 shadow-lg">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <Image
                src="/images/portfolio.png"
                alt={portfolioData.name}
                fill
                sizes="36px"
                className="object-cover rounded-full"
              />
            </div>
            <span className="font-bold text-lg text-white">
              {portfolioData.name}
            </span>
          </div>
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="p-2 text-white hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 bg-slate-900"
          >
            <div className="flex flex-col h-full pt-20">
              {/* Profile Section */}
              <div className="p-6 text-center border-b border-slate-700">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                      <Image
                        src="/images/portfolio.png"
                        alt={portfolioData.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-lg font-bold text-white mb-2">
                  {portfolioData.name}
                </h1>
                <p className="text-gray-400 text-sm">{portfolioData.title}</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-4">
                <div className="space-y-1">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <ScrollLink
                          to={item.id}
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}
                          className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                            activeSection === item.id
                              ? "text-cyan-400 bg-slate-800"
                              : "text-gray-300 hover:text-white hover:bg-slate-800"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <IconComponent size={24} />
                          <span className="text-lg font-medium">
                            {item.label}
                          </span>
                        </ScrollLink>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* Social Links */}
              <div className="p-6 border-t border-slate-700">
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-64 bg-slate-900 shadow-xl z-40">
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Profile Section */}
          <div className="p-4 text-center">
            {/* Profile Image */}
            <div className="relative w-24 h-24 mx-auto mb-3">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  <Image
                    src="/images/portfolio.png"
                    alt={portfolioData.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-xl font-bold text-white mb-2">
              {portfolioData.name}
            </h1>

            {/* Social Links */}
            <div className="flex justify-center gap-3 mb-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <ScrollLink
                    key={item.id}
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 group ${
                      activeSection === item.id
                        ? " text-cyan-400"
                        : "text-gray-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <IconComponent
                      size={20}
                      className={`transition-colors ${
                        activeSection === item.id
                          ? "text-cyan-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </ScrollLink>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 text-center">
            <p className="text-xs text-gray-500">© 2025 {portfolioData.name}</p>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Spacer */}
      <div className="h-16 md:hidden" />
    </>
  );
}

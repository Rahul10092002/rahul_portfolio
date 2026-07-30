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
  Mail,
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
  { id: "resume", label: "Resume", icon: FileText },
  { id: "projects", label: "Portfolio", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

const socialLinks = [
  {
    name: "GitHub",
    url: portfolioData.contact.github,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: portfolioData.contact.linkedin,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: `mailto:${portfolioData.contact.email}`,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
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
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/images/portfolio.png"
                alt={portfolioData.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <span className="font-bold text-lg text-white">
              {portfolioData.name}
            </span>
          </div>
          <button onClick={toggleMobileMenu} className="p-2 text-white">
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Layers,
  GraduationCap,
  Mail,
  Code2,
  Github,
  Linkedin,
  MailIcon,
  Award,
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import portfolioData from "@/data/portfolio-data.json";

interface SidebarProps {
  activeSection: string;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "services", label: "Services", icon: Layers },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

const socialLinks = [
  {
    name: "GitHub",
    url: portfolioData.contact.github,
    icon: <Github className="w-4 h-4" />,
  },
  {
    name: "LinkedIn",
    url: portfolioData.contact.linkedin,
    icon: <Linkedin className="w-4 h-4" />,
  },
  {
    name: "Email",
    url: `mailto:${portfolioData.contact.email}`,
    icon: <MailIcon className="w-4 h-4" />,
  },
];

export default function Sidebar({ activeSection }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Navigation Header */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/images/portfolio.png"
                alt={portfolioData.name}
                fill
                sizes="32px"
                className="object-cover rounded-full"
              />
            </div>
            <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
              {portfolioData.name}
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            <div className="flex flex-col h-full pt-20">
              <div className="p-6 text-center" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full p-[2px]" style={{ background: 'linear-gradient(135deg, var(--accent-blue), #8B5CF6)' }}>
                    <div className="w-full h-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                      <Image
                        src="/images/portfolio.png"
                        alt={portfolioData.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {portfolioData.name}
                </h1>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{portfolioData.title}</p>
              </div>

              <nav className="flex-1 px-4 py-4">
                <div className="space-y-0.5">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <ScrollLink
                          to={item.id}
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200`}
                          style={{
                            color: activeSection === item.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                            backgroundColor: activeSection === item.id ? 'var(--accent-blue-muted)' : 'transparent',
                          }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <IconComponent size={20} />
                          <span className="text-sm font-medium">{item.label}</span>
                        </ScrollLink>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              <div className="p-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <div className="flex justify-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-default)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:block fixed left-0 top-0 h-full w-64 z-40"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRight: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Profile */}
          <div className="p-5 text-center">
            <div className="relative w-20 h-20 mx-auto mb-3">
              <div className="absolute inset-0 rounded-full p-[2px]" style={{ background: 'linear-gradient(135deg, var(--accent-blue), #8B5CF6)' }}>
                <div className="w-full h-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                  <Image
                    src="/images/portfolio.png"
                    alt={portfolioData.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <h1 className="text-base font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
              {portfolioData.name}
            </h1>
            <p className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>{portfolioData.title}</p>

            <div className="flex justify-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <div className="space-y-0.5 pt-3">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <ScrollLink
                    key={item.id}
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200"
                    style={{
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-tertiary)',
                      backgroundColor: isActive ? 'var(--accent-blue-muted)' : 'transparent',
                    }}
                  >
                    <IconComponent size={16} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </ScrollLink>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 text-center">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} {portfolioData.name}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Spacer */}
      <div className="h-14 md:hidden" />
    </>
  );
}

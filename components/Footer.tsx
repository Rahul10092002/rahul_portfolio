"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";
import portfolioData from "@/data/portfolio-data.json";

export default function Footer() {
  return (
    <footer
      className="py-8 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} {portfolioData.name}. Built with{" "}
            <Heart className="h-3 w-3 text-red-400 inline" /> and Next.js
          </p>

          <div className="flex items-center gap-3">
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${portfolioData.contact.email}`}
              aria-label="Email"
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

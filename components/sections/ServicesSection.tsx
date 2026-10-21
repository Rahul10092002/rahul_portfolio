"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Workflow, ArrowRight } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

interface ServicesProps {
  data?: ServiceItem[];
}

const iconMap: Record<string, any> = {
  Brain,
  Code,
  Workflow,
};

const defaultServices: ServiceItem[] = [
  {
    title: "AI & GenAI Engineering",
    description: "AI agents, RAG applications, LLM integrations, document intelligence, and multi-agent orchestration systems.",
    icon: "Brain",
    items: ["Multi-Agent Systems", "RAG Pipelines", "LLM Integration", "Document Intelligence", "Chatbot Development"],
  },
  {
    title: "Full Stack & SaaS Development",
    description: "Web applications, dashboards, APIs, MVPs, and end-to-end product development with modern stacks.",
    icon: "Code",
    items: ["Next.js / React Apps", "Node.js / FastAPI APIs", "Database Design", "MVP Development", "Dashboard UIs"],
  },
  {
    title: "Business Automation",
    description: "Workflow automation, lead management, chatbots, CRM integrations, and API-driven process optimization.",
    icon: "Workflow",
    items: ["Workflow Automation", "Lead Management", "CRM Integration", "API Integrations", "Process Optimization"],
  },
];

export default function ServicesSection({ data }: ServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const services = data && data.length > 0 ? data : defaultServices;

  return (
    <section
      id="services"
      className="py-16 md:py-20 lg:py-24 relative section-glow"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-4"
            style={{
              backgroundColor: 'var(--accent-blue-muted)',
              border: '1px solid rgba(59,130,246,0.2)',
              color: '#93C5FD',
            }}
          >
            <Workflow className="h-3.5 w-3.5" />
            <span>Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Have a Product Idea or Need Development Support?
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Whether you're building a SaaS product, integrating AI into an existing application, or looking for a reliable development partner, let's discuss your requirements.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {services.map((service, index) => {
            const IconComp = iconMap[service.icon] || Brain;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-xl transition-all duration-300 group"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                }}
              >
                <div
                  className="p-3 rounded-lg w-fit mb-4"
                  style={{
                    backgroundColor: 'var(--accent-blue-muted)',
                    color: 'var(--accent-blue)',
                  }}
                >
                  <IconComp className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {service.description}
                </p>

                <ul className="space-y-1.5">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent-blue)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: 'var(--accent-blue)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(59,130,246,0.3)',
            }}
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="h-4 w-4" />
          </ScrollLink>
        </div>
      </motion.div>
    </section>
  );
}

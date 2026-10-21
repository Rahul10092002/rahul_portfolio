"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Send,
  Copy,
  Check,
  Clock,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface ContactProps {
  data: {
    email: string;
    phone: string;
    linkedin: string;
    github?: string;
    leetcode?: string;
    responseGuarantee?: string;
  };
}

export default function ContactSection({ data }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "AI & GenAI Solutions",
    budget: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(
      `[${formData.inquiryType}] Project / Role Inquiry from ${formData.name}${
        formData.company ? ` (${formData.company})` : ""
      }`
    );

    const bodyContent = `Hi Rahul,

Name: ${formData.name}
Email: ${formData.email}
Company / Team: ${formData.company || "Not specified"}
Inquiry Type: ${formData.inquiryType}
Budget / Scope: ${formData.budget || "Flexible / Discussion"}
Timeline: ${formData.timeline || "Flexible"}

Message:
${formData.message}

---
Sent via portfolio contact form`;

    const mailtoUrl = `mailto:${data.email}?subject=${subject}&body=${encodeURIComponent(
      bodyContent
    )}`;

    // Trigger user mail client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 800);
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
      ref={ref}
    >
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Let's Build Something Meaningful</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Get in Touch
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3.5" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20 shadow-sm backdrop-blur-sm">
            <Clock className="h-3.5 w-3.5 animate-pulse" />
            <span>Response guarantee {data.responseGuarantee || "within 24 hours"}</span>
          </div>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Channels */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-5 bg-[#141414] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-white mb-6 pb-3 border-b border-white/10 flex items-center justify-between">
                <span>Direct Channels</span>
                <span className="text-xs text-slate-400 font-normal">Fastest Response</span>
              </h3>

              <div className="space-y-4">
                {/* Email Card */}
                <div className="p-4 rounded-xl bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 transition-all flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email</p>
                      <a
                        href={`mailto:${data.email}`}
                        className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate block"
                      >
                        {data.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all shrink-0 cursor-pointer"
                    title="Copy Email"
                    aria-label="Copy Email address"
                  >
                    {copiedEmail ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Phone Card */}
                <div className="p-4 rounded-xl bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 transition-all flex items-center gap-3.5 group">
                  <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</p>
                    <a
                      href={`tel:${data.phone}`}
                      className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors"
                    >
                      {data.phone}
                    </a>
                  </div>
                </div>

                {/* Social Profiles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-blue-400">LinkedIn</p>
                        <span className="text-[10px] text-slate-400">Connect</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </a>

                  {data.github && (
                    <a
                      href={data.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                          <Github className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-purple-400">GitHub</p>
                          <span className="text-[10px] text-slate-400">Open Source</span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <MessageSquare className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Currently accepting new client projects & full-time AI roles.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Converting Project Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-7 bg-[#141414] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl"
          >
            <h3 className="text-base font-bold text-white mb-6 pb-3 border-b border-white/10 flex items-center justify-between">
              <span>Send a Project or Role Inquiry</span>
              <span className="text-xs text-blue-400 font-medium">Direct Delivery</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Inquiry Type */}
              <div>
                <label
                  htmlFor="inquiryType"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  I'm interested in:
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white"
                >
                  <option value="AI & GenAI Solutions" className="bg-[#1a1a1a] text-white">
                    AI & GenAI Solutions (RAG, Agents, LLM Integrations)
                  </option>
                  <option value="Full Stack MVP / SaaS Development" className="bg-[#1a1a1a] text-white">
                    Full Stack MVP / SaaS Development
                  </option>
                  <option value="Business Workflow Automation" className="bg-[#1a1a1a] text-white">
                    Business Workflow Automation
                  </option>
                  <option value="Full-time AI Engineer Role" className="bg-[#1a1a1a] text-white">
                    Full-time AI Engineer / Full Stack Role
                  </option>
                  <option value="Agency Freelance / White-label Partner" className="bg-[#1a1a1a] text-white">
                    Agency Freelance / White-label Partner
                  </option>
                  <option value="Other Consulting" className="bg-[#1a1a1a] text-white">
                    Other Consulting / Architecture Review
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Vance"
                    required
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    required
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Acme AI, Stealth, Agency"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Estimated Scope / Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white"
                  >
                    <option value="" className="bg-[#1a1a1a] text-slate-400">
                      Select budget range (Optional)
                    </option>
                    <option value="< $2,000" className="bg-[#1a1a1a] text-white">
                      &lt; $2,000 (Small sprint / Consultation)
                    </option>
                    <option value="$2,000 - $5,000" className="bg-[#1a1a1a] text-white">
                      $2,000 - $5,000 (MVP / Agent pipeline)
                    </option>
                    <option value="$5,000+" className="bg-[#1a1a1a] text-white">
                      $5,000+ (Full product development)
                    </option>
                    <option value="Hiring Full-time" className="bg-[#1a1a1a] text-white">
                      Full-time Engineering Role
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Project Details or Job Description *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your product vision, timeline, stack, or role expectations..."
                  required
                  rows={4}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white placeholder-slate-500 resize-none"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-blue-600/25 cursor-pointer ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Opening Mail Client...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message via Email</span>
                  </>
                )}
              </motion.button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 p-3 rounded-xl text-center text-xs font-medium"
                >
                  Your message has been composed. If your email client didn't open automatically, you can also reach me directly at{" "}
                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    className="underline text-emerald-200 font-bold hover:text-white inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{data.email}</span>
                    <Copy className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

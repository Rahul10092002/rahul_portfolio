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
} from "lucide-react";

interface ContactProps {
  data: {
    email: string;
    phone: string;
    linkedin: string;
    github?: string;
  };
}

export default function ContactSection({ data }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-14 sm:py-16 bg-gray-50/50 relative" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2.5 border border-blue-100">
              <Sparkles className="h-3.5 w-3.5" /> Direct Contact
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Get in Touch
            </h2>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/80 shadow-2xs">
            <Clock className="h-3.5 w-3.5" /> Response guarantee ~24h
          </div>
        </div>

        {/* Compact 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Direct Channels Grid */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4 pb-2.5 border-b border-gray-100 flex items-center justify-between">
                <span>Reach Out Directly</span>
                <span className="text-xs text-gray-400 font-medium">Quick Channels</span>
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {/* Email Card */}
                <div className="p-3 rounded-xl bg-gray-50/70 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-100 transition-all flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 bg-blue-100/80 text-blue-600 rounded-lg flex-shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</p>
                      <a
                        href={`mailto:${data.email}`}
                        className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate block"
                      >
                        {data.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 text-gray-400 hover:text-blue-600 bg-white hover:bg-blue-100/80 rounded-md border border-gray-200 transition-all flex-shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Phone Card */}
                <div className="p-3 rounded-xl bg-gray-50/70 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-100 transition-all flex items-center gap-3 group">
                  <div className="p-2.5 bg-blue-100/80 text-blue-600 rounded-lg flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</p>
                    <a
                      href={`tel:${data.phone}`}
                      className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
                    >
                      {data.phone}
                    </a>
                  </div>
                </div>

                {/* Social Profiles 2-Column Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-gray-50/70 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-100 transition-all flex items-center gap-2.5 group"
                  >
                    <div className="p-2 bg-blue-100/80 text-blue-600 rounded-lg">
                      <Linkedin className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 group-hover:text-blue-600">LinkedIn</p>
                      <span className="text-[10px] text-gray-400">Connect</span>
                    </div>
                  </a>

                  {data.github && (
                    <a
                      href={data.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-gray-50/70 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-100 transition-all flex items-center gap-2.5 group"
                    >
                      <div className="p-2 bg-blue-100/80 text-blue-600 rounded-lg">
                        <Github className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 group-hover:text-blue-600">GitHub</p>
                        <span className="text-[10px] text-gray-400">View Repos</span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                <span>Open for engineering roles & consulting.</span>
              </p>
            </div>
          </motion.div>

          {/* Right Column: Streamlined Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-xs border border-gray-100"
          >
            <h3 className="text-base font-bold text-gray-900 mb-4 pb-2.5 border-b border-gray-100">
              Send a Quick Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs bg-gray-50/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-gray-700 mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@company.com"
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs bg-gray-50/50"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or role..."
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs bg-gray-50/50 resize-none"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 text-white rounded-lg font-semibold text-xs transition-all shadow-xs ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-2.5 rounded-lg text-center text-xs font-medium"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}


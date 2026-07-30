"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, CheckCircle2, Activity, ArrowRight } from "lucide-react";

export interface ArchitectureStep {
  step: number;
  title: string;
  desc: string;
}

interface ArchitectureFlowchartProps {
  title?: string;
  steps: ArchitectureStep[];
}

export default function ArchitectureFlowchart({
  title = "System Architecture & Agentic Flow",
  steps,
}: ArchitectureFlowchartProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 backdrop-blur-md overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Network className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200 tracking-wide">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>Interactive Subgraph</span>
        </div>
      </div>

      {/* Nodes Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
        {steps.map((item, index) => {
          const isActive = activeStep === index;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(index)}
              className={`relative flex flex-col p-2.5 rounded-xl border transition-all duration-300 text-left ${
                isActive
                  ? "bg-gradient-to-b from-indigo-600/20 to-purple-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                  : "bg-slate-950/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  Step 0{item.step}
                </span>
                {isActive && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                )}
              </div>
              <span
                className={`text-xs font-medium truncate ${
                  isActive ? "text-white font-semibold" : "text-slate-400"
                }`}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Details Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl bg-slate-950/70 border border-indigo-500/20 p-4 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h5 className="text-sm font-semibold text-white">
                  Step 0{steps[activeStep].step}: {steps[activeStep].title}
                </h5>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

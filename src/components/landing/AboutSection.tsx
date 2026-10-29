"use client";

import React from "react";
import { CheckCircle2, Shield, Leaf, HeartHandshake } from "lucide-react";

export default function AboutSection() {
  const highlights = [
    {
      title: "Built for Smallholders & Commercial Growers",
      desc: "From 2-acre tomato plots in Tamil Nadu to extensive cereal acreage, AgriPulse AI scales seamlessly.",
    },
    {
      title: "Zero Black-Box Uncertainty",
      desc: "Every recommendation includes a clear 'Why This Recommendation?' breakdown with trade-off explanations.",
    },
    {
      title: "Circular Eco-Optimization",
      desc: "Balancing headline price against harvest timing, vehicle emissions, and post-harvest biological spoilage.",
    },
    {
      title: "Fair Market Transparency",
      desc: "Direct buyer discovery breaks opaque broker margins, returning maximum real value to the cultivator.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Story & Mission */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
            <span>ABOUT AGRIPULSE AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6 leading-tight">
            Bridging Traditional Agrarian Wisdom with{" "}
            <span className="gradient-text-emerald">Predictive Machine Intelligence.</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-6">
            For generations, farmers have worked tirelessly to grow food, only to face crushing uncertainty at harvest time. Opaque mandi prices, predatory middleman pricing, uncoordinated logistics, and perishable spoilage cause up to 30% of harvested crops to be lost before reaching consumers.
          </p>
          <p className="text-slate-300 text-base leading-relaxed mb-8">
            AgriPulse AI changes the paradigm. We provide a single, trustworthy decision co-pilot that forecasts exact maturity windows, projects multi-day market prices, pairs farmers directly with verified buyers, and calculates low-carbon transport so every harvest reaches its highest potential value.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Glassmorphic Interactive Overview Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
          <div className="relative glass-panel rounded-3xl p-8 border-emerald-500/30 bg-[#051c16]/85 shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-emerald-500/15 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Core Platform Objective</div>
                  <div className="text-base font-bold text-white">Zero Post-Harvest Waste</div>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                AI Verified
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Predictive Decision Confidence</span>
                  <span className="text-emerald-400 font-bold">88%</span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full w-[88%]" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Average Farmer Net Margin Gain</span>
                  <span className="text-teal-300 font-bold">+28% Net Revenue</span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-400 h-2 rounded-full w-[82%]" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Logistics Carbon Emission Cut</span>
                  <span className="text-cyan-300 font-bold">-42% CO₂e</span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full w-[74%]" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 to-[#031d16] border border-emerald-500/30 flex items-center gap-3">
              <HeartHandshake className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-white">Trust Guarantee:</span> AgriPulse AI operates as an independent advisor. We never charge hidden broker commissions on farmer transactions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

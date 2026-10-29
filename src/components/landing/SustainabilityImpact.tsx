"use client";

import React from "react";
import { TreePine, Droplets, TrendingUp, Scale, Sparkles } from "lucide-react";

export default function SustainabilityImpact() {
  const stats = [
    {
      value: "-65%",
      label: "Post-Harvest Spoilage",
      detail: "Preventing fresh vegetable and fruit rot via microclimate storage intelligence.",
      icon: TreePine,
      color: "from-emerald-400 to-teal-400",
    },
    {
      value: "-42%",
      label: "Logistics Carbon Footprint",
      detail: "Optimizing EV transit, aggregated rural hubs, and full-capacity route dispatching.",
      icon: Droplets,
      color: "from-teal-400 to-cyan-400",
    },
    {
      value: "+28%",
      label: "Farmer Net Income",
      detail: "Capturing peak mandi selling windows and matching with direct verified corporate buyers.",
      icon: TrendingUp,
      color: "from-cyan-400 to-blue-400",
    },
    {
      value: "-30%",
      label: "Water Conservation",
      detail: "Closed-loop soil moisture sensor triggers eliminate over-irrigation and root leaching.",
      icon: Scale,
      color: "from-emerald-400 to-lime-400",
    },
  ];

  return (
    <section id="sustainability" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="relative rounded-3xl glass-panel p-8 sm:p-14 border-emerald-500/25 overflow-hidden bg-gradient-to-b from-[#051f18]/80 to-[#03130e]/95">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>MEASURABLE CLIMATE & ECONOMIC IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Where Sustainability Directly{" "}
            <span className="gradient-text-emerald">Drives Profitability.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            True sustainability cannot be an afterthought. By eliminating waste and optimizing transportation, we generate higher earnings for farmers while protecting planetary resources.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass-card-interactive rounded-2xl p-6 border-emerald-500/20 bg-[#041913]/70 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-teal-300 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-base font-bold text-white mb-2">{stat.label}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{stat.detail}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-emerald-500/10 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Audited Metric</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

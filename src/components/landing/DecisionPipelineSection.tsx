"use client";

import React from "react";
import {
  Database,
  LineChart,
  Users,
  Truck,
  ShieldAlert,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function DecisionPipelineSection() {
  const steps = [
    {
      step: "01",
      icon: Database,
      title: "Farm Data",
      subtitle: "Soil, weather, crop NDVI telemetry",
      color: "from-emerald-400 to-teal-500",
    },
    {
      step: "02",
      icon: LineChart,
      title: "Predict",
      subtitle: "Harvest yields & 5-day market prices",
      color: "from-teal-400 to-cyan-500",
    },
    {
      step: "03",
      icon: Users,
      title: "Match Buyers",
      subtitle: "Multi-weighted buyer ranking",
      color: "from-cyan-400 to-sky-500",
    },
    {
      step: "04",
      icon: Truck,
      title: "Optimize Logistics",
      subtitle: "Green transit & cold-chain routing",
      color: "from-sky-400 to-blue-500",
    },
    {
      step: "05",
      icon: ShieldAlert,
      title: "Reduce Food Loss",
      subtitle: "Microclimate spoilage forecasting",
      color: "from-emerald-400 to-lime-500",
    },
    {
      step: "06",
      icon: Compass,
      title: "Best Action",
      subtitle: "Single unified harvest-to-market plan",
      color: "from-green-400 to-emerald-500",
    },
  ];

  return (
    <section id="pipeline" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
          <span>THE UNIFIED PIPELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
          Connected Decision Intelligence,{" "}
          <span className="gradient-text-emerald">Not Isolated Features.</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Traditional agtech treats weather, mandi prices, and logistics as separate apps.
          AgriPulse AI connects telemetry directly into a continuous harvest-to-sale optimization pipeline.
        </p>
      </div>

      {/* Step Pipeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="glass-card-interactive rounded-2xl p-6 border-emerald-500/20 relative overflow-hidden group"
            >
              {/* Top Step Number */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  STEP {item.step}
                </span>
                <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">
                  0{idx + 1} / 06
                </span>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-900/60 to-slate-900 border border-emerald-500/25 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                <Icon className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.subtitle}
              </p>

              {/* Bottom connecting accent bar */}
              <div className="mt-5 pt-4 border-t border-emerald-500/10 flex items-center justify-between text-xs text-emerald-400/80 font-medium">
                <span>Integrated Engine</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Summary Banner */}
      <div className="mt-10 glass-panel rounded-2xl p-6 sm:p-8 border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#051d16] via-[#082b20] to-[#041913]">
        <div className="text-left">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            CORE PHILOSOPHY
          </div>
          <div className="text-lg sm:text-xl font-bold text-white">
            High headline prices don&apos;t matter if 10% rots or shipping costs eat your margin.
          </div>
          <div className="text-sm text-slate-400 mt-1">
            AgriPulse AI optimizes for <span className="text-emerald-300 font-semibold">Net Realized Profit</span> and <span className="text-cyan-300 font-semibold">Lowest Carbon Emissions</span>.
          </div>
        </div>
        <a
          href="/dashboard"
          className="shrink-0 px-6 py-3 rounded-xl bg-emerald-400 text-black font-semibold text-sm hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/20 active:scale-95"
        >
          See Recommendation in Action
        </a>
      </div>
    </section>
  );
}

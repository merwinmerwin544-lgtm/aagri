"use client";

import React from "react";
import {
  Activity,
  TrendingUp,
  Target,
  Truck,
  ShieldCheck,
  BrainCircuit,
  Sliders,
  Mic,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function FeaturesGrid() {
  const features = [
    {
      icon: Activity,
      title: "Precision Farm Intelligence",
      description:
        "Fuses satellite NDVI vegetation indices, soil moisture telemetry, and hyper-local microclimate sensors to predict exact crop maturity and yield with 87%+ confidence.",
      badge: "Satellite & Sensors",
      tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: TrendingUp,
      title: "AI Market Price Forecasting",
      description:
        "Projects 5-day wholesale mandi price curves. Identifies peak selling windows so farmers sell when demand is highest instead of falling victim to glut pricing.",
      badge: "5-Day Predictive",
      tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      icon: Target,
      title: "Smart Buyer Matching",
      description:
        "Multi-factor weighted algorithm evaluates price (30%), quality grade (20%), proximity (15%), demand urgency (15%), and reliability to match verified bulk buyers.",
      badge: "Weighted Ranking",
      tagColor: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    },
    {
      icon: Truck,
      title: "Green Logistics Optimization",
      description:
        "Calculates low-carbon transit routes, collection hubs, and EV light carrier dispatching to slash transit costs and reduce agricultural logistics emissions by 42%.",
      badge: "Eco Routing",
      tagColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: ShieldCheck,
      title: "Microclimate Food-Loss Reduction",
      description:
        "Simulates storage decay curves based on ambient temperature, humidity, and transit duration. Prevents post-harvest rot before produce ever leaves the farm gate.",
      badge: "-65% Spoilage",
      tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: BrainCircuit,
      title: "Sustainable Decision Engine",
      description:
        "The core brain. Synthesizes yield, price trends, buyer ratings, logistics, and loss risks into one actionable, farmer-friendly harvest and split-selling recommendation.",
      badge: "Unified Optimizer",
      tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: Sliders,
      title: "Interactive What-If Simulator",
      description:
        "Explore real-time trade-offs between selling today vs holding 3, 5, or 6 days. Inspect side-by-side net profit, storage costs, and carbon implications.",
      badge: "Scenario Lab",
      tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: Mic,
      title: "Multilingual Voice Interface",
      description:
        "Farmers speak naturally in their native language—English, Tamil (தமிழ்), or Hindi (हिन्दी)—to receive instant audio recommendations on their mobile devices.",
      badge: "Voice & Speech",
      tagColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
          <span>PRECISION AGRICULTURAL SUITE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
          Engineered for Farmers,{" "}
          <span className="gradient-text-emerald">Powered by Applied AI.</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Explore the full ecosystem of intelligent tools designed to convert raw farm observations into profitable, climate-conscious market decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="glass-card-interactive rounded-2xl p-6 border-emerald-500/20 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-900/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${feat.tagColor}`}>
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-300/80 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-500/10 flex items-center justify-between">
                <Link
                  href="/dashboard"
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-200 flex items-center gap-1 group/link"
                >
                  <span>Explore in App</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

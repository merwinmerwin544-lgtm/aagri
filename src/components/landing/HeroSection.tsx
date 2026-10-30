"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Sprout,
  ShieldCheck,
  ChevronDown,
  Layers,
  Activity,
} from "lucide-react";

export default function HeroSection() {
  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.querySelector("#pipeline");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center z-10">
      {/* Brand Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-agri text-xs font-semibold text-[#A8D86D] border border-[#E1F5DC]/16 shadow-lg mb-6">
        <span className="w-2 h-2 rounded-full bg-[#A8D86D] animate-pulse" />
        <span>Uzhavan AI • Autonomous Farm Intelligence</span>
      </div>

      {/* Main Headline */}
      <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F4F7EF] leading-[1.15] mb-5">
        Where Intelligence Meets{" "}
        <span className="text-[#A8D86D]">
          Sustainable Agriculture.
        </span>
      </h1>

      {/* Supporting Description */}
      <p className="max-w-2xl text-sm sm:text-base text-[#B8CCAE] leading-relaxed mb-8">
        Transforming farming decisions with AI-powered crop intelligence, future price
        predictions, smarter buyer matching, and sustainable farm-to-market optimization.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-14 w-full sm:w-auto">
        <button
          onClick={scrollToFeatures}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-[#09271B] bg-[#A8D86D] hover:bg-[#b9e584] shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Explore Uzhavan AI</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <Link
          href="/dashboard"
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-[#F4F7EF] hover:bg-[#123D2B] glass-panel-agri border border-[#E1F5DC]/20 transition-all flex items-center justify-center gap-2"
        >
          <span>Launch Dashboard</span>
          <Activity className="w-4 h-4 text-[#A8D86D]" />
        </Link>
      </div>

      {/* 4 Compact Metric Cards matching Reference Screenshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl w-full mb-10 text-left">
        <div className="glass-panel-agri rounded-2xl p-3.5 border border-[#E1F5DC]/16">
          <div className="text-[10px] text-[#B8CCAE] font-medium">AI Health Score</div>
          <div className="text-xl font-extrabold text-[#F4F7EF] my-0.5">86 /100</div>
          <div className="text-[10px] text-[#A8D86D]">● Good Outlook</div>
        </div>

        <div className="glass-panel-agri rounded-2xl p-3.5 border border-[#E1F5DC]/16">
          <div className="text-[10px] text-[#B8CCAE] font-medium">Peak Mandi Price</div>
          <div className="text-xl font-extrabold text-[#F4F7EF] my-0.5">₹32/kg</div>
          <div className="text-[10px] text-[#A8D86D]">Day 3 Opportunity</div>
        </div>

        <div className="glass-panel-agri rounded-2xl p-3.5 border border-[#E1F5DC]/16">
          <div className="text-[10px] text-[#B8CCAE] font-medium">Food Loss Reduction</div>
          <div className="text-xl font-extrabold text-[#F4F7EF] my-0.5">-65%</div>
          <div className="text-[10px] text-[#A8D86D]">Spoilage Mitigated</div>
        </div>

        <div className="glass-panel-agri rounded-2xl p-3.5 border border-[#E1F5DC]/16">
          <div className="text-[10px] text-[#B8CCAE] font-medium">Logistics Carbon Cut</div>
          <div className="text-xl font-extrabold text-[#F4F7EF] my-0.5">-42%</div>
          <div className="text-[10px] text-[#A8D86D]">EV Green Transit</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToFeatures}
        className="text-[#B8CCAE] hover:text-[#A8D86D] transition-colors text-xs flex flex-col items-center gap-1 cursor-pointer"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest">Scroll to Pipeline</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}

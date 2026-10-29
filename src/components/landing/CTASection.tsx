"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="relative rounded-3xl glass-panel p-8 sm:p-14 border-emerald-500/30 overflow-hidden text-center bg-gradient-to-b from-[#06241c] to-[#03130e]">
        {/* Luminous glow circles */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>INSTANT CLIENT DEMONSTRATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Ready to Transform Your Farm&apos;s{" "}
            <span className="gradient-text-emerald">Harvest-to-Market Strategy?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg mb-10 leading-relaxed">
            Test the live client application now. Explore precision NDVI crop health, 5-day mandi price forecasting, multi-weighted buyer matching, and the interactive What-If scenario simulator.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:shadow-xl hover:shadow-emerald-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Launch Client Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-emerald-300 hover:text-white bg-[#041a14] hover:bg-[#072a20] border border-emerald-500/30 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Demo Login Access</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Sprout, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-500/15 bg-[#020b08] py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#03130e] rounded-[10px] flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AgriPulse<span className="text-emerald-400">.ai</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              AI-Driven Sustainable Farm-to-Market Optimization for Farmers. Eliminating post-harvest food waste and empowering growers through predictive intelligence.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-[11px] text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Frontend Prototype • Architected for Backend Expert Handoff</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-emerald-300 transition-colors">
                  Precision Crop Health
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-300 transition-colors">
                  5-Day Mandi Price Prediction
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-300 transition-colors">
                  Multi-Factor Buyer Matching
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-300 transition-colors">
                  Green Logistics Transit
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-300 transition-colors">
                  Microclimate Spoilage Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Client App
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-emerald-300 transition-colors">
                  Farmer Overview
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-300 transition-colors">
                  What-If Simulator
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-300 transition-colors">
                  Decision Recommendation
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-300 transition-colors">
                  Voice Co-pilot (Tamil/Hindi)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-300 transition-colors">
                  Buyer-Facing Procurement
                </Link>
              </li>
            </ul>
          </div>

          {/* Integration & Handoff */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Backend Integration
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="text-slate-300">Typed Contracts:</span> `@/types`
              </li>
              <li>
                <span className="text-slate-300">Service Layer:</span> `@/services/api`
              </li>
              <li>
                <span className="text-slate-300">Mock Datasets:</span> `@/services/mockData`
              </li>
              <li>
                <span className="text-slate-300">State Models:</span> Farm & Buyer APIs
              </li>
              <li>
                <Link href="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Access Demo Login →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 AgriPulse AI. All rights reserved. Built for sustainable agriculture.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

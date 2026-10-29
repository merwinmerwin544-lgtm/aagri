"use client";

import React, { useState } from "react";
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Truck,
  Leaf,
  Scale,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  DollarSign,
  Info,
} from "lucide-react";
import { DecisionEngineStrategy, FarmerProfile } from "@/types";

interface DecisionEngineViewProps {
  strategy: DecisionEngineStrategy;
  profile: FarmerProfile;
  onOpenWhy: () => void;
  onOpenWhatIf: () => void;
}

export default function DecisionEngineView({
  strategy,
  profile,
  onOpenWhy,
  onOpenWhatIf,
}: DecisionEngineViewProps) {
  const [activeStrategyTab, setActiveStrategyTab] = useState<"optimal" | "sell-today" | "hold-6">(
    "optimal"
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border-purple-500/30 bg-gradient-to-r from-[#081a24] via-[#0b251e] to-[#051c14]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 via-emerald-400 to-cyan-400 p-0.5 shadow-lg shadow-purple-900/30">
              <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-purple-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Sustainable Decision Engine
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Central AI Optimizer</span>
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Synthesizing yield, future mandi curves, buyer rankings, logistics emissions, and biological food-loss into a single harvest strategy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenWhy}
              className="px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Why This Recommendation?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Recommendation Showcase Card (Prompt Section 12 Spec) */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border-emerald-400/40 bg-gradient-to-r from-[#04241a] via-[#073325] to-[#041f17] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-400 text-black text-xs font-extrabold uppercase tracking-wider">
              ★ PRIMARY HARVEST & SALE STRATEGY
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Optimization Confidence:</span>
              <span className="font-extrabold text-emerald-400 text-sm">
                {strategy.confidenceScore}% (High)
              </span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
            &ldquo;{strategy.summary}&rdquo;
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-3xl">
            {strategy.whyChosenExplanation}
          </p>

          {/* Allocation Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  PRIMARY TRANCHE (70%)
                </span>
                <div className="text-base font-bold text-white mt-0.5">
                  {strategy.allocation.primaryBuyerName}
                </div>
                <div className="text-xs text-slate-400">{strategy.allocation.primaryTimeline}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-emerald-400">2.66 t</div>
                <div className="text-[10px] text-slate-400">At ₹32/kg</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  SECONDARY HEDGE (30%)
                </span>
                <div className="text-base font-bold text-white mt-0.5">
                  {strategy.allocation.secondaryAction}
                </div>
                <div className="text-xs text-slate-400">{strategy.allocation.secondaryTimeline}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-cyan-300">1.14 t</div>
                <div className="text-[10px] text-slate-400">Local Mandi Floor</div>
              </div>
            </div>
          </div>

          {/* 5 Financial & Sustainable Balance Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-emerald-500/20 text-xs">
            <div className="p-3 rounded-xl bg-black/30 border border-emerald-500/15">
              <span className="text-[10px] text-slate-400 block">Gross Realization</span>
              <span className="text-lg font-extrabold text-white">
                ₹{strategy.expectedGrossRevenueInr.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-emerald-500/15">
              <span className="text-[10px] text-slate-400 block">EV Transport Fee</span>
              <span className="text-lg font-extrabold text-slate-200">
                -₹{strategy.transportCostInr.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-emerald-500/15">
              <span className="text-[10px] text-slate-400 block">Food Loss Value</span>
              <span className="text-lg font-extrabold text-amber-300">
                -₹{strategy.expectedLossInr.toLocaleString()} (3.2%)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-400/30">
              <span className="text-[10px] text-emerald-300 block font-bold">NET REALIZED PROFIT</span>
              <span className="text-xl font-extrabold text-emerald-400">
                ₹{strategy.netRevenueInr.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-cyan-500/20">
              <span className="text-[10px] text-cyan-300 block">Carbon Footprint</span>
              <span className="text-lg font-extrabold text-cyan-300">
                {strategy.carbonFootprintKg} kg CO₂e
              </span>
            </div>
          </div>

          {/* Call-to-action buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenWhy}
              className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <span>Why This Recommendation?</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenWhatIf}
              className="px-5 py-2.5 rounded-xl bg-[#06241a] hover:bg-[#093526] border border-emerald-500/30 text-emerald-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Compare Alternative Scenarios</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sustainable Value Principle Callout */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
        <div className="flex items-start gap-3">
          <Scale className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              Core Sustainable Value Rule
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The highest headline price is <span className="text-amber-300 font-bold">not automatically</span> the best choice. For instance, waiting 5 days offers ₹33/kg (₹1 higher), but biological food loss rises to 8%, eroding ₹9,400 in net profit while increasing transport carbon. AgriPulse AI selects the true mathematical optimum for net farmer wealth and planetary health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

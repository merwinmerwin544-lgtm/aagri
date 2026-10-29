"use client";

import React from "react";
import {
  X,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Truck,
  ShieldCheck,
  Scale,
  Sparkles,
} from "lucide-react";
import { DecisionEngineStrategy } from "@/types";

interface AIExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategy: DecisionEngineStrategy;
  onOpenWhatIf: () => void;
}

export default function AIExplanationModal({
  isOpen,
  onClose,
  strategy,
  onOpenWhatIf,
}: AIExplanationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/35 bg-[#03150e]/95 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-emerald-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-[#02100b] rounded-[14px] flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-purple-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Why This Recommendation?
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                AI Explanation Layer
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Transparent multi-variable trade-off analysis explaining the optimal strategy
            </p>
          </div>
        </div>

        {/* The Action Summary Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#05291f] to-emerald-950/80 border border-emerald-500/30 mb-6 shadow-md">
          <div className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider mb-1">
            OPTIMIZED STRATEGY VERDICT
          </div>
          <div className="text-base font-extrabold text-white mb-2">
            &ldquo;{strategy.summary}&rdquo;
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-500/20 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Expected Gross:</span>
              <span className="font-bold text-white">₹{strategy.expectedGrossRevenueInr.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Transport Cost:</span>
              <span className="font-bold text-white">₹{strategy.transportCostInr.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Net Realized:</span>
              <span className="font-bold text-emerald-400">₹{strategy.netRevenueInr.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Carbon Footprint:</span>
              <span className="font-bold text-cyan-300">{strategy.carbonFootprintKg} kg CO₂e</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Rationale */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/15">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>1. Price Window Arbitrage vs Decay Rate</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Waiting 3 days captures the peak wholesale mandi price of ₹32/kg (compared to today&apos;s ₹28/kg). Over 3.8 tonnes, this price surge yields +₹15,200 in gross revenue. While holding incurs an estimated 3.2% moisture and sorting loss (₹3,904), your net profit is still ₹11,300 higher than selling today.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/15">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300 mb-1">
              <Scale className="w-4 h-4 text-teal-400" />
              <span>2. Why Buyer A (Kovai Fresh Mart) Was Selected</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Buyer A scored 94% on our multi-weighted ranking because they pay premium for Grade A unblemished tomatoes and accept 3.0 tonnes immediately. Other buyers with slightly higher nominal rates require Grade B or are located 65 km away in Pollachi, where transport costs would erase any price advantage.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/15">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>3. Low-Carbon EV Transit Dispatching</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dispatching produce via an Electric Light Truck (EV) along the Singanallur Hub corridor restricts carbon emissions to only 8.2 kg CO₂e (42% lower than traditional diesel mini-trucks).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/15">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-1">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>4. Why Split Allocation (70% in 3 Days, 30% Later)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dividing the harvest hedges your risk against unexpected mandi oversupply while securing immediate working capital from Buyer A for 70% of the volume.
            </p>
          </div>
        </div>

        {/* Positive & Negative Trade-offs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
            <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Positive Trade-offs</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              {strategy.positiveTradeoffs.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/20">
            <div className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Care Requirements & Risks</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              {strategy.negativeTradeoffs.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Residual Uncertainty Callout */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 mb-6 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">Residual Meteorological Alert: </span>
            {strategy.residualUncertainty}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-emerald-500/20">
          <button
            onClick={() => {
              onClose();
              onOpenWhatIf();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-colors"
          >
            Compare in What-If Simulator →
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs transition-colors"
          >
            Accept Strategy & Close
          </button>
        </div>
      </div>
    </div>
  );
}

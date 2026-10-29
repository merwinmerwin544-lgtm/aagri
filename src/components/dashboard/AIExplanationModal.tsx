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
import { useLanguage } from "@/context/LanguageContext";

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
  const { t, tr } = useLanguage();

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
                {t.whyThisRecommendation}
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                {t.explanationTitle}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t.explanationSubtitle}
            </p>
          </div>
        </div>

        {/* The Action Summary Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#05291f] to-emerald-950/80 border border-emerald-500/30 mb-6 shadow-md">
          <div className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider mb-1">
            {t.currentStrategy}
          </div>
          <div className="text-base font-extrabold text-white mb-2">
            &ldquo;{t.recommendationAction}&rdquo;
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-500/20 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">{t.totalRevenueGenerated}:</span>
              <span className="font-bold text-white">₹{strategy.expectedGrossRevenueInr.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">{t.transportCost}:</span>
              <span className="font-bold text-white">₹{strategy.transportCostInr.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">{t.netPayout}:</span>
              <span className="font-bold text-emerald-400">₹{strategy.netRevenueInr.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">{t.co2Emissions}:</span>
              <span className="font-bold text-cyan-300">{strategy.carbonFootprintKg} kg</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Rationale */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/15">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>1. {t.factorPrice}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Waiting 3 days captures the peak wholesale mandi price of ₹32/kg. Over 3.8 tonnes, this yields +₹15,200 gross revenue with +₹11,300 net gain even after holding losses.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/15">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300 mb-1">
              <Scale className="w-4 h-4 text-teal-400" />
              <span>2. {t.factorBuyerESG}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Buyer A scored 94% on ESG rating and provides reliable 24-hour turnaround for 3.0 tonnes of produce.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/15">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>3. {t.factorLogistics}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.evGreenBenefit} via low-carbon electric vehicle transit along the agro corridor.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/15">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-1">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>4. {t.factorShelfLife}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dividing the harvest 70% immediate and 30% hedged minimizes spoil risks while guaranteeing cashflow.
            </p>
          </div>
        </div>

        {/* Positive & Negative Trade-offs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
            <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.positiveTradeoffsTitle || "Positive Trade-offs"}</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              {strategy.positiveTradeoffs.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400">•</span>
                  <span>{tr(item)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/20">
            <div className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>{t.negativeTradeoffsTitle || "Care Requirements & Risks"}</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              {strategy.negativeTradeoffs.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>{tr(item)}</span>
                </li>
              ))}
            </ul>
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
            {t.whatIfSimulator} →
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}

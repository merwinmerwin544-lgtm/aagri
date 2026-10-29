"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Thermometer,
  Droplets,
  Clock,
  Sparkles,
  AlertTriangle,
  Info,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { FoodLossScenario } from "@/types";
import { sampleFoodLossScenarios } from "@/services/mockData";
import { useLanguage } from "@/context/LanguageContext";

export default function FoodLossView() {
  const { t, tr } = useLanguage();
  const [ambientTempC, setAmbientTempC] = useState(26);
  const [storageDays, setStorageDays] = useState(3);
  const [crateType, setCrateType] = useState<"ventilated" | "gunny">("ventilated");

  // Dynamic loss formula based on temperature, duration, crate
  const calculateDynamicLoss = (days: number) => {
    let base = days * 1.1;
    if (ambientTempC > 28) base += (ambientTempC - 28) * 0.8;
    if (crateType === "gunny") base *= 1.6;
    return Math.min(18, Math.max(1.8, parseFloat(base.toFixed(1))));
  };

  const dynamicLossPct = calculateDynamicLoss(storageDays);
  const dynamicLossQty = ((3.8 * dynamicLossPct) / 100).toFixed(3);
  const dynamicLossValue = Math.round(parseFloat(dynamicLossQty) * 1000 * 32);

  // Spoilage curve
  const curveData = [
    { day: "Day 0", loss: 1.5 },
    { day: "Day 1", loss: calculateDynamicLoss(1) },
    { day: "Day 2", loss: calculateDynamicLoss(2) },
    { day: "Day 3", loss: calculateDynamicLoss(3) },
    { day: "Day 4", loss: calculateDynamicLoss(4) },
    { day: "Day 5", loss: calculateDynamicLoss(5) },
    { day: "Day 6", loss: calculateDynamicLoss(6) },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-amber-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {t.foodLossTitle}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  {t.foodLoss}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t.foodLossSubtitle}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            {t.safeWindow}
          </span>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Scenario A: Sell Today */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300">{t.today}</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">
              {t.lowPriority}
            </span>
          </div>
          <div className="text-xl font-extrabold text-white mb-1">{t.today}</div>
          <div className="text-3xl font-extrabold text-emerald-400 mb-2">2.0% {t.foodLoss}</div>
          <div className="space-y-1 text-xs text-slate-300 border-t border-emerald-500/15 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-400">{t.projectedFoodLoss}:</span>
              <span className="font-semibold text-white">0.076 {t.tonnes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{t.perishabilityWindow}:</span>
              <span className="font-semibold text-white">0 {t.inDays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{t.status}:</span>
              <span className="font-semibold text-emerald-400">{t.goodLevel}</span>
            </div>
          </div>
        </div>

        {/* Scenario B: Wait 3 Days (Optimal) */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-400 ring-2 ring-emerald-400/30 bg-[#05251b]/80 shadow-xl shadow-emerald-950">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-300">{t.optimalWindow}</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-400 text-black">
              ★ {t.currentStrategy}
            </span>
          </div>
          <div className="text-xl font-extrabold text-white mb-1">3 {t.inDays}</div>
          <div className="text-3xl font-extrabold text-emerald-300 mb-2">3.2% - 4.0% {t.foodLoss}</div>
          <div className="space-y-1 text-xs text-slate-300 border-t border-emerald-500/20 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-300">{t.projectedFoodLoss}:</span>
              <span className="font-semibold text-white">0.122 {t.tonnes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">{t.perishabilityWindow}:</span>
              <span className="font-semibold text-white">3 {t.inDays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">{t.roiImpact}:</span>
              <span className="font-semibold text-emerald-300">+₹11,300</span>
            </div>
          </div>
        </div>

        {/* Scenario C: Wait 6 Days */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300">{t.criticalWindow}</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300">
              {t.highPriority}
            </span>
          </div>
          <div className="text-xl font-extrabold text-white mb-1">6 {t.inDays}</div>
          <div className="text-3xl font-extrabold text-rose-400 mb-2">9.0% {t.foodLoss}</div>
          <div className="space-y-1 text-xs text-slate-300 border-t border-emerald-500/15 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-400">{t.projectedFoodLoss}:</span>
              <span className="font-semibold text-white">0.342 {t.tonnes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{t.perishabilityWindow}:</span>
              <span className="font-semibold text-white">6 {t.inDays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{t.status}:</span>
              <span className="font-semibold text-rose-400">{t.poor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Microclimate Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">{t.whatIfTitle}</h3>
            <Sliders className="w-4 h-4 text-emerald-400" />
          </div>

          {/* Temperature Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.weather}:</span>
              </span>
              <span className="font-bold text-white">{ambientTempC}°C</span>
            </div>
            <input
              type="range"
              min="18"
              max="36"
              value={ambientTempC}
              onChange={(e) => setAmbientTempC(parseInt(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Storage Duration Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.perishabilityWindow}:</span>
              </span>
              <span className="font-bold text-white">{storageDays} {t.inDays}</span>
            </div>
            <input
              type="range"
              min="0"
              max="7"
              value={storageDays}
              onChange={(e) => setStorageDays(parseInt(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Packaging Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t.storageCondition}:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setCrateType("ventilated")}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  crateType === "ventilated"
                    ? "bg-emerald-500/20 border-emerald-400 text-white font-bold"
                    : "bg-black/30 border-slate-700 text-slate-400"
                }`}
              >
                <div>{t.coldChainStorage}</div>
                <div className="text-[10px] text-emerald-400 font-normal">{t.good}</div>
              </button>
              <button
                type="button"
                onClick={() => setCrateType("gunny")}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  crateType === "gunny"
                    ? "bg-amber-500/20 border-amber-400 text-white font-bold"
                    : "bg-black/30 border-slate-700 text-slate-400"
                }`}
              >
                <div>{t.ambientStorage}</div>
                <div className="text-[10px] text-amber-400 font-normal">{t.average}</div>
              </button>
            </div>
          </div>

          {/* Dynamic Result Box */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/25">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
              {t.simulatedOutcome}
            </div>
            <div className="text-2xl font-extrabold text-white mb-1">
              {dynamicLossPct}% {t.foodLoss}
            </div>
            <div className="text-xs text-slate-300">
              ~{dynamicLossQty} {t.tonnes} (~₹{dynamicLossValue.toLocaleString()}) {t.perishabilityWindow}: {storageDays} {t.inDays} @ {ambientTempC}°C.
            </div>
          </div>
        </div>

        {/* Spoilage Progression Curve */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
          <h3 className="text-sm font-bold text-white mb-1">{t.spoilageCurve}</h3>
          <p className="text-xs text-slate-400 mb-4">
            {t.foodLossSubtitle}
          </p>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(52, 211, 153, 0.08)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis domain={[0, 16]} stroke="#64748b" fontSize={11} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#03150e",
                    borderColor: "rgba(52, 211, 153, 0.3)",
                    borderRadius: "12px",
                    fontSize: "11px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="loss"
                  name={t.foodLoss}
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-500/15 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.lossMitigationChecklist}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

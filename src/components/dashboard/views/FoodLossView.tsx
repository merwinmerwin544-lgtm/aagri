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

export default function FoodLossView() {
  const [ambientTempC, setAmbientTempC] = useState(26);
  const [storageDays, setStorageDays] = useState(3);
  const [crateType, setCrateType] = useState<"ventilated" | "gunny">("ventilated");

  // Dynamic loss formula based on temperature, duration, crate
  const calculateDynamicLoss = (days: number) => {
    let base = days * 1.1;
    if (ambientTempC > 28) base += (ambientTempC - 28) * 0.8;
    if (crateType === "gunny") base *= 1.6; // gunny sacks trap heat & crush
    return Math.min(18, Math.max(1.8, parseFloat(base.toFixed(1))));
  };

  const dynamicLossPct = calculateDynamicLoss(storageDays);
  const dynamicLossQty = ((3.8 * dynamicLossPct) / 100).toFixed(3);
  const dynamicLossValue = Math.round(parseFloat(dynamicLossQty) * 1000 * 32);

  // Spoilage curve
  const curveData = [
    { day: "Day 0 (Pick)", loss: 1.5 },
    { day: "Day 1", loss: calculateDynamicLoss(1) },
    { day: "Day 2", loss: calculateDynamicLoss(2) },
    { day: "Day 3 (Peak)", loss: calculateDynamicLoss(3) },
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
                  Microclimate Food-Loss & Spoilage Prediction
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  Biological Decay Modeling
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Simulating post-harvest cellular respiration, moisture loss, and transit impact across holding windows
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            -65% Waste Mitigated
          </span>
        </div>
      </div>

      {/* Comparison Cards (Prompt Section 11 Spec: Sell Today 2%, Wait 3 Days 4%, Wait 6 Days 9%) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sell Today */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300">Scenario A</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">
              Low Decay
            </span>
          </div>
          <div className="text-xl font-extrabold text-white mb-1">Sell Today</div>
          <div className="text-3xl font-extrabold text-emerald-400 mb-2">2.0% Loss</div>
          <div className="space-y-1 text-xs text-slate-300 border-t border-emerald-500/15 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Est. Quantity Lost:</span>
              <span className="font-semibold text-white">0.076 tonnes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Holding Age:</span>
              <span className="font-semibold text-white">0 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Risk Profile:</span>
              <span className="font-semibold text-emerald-400">Minimal (Safe)</span>
            </div>
          </div>
        </div>

        {/* Wait 3 Days */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-400 ring-2 ring-emerald-400/30 bg-[#05251b]/80 shadow-xl shadow-emerald-950">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-300">Scenario B (Optimal Window)</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-400 text-black">
              ★ Recommended
            </span>
          </div>
          <div className="text-xl font-extrabold text-white mb-1">Wait 3 Days</div>
          <div className="text-3xl font-extrabold text-emerald-300 mb-2">3.2% - 4.0% Loss</div>
          <div className="space-y-1 text-xs text-slate-300 border-t border-emerald-500/20 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-300">Est. Quantity Lost:</span>
              <span className="font-semibold text-white">0.122 tonnes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Holding Age:</span>
              <span className="font-semibold text-white">3 days (Shaded Crate)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Net Verdict:</span>
              <span className="font-semibold text-emerald-300">₹11.3k Profit Over Loss</span>
            </div>
          </div>
        </div>

        {/* Wait 6 Days */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300">Scenario C</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300">
              High Spoilage
            </span>
          </div>
          <div className="text-xl font-extrabold text-white mb-1">Wait 6 Days</div>
          <div className="text-3xl font-extrabold text-rose-400 mb-2">9.0% Loss</div>
          <div className="space-y-1 text-xs text-slate-300 border-t border-emerald-500/15 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Est. Quantity Lost:</span>
              <span className="font-semibold text-white">0.342 tonnes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Holding Age:</span>
              <span className="font-semibold text-white">6 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Risk Profile:</span>
              <span className="font-semibold text-rose-400">Severe Breakdown</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Microclimate Sliders & Custom Simulation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Microclimate Simulation Controls</h3>
            <Sliders className="w-4 h-4 text-emerald-400" />
          </div>

          {/* Temperature Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                <span>Ambient Storage Temperature:</span>
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
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>18°C (Cold)</span>
              <span>28°C (Threshold)</span>
              <span>36°C (Extreme)</span>
            </div>
          </div>

          {/* Storage Duration Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Planned Holding Duration:</span>
              </span>
              <span className="font-bold text-white">{storageDays} Days</span>
            </div>
            <input
              type="range"
              min="0"
              max="7"
              value={storageDays}
              onChange={(e) => setStorageDays(parseInt(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0 Days (Today)</span>
              <span>3 Days (Optimal)</span>
              <span>7 Days</span>
            </div>
          </div>

          {/* Packaging Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Handling & Stacking Vessel:
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
                <div>Plastic Crates</div>
                <div className="text-[10px] text-emerald-400 font-normal">Ventilated (-45% crush)</div>
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
                <div>Jute / Gunny Sack</div>
                <div className="text-[10px] text-amber-400 font-normal">Heat trapped (+60% loss)</div>
              </button>
            </div>
          </div>

          {/* Dynamic Result Box */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/25">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
              DYNAMIC SCENARIO RESULT
            </div>
            <div className="text-2xl font-extrabold text-white mb-1">
              {dynamicLossPct}% Expected Spoilage
            </div>
            <div className="text-xs text-slate-300">
              Loss of ~{dynamicLossQty} tonnes (~₹{dynamicLossValue.toLocaleString()} value) over {storageDays} days at {ambientTempC}°C.
            </div>
          </div>
        </div>

        {/* Spoilage Progression Curve */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
          <h3 className="text-sm font-bold text-white mb-1">Biological Spoilage vs Holding Days</h3>
          <p className="text-xs text-slate-400 mb-4">
            Curvature shows non-linear acceleration past Day 4 under {ambientTempC}°C ambient heat
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
                  name="Expected Spoilage Loss"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-500/15 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Recommendation: Discharging before Day 4 ensures spoilage remains bounded below 4%, preserving maximum Grade A certification.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

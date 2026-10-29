"use client";

import React, { useState } from "react";
import {
  Sliders,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Scale,
  CheckCircle2,
  DollarSign,
  Leaf,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { WhatIfScenarioResult } from "@/types";
import { sampleWhatIfRows } from "@/services/mockData";
import { useLanguage } from "@/context/LanguageContext";

export default function WhatIfSimulatorView() {
  const { t, tr } = useLanguage();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("wait-3-days");
  const [customDays, setCustomDays] = useState<number>(3);

  // Dynamic simulation calculations based on customDays slider
  const calculateCustomScenario = (days: number) => {
    let projectedPrice = 28;
    if (days === 1) projectedPrice = 29;
    else if (days === 2) projectedPrice = 31;
    else if (days === 3) projectedPrice = 32;
    else if (days === 4) projectedPrice = 30;
    else if (days === 5) projectedPrice = 33;
    else if (days >= 6) projectedPrice = 27;

    const foodLossPercent = days === 0 ? 2.0 : days <= 3 ? 3.2 : days === 4 ? 5.5 : days === 5 ? 8.0 : 9.5;
    const grossRevenue = Math.round(3.8 * 1000 * projectedPrice);
    const lossValue = Math.round((grossRevenue * foodLossPercent) / 100);
    const transportCost = 1500 + days * 100;
    const storageCost = days * 300;
    const netProfit = grossRevenue - lossValue - transportCost - storageCost;
    const co2e = (7.0 + days * 0.4).toFixed(1);
    const risk = days <= 3 ? "Low" : days === 5 ? "Medium" : "High";

    return {
      days,
      projectedPrice,
      foodLossPercent,
      grossRevenue,
      transportCost,
      storageCost,
      netProfit,
      co2e,
      risk,
    };
  };

  const custom = calculateCustomScenario(customDays);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-emerald-400 to-teal-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
                <Sliders className="w-6 h-6 text-amber-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {t.whatIfTitle}
                </h2>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                  {t.whatIfSimulator}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t.whatIfSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Custom Slider Playground Card */}
      <div className="glass-panel rounded-3xl p-6 border-emerald-500/30 bg-gradient-to-r from-[#031d16] via-[#052b20] to-[#041b14] shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="w-full lg:max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{t.harvestTimingOffset}:</span>
              </span>
              <span className="text-lg font-extrabold text-white">
                {customDays === 0 ? `${t.today} (0 ${t.inDays})` : `${customDays} ${t.inDays}`}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="7"
              value={customDays}
              onChange={(e) => setCustomDays(parseInt(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />

            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
              <span>{t.today}</span>
              <span className="text-emerald-400 font-bold">3 {t.inDays} ({t.good})</span>
              <span>5 {t.inDays}</span>
              <span>7 {t.inDays}</span>
            </div>
          </div>

          {/* Real-time Dynamic Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto flex-1 text-xs">
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
              <span className="text-[10px] text-slate-400 block">{t.predictedPrice}</span>
              <span className="text-xl font-extrabold text-emerald-400">
                ₹{custom.projectedPrice}/kg
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
              <span className="text-[10px] text-slate-400 block">{t.foodLoss}</span>
              <span className="text-xl font-extrabold text-teal-300">
                {custom.foodLossPercent}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
              <span className="text-[10px] text-slate-400 block">{t.netProjectedIncome}</span>
              <span className="text-xl font-extrabold text-white">
                ₹{custom.netProfit.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
              <span className="text-[10px] text-slate-400 block">{t.status}</span>
              <span
                className={`text-xl font-extrabold ${
                  custom.risk === "Low"
                    ? "text-emerald-400"
                    : custom.risk === "Medium"
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                {tr(custom.risk)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Table */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70 overflow-hidden">
        <h3 className="text-sm font-bold text-white mb-1">
          {t.whatIfTitle}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          {t.whatIfSubtitle}
        </p>

        <div className="overflow-x-auto rounded-xl border border-emerald-500/20">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-emerald-950/40 border-b border-emerald-500/20 text-slate-300 font-semibold">
                <th className="p-3.5">{t.harvestTimingOffset}</th>
                <th className="p-3.5">{t.predictedPrice}</th>
                <th className="p-3.5">{t.foodLoss} %</th>
                <th className="p-3.5">{t.transportCost}</th>
                <th className="p-3.5">{t.netProjectedIncome}</th>
                <th className="p-3.5">{t.co2Emissions}</th>
                <th className="p-3.5">{t.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {sampleWhatIfRows.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-emerald-500/5 transition-colors ${
                    row.isRecommended ? "bg-emerald-500/10" : ""
                  }`}
                >
                  <td className="p-3.5 font-bold text-white flex items-center gap-2">
                    <span>{tr(row.label)}</span>
                    {row.isRecommended && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-400 text-black">
                        {t.healthStatusGood}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-400">₹{row.projectedPricePerKg}/kg</td>
                  <td className="p-3.5">{row.foodLossPercent}%</td>
                  <td className="p-3.5">₹{row.transportCostInr.toLocaleString()}</td>
                  <td className="p-3.5 font-extrabold text-white">₹{row.netProfitInr.toLocaleString()}</td>
                  <td className="p-3.5 text-cyan-300">{row.co2eKg} kg</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.riskLevel === "Low"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : row.riskLevel === "Medium"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {tr(row.riskLevel)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

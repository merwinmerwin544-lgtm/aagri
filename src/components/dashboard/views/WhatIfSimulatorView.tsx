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

export default function WhatIfSimulatorView() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("wait-3-days");
  const [customDays, setCustomDays] = useState<number>(3);

  // Dynamic simulation calculations based on customDays slider
  const calculateCustomScenario = (days: number) => {
    let projectedPrice = 28;
    if (days === 1) projectedPrice = 29;
    else if (days === 2) projectedPrice = 31;
    else if (days === 3) projectedPrice = 32;
    else if (days === 4) projectedPrice = 30;
    else if (days === 5) projectedPrice = 33; // secondary peak
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

  const chartData = sampleWhatIfRows.map((row) => ({
    name: row.label.split(" ")[0] + " " + (row.label.split(" ")[1] || ""),
    netProfit: row.netProfitInr,
    foodLossPercent: row.foodLossPercent,
    isRecommended: row.isRecommended,
  }));

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
                  Interactive What-If Scenario Simulator
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                  Dynamic Trade-Off Lab
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Stress-test harvest decisions: Compare selling today versus holding 3, 5, or 6 days with live financial and carbon modeling
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            Real-Time Recalculations
          </span>
        </div>
      </div>

      {/* Dynamic Custom Slider Playground Card */}
      <div className="glass-panel rounded-3xl p-6 border-emerald-500/30 bg-gradient-to-r from-[#031d16] via-[#052b20] to-[#041b14] shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="w-full lg:max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Simulated Holding Duration:</span>
              </span>
              <span className="text-lg font-extrabold text-white">
                {customDays === 0 ? "Sell Today (0 Days)" : `${customDays} Days from Pick`}
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
              <span>Day 0 (Now)</span>
              <span className="text-emerald-400 font-bold">Day 3 (Peak Window)</span>
              <span>Day 5</span>
              <span>Day 7 (Glut)</span>
            </div>
          </div>

          {/* Real-time Dynamic Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto flex-1 text-xs">
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
              <span className="text-[10px] text-slate-400 block">Forecast Price</span>
              <span className="text-xl font-extrabold text-emerald-400">
                ₹{custom.projectedPrice}/kg
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
              <span className="text-[10px] text-slate-400 block">Food Spoilage</span>
              <span className="text-xl font-extrabold text-teal-300">
                {custom.foodLossPercent}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
              <span className="text-[10px] text-slate-400 block">Simulated Net Profit</span>
              <span className="text-xl font-extrabold text-white">
                ₹{custom.netProfit.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
              <span className="text-[10px] text-slate-400 block">Risk Profile</span>
              <span
                className={`text-xl font-extrabold ${
                  custom.risk === "Low"
                    ? "text-emerald-400"
                    : custom.risk === "Medium"
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                {custom.risk}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Table (Prompt Section 13 Spec) */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70 overflow-hidden">
        <h3 className="text-sm font-bold text-white mb-1">
          Scenario Matrix: Sell Now vs 3 Days vs 5 Days vs 6 Days
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Notice how the higher nominal price on Day 5 (₹33/kg) is negated by 8% rotting and extra storage costs.
        </p>

        <div className="overflow-x-auto rounded-xl border border-emerald-500/20">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-emerald-950/40 border-b border-emerald-500/20 text-slate-300 font-semibold">
                <th className="p-3.5">Scenario</th>
                <th className="p-3.5">Forecast Price</th>
                <th className="p-3.5">Food Loss %</th>
                <th className="p-3.5">Transport Cost</th>
                <th className="p-3.5">Storage Fee</th>
                <th className="p-3.5">Net Realized Profit</th>
                <th className="p-3.5">CO₂ Impact</th>
                <th className="p-3.5">Risk Rating</th>
                <th className="p-3.5">Outcome Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {sampleWhatIfRows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedScenarioId(row.id)}
                  className={`hover:bg-emerald-500/10 transition-colors cursor-pointer ${
                    row.isRecommended
                      ? "bg-emerald-500/15 font-semibold"
                      : selectedScenarioId === row.id
                      ? "bg-white/5"
                      : ""
                  }`}
                >
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span>{row.label}</span>
                      {row.isRecommended && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-400 text-black font-extrabold">
                          ★ RECOMMENDED
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-3.5 text-sm font-bold text-emerald-400">
                    ₹{row.projectedPricePerKg}/kg
                  </td>

                  <td className="p-3.5 font-semibold text-slate-300">
                    {row.foodLossPercent}%
                  </td>

                  <td className="p-3.5 text-slate-300">
                    ₹{row.transportCostInr.toLocaleString()}
                  </td>

                  <td className="p-3.5 text-slate-300">
                    ₹{row.storageCostInr.toLocaleString()}
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`text-sm font-extrabold ${
                        row.isRecommended ? "text-emerald-300 text-base" : "text-white"
                      }`}
                    >
                      ₹{row.netProfitInr.toLocaleString()}
                    </span>
                  </td>

                  <td className="p-3.5 text-cyan-300">{row.co2eKg} kg</td>

                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.riskLevel === "Low"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : row.riskLevel === "Medium"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {row.riskLevel}
                    </span>
                  </td>

                  <td className="p-3.5 text-[11px] text-slate-400 max-w-xs leading-tight">
                    {row.outcomeVerdict}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Net Profit Comparison Bar Chart */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
        <h3 className="text-sm font-bold text-white mb-1">
          Net Realized Profit Comparison Across Scenarios
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Peak financial value occurs at Day 3 (₹1,14,350), beating Sell Now by ₹9,850 and Day 6 by ₹18,150
        </p>

        <div className="w-full h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(52, 211, 153, 0.08)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis domain={[90000, 120000]} stroke="#64748b" fontSize={11} unit=" ₹" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#03150e",
                  borderColor: "rgba(52, 211, 153, 0.3)",
                  borderRadius: "12px",
                  fontSize: "11px",
                }}
              />
              <Bar dataKey="netProfit" name="Net Realized Profit (₹)" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

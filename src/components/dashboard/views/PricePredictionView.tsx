"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Sparkles,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  Info,
  DollarSign,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { MarketPriceData, CropType } from "@/types";
import { sampleMarketPrices } from "@/services/mockData";

interface PricePredictionViewProps {
  initialCrop: CropType;
}

export default function PricePredictionView({ initialCrop }: PricePredictionViewProps) {
  const [selectedCrop, setSelectedCrop] = useState<CropType>(initialCrop || "Tomato");
  const [selectedRegion, setSelectedRegion] = useState("Coimbatore & Western Tamil Nadu");

  const priceData: MarketPriceData =
    sampleMarketPrices[selectedCrop] || sampleMarketPrices["Tomato"];

  // Prepare chart dataset (historical 7 days + forecast 5 days)
  const chartData = [
    { label: "D-6", price: priceData.historicalSevenDays[0], type: "Historical" },
    { label: "D-5", price: priceData.historicalSevenDays[1], type: "Historical" },
    { label: "D-4", price: priceData.historicalSevenDays[2], type: "Historical" },
    { label: "D-3", price: priceData.historicalSevenDays[3], type: "Historical" },
    { label: "D-2", price: priceData.historicalSevenDays[4], type: "Historical" },
    { label: "D-1", price: priceData.historicalSevenDays[5], type: "Historical" },
    { label: "Today", price: priceData.currentPricePerKg, type: "Current" },
    ...priceData.forecastFiveDays.map((f) => ({
      label: f.dayLabel,
      price: f.predictedPricePerKg,
      lower: f.confidenceLower,
      upper: f.confidenceUpper,
      type: "Forecast",
      isPeak: f.isPeakOpportunity,
    })),
  ];

  const peakDay = priceData.forecastFiveDays.find((f) => f.isPeakOpportunity) || priceData.forecastFiveDays[2];
  const maxPriceDiff = peakDay.predictedPricePerKg - priceData.currentPricePerKg;
  const percentGain = ((maxPriceDiff / priceData.currentPricePerKg) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner & Selectors */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  AI Market Price Forecasting (5-Day Outlook)
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  Predictive Mandi Arbitrage
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Machine learning forecast evaluating wholesale arrivals, holiday festivals, and interstate freight
              </p>
            </div>
          </div>

          {/* Crop & Region Selectors (Prompt Section 8 spec) */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
              <span className="text-slate-400">Crop:</span>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value as CropType)}
                className="bg-transparent text-emerald-300 font-bold focus:outline-none cursor-pointer"
              >
                <option value="Tomato" className="bg-[#03130e]">Tomato</option>
                <option value="Wheat" className="bg-[#03130e]">Wheat</option>
                <option value="Corn" className="bg-[#03130e]">Corn</option>
                <option value="Soybean" className="bg-[#03130e]">Soybean</option>
                <option value="Chilli" className="bg-[#03130e]">Chilli</option>
                <option value="Barley" className="bg-[#03130e]">Barley</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
              <span className="text-slate-400">Terminal:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-transparent text-emerald-300 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Coimbatore & Western Tamil Nadu" className="bg-[#03130e]">
                  Coimbatore & Western Tamil Nadu
                </option>
                <option value="Central Southern Mandi Hub" className="bg-[#03130e]">
                  Central Southern Mandi Hub
                </option>
                <option value="Bangalore Rural Terminal" className="bg-[#03130e]">
                  Bangalore Rural Terminal
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Selling Window Opportunity Highlight Banner */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border-emerald-500/35 bg-gradient-to-r from-emerald-950/80 via-[#06291f] to-emerald-950/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Sparkles className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              PRIME SELLING OPPORTUNITY WINDOW
            </div>
            <div className="text-base sm:text-lg font-extrabold text-white">
              Peak price of ₹{peakDay.predictedPricePerKg}/kg expected in {peakDay.dayLabel} ({peakDay.dateStr})
            </div>
            <p className="text-xs text-slate-300">
              Holding through Day 3 yields <strong className="text-emerald-400">+{percentGain}% (+₹{maxPriceDiff}/kg)</strong> extra margin before post-festival arrivals pull the price down.
            </p>
          </div>
        </div>

        <div className="text-right shrink-0 w-full sm:w-auto">
          <div className="text-xs text-slate-400">Terminal Mandi Floor</div>
          <div className="text-2xl font-extrabold text-emerald-400">
            ₹{priceData.currentPricePerKg} → ₹{peakDay.predictedPricePerKg}/kg
          </div>
        </div>
      </div>

      {/* 5-Day Day-by-Day Forecast Cards (Prompt Section 8 sample forecast) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Today */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Today</span>
          <div className="text-2xl font-extrabold text-white">₹{priceData.currentPricePerKg}</div>
          <span className="text-[10px] text-slate-400 block mt-1">Current Base</span>
        </div>

        {/* Next 5 Days */}
        {priceData.forecastFiveDays.map((fc) => (
          <div
            key={fc.dayLabel}
            className={`p-3.5 rounded-xl border text-center transition-all ${
              fc.isPeakOpportunity
                ? "bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-400/30 scale-105 shadow-lg shadow-emerald-950"
                : "bg-black/30 border-emerald-500/15"
            }`}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-300">
                {fc.dayLabel}
              </span>
              {fc.isPeakOpportunity && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </div>
            <div
              className={`text-2xl font-extrabold ${
                fc.isPeakOpportunity ? "text-emerald-400" : "text-white"
              }`}
            >
              ₹{fc.predictedPricePerKg}
            </div>
            <span
              className={`text-[10px] font-semibold block mt-1 ${
                fc.isPeakOpportunity ? "text-emerald-300" : "text-slate-400"
              }`}
            >
              {fc.isPeakOpportunity ? "★ PEAK WINDOW" : `₹${fc.confidenceLower}-₹${fc.confidenceUpper}`}
            </span>
          </div>
        ))}
      </div>

      {/* Price Trend Chart with Confidence Bands */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">
              Price Trajectory & Confidence Corridor
            </h3>
            <p className="text-xs text-slate-400">
              7-Day Historical vs 5-Day Machine Learning Projected Trend
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Market Demand: <strong className="text-emerald-400">{priceData.marketDemand}</strong>
          </div>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(52, 211, 153, 0.08)" />
              <XAxis dataKey="label" stroke="#64748b" fontSize={11} />
              <YAxis domain={["dataMin - 3", "dataMax + 3"]} stroke="#64748b" fontSize={11} unit=" ₹" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#03150e",
                  borderColor: "rgba(52, 211, 153, 0.3)",
                  borderRadius: "12px",
                  fontSize: "11px",
                }}
              />
              <ReferenceLine
                x="Day 3"
                stroke="#38bdf8"
                strokeDasharray="3 3"
                label={{ value: "Peak Opportunity", fill: "#38bdf8", fontSize: 10 }}
              />
              <Area
                type="monotone"
                dataKey="price"
                name="Mandi Price (₹/kg)"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#priceGradient)"
                dot={{ r: 4, fill: "#10b981" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{priceData.keyTrendSummary}</span>
          </div>
          <span className="text-[10px] italic">Simulated demonstration forecasts</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import {
  Activity,
  Satellite,
  Droplet,
  CloudRain,
  Sun,
  TrendingUp,
  Clock,
  Sparkles,
  Info,
  ShieldCheck,
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
import { PrecisionCropHealth, FarmerProfile } from "@/types";

interface PrecisionIntelligenceViewProps {
  health: PrecisionCropHealth;
  profile: FarmerProfile;
}

export default function PrecisionIntelligenceView({
  health,
  profile,
}: PrecisionIntelligenceViewProps) {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Precision Farm Intelligence & Satellite NDVI
              </h2>
              <p className="text-xs text-slate-400">
                Multi-spectral satellite telemetry fused with hyper-local soil moisture and microclimate weather
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/25 flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulated Sentinel-2 Feed</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Primary Outputs (Prompt Section 7 Spec) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Crop Health */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              1. Crop Health
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 mb-1">
            {health.status} ({health.overallScore}/100)
          </div>
          <div className="text-xs text-slate-300 font-medium">
            Chlorophyll Content: {health.chlorophyllContent}
          </div>
        </div>

        {/* 2. Expected Yield */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              2. Expected Yield
            </span>
            <span className="text-xs font-semibold text-teal-300">{profile.cropType}</span>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {health.expectedYieldTonnes} tonnes
          </div>
          <div className="text-xs text-slate-400">
            Across {profile.farmSizeAcres} acres (~1.9 tonnes/acre)
          </div>
        </div>

        {/* 3. Harvest Window */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              3. Harvest Window
            </span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-300 mb-1">
            {health.harvestWindowStartDays}–{health.harvestWindowEndDays} days
          </div>
          <div className="text-xs text-slate-300 font-medium">
            Optimal fruit brix maturity: Day 6
          </div>
        </div>

        {/* 4. Prediction Confidence */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              4. Confidence Score
            </span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-300 mb-1">
            {health.yieldConfidencePercent}%
          </div>
          <div className="text-xs text-slate-400">
            Validated by 5 historical harvest cycles
          </div>
        </div>
      </div>

      {/* Multi-spectral Telemetry & Growth Stage Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Growth Stage Progress */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
          <h3 className="text-sm font-bold text-white mb-1">Crop Growth Stage & Phenology</h3>
          <p className="text-xs text-slate-400 mb-4">{health.growthStage}</p>

          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5 font-semibold">
              <span className="text-slate-300">Biological Maturity Progress</span>
              <span className="text-emerald-400">{health.growthProgressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-2 rounded-full transition-all"
                style={{ width: `${health.growthProgressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-slate-300">
              <div className="text-[10px] text-slate-500">Stage 1</div>
              <div className="font-bold text-emerald-400">Vegetative</div>
              <div className="text-[9px] text-slate-400">100% Complete</div>
            </div>
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-slate-300">
              <div className="text-[10px] text-slate-500">Stage 2</div>
              <div className="font-bold text-emerald-400">Flowering</div>
              <div className="text-[9px] text-slate-400">100% Complete</div>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-white shadow">
              <div className="text-[10px] text-emerald-300">Stage 3 (Now)</div>
              <div className="font-bold text-cyan-300">Fruit Ripening</div>
              <div className="text-[9px] text-emerald-300">82% Active</div>
            </div>
            <div className="p-2 rounded-lg bg-black/20 border border-slate-800 text-slate-500">
              <div className="text-[10px]">Stage 4</div>
              <div className="font-bold">Harvesting</div>
              <div className="text-[9px]">In 5 Days</div>
            </div>
          </div>
        </div>

        {/* Satellite NDVI & EVI Spectral Indices */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
          <h3 className="text-sm font-bold text-white mb-1">
            Satellite Vegetation Indices (NDVI & EVI)
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Simulated optical reflectance measuring canopy vigor and photosynthetic capacity
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-black/30 border border-emerald-500/20">
              <div className="text-xs text-slate-400 mb-1">NDVI Normalized Index</div>
              <div className="text-3xl font-extrabold text-emerald-400">{health.ndviIndex}</div>
              <div className="text-[11px] text-slate-300 mt-1">
                Dense, healthy canopy (Range 0.0 - 1.0)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-emerald-500/20">
              <div className="text-xs text-slate-400 mb-1">EVI Enhanced Index</div>
              <div className="text-3xl font-extrabold text-cyan-300">{health.eviIndex}</div>
              <div className="text-[11px] text-slate-300 mt-1">
                Atmospheric soil-adjusted reflection
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>Simulated imagery derived from Sentinel-2 & Landsat-9 spectral bands</span>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Health Trend Chart */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
        <h3 className="text-sm font-bold text-white mb-1">Historical 5-Week Crop Health Trend</h3>
        <p className="text-xs text-slate-400 mb-4">
          Tracking parcel vigor progression against regional benchmark
        </p>

        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={health.historicalHealthTrend}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(52, 211, 153, 0.08)" />
              <XAxis dataKey="week" stroke="#64748b" fontSize={11} />
              <YAxis domain={[60, 100]} stroke="#64748b" fontSize={11} unit=" pts" />
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
                dataKey="score"
                name="Your Parcel Score"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4, fill: "#10b981" }}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                name="Regional Benchmark"
                stroke="#64748b"
                strokeDasharray="4 4"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

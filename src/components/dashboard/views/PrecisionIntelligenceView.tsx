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
import { useLanguage } from "@/context/LanguageContext";

interface PrecisionIntelligenceViewProps {
  health: PrecisionCropHealth;
  profile: FarmerProfile;
}

export default function PrecisionIntelligenceView({
  health,
  profile,
}: PrecisionIntelligenceViewProps) {
  const { t, tr } = useLanguage();

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
                {t.precisionTitle}
              </h2>
              <p className="text-xs text-slate-400">
                {t.precisionSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/25 flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.sentinelFeed}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Primary Outputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Crop Health */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              1. {t.cropHealth}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 mb-1">
            {tr(health.status)} ({health.overallScore}/100)
          </div>
          <div className="text-xs text-slate-300 font-medium">
            {t.chlorophyllContent}: {health.chlorophyllContent}
          </div>
        </div>

        {/* 2. Expected Yield */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              2. {t.expectedYield}
            </span>
            <span className="text-xs font-semibold text-teal-300">{tr(profile.cropType)}</span>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {health.expectedYieldTonnes} {t.tonnes}
          </div>
          <div className="text-xs text-slate-400">
            Across {profile.farmSizeAcres} {t.acres}
          </div>
        </div>

        {/* 3. Harvest Window */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              3. {t.harvestWindow}
            </span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-300 mb-1">
            {health.harvestWindowStartDays}–{health.harvestWindowEndDays} {t.inDays}
          </div>
          <div className="text-xs text-slate-300 font-medium">
            {t.optimalWindow}
          </div>
        </div>

        {/* 4. Prediction Confidence */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              4. {t.confidenceScore}
            </span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-300 mb-1">
            {health.yieldConfidencePercent}%
          </div>
          <div className="text-xs text-slate-400">
            {t.benchmark}
          </div>
        </div>
      </div>

      {/* Multi-spectral Telemetry & Growth Stage Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Growth Stage Progress */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
          <h3 className="text-sm font-bold text-white mb-1">{t.growthStage}</h3>
          <p className="text-xs text-slate-400 mb-4">{tr(health.growthStage)}</p>

          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5 font-semibold">
              <span className="text-slate-300">{t.growthStage}</span>
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
              <div className="font-bold text-emerald-400">{tr("Active")}</div>
              <div className="text-[9px] text-slate-400">100%</div>
            </div>
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-slate-300">
              <div className="text-[10px] text-slate-500">Stage 2</div>
              <div className="font-bold text-emerald-400">{tr("Good")}</div>
              <div className="text-[9px] text-slate-400">100%</div>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-white shadow">
              <div className="text-[10px] text-emerald-300">Stage 3</div>
              <div className="font-bold text-cyan-300">{tr("Moderate")}</div>
              <div className="text-[9px] text-emerald-300">82%</div>
            </div>
            <div className="p-2 rounded-lg bg-black/20 border border-slate-800 text-slate-500">
              <div className="text-[10px]">Stage 4</div>
              <div className="font-bold">{t.harvestWindow}</div>
              <div className="text-[9px]">{health.harvestWindowStartDays} {t.inDays}</div>
            </div>
          </div>
        </div>

        {/* Satellite NDVI & EVI Spectral Indices */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
          <h3 className="text-sm font-bold text-white mb-1">
            {t.ndviIndex} & {t.eviIndex}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {t.aiPoweredAnalysis}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-black/30 border border-emerald-500/20">
              <div className="text-xs text-slate-400 mb-1">{t.ndviIndex}</div>
              <div className="text-3xl font-extrabold text-emerald-400">{health.ndviIndex}</div>
              <div className="text-[11px] text-slate-300 mt-1">
                {t.healthStatusGood} (0.0 - 1.0)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-emerald-500/20">
              <div className="text-xs text-slate-400 mb-1">{t.eviIndex}</div>
              <div className="text-3xl font-extrabold text-cyan-300">{health.eviIndex}</div>
              <div className="text-[11px] text-slate-300 mt-1">
                {t.excellent}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>{t.satelliteTelemetry}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Health Trend Chart */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
        <h3 className="text-sm font-bold text-white mb-1">{t.ndviTelemetry}</h3>
        <p className="text-xs text-slate-400 mb-4">
          {t.benchmark}
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
                name={t.cropHealth}
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4, fill: "#10b981" }}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                name={t.benchmark}
                stroke="#64748b"
                strokeDasharray="4 4"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actionable Advisories */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/20 bg-[#041a13]/70">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">{t.actionableAdvisories}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#09271B]/80 border border-emerald-500/20">
            <h4 className="text-xs font-bold text-emerald-400 mb-1">{t.advisory1Title}</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">{t.advisory1Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#09271B]/80 border border-emerald-500/20">
            <h4 className="text-xs font-bold text-[#E6C779] mb-1">{t.advisory2Title}</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">{t.advisory2Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#09271B]/80 border border-emerald-500/20">
            <h4 className="text-xs font-bold text-cyan-300 mb-1">{t.advisory3Title}</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">{t.advisory3Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

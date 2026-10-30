"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Thermometer,
  Droplets,
  Truck,
  TrendingDown,
  Sparkles,
  Sliders,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Camera,
  Target,
  Snowflake,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { FarmerProfile, WeatherCondition, CropQualityGrade, QualityGradingResult } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { calculateSpoilageClock } from "@/services/spoilageService";

interface SpoilageClockViewProps {
  profile: FarmerProfile;
  weather: WeatherCondition;
  currentGrading: QualityGradingResult | null;
  onOpenWhatIf: () => void;
  onOpenBuyers: () => void;
  onOpenQualityGrading: () => void;
}

export default function SpoilageClockView({
  profile,
  weather,
  currentGrading,
  onOpenWhatIf,
  onOpenBuyers,
  onOpenQualityGrading,
}: SpoilageClockViewProps) {
  const { t, tr } = useLanguage();

  const [isColdStorage, setIsColdStorage] = useState(false);
  const [transitHours, setTransitHours] = useState(2.5);
  const [customTempC, setCustomTempC] = useState<number>(weather.currentTempC || 28);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(41 * 3600);

  const activeGrade: CropQualityGrade = currentGrading?.grade || profile.qualityGrade || "Grade A";

  // Calculate parameters
  const clockData = calculateSpoilageClock({
    cropType: profile.cropType,
    grade: activeGrade,
    temperatureC: customTempC,
    humidityPercent: weather.humidityPercent || 52,
    transportHours: transitHours,
    isColdStorage,
    totalBatchQuantityTonnes: profile.expectedYieldTonnes || 3.8,
    baseMarketPricePerKg: 28,
  });

  // Keep countdown ticking in real-time
  useEffect(() => {
    setSecondsRemaining(clockData.remainingSeconds);
  }, [clockData.remainingSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format hours, minutes, seconds
  const displayHours = Math.floor(secondsRemaining / 3600);
  const displayMinutes = Math.floor((secondsRemaining % 3600) / 60);
  const displaySeconds = secondsRemaining % 60;

  // Value decay curve data for chart
  const decayCurve = [
    { hour: "0h (Fresh)", value: clockData.currentValueInr, loss: 0 },
    { hour: "12h", value: Math.round(clockData.currentValueInr * 0.99), loss: 1 },
    { hour: "24h", value: Math.round(clockData.currentValueInr * 0.96), loss: 4 },
    {
      hour: `${clockData.criticalThresholdHours}h (Sell-By)`,
      value: Math.round(clockData.currentValueInr * (1 - clockData.valueLossAtThresholdPercent / 100)),
      loss: clockData.valueLossAtThresholdPercent,
    },
    { hour: "60h", value: Math.round(clockData.currentValueInr * 0.78), loss: 22 },
    { hour: "72h", value: Math.round(clockData.currentValueInr * 0.65), loss: 35 },
    { hour: "96h", value: Math.round(clockData.currentValueInr * 0.45), loss: 55 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Core Countdown */}
      <div className="glass-panel-agri rounded-3xl p-6 sm:p-8 border border-[#E1F5DC]/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A8D86D] text-[#09271B]">
                Live Harvest Spoilage Telemetry
              </span>
              <span className="text-[10px] text-[#A8D86D] font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Batch {clockData.batchId}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#F4F7EF] tracking-tight">
              {t.spoilageClockTitle}
            </h1>
            <p className="text-xs text-[#B8CCAE] max-w-2xl mt-1">
              {t.spoilageClockSubtitle}
            </p>

            {/* Central Sell-By Headline Alert */}
            <div className="mt-4 p-3.5 rounded-2xl bg-[#123D2B]/70 border border-[#A8D86D]/40 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#09271B] text-[#A8D86D] shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#E6C779] animate-pulse" />
              </div>
              <div className="text-xs">
                <span className="text-[#F4F7EF] font-bold">
                  {t.sellWithin}{" "}
                  <strong className="text-[#A8D86D] text-sm">
                    {displayHours} {t.hours}
                  </strong>{" "}
                  {t.orLoseValue}{" "}
                  <strong className="text-rose-400 text-sm">
                    {clockData.valueLossAtThresholdPercent}% {t.valueLoss}
                  </strong>{" "}
                  (₹{clockData.projectedLossInr.toLocaleString()})
                </span>
                <div className="text-[10px] text-[#B8CCAE] mt-0.5">
                  Based on {tr(profile.cropType)} • {activeGrade} • {clockData.effectiveTemperatureC}°C Ambient • {clockData.effectiveHumidityPercent}% Humidity
                </div>
              </div>
            </div>
          </div>

          {/* Large Live Digital Ticker */}
          <div className="p-6 rounded-3xl bg-[#09271B] border border-[#E1F5DC]/25 shadow-2xl flex flex-col items-center justify-center min-w-[280px]">
            <span className="text-[10px] uppercase font-bold text-[#B8CCAE] mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#A8D86D]" />
              <span>Remaining Value Window</span>
            </span>

            <div className="flex items-baseline gap-2 font-mono text-3xl sm:text-4xl font-black text-[#F4F7EF] my-1">
              <span className="text-[#A8D86D]">{String(displayHours).padStart(2, "0")}</span>
              <span className="text-xs text-[#B8CCAE] font-sans">h</span>
              <span className="text-[#B8CCAE]">:</span>
              <span className="text-[#F4F7EF]">{String(displayMinutes).padStart(2, "0")}</span>
              <span className="text-xs text-[#B8CCAE] font-sans">m</span>
              <span className="text-[#B8CCAE]">:</span>
              <span className="text-[#E6C779]">{String(displaySeconds).padStart(2, "0")}</span>
              <span className="text-xs text-[#B8CCAE] font-sans">s</span>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold mt-2 ${
                displayHours > 24
                  ? "bg-[#A8D86D]/20 text-[#A8D86D] border border-[#A8D86D]/40"
                  : displayHours > 12
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
              }`}
            >
              {displayHours > 24 ? t.freshStatus : displayHours > 12 ? t.warningStatus : t.criticalStatus}
            </span>
          </div>
        </div>

        {/* Quick Toggles: Cold Storage & Vision Rescan */}
        <div className="mt-6 pt-4 border-t border-[#E1F5DC]/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsColdStorage(!isColdStorage)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                isColdStorage
                  ? "bg-cyan-500 text-black border-cyan-400 shadow-md"
                  : "bg-[#123D2B] text-[#B8CCAE] hover:text-[#F4F7EF] border-[#E1F5DC]/15"
              }`}
            >
              <Snowflake className={`w-3.5 h-3.5 ${isColdStorage ? "animate-spin" : ""}`} />
              <span>{t.activateColdStorage}</span>
            </button>

            <button
              onClick={onOpenQualityGrading}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#123D2B] hover:bg-[#1a523a] text-[#B8CCAE] hover:text-[#F4F7EF] border border-[#E1F5DC]/15 transition-colors flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-[#A8D86D]" />
              <span>Re-grade Batch Photo ({activeGrade})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#B8CCAE]">
            <span>Transit Buffer:</span>
            <select
              value={transitHours}
              onChange={(e) => setTransitHours(parseFloat(e.target.value))}
              className="px-2 py-1 rounded-lg bg-[#09271B] border border-[#E1F5DC]/20 text-white font-mono text-xs"
            >
              <option value={1.5}>1.5h (Local Mandi)</option>
              <option value={2.5}>2.5h (Regional Wholesale)</option>
              <option value={5.0}>5.0h (Metro Supermarket)</option>
              <option value={10.0}>10.0h (Export Terminal)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Financial Value at Risk & Biological Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Value Depletion Breakdown Card */}
        <div className="lg:col-span-7 glass-card-agri rounded-3xl p-6 border border-[#E1F5DC]/16 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#F4F7EF] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#A8D86D]" />
                <span>Financial Depreciation Curve</span>
              </h3>
              <span className="text-xs font-mono text-[#A8D86D]">
                Total Batch: ₹{clockData.currentValueInr.toLocaleString()}
              </span>
            </div>

            <div className="w-full h-56 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={decayCurve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="decayGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A8D86D" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#E06A55" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(225, 245, 220, 0.08)" />
                  <XAxis dataKey="hour" stroke="#B8CCAE" fontSize={10} />
                  <YAxis stroke="#B8CCAE" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09271B",
                      borderColor: "rgba(168, 216, 109, 0.4)",
                      borderRadius: "12px",
                      fontSize: "11px",
                      color: "#F4F7EF",
                    }}
                    formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, "Remaining Value"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#A8D86D"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#decayGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E1F5DC]/12 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-[#123D2B]/40">
              <div className="text-[10px] text-[#B8CCAE]">0h - 41h Window</div>
              <div className="text-base font-extrabold text-[#A8D86D] mt-0.5">
                ₹{clockData.currentValueInr.toLocaleString()}
              </div>
              <div className="text-[9px] text-[#A8D86D]">100% Value</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#123D2B]/40">
              <div className="text-[10px] text-[#B8CCAE]">Past 41h</div>
              <div className="text-base font-extrabold text-amber-400 mt-0.5">
                -₹{clockData.projectedLossInr.toLocaleString()}
              </div>
              <div className="text-[9px] text-amber-400">-12% Downgrade</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#123D2B]/40">
              <div className="text-[10px] text-[#B8CCAE]">Past 72h</div>
              <div className="text-base font-extrabold text-rose-400 mt-0.5">
                -₹{Math.round(clockData.currentValueInr * 0.28).toLocaleString()}
              </div>
              <div className="text-[9px] text-rose-400">-28% Distress</div>
            </div>
          </div>
        </div>

        {/* Biological Kinetics & Action Recommendations */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="glass-card-agri rounded-3xl p-6 border border-[#E1F5DC]/16 space-y-4">
            <h3 className="text-sm font-bold text-[#F4F7EF] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A8D86D]" />
              <span>Bio-Thermal Degradation Drivers</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#123D2B]/40 border border-[#E1F5DC]/10 flex items-center justify-between">
                <span className="text-[#B8CCAE] flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-[#E6C779]" />
                  <span>Ambient Temperature:</span>
                </span>
                <span className="font-extrabold text-[#F4F7EF]">
                  {clockData.effectiveTemperatureC}°C{" "}
                  {isColdStorage ? "(Cold Chain)" : `(Weather: ${weather.currentTempC}°C)`}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#123D2B]/40 border border-[#E1F5DC]/10 flex items-center justify-between">
                <span className="text-[#B8CCAE] flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Atmospheric Humidity:</span>
                </span>
                <span className="font-extrabold text-[#F4F7EF]">
                  {clockData.effectiveHumidityPercent}% RH
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#123D2B]/40 border border-[#E1F5DC]/10 flex items-center justify-between">
                <span className="text-[#B8CCAE] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#A8D86D]" />
                  <span>Transit Time to Mandi:</span>
                </span>
                <span className="font-extrabold text-[#A8D86D]">
                  {transitHours} hours
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#123D2B]/60 border border-[#A8D86D]/30 text-xs">
              <div className="font-bold text-[#F4F7EF] mb-1">AI Recommendation:</div>
              <p className="text-[11px] text-[#B8CCAE] leading-relaxed">
                {isColdStorage
                  ? "Cold storage buffer is active. Your batch shelf-life is extended by 72 hours. You can safely hold for peak price on Day +2."
                  : `At ${clockData.effectiveTemperatureC}°C ambient heat, cellular respiration causes softening past 41 hours. Lock in verified buyer procurement today to avoid the ₹${clockData.projectedLossInr.toLocaleString()} penalty.`}
              </p>
            </div>
          </div>

          {/* Integration CTAs */}
          <div className="space-y-2">
            <button
              onClick={onOpenWhatIf}
              className="w-full py-3 rounded-2xl text-xs font-bold text-[#09271B] bg-[#A8D86D] hover:bg-[#b9e584] shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Sliders className="w-4 h-4" />
              <span>{t.simulateInWhatIf}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenBuyers}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#F4F7EF] bg-[#123D2B] hover:bg-[#1a523a] border border-[#E1F5DC]/15 transition-colors flex items-center justify-center gap-2"
            >
              <Target className="w-4 h-4 text-[#A8D86D]" />
              <span>{t.lockInBuyer}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

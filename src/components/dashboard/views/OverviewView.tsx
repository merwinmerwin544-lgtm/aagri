"use client";

import React, { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Sprout,
  Wheat,
  Activity,
  Droplet,
  CloudSun,
  Layers,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  BrainCircuit,
  Sliders,
  Sparkles,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FarmerProfile,
  PrecisionCropHealth,
  DecisionEngineStrategy,
  SoilHealthTelemetry,
  WeatherCondition,
  FarmTask,
} from "@/types";

interface OverviewViewProps {
  profile: FarmerProfile;
  health: PrecisionCropHealth;
  strategy: DecisionEngineStrategy;
  soilHealth: SoilHealthTelemetry;
  weather: WeatherCondition;
  tasks: FarmTask[];
  onToggleTask: (taskId: string) => void;
  onOpenWhyRecommendation: () => void;
  onOpenWhatIf: () => void;
  onOpenMatchedBuyers: () => void;
  onOpenLogistics: () => void;
  onOpenVoice: () => void;
  onOpenEditProfile: () => void;
  onOpenNewTask: () => void;
}

export default function OverviewView({
  profile,
  health,
  strategy,
  soilHealth,
  weather,
  tasks,
  onToggleTask,
  onOpenWhyRecommendation,
  onOpenWhatIf,
  onOpenMatchedBuyers,
  onOpenLogistics,
  onOpenVoice,
  onOpenEditProfile,
  onOpenNewTask,
}: OverviewViewProps) {
  // Crop distribution doughnut data matching reference screenshot
  const cropDistData = [
    { name: "Wheat", area: 45.2, percent: 36, color: "#E6C779" },
    { name: "Corn", area: 32.8, percent: 26, color: "#A8D86D" },
    { name: "Soybean", area: 25.6, percent: 20, color: "#267A45" },
    { name: "Barley", area: 12.5, percent: 10, color: "#B8CCAE" },
    { name: "Other", area: 9.5, percent: 8, color: "#165036" },
  ];

  // Soil moisture trend line data matching reference screenshot (dates Jun 14 to Jun 26)
  const soilMoistureData = [
    { date: "Jun 14", actual: 68, forecast: 68 },
    { date: "Jun 16", actual: 60, forecast: 60 },
    { date: "Jun 18", actual: 56, forecast: 55 },
    { date: "Jun 20", actual: 52, forecast: 52 },
    { date: "Jun 22", actual: null, forecast: 58 },
    { date: "Jun 24", actual: null, forecast: 62 },
    { date: "Jun 26", actual: null, forecast: 60 },
  ];

  return (
    <div className="space-y-4">
      {/* =========================================================================
          1. WELCOME SECTION (Exactly matching Reference Screenshot)
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F7EF] tracking-tight flex items-center gap-2">
            <span>Welcome back, {profile.farmerName?.split(" ")[0] || "Arman"} 👋</span>
          </h1>
          <p className="text-xs text-[#B8CCAE] mt-0.5">
            Here&apos;s what&apos;s happening on your farm today.
          </p>
        </div>

        {/* Date Selector matching reference screenshot */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl glass-panel-agri text-xs text-[#F4F7EF] border border-[#E1F5DC]/16 shadow-sm cursor-pointer">
          <Calendar className="w-3.5 h-3.5 text-[#A8D86D]" />
          <span className="font-medium">Jun 20 - Jun 26, 2024</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#B8CCAE]" />
        </div>
      </div>

      {/* =========================================================================
          2. TOP 4 METRIC CARDS (Exactly matching Reference Screenshot)
          ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Fields */}
        <div className="glass-card-agri rounded-2xl p-4 border border-[#E1F5DC]/16">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-[#123D2B] flex items-center justify-center text-[#A8D86D]">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-medium text-[#B8CCAE]">Total Fields</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F4F7EF] mb-1">24</div>
          <div className="text-[10px] text-[#B8CCAE] flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8D86D]" />
              <strong className="text-[#F4F7EF]">14</strong> Active
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <strong className="text-[#F4F7EF]">10</strong> Inactive
            </span>
          </div>
        </div>

        {/* Total Area */}
        <div className="glass-card-agri rounded-2xl p-4 border border-[#E1F5DC]/16">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-[#123D2B] flex items-center justify-center text-[#A8D86D]">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-medium text-[#B8CCAE]">Total Area</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F4F7EF] mb-1">125.6 ha</div>
          <div className="text-[10px] text-[#A8D86D] flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>8.4 ha this month</span>
          </div>
        </div>

        {/* Crops Growing */}
        <div className="glass-card-agri rounded-2xl p-4 border border-[#E1F5DC]/16">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-[#123D2B] flex items-center justify-center text-[#A8D86D]">
              <Wheat className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-medium text-[#B8CCAE]">Crops Growing</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F4F7EF] mb-1">6</div>
          <div className="text-[10px] text-[#B8CCAE] truncate">
            Wheat, Corn, Soybean...
          </div>
        </div>

        {/* AI Health Score */}
        <div className="glass-card-agri rounded-2xl p-4 border border-[#E1F5DC]/16">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-[#123D2B] flex items-center justify-center text-[#A8D86D]">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-medium text-[#B8CCAE]">AI Health Score</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F4F7EF] mb-1 flex items-baseline gap-1">
            <span>86</span>
            <span className="text-xs text-[#B8CCAE] font-normal">/100</span>
          </div>
          <div className="text-[10px] text-[#A8D86D] font-medium">Good</div>
        </div>
      </div>

      {/* =========================================================================
          3. MIDDLE SECTION: Field Health Overview (Left) + Aerial Parcel (Center) + Weather & Soil (Right)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        {/* Left: Field Health Overview */}
        <div className="lg:col-span-3 glass-card-agri rounded-2xl p-4 border border-[#E1F5DC]/16 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#F4F7EF]">Field Health Overview</h3>
            <p className="text-[10px] text-[#B8CCAE] mb-3">AI-powered vegetation & soil analysis</p>

            {/* Circular Progress Gauge */}
            <div className="relative w-28 h-28 mx-auto my-2 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#123D2B"
                  strokeWidth="7"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#A8D86D"
                  strokeWidth="7"
                  strokeDasharray="238.7"
                  strokeDashoffset="33.4" // 86%
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-[#F4F7EF] leading-none">86</span>
                <span className="text-[9px] text-[#A8D86D] font-bold mt-0.5">Good</span>
              </div>
            </div>

            {/* Breakdown List (Matching Reference Image) */}
            <div className="space-y-1.5 text-xs mt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#A8D86D]" />
                  <span className="text-[#B8CCAE] text-[11px]">Excellent</span>
                </div>
                <span className="font-bold text-[#F4F7EF] text-[11px]">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#267A45]" />
                  <span className="text-[#B8CCAE] text-[11px]">Good</span>
                </div>
                <span className="font-bold text-[#F4F7EF] text-[11px]">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E6C779]" />
                  <span className="text-[#B8CCAE] text-[11px]">Average</span>
                </div>
                <span className="font-bold text-[#F4F7EF] text-[11px]">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E06A55]" />
                  <span className="text-[#B8CCAE] text-[11px]">Poor</span>
                </div>
                <span className="font-bold text-[#F4F7EF] text-[11px]">10%</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#E1F5DC]/10 text-[10px] text-[#A8D86D] flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>12% improvement from last week</span>
          </div>
        </div>

        {/* Center: Interactive Aerial Farmland Field Section (Matching Screenshot) */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#E1F5DC]/16 min-h-[250px] flex flex-col justify-between p-4 group">
          {/* Background image showing through */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/images/farmland_bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09271B]/80 via-transparent to-[#09271B]/40" />

          {/* Glowing Green Neon Field Polygon Boundary matching screenshot */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 250">
            {/* Glowing field outline */}
            <polygon
              points="190,130 260,120 250,170 170,185"
              fill="rgba(168, 216, 109, 0.12)"
              stroke="#A8D86D"
              strokeWidth="2.5"
              strokeLinejoin="round"
              filter="drop-shadow(0 0 8px #A8D86D)"
            />
          </svg>

          {/* Floating Leaf GPS Pins */}
          <div className="absolute left-[38%] top-[45%] -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#123D2B]/90 border border-[#A8D86D] text-[#A8D86D] shadow-lg animate-pulse">
            <Sprout className="w-3.5 h-3.5" />
          </div>
          <div className="absolute left-[52%] top-[40%] -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#123D2B]/90 border border-[#A8D86D] text-[#A8D86D] shadow-lg">
            <Sprout className="w-3.5 h-3.5" />
          </div>
          <div className="absolute left-[62%] top-[55%] -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#123D2B]/90 border border-[#A8D86D] text-[#A8D86D] shadow-lg">
            <Sprout className="w-3.5 h-3.5" />
          </div>

          {/* Top Label */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#123D2B]/85 text-[#F4F7EF] border border-[#E1F5DC]/20 backdrop-blur-md">
              Satellite Telemetry • Sentinel-2
            </span>
          </div>

          {/* Interactive Floating Card in Bottom Right matching screenshot ("Geork Field") */}
          <div className="relative z-10 self-end glass-panel-agri rounded-xl p-3 border border-[#E1F5DC]/25 max-w-[200px] shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-bold text-[#F4F7EF] mb-0.5">
              <span>Geork Field</span>
              <span>&gt;</span>
            </div>
            <div className="text-[10px] text-[#B8CCAE] mb-1">Wheat • 2.0 ha</div>
            <div className="text-[10px] text-[#A8D86D] font-bold flex items-center justify-between">
              <span>Health Score: 92</span>
              <span>&gt;</span>
            </div>
          </div>
        </div>

        {/* Right Stack: Weather Today & Soil Health Summary */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Weather Today Card (Matching Screenshot) */}
          <div className="glass-card-agri rounded-2xl p-4 border border-[#E1F5DC]/16">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xs font-bold text-[#F4F7EF]">Weather Today</h3>
                <div className="text-[10px] text-[#B8CCAE] flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-[#A8D86D]" />
                  <span>Mamasinan, Turkey</span>
                </div>
              </div>

              {/* Sun & Cloud Graphic */}
              <CloudSun className="w-7 h-7 text-[#E6C779]" />
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-[#F4F7EF]">22°C</span>
              <span className="text-xs text-[#B8CCAE]">Partly Cloudy</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] mb-3 text-[#B8CCAE] border-y border-[#E1F5DC]/10 py-1.5">
              <div>
                <span>Humidity</span>
                <div className="font-bold text-[#F4F7EF]">48%</div>
              </div>
              <div>
                <span>Wind</span>
                <div className="font-bold text-[#F4F7EF]">9 km/h</div>
              </div>
              <div>
                <span>Rain</span>
                <div className="font-bold text-[#A8D86D]">10%</div>
              </div>
            </div>

            {/* 5-Day Mini Forecast */}
            <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
              <div>
                <div className="text-[#B8CCAE]">Sun</div>
                <CloudSun className="w-3.5 h-3.5 text-[#E6C779] mx-auto my-0.5" />
                <div className="text-[#F4F7EF] font-bold">21°/14°</div>
              </div>
              <div>
                <div className="text-[#A8D86D] font-bold">Mon</div>
                <CloudSun className="w-3.5 h-3.5 text-[#A8D86D] mx-auto my-0.5" />
                <div className="text-[#F4F7EF] font-bold">22°/15°</div>
              </div>
              <div>
                <div className="text-[#B8CCAE]">Tue</div>
                <CloudSun className="w-3.5 h-3.5 text-[#E6C779] mx-auto my-0.5" />
                <div className="text-[#F4F7EF] font-bold">24°/16°</div>
              </div>
              <div>
                <div className="text-[#B8CCAE]">Wed</div>
                <CloudSun className="w-3.5 h-3.5 text-[#B8CCAE] mx-auto my-0.5" />
                <div className="text-[#F4F7EF] font-bold">23°/15°</div>
              </div>
              <div>
                <div className="text-[#B8CCAE]">Thu</div>
                <CloudSun className="w-3.5 h-3.5 text-[#E6C779] mx-auto my-0.5" />
                <div className="text-[#F4F7EF] font-bold">25°/17°</div>
              </div>
            </div>
          </div>

          {/* Soil Health Summary Card (Matching Screenshot) */}
          <div className="glass-card-agri rounded-2xl p-4 border border-[#E1F5DC]/16 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#F4F7EF]">Soil Health Summary</h3>
              <p className="text-[10px] text-[#B8CCAE] mb-3">Average across all fields</p>

              {/* NPK Pills matching screenshot */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-xl bg-[#09271B]/80 border border-[#E1F5DC]/10 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#123D2B] text-[#A8D86D] text-[10px] font-bold flex items-center justify-center shrink-0">
                    N
                  </div>
                  <div>
                    <span className="text-[9px] text-[#B8CCAE] block">Nitrogen</span>
                    <span className="text-[10px] font-bold text-[#F4F7EF]">Medium</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-[#09271B]/80 border border-[#E1F5DC]/10 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#123D2B] text-[#A8D86D] text-[10px] font-bold flex items-center justify-center shrink-0">
                    P
                  </div>
                  <div>
                    <span className="text-[9px] text-[#B8CCAE] block">Phosphorus</span>
                    <span className="text-[10px] font-bold text-[#A8D86D]">High</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-[#09271B]/80 border border-[#E1F5DC]/10 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#123D2B] text-[#A8D86D] text-[10px] font-bold flex items-center justify-center shrink-0">
                    K
                  </div>
                  <div>
                    <span className="text-[9px] text-[#B8CCAE] block">Potassium</span>
                    <span className="text-[10px] font-bold text-[#F4F7EF]">Medium</span>
                  </div>
                </div>
              </div>

              {/* Soil Organic Matter Progress Bar */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#B8CCAE]">Soil Organic Matter</span>
                  <span className="font-bold text-[#F4F7EF]">2.8%</span>
                </div>
                <div className="w-full bg-[#09271B] rounded-full h-2 overflow-hidden border border-[#E1F5DC]/10">
                  <div className="bg-gradient-to-r from-[#267A45] to-[#A8D86D] h-2 rounded-full w-[65%]" />
                </div>
                <div className="text-[10px] text-[#A8D86D] font-medium mt-1">Good level</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. BOTTOM ROW: Upcoming Tasks + Soil Moisture Trend + Crop Distribution (Matching Screenshot)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        {/* Card 1 (Left): Upcoming Tasks */}
        <div className="lg:col-span-4 glass-card-agri rounded-2xl p-4 border border-[#E1F5DC]/16 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#F4F7EF]">Upcoming Tasks</h3>
            </div>

            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className="p-2.5 rounded-xl bg-[#09271B]/70 hover:bg-[#123D2B]/80 border border-[#E1F5DC]/10 flex items-center justify-between gap-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-[#123D2B] text-[#A8D86D] flex items-center justify-center shrink-0">
                      {task.status === "Completed" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A8D86D]" />
                      ) : (
                        <Droplet className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-semibold ${
                          task.status === "Completed" ? "line-through text-slate-500" : "text-[#F4F7EF]"
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="text-[10px] text-[#B8CCAE]">{task.fieldName}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-[#B8CCAE] block">{task.scheduledTime.split("at")[0]}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#A8D86D]/15 text-[#A8D86D]">
                      {task.status === "Completed" ? "Done" : "Upcoming"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenNewTask}
            className="w-full mt-3 py-1.5 text-center text-xs font-semibold text-[#A8D86D] hover:text-[#F4F7EF] border-t border-[#E1F5DC]/10 transition-colors cursor-pointer"
          >
            View All Tasks
          </button>
        </div>

        {/* Card 2 (Center): Soil Moisture Trend Line Chart */}
        <div className="lg:col-span-4 glass-card-agri rounded-2xl p-4 border border-[#E1F5DC]/16 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-[#F4F7EF]">Soil Moisture Trend</h3>
              <span className="text-[10px] text-[#B8CCAE]">%</span>
            </div>

            {/* Chart Area */}
            <div className="w-full h-36">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={soilMoistureData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#B8CCAE" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} stroke="#B8CCAE" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09271B",
                      borderColor: "rgba(225, 245, 220, 0.2)",
                      borderRadius: "8px",
                      fontSize: "10px",
                    }}
                  />
                  {/* Actual solid line */}
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#A8D86D"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#A8D86D" }}
                  />
                  {/* Forecast dotted line */}
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#A8D86D"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                    dot={{ r: 2, fill: "#A8D86D" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-[10px] text-[#B8CCAE] pt-2 border-t border-[#E1F5DC]/10">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-[#A8D86D]" /> Actual
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 border-t border-dotted border-[#A8D86D]" /> Forecast
            </span>
          </div>
        </div>

        {/* Card 3 (Right): Crop Distribution Doughnut Chart */}
        <div className="lg:col-span-4 glass-card-agri rounded-2xl p-4 border border-[#E1F5DC]/16 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-[#F4F7EF]">Crop Distribution</h3>
              <span className="text-[10px] text-[#B8CCAE]">By Area</span>
            </div>

            <div className="grid grid-cols-12 gap-2 items-center">
              {/* Doughnut Chart with Center Total Area */}
              <div className="col-span-5 relative w-full h-32 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropDistData}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={50}
                      paddingAngle={3}
                      dataKey="area"
                    >
                      {cropDistData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#09271B" strokeWidth={1.5} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-xs font-extrabold text-[#F4F7EF]">125.6 ha</span>
                  <span className="text-[8px] text-[#B8CCAE]">Total</span>
                </div>
              </div>

              {/* Legend List matching screenshot */}
              <div className="col-span-7 space-y-1 text-[11px]">
                {cropDistData.map((c) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="text-[#B8CCAE] text-[10px]">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#F4F7EF] text-[10px]">{c.area} ha</span>
                      <span className="text-[#B8CCAE] text-[9px] w-6 text-right">{c.percent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenEditProfile}
            className="w-full mt-2 py-1 text-center text-xs font-semibold text-[#A8D86D] hover:text-[#F4F7EF] border-t border-[#E1F5DC]/10 transition-colors cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>

      {/* =========================================================================
          5. AGRIPULSE AI PREDICTIVE OPTIMIZATION STRATEGY RIBBON
          ========================================================================= */}
      <div className="glass-panel-agri rounded-2xl p-4 border border-[#A8D86D]/30 bg-gradient-to-r from-[#123D2B]/90 to-[#09271B]/95 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#A8D86D]/20 border border-[#A8D86D]/40 flex items-center justify-center text-[#A8D86D] shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#A8D86D] uppercase tracking-wider">
                AGRIPULSE DECISION RECOMMENDATION
              </span>
              <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-[#A8D86D] text-[#09271B]">
                88% Confidence
              </span>
            </div>
            <div className="text-sm font-bold text-[#F4F7EF]">
              Sell 70% to Buyer A (₹32/kg in 3 days) • Retain 30% for local hedge (+₹11,300 net gain)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            onClick={onOpenWhyRecommendation}
            className="flex-1 md:flex-none px-3.5 py-1.5 rounded-xl bg-[#A8D86D] hover:bg-[#b8e483] text-[#09271B] font-bold text-xs transition-colors cursor-pointer"
          >
            Why This Recommendation?
          </button>
          <button
            onClick={onOpenWhatIf}
            className="flex-1 md:flex-none px-3.5 py-1.5 rounded-xl bg-[#123D2B] hover:bg-[#1c553d] border border-[#A8D86D]/40 text-[#F4F7EF] font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
          >
            <Sliders className="w-3.5 h-3.5 text-[#A8D86D]" />
            <span>What-If Simulator</span>
          </button>
        </div>
      </div>
    </div>
  );
}

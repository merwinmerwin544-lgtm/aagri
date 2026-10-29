"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { Droplet, Info } from "lucide-react";

interface SoilMoistureChartProps {
  data: {
    timestamp: string;
    actualMoisture: number;
    forecastMoisture: number;
    optimalThreshold: number;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel rounded-xl p-3 border-emerald-500/30 bg-[#03150e]/95 text-xs shadow-xl">
        <div className="font-bold text-white mb-1.5 flex items-center gap-1.5">
          <Droplet className="w-3.5 h-3.5 text-cyan-400" />
          <span>Time: {label}</span>
        </div>
        <div className="space-y-1 text-[11px]">
          <div className="text-emerald-400 font-semibold flex items-center justify-between gap-3">
            <span>Actual Moisture:</span>
            <span>{payload[0]?.value}%</span>
          </div>
          <div className="text-cyan-300 font-semibold flex items-center justify-between gap-3">
            <span>Forecast Moisture:</span>
            <span>{payload[1]?.value}%</span>
          </div>
          <div className="text-amber-300/80 text-[10px] pt-1 border-t border-emerald-500/20">
            Target Threshold: 35%
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function SoilMoistureChart({ data }: SoilMoistureChartProps) {
  return (
    <div className="glass-panel rounded-2xl p-5 border-emerald-500/25 bg-[#041a13]/70">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Soil Moisture 24h Trend & Telemetry
            </h3>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-cyan-500/15 text-cyan-300 rounded border border-cyan-500/25">
              Sensors Live
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Root-zone moisture curve against optimal plant hydration threshold (35%)
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Current Reading</div>
          <div className="text-lg font-extrabold text-emerald-400">34.2%</div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(52, 211, 153, 0.08)" />
            <XAxis
              dataKey="timestamp"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "rgba(52, 211, 153, 0.2)" }}
            />
            <YAxis
              domain={[20, 45]}
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "rgba(52, 211, 153, 0.2)" }}
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
              iconType="circle"
            />
            <ReferenceLine
              y={35}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              label={{
                value: "Optimal 35%",
                fill: "#f59e0b",
                fontSize: 10,
                position: "insideTopRight",
              }}
            />
            <Line
              type="monotone"
              dataKey="actualMoisture"
              name="Actual Sensor Moisture"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#10b981" }}
              activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="forecastMoisture"
              name="AI Predictive Evapotranspiration"
              stroke="#38bdf8"
              strokeWidth={2}
              strokeDasharray="4 2"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-emerald-500/15 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          <span>Next scheduled drip pulse: Today at 05:30 PM (45 mins)</span>
        </div>
        <span className="text-[10px] text-slate-400">Sample Sensor Telemetry</span>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { PieChart as PieIcon, ExternalLink } from "lucide-react";

interface CropItem {
  name: string;
  areaHa: number;
  color: string;
  sharePercent: number;
}

export default function CropDistributionChart() {
  const [selectedCrop, setSelectedCrop] = useState<CropItem | null>(null);

  const data: CropItem[] = [
    { name: "Wheat", areaHa: 45.2, color: "#10b981", sharePercent: 36 },
    { name: "Corn", areaHa: 32.8, color: "#2dd4bf", sharePercent: 26 },
    { name: "Soybean", areaHa: 25.6, color: "#38bdf8", sharePercent: 20 },
    { name: "Barley", areaHa: 12.5, color: "#818cf8", sharePercent: 10 },
    { name: "Tomato & Veg", areaHa: 9.5, color: "#f472b6", sharePercent: 8 },
  ];

  const totalArea = 125.6;

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as CropItem;
      return (
        <div className="glass-panel rounded-xl p-2.5 border-emerald-500/30 bg-[#03150e]/95 text-xs shadow-xl">
          <div className="font-bold text-white mb-1" style={{ color: item.color }}>
            {item.name}
          </div>
          <div className="text-slate-300">
            Area: <span className="text-white font-semibold">{item.areaHa} ha</span> ({item.sharePercent}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border-emerald-500/25 bg-[#041a13]/70">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Crop Distribution by Area
          </h3>
          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 rounded border border-emerald-500/25">
            5 Varieties
          </span>
        </div>

        <button
          onClick={() => setSelectedCrop(data[0])}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
        >
          <span>Details</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Doughnut Chart Container with Center Text */}
        <div className="sm:col-span-6 relative w-full h-48 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="areaHa"
                onClick={(entry) => setSelectedCrop(entry as any)}
                cursor="pointer"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#03130e"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Area Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Area</span>
            <span className="text-base font-extrabold text-white">{totalArea} ha</span>
            <span className="text-[9px] text-emerald-400 font-semibold">Registered</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="sm:col-span-6 space-y-1.5 text-xs">
          {data.map((crop) => (
            <div
              key={crop.name}
              onClick={() => setSelectedCrop(crop)}
              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-emerald-500/10 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: crop.color }}
                />
                <span className="text-slate-300 font-medium">{crop.name}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <span className="text-white">{crop.areaHa} ha</span>
                <span className="text-slate-400 text-[10px]">({crop.sharePercent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCrop && (
        <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs flex items-center justify-between animate-in fade-in">
          <div>
            <span className="text-emerald-300 font-bold">{selectedCrop.name}:</span>{" "}
            <span className="text-slate-300">
              {selectedCrop.areaHa} hectares under cultivation. Projected harvest in 12-18 days.
            </span>
          </div>
          <button
            onClick={() => setSelectedCrop(null)}
            className="text-[10px] text-slate-400 hover:text-white ml-2"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

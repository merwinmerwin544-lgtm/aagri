"use client";

import React, { useState } from "react";
import { MapPin, Layers, Satellite, Zap, CheckCircle2 } from "lucide-react";

interface ParcelNode {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  crop: string;
  areaHa: number;
  ndvi: number;
  status: "Optimal" | "Good" | "Needs Attention";
}

export default function UsFarmMap() {
  const [activeLayer, setActiveLayer] = useState<"ndvi" | "moisture" | "zones">("ndvi");
  const [selectedParcel, setSelectedParcel] = useState<ParcelNode | null>(null);

  const parcels: ParcelNode[] = [
    { id: "p1", name: "Parcel A1 — Sunrise Tomato Block", x: 42, y: 38, crop: "Tomato", areaHa: 2.0, ndvi: 0.78, status: "Good" },
    { id: "p2", name: "Parcel B2 — Sweet Corn Belt", x: 58, y: 32, crop: "Corn", areaHa: 3.2, ndvi: 0.82, status: "Optimal" },
    { id: "p3", name: "Parcel C1 — Soybean Terrace", x: 68, y: 52, crop: "Soybean", areaHa: 2.5, ndvi: 0.74, status: "Good" },
    { id: "p4", name: "Parcel D3 — Winter Wheat Nursery", x: 30, y: 48, crop: "Wheat", areaHa: 4.0, ndvi: 0.85, status: "Optimal" },
    { id: "p5", name: "Parcel E2 — Organic Chilli Ridge", x: 50, y: 64, crop: "Chilli", areaHa: 1.2, ndvi: 0.69, status: "Needs Attention" },
  ];

  return (
    <div className="relative glass-panel rounded-2xl p-5 border-emerald-500/25 bg-[#041a13]/70 overflow-hidden">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Regional Agricultural Parcels & NDVI Map
            </h3>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              Live GIS
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Spatial vegetation density & farm telemetry sensor grid (Reference Image 2 matching)
          </p>
        </div>

        {/* Layer Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-emerald-500/20 text-[11px]">
          <button
            onClick={() => setActiveLayer("ndvi")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeLayer === "ndvi"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            NDVI Index
          </button>
          <button
            onClick={() => setActiveLayer("moisture")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeLayer === "moisture"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Soil Moisture
          </button>
          <button
            onClick={() => setActiveLayer("zones")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeLayer === "zones"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Zone Borders
          </button>
        </div>
      </div>

      {/* SVG Neon Map Area */}
      <div className="relative w-full h-64 sm:h-72 rounded-xl bg-gradient-to-b from-[#02130e] to-[#010906] border border-emerald-500/20 overflow-hidden flex items-center justify-center">
        {/* Holographic Coordinate Grid */}
        <div className="absolute inset-0 bg-grid-emerald opacity-60 pointer-events-none" />

        {/* Ambient Glow Center */}
        <div className="absolute w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Stylized Neon Vector Map Contour */}
        <svg
          viewBox="0 0 800 450"
          className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] opacity-90"
        >
          {/* Main Regional Agricultural Outline */}
          <path
            d="M 120 180 Q 200 90 350 110 T 520 80 T 680 130 T 720 280 T 590 380 T 360 410 T 180 340 Z"
            fill="rgba(6, 40, 29, 0.45)"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="6 3"
          />

          {/* Sub-zone agricultural polygons */}
          <polygon
            points="240,150 360,130 380,240 220,220"
            fill="rgba(16, 185, 129, 0.18)"
            stroke="#34d399"
            strokeWidth="1.5"
          />
          <polygon
            points="390,140 520,110 540,230 400,250"
            fill="rgba(56, 189, 248, 0.15)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          <polygon
            points="410,260 550,240 580,360 430,370"
            fill="rgba(45, 212, 191, 0.2)"
            stroke="#2dd4bf"
            strokeWidth="1.5"
          />
          <polygon
            points="230,230 390,250 350,380 200,340"
            fill="rgba(16, 185, 129, 0.25)"
            stroke="#10b981"
            strokeWidth="1.5"
          />

          {/* Flowing Irrigation Canal Vectors */}
          <path
            d="M 140 160 Q 300 240 450 220 T 700 290"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            opacity="0.8"
          />
          <path
            d="M 380 120 Q 390 280 370 400"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.7"
          />
        </svg>

        {/* Interactive Parcel Pins */}
        {parcels.map((parcel) => (
          <button
            key={parcel.id}
            onClick={() => setSelectedParcel(parcel)}
            style={{ left: `${parcel.x}%`, top: `${parcel.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full border transition-all duration-200 group ${
              selectedParcel?.id === parcel.id
                ? "bg-emerald-400 border-white ring-4 ring-emerald-400/30 scale-125 z-20"
                : "bg-[#031c14] border-emerald-400 text-emerald-300 hover:scale-110 z-10"
            }`}
            title={parcel.name}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:bg-white animate-pulse" />
          </button>
        ))}

        {/* Parcel Details Overlay Floating Pill */}
        {selectedParcel && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs glass-panel rounded-xl p-3 border-emerald-400/40 bg-[#03150f]/95 shadow-xl text-left z-30 animate-in fade-in">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-white">{selectedParcel.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                {selectedParcel.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-300 mt-2 pt-2 border-t border-emerald-500/20">
              <div>
                <span className="text-slate-500 block">Crop:</span>
                <span className="font-bold text-white">{selectedParcel.crop}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Area:</span>
                <span className="font-bold text-white">{selectedParcel.areaHa} ha</span>
              </div>
              <div>
                <span className="text-slate-500 block">NDVI:</span>
                <span className="font-bold text-emerald-400">{selectedParcel.ndvi}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Metrics */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-black/30 border border-emerald-500/15">
          <div className="text-[10px] text-slate-400">Total Scanned Area</div>
          <div className="font-bold text-white">125.6 ha</div>
        </div>
        <div className="p-2 rounded-xl bg-black/30 border border-emerald-500/15">
          <div className="text-[10px] text-slate-400">Average NDVI</div>
          <div className="font-bold text-emerald-400">0.78 (Healthy)</div>
        </div>
        <div className="p-2 rounded-xl bg-black/30 border border-emerald-500/15">
          <div className="text-[10px] text-slate-400">Active Sensors</div>
          <div className="font-bold text-teal-300">48 Telemetry Nodes</div>
        </div>
        <div className="p-2 rounded-xl bg-black/30 border border-emerald-500/15">
          <div className="text-[10px] text-slate-400">Irrigation Efficiency</div>
          <div className="font-bold text-cyan-300">92% Closed-Loop</div>
        </div>
      </div>
    </div>
  );
}

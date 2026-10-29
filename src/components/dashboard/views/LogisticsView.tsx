"use client";

import React, { useState } from "react";
import {
  Truck,
  MapPin,
  Clock,
  DollarSign,
  Leaf,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { LogisticsOption, Buyer } from "@/types";
import { sampleLogisticsRoutes } from "@/services/mockData";

interface LogisticsViewProps {
  buyers: Buyer[];
  selectedBuyerId: string;
  onSelectBuyer: (id: string) => void;
}

export default function LogisticsView({
  buyers,
  selectedBuyerId,
  onSelectBuyer,
}: LogisticsViewProps) {
  const [vehicleFilter, setVehicleFilter] = useState<"EV" | "Diesel">("EV");

  const route: LogisticsOption =
    sampleLogisticsRoutes[selectedBuyerId] || sampleLogisticsRoutes["buyer-a"];

  // Adjust carbon and cost if Diesel is selected
  const displayCost =
    vehicleFilter === "Diesel"
      ? Math.round(route.estimatedTransportCostInr * 1.15)
      : route.estimatedTransportCostInr;
  const displayCo2 =
    vehicleFilter === "Diesel"
      ? (route.co2eKg * 1.72).toFixed(1)
      : route.co2eKg.toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
                <Truck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Green Logistics & Route Optimization
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  Carbon-Capped Transit
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Eco-routing algorithm linking farm gates, rural collection hubs, and wholesale buyer facilities
              </p>
            </div>
          </div>

          {/* Select Active Buyer for Routing */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
            <span className="text-slate-400 pl-2">Target Buyer:</span>
            <select
              value={selectedBuyerId}
              onChange={(e) => onSelectBuyer(e.target.value)}
              className="bg-[#02100b] text-emerald-300 font-bold px-2 py-1 rounded-lg border border-emerald-500/30 focus:outline-none"
            >
              {buyers.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.distanceKm} km)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4 Logistics Key Metric Cards (Prompt Section 10 Spec) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Distance */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Transit Distance
            </span>
            <Navigation className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">{route.distanceKm} km</div>
          <div className="text-xs text-slate-400">Via Singanallur Agro Corridor</div>
        </div>

        {/* Travel Time */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Estimated Duration
            </span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">{route.travelTimeStr}</div>
          <div className="text-xs text-teal-300 font-medium">Off-peak morning dispatch</div>
        </div>

        {/* Transport Cost */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Transport Cost
            </span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 mb-1">
            ₹{displayCost.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">~₹44 / km including loading</div>
        </div>

        {/* Transport Carbon Emissions */}
        <div className="glass-card-interactive rounded-2xl p-5 border-emerald-500/20 bg-[#041913]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Logistics CO₂e
            </span>
            <Leaf className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-300 mb-1">{displayCo2} kg</div>
          <div className="text-xs text-emerald-400 font-medium">
            {vehicleFilter === "EV" ? "-42% vs standard diesel" : "Unoptimized baseline"}
          </div>
        </div>
      </div>

      {/* Vehicle Fleet Switcher */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel border-emerald-500/20 bg-[#041a13]/70">
        <div>
          <span className="text-xs font-bold text-white block">Carrier Dispatch Model:</span>
          <span className="text-[11px] text-slate-400">
            Compare carbon and freight fee between electric carriers vs conventional diesel
          </span>
        </div>
        <div className="flex items-center p-1 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
          <button
            onClick={() => setVehicleFilter("EV")}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              vehicleFilter === "EV"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Electric Light Truck (Recommended)</span>
          </button>
          <button
            onClick={() => setVehicleFilter("Diesel")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              vehicleFilter === "Diesel"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Diesel Mini-truck
          </button>
        </div>
      </div>

      {/* Interactive Connected Route Visualizer */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <h3 className="text-sm font-bold text-white mb-1">
          Transit Waypoint Trajectory: {route.buyerName}
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Pre-cleared collection points minimize loading dwell time and produce thermal degradation
        </p>

        {/* Visual Waypoint Nodes */}
        <div className="relative py-6">
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 -translate-y-1/2 z-0 opacity-40" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* 1. Farm Origin */}
            <div className="p-4 rounded-2xl bg-[#03150e] border border-emerald-500/30 text-center relative shadow-lg">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                01
              </div>
              <div className="text-xs font-bold text-white mb-0.5">Farm Origin (Field-Side)</div>
              <div className="text-[10px] text-emerald-400">Coimbatore South Parcel</div>
              <div className="text-[10px] text-slate-500 mt-2">Pick: Crate Stacking (06:00 AM)</div>
            </div>

            {/* 2. Collection Hub */}
            <div className="p-4 rounded-2xl bg-[#03150e] border border-teal-500/30 text-center relative shadow-lg">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400 text-teal-300 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                02
              </div>
              <div className="text-xs font-bold text-white mb-0.5">Singanallur Agro Hub</div>
              <div className="text-[10px] text-teal-300">Consolidated Rural Depot</div>
              <div className="text-[10px] text-slate-500 mt-2">Dwell: 15 mins (Weight Audit)</div>
            </div>

            {/* 3. Buyer Destination */}
            <div className="p-4 rounded-2xl bg-[#03150e] border border-cyan-500/30 text-center relative shadow-lg">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                03
              </div>
              <div className="text-xs font-bold text-white mb-0.5">{route.destinationLocation}</div>
              <div className="text-[10px] text-cyan-300">{route.buyerName} Intake Bay</div>
              <div className="text-[10px] text-slate-500 mt-2">Arrival: 07:20 AM (Grade A Certified)</div>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-slate-300 flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Recommended carrier assigned: Electric Light Truck (42 km battery reserve, ambient crate shading)</span>
          </div>
          <span className="text-[10px] text-slate-400">Simulated routing service</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Target,
  Sparkles,
  Star,
  Truck,
  CheckCircle2,
  SlidersHorizontal,
  ArrowUpDown,
  MapPin,
  Check,
  Scale,
  ExternalLink,
} from "lucide-react";
import { Buyer } from "@/types";

interface BuyerMatchingViewProps {
  buyers: Buyer[];
  selectedBuyerId: string;
  onSelectBuyer: (id: string) => void;
  onOpenCompare: () => void;
}

export default function BuyerMatchingView({
  buyers,
  selectedBuyerId,
  onSelectBuyer,
  onOpenCompare,
}: BuyerMatchingViewProps) {
  const [sortBy, setSortBy] = useState<"match" | "price" | "distance">("match");
  const [filterQuality, setFilterQuality] = useState<string>("All");
  const [activeBuyerModal, setActiveBuyerModal] = useState<Buyer | null>(null);

  // Filter & Sort
  const filtered = buyers
    .filter((b) => {
      if (filterQuality === "All") return true;
      return b.qualityRequirement === filterQuality;
    })
    .sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "price") return b.offeredPricePerKg - a.offeredPricePerKg;
      return a.distanceKm - b.distanceKm;
    });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  AI Commercial Buyer Matching
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  Weighted Ranking Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct procurement matching without middleman cuts: Price (30%), Quality (20%), Proximity (15%), Demand (15%), Quantity (10%), Reliability (10%)
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCompare}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/40 text-emerald-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
          >
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Compare All Buyers Matrix</span>
          </button>
        </div>
      </div>

      {/* Sorting & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl bg-black/40 border border-emerald-500/20 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
          </span>
          <button
            onClick={() => setSortBy("match")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              sortBy === "match"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Match Score %
          </button>
          <button
            onClick={() => setSortBy("price")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              sortBy === "price"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Highest Price
          </button>
          <button
            onClick={() => setSortBy("distance")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              sortBy === "distance"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Closest Distance
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Quality Filter:</span>
          <select
            value={filterQuality}
            onChange={(e) => setFilterQuality(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-[#02100b] border border-emerald-500/30 text-white text-xs focus:outline-none"
          >
            <option value="All">All Grades</option>
            <option value="Grade A">Grade A Only</option>
            <option value="Grade B">Grade B Processing</option>
          </select>
        </div>
      </div>

      {/* Buyer Cards Grid (Prompt Section 9 Spec: Buyer A, Buyer B, Buyer C, Buyer D) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((buyer) => {
          const isSelected = buyer.id === selectedBuyerId;
          return (
            <div
              key={buyer.id}
              className={`glass-card-interactive rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                isSelected
                  ? "border-emerald-400 ring-2 ring-emerald-400/30 bg-[#06241a]/90 shadow-xl shadow-emerald-950"
                  : "border-emerald-500/20 bg-[#041913]/70"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{buyer.name}</h3>
                      {buyer.matchPercentage >= 90 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                          Top Match
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">{buyer.organization}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-300 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{buyer.location} ({buyer.distanceKm} km)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-cyan-300">
                      {buyer.matchPercentage}%
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Match Score
                    </div>
                  </div>
                </div>

                {/* Match Reason Banner */}
                <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/15 mb-4 text-xs text-emerald-300 leading-snug">
                  <span className="font-bold text-white">Why Matched: </span>
                  {buyer.matchReason}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/15 mb-4 text-xs text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Offered Rate</span>
                    <span className="font-extrabold text-emerald-400 text-sm">
                      ₹{buyer.offeredPricePerKg}/kg
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Required Vol</span>
                    <span className="font-bold text-white text-sm">
                      {buyer.quantityRequiredTonnes} tonnes
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Spec Grade</span>
                    <span className="font-bold text-teal-300 text-sm">
                      {buyer.qualityRequirement}
                    </span>
                  </div>
                </div>

                {/* Detailed Scoring Weights */}
                <div className="space-y-1.5 text-[11px] mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Price Score (30% wt):</span>
                    <span className="font-bold text-white">{buyer.scoring.priceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Quality Spec (20% wt):</span>
                    <span className="font-bold text-white">{buyer.scoring.qualityScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Proximity (15% wt):</span>
                    <span className="font-bold text-white">{buyer.scoring.distanceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reliability & Escrow (10% wt):</span>
                    <span className="font-bold text-amber-300">
                      ★ {buyer.reliabilityRating} ({buyer.scoring.reliabilityScore}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-emerald-500/15 flex items-center justify-between">
                <button
                  onClick={() => setActiveBuyerModal(buyer)}
                  className="text-xs text-slate-300 hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                {isSelected ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/40">
                    <Check className="w-4 h-4" />
                    <span>Selected for Dispatch</span>
                  </span>
                ) : (
                  <button
                    onClick={() => onSelectBuyer(buyer.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs transition-colors"
                  >
                    Select This Buyer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Buyer Detail Drawer / Modal */}
      {activeBuyerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 border-emerald-500/35 bg-[#03150e]/95 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">{activeBuyerModal.name}</h3>
            <p className="text-xs text-slate-400 mb-4">{activeBuyerModal.organization}</p>
            <div className="space-y-2 text-xs text-slate-300 mb-5">
              <div className="flex justify-between py-1 border-b border-emerald-500/15">
                <span className="text-slate-400">Delivery Window:</span>
                <span className="font-semibold text-white">{activeBuyerModal.deliveryWindow}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-500/15">
                <span className="text-slate-400">Payment Escrow:</span>
                <span className="font-semibold text-emerald-400">{activeBuyerModal.paymentTerms}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-500/15">
                <span className="text-slate-400">Contact Desk (Demo):</span>
                <span className="font-semibold text-white">{activeBuyerModal.phoneDemo}</span>
              </div>
            </div>
            <button
              onClick={() => setActiveBuyerModal(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

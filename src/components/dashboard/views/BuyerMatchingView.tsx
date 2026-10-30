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
import { CropQualityGrade, Buyer } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface BuyerMatchingViewProps {
  buyers: Buyer[];
  selectedBuyerId: string;
  onSelectBuyer: (id: string) => void;
  onOpenCompare: () => void;
  verifiedGrade?: CropQualityGrade;
  onOpenPhotoGrading?: () => void;
}

const GRADE_RANK: Record<CropQualityGrade, number> = {
  "Export Grade": 4,
  "Grade A": 3,
  "Grade B": 2,
  "Grade C": 1,
};

export default function BuyerMatchingView({
  buyers,
  selectedBuyerId,
  onSelectBuyer,
  onOpenCompare,
  verifiedGrade = "Grade A",
  onOpenPhotoGrading,
}: BuyerMatchingViewProps) {
  const { t, tr } = useLanguage();
  const [sortBy, setSortBy] = useState<"match" | "price" | "distance">("match");
  const [filterQuality, setFilterQuality] = useState<string>("All");
  const [onlyMatchingSpecs, setOnlyMatchingSpecs] = useState<boolean>(true);
  const [activeBuyerModal, setActiveBuyerModal] = useState<Buyer | null>(null);

  // Filter & Sort based on photo-verified grade specs
  const filtered = buyers
    .filter((b) => {
      if (verifiedGrade && onlyMatchingSpecs) {
        // Only match if farmer's verified batch meets or exceeds buyer requirement
        const batchRank = GRADE_RANK[verifiedGrade] ?? 3;
        const buyerRank = GRADE_RANK[b.qualityRequirement as CropQualityGrade] ?? 3;
        if (batchRank < buyerRank) return false;
      }
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
                  {t.buyerMatchingTitle}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  {t.verifiedBuyer}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t.buyerMatchingSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCompare}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/40 text-emerald-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
          >
            <Scale className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Photo-Verified Quality Spec Lock Banner */}
      <div className="p-4 rounded-2xl bg-[#123D2B]/80 border border-[#A8D86D]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#A8D86D] text-[#09271B] flex items-center justify-center font-black text-sm shrink-0 shadow">
            ✓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F4F7EF]">
                Photo-Verified Quality: <strong className="text-[#A8D86D]">{verifiedGrade}</strong>
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#A8D86D]/20 text-[#A8D86D]">
                Spec Enforced
              </span>
            </div>
            <p className="text-[11px] text-[#B8CCAE] mt-0.5">
              Buyers below are filtered strictly to those accepting {verifiedGrade} or lower. Removes market wrangling.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setOnlyMatchingSpecs(!onlyMatchingSpecs)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              onlyMatchingSpecs
                ? "bg-[#A8D86D] text-[#09271B] font-bold border-[#A8D86D]"
                : "bg-black/40 text-slate-400 border-white/10"
            }`}
          >
            {onlyMatchingSpecs ? "Only Qualified Buyers" : "Show All Buyers"}
          </button>

          {onOpenPhotoGrading && (
            <button
              onClick={onOpenPhotoGrading}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#F4F7EF] bg-black/40 hover:bg-black/60 border border-[#E1F5DC]/15 transition-colors"
            >
              Re-scan Photo
            </button>
          )}
        </div>
      </div>

      {/* Sorting & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl bg-black/40 border border-emerald-500/20 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>{t.sortNetRevenue}:</span>
          </span>
          <button
            onClick={() => setSortBy("match")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              sortBy === "match"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.confidenceScore} %
          </button>
          <button
            onClick={() => setSortBy("price")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              sortBy === "price"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.offeredPrice}
          </button>
          <button
            onClick={() => setSortBy("distance")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              sortBy === "distance"
                ? "bg-emerald-500 text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.distance}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">{t.qualityGradeReq}:</span>
          <select
            value={filterQuality}
            onChange={(e) => setFilterQuality(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-[#02100b] border border-emerald-500/30 text-white text-xs focus:outline-none"
          >
            <option value="All">{t.filterDistance}</option>
            <option value="Grade A">Grade A</option>
            <option value="Grade B">Grade B</option>
          </select>
        </div>
      </div>

      {/* Buyer Cards Grid */}
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
                          {t.good}
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
                      {t.confidenceScore}
                    </div>
                  </div>
                </div>

                {/* Match Reason Banner */}
                <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/15 mb-4 text-xs text-emerald-300 leading-snug">
                  <span className="font-bold text-white">{t.whyThisDecision}: </span>
                  {buyer.matchReason}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/15 mb-4 text-xs text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t.offeredPrice}</span>
                    <span className="font-extrabold text-emerald-400 text-sm">
                      ₹{buyer.offeredPricePerKg}/kg
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t.requiredQuantity}</span>
                    <span className="font-bold text-white text-sm">
                      {buyer.quantityRequiredTonnes} {t.tonnes}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t.qualityGradeReq}</span>
                    <span className="font-bold text-teal-300 text-sm">
                      {buyer.qualityRequirement}
                    </span>
                  </div>
                </div>

                {/* Detailed Scoring Weights */}
                <div className="space-y-1.5 text-[11px] mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.factorPrice}:</span>
                    <span className="font-bold text-white">{buyer.scoring.priceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.qualityGradeReq}:</span>
                    <span className="font-bold text-white">{buyer.scoring.qualityScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.distance}:</span>
                    <span className="font-bold text-white">{buyer.scoring.distanceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.creditScore}:</span>
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
                  className="text-xs text-slate-300 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.viewDetails}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                {isSelected ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/40">
                    <Check className="w-4 h-4" />
                    <span>{t.selectAndRoute}</span>
                  </span>
                ) : (
                  <button
                    onClick={() => onSelectBuyer(buyer.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs transition-colors cursor-pointer"
                  >
                    {t.selectBuyer}
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
                <span className="text-slate-400">{t.deliveryDeadline}:</span>
                <span className="font-semibold text-white">{activeBuyerModal.deliveryWindow}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-500/15">
                <span className="text-slate-400">{t.paymentTerms}:</span>
                <span className="font-semibold text-emerald-400">{tr(activeBuyerModal.paymentTerms)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-500/15">
                <span className="text-slate-400">{t.contactBuyer}:</span>
                <span className="font-semibold text-white">{activeBuyerModal.phoneDemo}</span>
              </div>
            </div>
            <button
              onClick={() => setActiveBuyerModal(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

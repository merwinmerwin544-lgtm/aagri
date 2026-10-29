"use client";

import React from "react";
import { X, Check, Star, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { Buyer } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface CompareBuyersModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyers: Buyer[];
  selectedBuyerId: string;
  onSelectBuyer: (id: string) => void;
}

export default function CompareBuyersModal({
  isOpen,
  onClose,
  buyers,
  selectedBuyerId,
  onSelectBuyer,
}: CompareBuyersModalProps) {
  const { t, tr } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/35 bg-[#03150e]/95 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {t.compareBuyersTitle}
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              {t.verifiedBuyer}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {t.compareBuyersSubtitle}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-emerald-500/20">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-emerald-950/40 border-b border-emerald-500/20 text-slate-300 font-semibold">
                <th className="p-3.5">{t.buyer}</th>
                <th className="p-3.5">{t.offeredPrice}</th>
                <th className="p-3.5">{t.qualityGradeReq}</th>
                <th className="p-3.5">{t.distance}</th>
                <th className="p-3.5">{t.creditScore}</th>
                <th className="p-3.5">{t.confidenceScore}</th>
                <th className="p-3.5 text-right">{t.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {buyers.map((buyer) => {
                const isSelected = buyer.id === selectedBuyerId;
                return (
                  <tr
                    key={buyer.id}
                    className={`hover:bg-emerald-500/5 transition-colors ${
                      isSelected ? "bg-emerald-500/10" : ""
                    }`}
                  >
                    <td className="p-3.5">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{buyer.name}</span>
                        {buyer.matchPercentage >= 90 && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-400/20 text-emerald-300 font-bold">
                            {t.good}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{buyer.organization}</div>
                      <div className="text-[10px] text-emerald-400/80 mt-0.5">{buyer.location}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-sm font-extrabold text-emerald-400">
                        ₹{buyer.offeredPricePerKg}/kg
                      </div>
                      <div className="text-[10px] text-slate-400">{tr(buyer.paymentTerms)}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                        {buyer.qualityRequirement}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-white">{buyer.distanceKm} km</div>
                      <div className="text-[10px] text-slate-400">Transit: ~1.2 hrs</div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1 text-amber-300 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{buyer.reliabilityRating}/5.0</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Score {buyer.scoring.reliabilityScore}%</div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-base font-extrabold text-teal-300">
                        {buyer.matchPercentage}%
                      </div>
                    </td>

                    <td className="p-3.5 text-right">
                      {isSelected ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold inline-flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.doneBadge}</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            onSelectBuyer(buyer.id);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold transition-colors cursor-pointer"
                        >
                          {t.selectBuyer}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between text-xs">
          <span className="text-slate-400">{t.immediatePayment}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-black/40 border border-emerald-500/25 text-slate-300 hover:text-white font-semibold"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}

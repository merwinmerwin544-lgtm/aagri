"use client";

import React from "react";
import { X, Check, Star, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { Buyer } from "@/types";

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
              Compare Matched Commercial Buyers
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              Weighted Matrix
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Compare offered prices, quality grades, distance, and net profitability
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-emerald-500/20">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-emerald-950/40 border-b border-emerald-500/20 text-slate-300 font-semibold">
                <th className="p-3.5">Buyer Entity</th>
                <th className="p-3.5">Offered Price</th>
                <th className="p-3.5">Quality Spec</th>
                <th className="p-3.5">Distance</th>
                <th className="p-3.5">Reliability</th>
                <th className="p-3.5">Match Score</th>
                <th className="p-3.5 text-right">Action</th>
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
                            TOP PICK
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
                      <div className="text-[10px] text-slate-400">{buyer.paymentTerms}</div>
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
                      <div className="flex items-center gap-1 font-semibold text-amber-300">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        <span>{buyer.reliabilityRating} / 5.0</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-extrabold text-sm text-cyan-300">
                        {buyer.matchPercentage}%
                      </div>
                      <div className="w-16 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className="bg-cyan-400 h-1.5 rounded-full"
                          style={{ width: `${buyer.matchPercentage}%` }}
                        />
                      </div>
                    </td>

                    <td className="p-3.5 text-right">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            onSelectBuyer(buyer.id);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs transition-colors"
                        >
                          Select Buyer
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Scored across 6 weighted criteria (Price 30%, Quality 20%, Distance 15%, Demand 15%, Quantity 10%, Reliability 10%)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-black/40 border border-emerald-500/20 text-white hover:text-emerald-300 font-semibold text-xs"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}

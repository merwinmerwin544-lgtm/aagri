"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Users,
  Search,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { BuyerProcurementPost, CropType } from "@/types";
import { sampleBuyerProcurementPosts } from "@/services/mockData";

export default function BuyerProcurementView() {
  const [procurements, setProcurements] = useState<BuyerProcurementPost[]>(
    sampleBuyerProcurementPosts
  );
  const [selectedCrop, setSelectedCrop] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const filtered = procurements.filter((p) => {
    if (selectedCrop !== "All" && p.cropRequired !== selectedCrop) return false;
    if (
      search &&
      !p.buyerName.toLowerCase().includes(search.toLowerCase()) &&
      !p.cropRequired.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const handleAction = (buyerName: string, action: string) => {
    setDemoNotice(
      `Demo Action: "${action}" sent to ${buyerName}. In production, this dispatches verified contract requests through the AgriPulse buyer escrow desk.`
    );
    setTimeout(() => setDemoNotice(null), 4500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-cyan-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Buyer-Facing Procurement Demand Board
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                  Section 17 Module
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Institutional buyers, retail chains, and food processors publish verified crop procurement demands
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
            Open Procurement Pool
          </span>
        </div>
      </div>

      {demoNotice && (
        <div className="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-200 text-xs flex items-center gap-2 animate-in fade-in">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>{demoNotice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl bg-black/40 border border-emerald-500/20 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-400 ml-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter procurement requirements..."
            className="w-full sm:w-64 px-3 py-1.5 rounded-lg bg-[#02100b] border border-emerald-500/20 text-white text-xs focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Commodity:</span>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#02100b] border border-emerald-500/20 text-white text-xs focus:outline-none"
          >
            <option value="All">All Commodities</option>
            <option value="Tomato">Tomato</option>
            <option value="Wheat">Wheat</option>
            <option value="Corn">Corn</option>
          </select>
        </div>
      </div>

      {/* Procurement Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="glass-card-interactive rounded-2xl p-6 border-emerald-500/20 bg-[#041913]/70 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {post.cropRequired}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5">{post.buyerName}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{post.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-extrabold text-emerald-400">
                    {post.targetPriceRange}
                  </div>
                  <div className="text-[10px] text-slate-400">Offered Target</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-black/30 border border-emerald-500/15 mb-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Volume Needed:</span>
                  <span className="font-bold text-white">{post.targetQuantityTonnes} Tonnes</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Quality Standard:</span>
                  <span className="font-bold text-teal-300">{post.qualityStandard}</span>
                </div>
              </div>

              {/* Matching Local Farmer Callout */}
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 mb-4 text-xs">
                <div className="flex items-center justify-between text-emerald-300 font-bold mb-1">
                  <span>Your Farm Match:</span>
                  <span>94% Compatibility</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Arman&apos;s Farm has 3.8 tonnes of Grade A Tomato ready in 5-7 days matching this buyer&apos;s lot spec.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-500/15 flex items-center justify-between gap-2">
              <button
                onClick={() => handleAction(post.buyerName, "Requested Produce Quality Sample")}
                className="px-3.5 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-emerald-500/20 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Request Sample
              </button>

              <button
                onClick={() => handleAction(post.buyerName, "Initiated Direct Contract Proposal")}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-black font-bold text-xs hover:shadow-lg transition-all"
              >
                Contact Buyer (Demo)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

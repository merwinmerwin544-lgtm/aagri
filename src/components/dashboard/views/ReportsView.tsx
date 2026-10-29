"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { FarmerProfile } from "@/types";

interface ReportsViewProps {
  profile: FarmerProfile;
}

export default function ReportsView({ profile }: ReportsViewProps) {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = (reportName: string, format: string) => {
    setDownloadNotice(
      `Generated "${reportName}.${format}" for ${profile.farmerName}. Download initiated.`
    );
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  const reports = [
    {
      title: "Kharif Cycle Sustainable Audit & Carbon Accounting",
      period: "October 2026",
      desc: "Complete breakdown of 8.2 kg CO₂e logistics footprint, EV route savings (-42%), and food loss mitigation.",
      size: "2.4 MB PDF",
    },
    {
      title: "5-Day Mandi Price Prediction & Arbitrage Analysis",
      period: "Current Week",
      desc: "Detailed statistical confidence bands, festival arrival trends, and peak Day 3 price documentation.",
      size: "1.1 MB CSV",
    },
    {
      title: "Multi-Weighted Buyer Procurement Ledger",
      period: "Q4 2026",
      desc: "Scoring matrices for Kovai Fresh Mart, Nilgiri Organics, Apex Processing, and direct UPI settlements.",
      size: "3.8 MB PDF",
    },
    {
      title: "Sentinel-2 Multi-spectral NDVI & Soil Moisture Report",
      period: "Bi-Weekly",
      desc: "Vegetation vigor index (0.78), chlorophyll SPAD measurements, and root-zone closed-loop irrigation audit.",
      size: "4.2 MB PDF",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
                <FileText className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Farm Audit Reports & Sustainability Certificates
              </h2>
              <p className="text-xs text-slate-400">
                Audited data packets ready for export, ESG verification, and bank loan approvals
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDownload("AgriPulse_Complete_Farm_Dossier", "pdf")}
            className="px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Export Complete Farm Dossier</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reports.map((rpt, idx) => (
          <div
            key={idx}
            className="glass-card-interactive rounded-2xl p-6 border-emerald-500/20 bg-[#041913]/70 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-emerald-400">{rpt.period}</span>
                <span>{rpt.size}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{rpt.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">{rpt.desc}</p>
            </div>

            <div className="pt-4 border-t border-emerald-500/15 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Verified by AgriPulse Engine</span>
              <button
                onClick={() =>
                  handleDownload(rpt.title.replace(/\s+/g, "_"), rpt.size.includes("CSV") ? "csv" : "pdf")
                }
                className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

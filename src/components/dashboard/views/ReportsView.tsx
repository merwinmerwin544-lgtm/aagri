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
import { useLanguage } from "@/context/LanguageContext";

interface ReportsViewProps {
  profile: FarmerProfile;
}

export default function ReportsView({ profile }: ReportsViewProps) {
  const { t, tr } = useLanguage();
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = (reportName: string, format: string) => {
    setDownloadNotice(
      `"${reportName}.${format}" - ${t.downloadPdf}.`
    );
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  const reports = [
    {
      title: t.carbonOffsetLedger,
      period: "October 2026",
      desc: t.logisticsSubtitle,
      size: "2.4 MB PDF",
    },
    {
      title: t.pricePredictionTitle,
      period: t.today,
      desc: t.pricePredictionSubtitle,
      size: "1.1 MB CSV",
    },
    {
      title: t.buyerMatchingTitle,
      period: "Q4 2026",
      desc: t.buyerMatchingSubtitle,
      size: "3.8 MB PDF",
    },
    {
      title: t.precisionTitle,
      period: t.weeklySummary,
      desc: t.precisionSubtitle,
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
                {t.reportsTitle}
              </h2>
              <p className="text-xs text-slate-400">
                {t.reportsSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDownload("AgriPulse_Complete_Farm_Dossier", "pdf")}
            className="px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadPdf}</span>
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
                <span>{rpt.period}</span>
                <span className="font-bold text-emerald-400">{rpt.size}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{rpt.title}</h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">{rpt.desc}</p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-emerald-500/15">
              <button
                onClick={() => handleDownload(rpt.title, "pdf")}
                className="flex-1 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors cursor-pointer"
              >
                {t.downloadPdf}
              </button>
              <button
                onClick={() => handleDownload(rpt.title, "csv")}
                className="py-2 px-3 rounded-xl bg-black/40 hover:bg-black/60 text-slate-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {t.exportCsv}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

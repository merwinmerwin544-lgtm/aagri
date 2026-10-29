"use client";

import React from "react";
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle2,
  TrendingUp,
  CloudRain,
  ExternalLink,
} from "lucide-react";
import { FarmAlert } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface AlertsViewProps {
  alerts: FarmAlert[];
  onSelectTab: (tab: any) => void;
}

export default function AlertsView({ alerts, onSelectTab }: AlertsViewProps) {
  const { t, tr } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-rose-500 p-0.5 shadow-md">
            <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
              <Bell className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {t.alertsTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.alertsSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`glass-card-interactive rounded-2xl p-5 border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              alert.severity === "urgent"
                ? "border-emerald-400/50 bg-[#05261c]/80"
                : alert.severity === "warning"
                ? "border-amber-500/30 bg-[#1c1a0a]/60"
                : "border-cyan-500/30 bg-[#061822]/60"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  alert.severity === "urgent"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : alert.severity === "warning"
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-cyan-500/20 text-cyan-300"
                }`}
              >
                {alert.severity === "urgent" ? (
                  <TrendingUp className="w-5 h-5" />
                ) : alert.severity === "warning" ? (
                  <CloudRain className="w-5 h-5" />
                ) : (
                  <Info className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white">{tr(alert.title)}</h4>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      alert.severity === "urgent"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : alert.severity === "warning"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-cyan-500/20 text-cyan-300"
                    }`}
                  >
                    {alert.severity === "urgent" ? t.highPriority : alert.severity === "warning" ? t.mediumPriority : t.lowPriority}
                  </span>
                </div>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  {tr(alert.description)}
                </p>
                <div className="text-[10px] text-slate-500 mt-2">{alert.timeAgo}</div>
              </div>
            </div>

            {alert.actionRoute && (
              <button
                onClick={() => onSelectTab(alert.actionRoute)}
                className="px-4 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-emerald-500/30 text-emerald-300 font-semibold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>{t.takeAction}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

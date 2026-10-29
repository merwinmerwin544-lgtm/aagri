"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle2, Shield, Bell, Globe } from "lucide-react";
import { SupportedLanguage } from "@/types";

interface SettingsViewProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export default function SettingsView({
  language,
  onLanguageChange,
}: SettingsViewProps) {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [unitSystem, setUnitSystem] = useState<"Metric" | "Imperial">("Metric");
  const [notificationSms, setNotificationSms] = useState(true);
  const [autoOptimizeRoute, setAutoOptimizeRoute] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-slate-500 p-0.5 shadow-md">
            <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
              <Settings className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Farm & Console Preferences
            </h2>
            <p className="text-xs text-slate-400">
              Customize interface language, measurement units, telemetry alerts, and automated routing
            </p>
          </div>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Console preferences saved to demonstration profile.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Language */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Primary System & Voice Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "en", label: "English" },
                { id: "ta", label: "தமிழ் (Tamil)" },
                { id: "hi", label: "हिन्दी (Hindi)" },
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => onLanguageChange(lang.id as SupportedLanguage)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    language === lang.id
                      ? "bg-emerald-500 text-black border-emerald-400 shadow"
                      : "bg-black/30 border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Financial Currency
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  currency === "INR"
                    ? "bg-emerald-500 text-black border-emerald-400"
                    : "bg-black/30 border-slate-700 text-slate-400"
                }`}
              >
                ₹ INR (Indian Rupee)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  currency === "USD"
                    ? "bg-emerald-500 text-black border-emerald-400"
                    : "bg-black/30 border-slate-700 text-slate-400"
                }`}
              >
                $ USD (Global)
              </button>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="pt-4 border-t border-emerald-500/15 space-y-4">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-black/30 border border-emerald-500/15 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-white">Automate Electric Carrier Priority</div>
              <div className="text-[11px] text-slate-400">
                Default to EV light trucks for all deliveries under 60 km
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoOptimizeRoute}
              onChange={(e) => setAutoOptimizeRoute(e.target.checked)}
              className="w-5 h-5 accent-emerald-400 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-black/30 border border-emerald-500/15 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-white">Critical Mandi Price Surge SMS</div>
              <div className="text-[11px] text-slate-400">
                Receive SMS ping when local mandi exceeds peak target rate
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationSms}
              onChange={(e) => setNotificationSms(e.target.checked)}
              className="w-5 h-5 accent-emerald-400 rounded cursor-pointer"
            />
          </label>
        </div>

        <div className="pt-4 border-t border-emerald-500/15 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-bold text-xs flex items-center gap-1.5 hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}

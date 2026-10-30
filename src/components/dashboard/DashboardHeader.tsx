"use client";

import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Plus,
  ChevronDown,
  Tractor,
  Sliders,
  Sparkles,
  LogOut,
  Calendar,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { FarmAlert, SupportedLanguage } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface DashboardHeaderProps {
  farmerName: string;
  onOpenMobileSidebar: () => void;
  onOpenVoice: () => void;
  onOpenNewTask: () => void;
  onOpenEditProfile: () => void;
  alerts: FarmAlert[];
  onSelectTab: (tab: any) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function DashboardHeader({
  farmerName,
  onOpenMobileSidebar,
  onOpenVoice,
  onOpenNewTask,
  onOpenEditProfile,
  alerts,
  onSelectTab,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) {
  const { language, setLanguage, t, tr } = useLanguage();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [alertsDropdownOpen, setAlertsDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const ALL_LANGUAGES: { id: SupportedLanguage; label: string; full: string }[] = [
    { id: "en", label: "EN", full: "English" },
    { id: "ta", label: "தமிழ்", full: "தமிழ் (Tamil)" },
    { id: "hi", label: "हिन्दी", full: "हिन्दी (Hindi)" },
    { id: "es", label: "ES", full: "Español (Spanish)" },
    { id: "de", label: "DE", full: "Deutsch (German)" },
    { id: "fr", label: "FR", full: "Français (French)" },
    { id: "ja", label: "JA", full: "日本語 (Japanese)" },
  ];

  const unreadAlerts = alerts.filter((a) => !a.read);

  return (
    <header className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-4 relative z-30">
      {/* Mobile Toggle Button */}
      <button
        onClick={onOpenMobileSidebar}
        className="lg:hidden p-2.5 rounded-2xl glass-panel-agri text-[#A8D86D] hover:text-white"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Center/Left Search Input (matching screenshot pill) */}
      <div className="flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-[#B8CCAE] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-10 pr-4 py-2 rounded-2xl glass-panel-agri text-xs text-[#F4F7EF] placeholder-[#B8CCAE]/70 focus:outline-none focus:border-[#A8D86D]/60 transition-all"
        />
      </div>

      {/* Right Navigation Elements: Language, Bell, Plus, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Top Bar Quick Language Switcher with Dropdown for all 7 languages */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel-agri border border-[#E1F5DC]/15 text-xs text-[#F4F7EF] hover:border-[#A8D86D]/40 transition-colors shadow-sm cursor-pointer"
            title="Change Language / மொழி மாற்றுக"
          >
            <Globe className="w-3.5 h-3.5 text-[#A8D86D]" />
            <span className="font-bold text-[11px]">
              {ALL_LANGUAGES.find((l) => l.id === language)?.label || "EN"}
            </span>
            <ChevronDown className="w-3 h-3 text-[#B8CCAE]" />
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl glass-panel-agri p-1.5 shadow-2xl z-50 animate-in fade-in text-xs border border-[#E1F5DC]/20">
              <div className="px-2.5 py-1 text-[10px] text-[#A8D86D] font-bold border-b border-[#E1F5DC]/10 mb-1">
                {t.chooseInterfaceLanguage}
              </div>
              <div className="space-y-0.5">
                {ALL_LANGUAGES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setLanguage(item.id);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-2.5 py-1.5 rounded-xl text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      language === item.id
                        ? "bg-[#123D2B] text-[#A8D86D] font-bold"
                        : "text-[#B8CCAE] hover:text-[#F4F7EF] hover:bg-[#123D2B]/50"
                    }`}
                  >
                    <span>{item.full}</span>
                    <span className="text-[10px] font-mono opacity-60 uppercase">{item.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell in Circular Glass Button */}
        <div className="relative">
          <button
            onClick={() => setAlertsDropdownOpen(!alertsDropdownOpen)}
            className="w-9 h-9 rounded-full glass-panel-agri flex items-center justify-center text-[#B8CCAE] hover:text-[#A8D86D] relative transition-colors shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A8D86D]" />
            )}
          </button>

          {alertsDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl glass-panel-agri p-4 shadow-2xl z-50 animate-in fade-in text-xs border border-[#E1F5DC]/20">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E1F5DC]/15 font-bold text-[#F4F7EF]">
                <span>{t.farmAlerts}</span>
                <span className="text-[10px] text-[#A8D86D]">
                  {unreadAlerts.length} {t.unreadAlerts}
                </span>
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      setAlertsDropdownOpen(false);
                      onSelectTab("alerts");
                    }}
                    className="p-2 rounded-xl bg-[#09271B]/60 hover:bg-[#123D2B]/70 border border-[#E1F5DC]/10 cursor-pointer transition-colors"
                  >
                    <div className="font-bold text-[#F4F7EF]">{tr(alert.title)}</div>
                    <div className="text-[10px] text-[#B8CCAE] mt-0.5">{tr(alert.description)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* '+' Quick Add Action Button in Circular Glass Button */}
        <button
          onClick={onOpenNewTask}
          className="w-9 h-9 rounded-full glass-panel-agri flex items-center justify-center text-[#B8CCAE] hover:text-[#A8D86D] transition-colors shadow-sm cursor-pointer"
          title={t.addTask}
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Farmer Profile: Circular Avatar + Name + Farm Manager */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-full glass-panel-agri hover:border-[#A8D86D]/40 transition-colors"
          >
            {/* Avatar circle */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#A8D86D]/50 relative shrink-0">
              <img
                src="/images/avatar.jpg"
                alt="Arman Merlo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as any).style.display = "none";
                }}
              />
              <div className="w-full h-full bg-[#123D2B] flex items-center justify-center text-[10px] font-bold text-[#A8D86D]">
                UZ
              </div>
            </div>

            {/* Profile text */}
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-[#F4F7EF] leading-tight flex items-center gap-1">
                <span>{farmerName || "Uzhavan"}</span>
              </div>
              <div className="text-[10px] text-[#B8CCAE] leading-none">{t.farmManager}</div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-[#B8CCAE] hidden sm:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel-agri p-2 shadow-2xl z-50 animate-in fade-in text-xs border border-[#E1F5DC]/20">
              <div className="px-3 py-2 border-b border-[#E1F5DC]/15 mb-1">
                <div className="font-bold text-[#F4F7EF]">{farmerName}</div>
                <div className="text-[10px] text-[#A8D86D]">{t.farmManager} • Coimbatore South</div>
              </div>

              {/* Mobile language switch inside dropdown */}
              <div className="sm:hidden px-3 py-2 border-b border-[#E1F5DC]/15 mb-1">
                <div className="text-[10px] text-[#B8CCAE] mb-1 font-semibold flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#A8D86D]" />
                  <span>{t.selectLanguage}:</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {ALL_LANGUAGES.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLanguage(l.id)}
                      className={`py-1 rounded text-[10px] font-bold ${
                        language === l.id ? "bg-[#A8D86D] text-[#09271B]" : "bg-[#123D2B] text-[#B8CCAE]"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onOpenEditProfile();
                }}
                className="w-full px-3 py-2 rounded-xl text-left text-[#B8CCAE] hover:text-[#F4F7EF] hover:bg-[#123D2B] flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Tractor className="w-3.5 h-3.5 text-[#A8D86D]" />
                <span>{t.editFarmProfile}</span>
              </button>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onSelectTab("what-if");
                }}
                className="w-full px-3 py-2 rounded-xl text-left text-[#B8CCAE] hover:text-[#F4F7EF] hover:bg-[#123D2B] flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-[#A8D86D]" />
                <span>{t.whatIfSimulator}</span>
              </button>
              <div className="my-1 border-t border-[#E1F5DC]/15" />
              <Link
                href="/login"
                className="w-full px-3 py-2 rounded-xl text-left text-rose-300 hover:bg-rose-950/20 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.signOut}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

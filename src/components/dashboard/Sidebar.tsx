"use client";

import React from "react";
import Link from "next/link";
import {
  Sprout,
  LayoutDashboard,
  Wheat,
  Activity,
  Droplet,
  CloudSun,
  Wrench,
  FileText,
  Bell,
  Settings,
  Bot,
  ChevronRight,
  TrendingUp,
  Target,
  Truck,
  ShieldAlert,
  BrainCircuit,
  Sliders,
  ShoppingBag,
  Mic,
  Globe,
  LogOut,
  X,
  Layers,
  Camera,
  Clock,
} from "lucide-react";
import { SupportedLanguage } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export type DashboardTab =
  | "overview"
  | "crop-management"
  | "field-monitoring"
  | "soil-health"
  | "weather"
  | "irrigation"
  | "equipment"
  | "reports"
  | "alerts"
  | "settings"
  | "decision-engine"
  | "price-forecast"
  | "buyer-matching"
  | "logistics"
  | "food-loss"
  | "what-if"
  | "buyer-procurement"
  | "quality-grading"
  | "spoilage-clock";

interface SidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  language?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onOpenVoice: () => void;
  unreadAlertsCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  activeTab,
  onSelectTab,
  language: propLanguage,
  onLanguageChange: propOnLanguageChange,
  onOpenVoice,
  unreadAlertsCount,
  isOpenMobile,
  onCloseMobile,
}: SidebarProps) {
  const { language: contextLanguage, setLanguage: contextSetLanguage, t } = useLanguage();
  const language = propLanguage || contextLanguage;
  const onLanguageChange = (lang: SupportedLanguage) => {
    contextSetLanguage(lang);
    if (propOnLanguageChange) {
      propOnLanguageChange(lang);
    }
  };

  // Navigation items matching Reference Image 2 with dynamic translations
  const primaryNavItems = [
    { id: "overview", label: t.dashboard, icon: LayoutDashboard },
    { id: "crop-management", label: t.cropManagement, icon: Wheat },
    { id: "field-monitoring", label: t.fieldMonitoring, icon: Layers },
    { id: "soil-health", label: t.soilHealth, icon: Sprout },
    { id: "weather", label: t.weather, icon: CloudSun },
    { id: "irrigation", label: t.irrigation, icon: Droplet },
    { id: "equipment", label: t.equipment, icon: Wrench },
    { id: "reports", label: t.reports, icon: FileText },
    { id: "alerts", label: t.alerts, icon: Bell, badgeCount: unreadAlertsCount },
    { id: "settings", label: t.settings, icon: Settings },
  ] as const;

  // AgriPulse Intelligence Suite items with dynamic translations
  const intelligenceNavItems = [
    { id: "quality-grading", label: t.photoGradingTitle, icon: Camera, badge: "VISION" },
    { id: "spoilage-clock", label: t.spoilageClockTitle, icon: Clock, badge: "LIVE" },
    { id: "decision-engine", label: t.decisionEngine, icon: BrainCircuit, badge: "AI" },
    { id: "price-forecast", label: t.priceForecast, icon: TrendingUp },
    { id: "buyer-matching", label: t.buyerMatching, icon: Target },
    { id: "logistics", label: t.logistics, icon: Truck },
    { id: "food-loss", label: t.foodLoss, icon: ShieldAlert },
    { id: "what-if", label: t.whatIfSimulator, icon: Sliders },
    { id: "buyer-procurement", label: t.buyerDemand, icon: ShoppingBag },
  ] as const;

  const handleItemClick = (id: DashboardTab) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-4 bottom-4 left-4 z-50 w-64 glass-panel-agri rounded-3xl flex flex-col justify-between transition-transform duration-300 ease-in-out overflow-hidden shadow-2xl ${
          isOpenMobile ? "translate-x-0" : "-translate-x-[110%] lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-[#E1F5DC]/10">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo matching Reference Screenshot: green circular icon with circuit tree */}
            <div className="w-9 h-9 rounded-full bg-[#123D2B] border border-[#A8D86D]/40 flex items-center justify-center p-1.5 shadow-md shadow-black/40">
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#A8D86D] fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.4" />
                <path d="M12 18V9" />
                <path d="M12 12L8 8" />
                <path d="M12 10L16 6" />
                <circle cx="8" cy="8" r="1.5" fill="#A8D86D" />
                <circle cx="16" cy="6" r="1.5" fill="#A8D86D" />
                <circle cx="12" cy="9" r="1.5" fill="#A8D86D" />
              </svg>
            </div>
            <div>
              <div className="text-base font-bold text-[#F4F7EF] tracking-tight leading-none">
                {language === "ta" ? "உழவன்" : language === "hi" ? "उझवन" : "Uzhavan"}{" "}
                <span className="text-[#A8D86D]">AI</span>
              </div>
              <div className="text-[10px] text-[#B8CCAE] font-medium tracking-wide mt-0.5">
                {t.tagline}
              </div>
            </div>
          </Link>

          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-[#B8CCAE] hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id as DashboardTab)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                  isActive
                    ? "nav-pill-active text-[#F4F7EF] font-semibold"
                    : "text-[#B8CCAE] hover:text-[#F4F7EF] hover:bg-[#123D2B]/50"
                }`}
              >
                {/* Active left indicator bar matching screenshot */}
                {isActive && (
                  <span className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-[#A8D86D]" />
                )}

                <div className="flex items-center gap-2.5 pl-1.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-[#A8D86D]" : "text-[#B8CCAE] group-hover:text-[#A8D86D]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {"badgeCount" in item && (item.badgeCount ?? 0) > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#A8D86D] text-[#09271B]">
                    {item.badgeCount}
                  </span>
                )}
              </button>
            );
          })}

          {/* AgriPulse AI Decision Modules Divider */}
          <div className="pt-3 pb-1 px-3">
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#A8D86D]/80 flex items-center justify-between">
              <span>{t.agripulseEngine}</span>
            </div>
          </div>

          {intelligenceNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id as DashboardTab)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                  isActive
                    ? "nav-pill-active text-[#F4F7EF] font-semibold"
                    : "text-[#B8CCAE] hover:text-[#F4F7EF] hover:bg-[#123D2B]/50"
                }`}
              >
                {isActive && (
                  <span className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-[#A8D86D]" />
                )}
                <div className="flex items-center gap-2.5 pl-1.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-[#A8D86D]" : "text-[#B8CCAE] group-hover:text-[#A8D86D]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {"badge" in item && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#A8D86D]/20 text-[#A8D86D] border border-[#A8D86D]/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* AI Assistant Card at Bottom of Sidebar (Exactly matching Reference Image) */}
        <div className="p-3 pt-0">
          <div className="relative rounded-2xl p-3.5 bg-gradient-to-b from-[#123D2B]/90 to-[#09271B]/95 border border-[#E1F5DC]/15 overflow-hidden shadow-lg">
            {/* Leaf background ornament */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 opacity-20 pointer-events-none text-[#A8D86D]">
              <Sprout className="w-full h-full" />
            </div>

            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-[#A8D86D]/20 flex items-center justify-center text-[#A8D86D]">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[#F4F7EF]">{t.aiAssistant}</span>
            </div>

            <p className="text-[11px] text-[#B8CCAE] leading-tight mb-3">
              {t.aiAssistantSubtitle}
            </p>

            <button
              onClick={onOpenVoice}
              className="w-full py-1.5 px-3 rounded-xl bg-[#A8D86D]/20 hover:bg-[#A8D86D]/30 border border-[#A8D86D]/40 text-[#F4F7EF] hover:text-white text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>{t.askAiAssistant}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#A8D86D]" />
            </button>
          </div>

          {/* Language Selector & Switcher */}
          <div className="mt-2.5 flex items-center justify-between px-2 py-1.5 rounded-xl bg-[#09271B]/60 border border-[#E1F5DC]/10 text-[11px] text-[#B8CCAE]">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#A8D86D]" />
              <span className="text-[10px] font-semibold text-[#A8D86D]">Lang:</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onLanguageChange("en")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                  language === "en"
                    ? "bg-[#A8D86D] text-[#09271B] shadow-sm"
                    : "text-[#B8CCAE] hover:text-white hover:bg-[#123D2B]"
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange("ta")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                  language === "ta"
                    ? "bg-[#A8D86D] text-[#09271B] shadow-sm"
                    : "text-[#B8CCAE] hover:text-white hover:bg-[#123D2B]"
                }`}
                title="தமிழுக்கு மாறவும்"
              >
                தமிழ்
              </button>
              <button
                onClick={() => onLanguageChange("hi")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                  language === "hi"
                    ? "bg-[#A8D86D] text-[#09271B] shadow-sm"
                    : "text-[#B8CCAE] hover:text-white hover:bg-[#123D2B]"
                }`}
                title="हिन्दी में बदलें"
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

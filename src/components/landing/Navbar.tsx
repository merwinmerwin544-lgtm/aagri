"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sprout, Menu, X, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, tr } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: tr("Home"), href: "#" },
    { label: tr("Solutions"), href: "#features" },
    { label: tr("How It Works"), href: "#pipeline" },
    { label: tr("Sustainability"), href: "#sustainability" },
    { label: tr("About"), href: "#about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 pb-2 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass-panel-agri py-3 px-5 sm:px-7 shadow-2xl"
            : "glass-panel-agri-subtle py-4 px-5 sm:px-7"
        } flex items-center justify-between border border-[#E1F5DC]/16`}
      >
        {/* Brand Logo matching reference screenshot */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#123D2B] border border-[#A8D86D]/40 flex items-center justify-center p-1.5 shadow-md">
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
            <span className="text-lg font-bold tracking-tight text-[#F4F7EF]">
              {language === "ta" ? "உழவன்" : language === "hi" ? "उझवन" : "Uzhavan"} <span className="text-[#A8D86D]">AI</span>
            </span>
            <span className="block text-[10px] text-[#B8CCAE] font-medium leading-none">
              {language === "ta" ? "நிலையான விவசாயம்" : language === "hi" ? "सतत कृषि" : "Sustainable Agriculture"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#B8CCAE] hover:text-[#F4F7EF] rounded-xl hover:bg-[#123D2B]/50 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Quick Language Toggle */}
          <div className="flex items-center bg-[#123D2B]/80 border border-[#E1F5DC]/16 rounded-xl p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-lg transition-all ${
                language === "en"
                  ? "bg-[#A8D86D] text-[#09271B] font-bold shadow-sm"
                  : "text-[#B8CCAE] hover:text-[#F4F7EF]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ta")}
              className={`px-2 py-1 rounded-lg transition-all ${
                language === "ta"
                  ? "bg-[#A8D86D] text-[#09271B] font-bold shadow-sm"
                  : "text-[#B8CCAE] hover:text-[#F4F7EF]"
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`px-2 py-1 rounded-lg transition-all ${
                language === "hi"
                  ? "bg-[#A8D86D] text-[#09271B] font-bold shadow-sm"
                  : "text-[#B8CCAE] hover:text-[#F4F7EF]"
              }`}
            >
              हिन्दी
            </button>
          </div>

          <Link
            href="/dashboard"
            className="px-3.5 py-2 text-xs font-semibold text-[#F4F7EF] hover:bg-[#123D2B] glass-panel-agri rounded-xl border border-[#E1F5DC]/16 transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#A8D86D]" />
            {tr("Dashboard")}
          </Link>

          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#09271B] bg-[#A8D86D] hover:bg-[#b9e584] shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>{tr("Get Started")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl glass-panel-agri text-[#A8D86D]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-panel-agri p-4 shadow-2xl border border-[#E1F5DC]/20 space-y-2">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-medium text-[#F4F7EF] hover:bg-[#123D2B] rounded-lg"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#E1F5DC]/15 flex items-center justify-center gap-1">
            <button
              onClick={() => setLanguage("en")}
              className={`flex-1 py-1 text-xs rounded-lg ${
                language === "en" ? "bg-[#A8D86D] text-[#09271B] font-bold" : "text-[#B8CCAE]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ta")}
              className={`flex-1 py-1 text-xs rounded-lg ${
                language === "ta" ? "bg-[#A8D86D] text-[#09271B] font-bold" : "text-[#B8CCAE]"
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`flex-1 py-1 text-xs rounded-lg ${
                language === "hi" ? "bg-[#A8D86D] text-[#09271B] font-bold" : "text-[#B8CCAE]"
              }`}
            >
              हिन्दी
            </button>
          </div>
          <div className="pt-2 border-t border-[#E1F5DC]/15 flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="w-full text-center py-2 text-xs font-semibold text-[#F4F7EF] bg-[#123D2B] rounded-xl"
            >
              {tr("Dashboard")}
            </Link>
            <Link
              href="/dashboard"
              className="w-full text-center py-2 text-xs font-bold text-[#09271B] bg-[#A8D86D] rounded-xl"
            >
              {tr("Get Started")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

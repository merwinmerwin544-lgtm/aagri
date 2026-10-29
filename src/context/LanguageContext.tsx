"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SupportedLanguage } from "@/types";
import { getTranslation, TranslationDictionary, translateWord } from "@/lib/translations";

export type TranslationWithHelper = TranslationDictionary & { tr: (text: string) => string };

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationWithHelper;
  tr: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "agripulse_language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (stored && (stored === "en" || stored === "ta" || stored === "hi")) {
        setLanguageState(stored);
      }
    } catch {
      // localStorage may fail in restricted iframe environments
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    // Also set document lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  const t = getTranslation(language);
  const tr = (text: string) => translateWord(text, language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if used outside provider
    const fallbackT = getTranslation("en");
    return {
      language: "en" as SupportedLanguage,
      setLanguage: () => {},
      t: fallbackT,
      tr: (text: string) => translateWord(text, "en"),
    };
  }
  return context;
}

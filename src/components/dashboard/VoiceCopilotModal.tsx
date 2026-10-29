"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  Globe,
  Bot,
  User,
} from "lucide-react";
import { SupportedLanguage } from "@/types";
import { queryAIAssistant } from "@/services/api";
import { useLanguage } from "@/context/LanguageContext";

interface VoiceCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export default function VoiceCopilotModal({
  isOpen,
  onClose,
  language: propLanguage,
  onLanguageChange: propOnLanguageChange,
}: VoiceCopilotModalProps) {
  const { language: contextLang, setLanguage: contextSetLanguage, t } = useLanguage();
  const language = propLanguage || contextLang;

  const handleLanguageChange = (lang: SupportedLanguage) => {
    contextSetLanguage(lang);
    if (propOnLanguageChange) {
      propOnLanguageChange(lang);
    }
  };

  const initialBotWelcome =
    language === "ta"
      ? "வணக்கம்! நான் உங்கள் அக்ரிபல்ஸ் AI குரல் உதவியாளர். உங்கள் பயிர் அறுவடை, மண்டி விலைகள் அல்லது நீர்ப்பாசனம் பற்றி எதையும் கேளுங்கள்."
      : language === "hi"
      ? "नमस्ते! मैं आपका एग्रीपल्स AI आवाज़ सहायक हूँ। अपनी फसल कटाई, मंडी भाव या सिंचाई के बारे में कुछ भी पूछें।"
      : "Vanakkam / Namaste / Hello! I am your AgriPulse AI voice assistant. Ask me anything about your harvest, mandi prices, or irrigation schedule.";

  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string; time: string }[]
  >([
    {
      sender: "bot",
      text: initialBotWelcome,
      time: "Just now",
    },
  ]);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: initialBotWelcome,
        time: "Just now",
      },
    ]);
  }, [language]);

  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleQuestions = [
    t.sampleQ1,
    t.sampleQ2,
    t.sampleQ3,
    t.sampleQ4,
    t.sampleQ5,
  ];

  // Speech Recognition Setup
  const toggleListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert(
        "Web Speech API is not supported in this browser. Please type your question or select a suggested prompt below."
      );
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === "ta" ? "ta-IN" : language === "hi" ? "hi-IN" : "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendQuestion(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (!speechSynthesisEnabled || typeof window === "undefined" || !("speechSynthesis" in window))
      return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "ta" ? "ta-IN" : language === "hi" ? "hi-IN" : "en-US";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  const handleSendQuestion = async (query: string) => {
    if (!query.trim()) return;

    const userMsg = {
      sender: "user" as const,
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsProcessing(true);

    try {
      const result = await queryAIAssistant(query, language);
      const botMsg = {
        sender: "bot" as const,
        text: result.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      speakText(result.audioSummary);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Telemetry processing error. Please retry.",
          time: "Just now",
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 border-emerald-500/35 bg-[#03150e]/95 shadow-2xl flex flex-col h-[85vh] max-h-[700px]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#02110c] rounded-[10px] flex items-center justify-center">
                <Mic className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span>{t.voiceCopilotTitle}</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  {language === "ta" ? "தமிழ் ஆடியோ" : language === "hi" ? "हिंदी ऑडियो" : "Live Audio"}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                {t.voiceModalSubtitle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Speech Toggle */}
            <button
              onClick={() => {
                setSpeechSynthesisEnabled(!speechSynthesisEnabled);
                if (typeof window !== "undefined" && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                }
              }}
              className={`p-2 rounded-xl border transition-colors ${
                speechSynthesisEnabled
                  ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                  : "bg-black/40 border-slate-700 text-slate-500"
              }`}
              title={speechSynthesisEnabled ? "Audio Speech Enabled" : "Audio Speech Muted"}
            >
              {speechSynthesisEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Switch */}
            <div className="flex items-center p-1 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
              <Globe className="w-3.5 h-3.5 text-emerald-400 ml-1.5 mr-1" />
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  language === "en" ? "bg-emerald-500 text-black" : "text-slate-400"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange("ta")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  language === "ta" ? "bg-emerald-500 text-black" : "text-slate-400"
                }`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => handleLanguageChange("hi")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  language === "hi" ? "bg-emerald-500 text-black" : "text-slate-400"
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="mb-3">
          <div className="text-[11px] font-semibold text-emerald-400/80 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>{t.suggestedQueries}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuestion(q)}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/20 text-[11px] text-slate-300 hover:text-emerald-300 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Transcript Window */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-2xl bg-black/40 border border-emerald-500/15 mb-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/20 text-white border border-emerald-400/30 rounded-tr-none"
                    : "bg-[#051c14] text-slate-200 border border-emerald-500/20 rounded-tl-none shadow-md"
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-[9px] text-slate-400 mt-1 text-right">
                  {msg.time}
                </span>
              </div>

              {msg.sender === "user" && (
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-emerald-400/80 p-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
              <span>{t.processing}</span>
            </div>
          )}
        </div>

        {/* Bottom Input & Voice Trigger Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuestion(inputText);
          }}
          className="flex items-center gap-2"
        >
          {/* Mic Button with Pulsing Ring */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-center shrink-0 ${
              isListening
                ? "bg-rose-500 text-white border-rose-400 ring-4 ring-rose-500/30 animate-pulse"
                : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border-emerald-500/40"
            }`}
            title={isListening ? t.stopSpeaking : t.startSpeaking}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isListening
                ? t.voiceListening
                : t.voiceClickToSpeak
            }
            className="flex-1 px-4 py-3 rounded-2xl bg-black/40 border border-emerald-500/20 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-all"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-bold disabled:opacity-40 transition-opacity shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-2 text-center text-[10px] text-slate-400">
          Powered by AgriPulse Regional Speech Engine • English, தமிழ், हिन्दी
        </div>
      </div>
    </div>
  );
}

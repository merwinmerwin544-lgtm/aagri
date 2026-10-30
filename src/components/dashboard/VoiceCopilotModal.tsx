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
      ? "வணக்கம் உழவரே! நான் உங்கள் உழவன் AI குரல் உதவியாளர். அறுவடை நேரம், சந்தை விலை, வாங்குபவர் இணைப்பு, அழுகல் கடிகாரம் அல்லது புகைப்படத் தரம் பற்றி என்னிடம் கேளுங்கள்."
      : language === "hi"
      ? "नमस्ते किसान भाई! मैं आपका उझवन AI आवाज़ सहायक हूँ। अपनी फसल कटाई, मंडी भाव, स्पॉइलेज घड़ी या फोटो गुणवत्ता के बारे में कुछ भी पूछें।"
      : language === "es"
      ? "¡Hola! Soy su asistente de voz Uzhavan AI. Pregúnteme sobre cosecha, precios de mercado, reloj de caducidad o graduación por foto."
      : language === "de"
      ? "Hallo! Ich bin Ihr Uzhavan KI-Sprachassistent. Fragen Sie mich nach Erntezeitpunkten, Marktpreisen, der Verderbsuhr oder Foto-Qualitätsgraduierung."
      : language === "fr"
      ? "Bonjour ! Je suis votre assistant vocal Uzhavan AI. Interrogez-moi sur la récolte, les cours du marché, l'horloge de péremption ou la gradation par photo."
      : language === "ja"
      ? "こんにちは！Uzhavan AI音声アシスタントです。収穫適期、市場相場、鮮度カウントダウン時計、写真AI品質格付けについて何でもお尋ねください。"
      : "Vanakkam / Namaste / Hello! I am your Uzhavan AI voice assistant. Ask me anything about your harvest, mandi prices, spoilage countdown, or photo quality grading.";

  const initialBotAudio =
    language === "ta"
      ? "வணக்கம் உழவரே! உங்கள் விவசாயம் தொடர்பான எந்த கேள்வியையும் என்னிடம் கேளுங்கள்."
      : language === "hi"
      ? "नमस्ते! आप अपनी फसल, भाव या खेती से जुड़ा कोई भी सवाल पूछ सकते हैं।"
      : language === "es"
      ? "¡Hola! Pregúnteme cualquier consulta sobre su cultivo, precios o reloj de caducidad."
      : language === "de"
      ? "Guten Tag! Fragen Sie mich gerne alles zu Ernte, Preisen oder Frischeerhalt."
      : language === "fr"
      ? "Bonjour ! Posez-moi vos questions sur votre récolte, les cours ou l'horloge de péremption."
      : language === "ja"
      ? "こんにちは！収穫時期や市場価格、鮮度時計について何でもご質問ください。"
      : "Hello! I am your Uzhavan AI voice assistant. Ask me anything about your farm.";

  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string; audioSummary?: string; time: string }[]
  >([
    {
      sender: "bot",
      text: initialBotWelcome,
      audioSummary: initialBotAudio,
      time: "Just now",
    },
  ]);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: initialBotWelcome,
        audioSummary: initialBotAudio,
        time: "Just now",
      },
    ]);
  }, [language]);

  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Pre-load voices for speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const sampleQuestions = [
    t.sampleQ1,
    t.sampleQ2,
    t.sampleQ3,
    t.sampleQ4,
    t.sampleQ5,
  ];

  const REGIONAL_LANG_CODES: Record<SupportedLanguage, string> = {
    en: "en-US",
    ta: "ta-IN",
    hi: "hi-IN",
    es: "es-ES",
    de: "de-DE",
    fr: "fr-FR",
    ja: "ja-JP",
  };

  // Speech Recognition Setup with exact regional language code
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
      recognition.lang = REGIONAL_LANG_CODES[language] || "en-US";
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

  // Multilingual Speech Synthesis targeting regional language
  const speakText = (text: string, overrideLang?: SupportedLanguage) => {
    if (!speechSynthesisEnabled || typeof window === "undefined" || !("speechSynthesis" in window))
      return;
    try {
      window.speechSynthesis.cancel();
      const currentTargetLang = overrideLang || language;
      const utterance = new SpeechSynthesisUtterance(text);
      const targetCode = REGIONAL_LANG_CODES[currentTargetLang] || "en-US";
      utterance.lang = targetCode;
      utterance.rate = currentTargetLang === "ja" ? 1.0 : 0.92;
      utterance.pitch = 1.0;

      // Select authentic voice if browser has native regional voices installed
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = currentTargetLang;
        const matched = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith(langPrefix) ||
            v.lang.toLowerCase().includes(targetCode.toLowerCase())
        );
        if (matched) {
          utterance.voice = matched;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error", e);
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
      // Connects directly to backend API /api/ai-assistant with farm context
      const result = await queryAIAssistant(query, language, {
        farmerName: "Uzhavan",
        cropType: "Tomato",
        qualityGrade: "Grade A",
        spoilageHours: 41,
        expectedYieldTonnes: 3.8,
        currentTempC: 22,
      });

      const botMsg = {
        sender: "bot" as const,
        text: result.text,
        audioSummary: result.audioSummary,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      speakText(result.audioSummary);
    } catch {
      const errorFallback =
        language === "ta"
          ? "மன்னிக்கவும், தரவு இணைப்பில் சிறிய தாமதம். தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
          : language === "hi"
          ? "क्षमा करें, डेटा कनेक्शन में त्रुटि है। कृपया पुनः प्रयास करें।"
          : language === "es"
          ? "Error de conexión temporal. Por favor, intente nuevamente."
          : language === "de"
          ? "Verbindungsfehler. Bitte versuchen Sie es erneut."
          : language === "fr"
          ? "Erreur temporaire de connexion. Veuillez réessayer."
          : language === "ja"
          ? "通信エラーが発生しました。再度お試しください。"
          : "Telemetry processing error. Please retry.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: errorFallback,
          time: "Just now",
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const badgeLabels: Record<SupportedLanguage, string> = {
    en: "Live Audio",
    ta: "தமிழ் குரல் AI",
    hi: "हिंदी आवाज़ AI",
    es: "Voz en Español",
    de: "Sprach-KI Deutsch",
    fr: "Voix en Français",
    ja: "日本語 音声AI",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 border-emerald-500/35 bg-[#03150e]/95 shadow-2xl flex flex-col h-[85vh] max-h-[720px]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-3 gap-2 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-[#02110c] rounded-[10px] flex items-center justify-center">
                <Mic className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span>{t.voiceModalTitle}</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  {badgeLabels[language] || "Multilingual Voice AI"}
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
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                speechSynthesisEnabled
                  ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                  : "bg-black/40 border-slate-700 text-slate-500"
              }`}
              title={speechSynthesisEnabled ? "Audio Speech Enabled" : "Audio Speech Muted"}
            >
              {speechSynthesisEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Switch for 7 Languages */}
            <div className="flex items-center p-1 rounded-xl bg-black/40 border border-emerald-500/20 text-xs overflow-x-auto max-w-[280px]">
              <Globe className="w-3.5 h-3.5 text-emerald-400 ml-1 mr-1 shrink-0" />
              {(
                [
                  { id: "en", label: "EN" },
                  { id: "ta", label: "தமிழ்" },
                  { id: "hi", label: "हिन्दी" },
                  { id: "es", label: "ES" },
                  { id: "de", label: "DE" },
                  { id: "fr", label: "FR" },
                  { id: "ja", label: "日本語" },
                ] as const
              ).map((langItem) => (
                <button
                  key={langItem.id}
                  onClick={() => handleLanguageChange(langItem.id as SupportedLanguage)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                    language === langItem.id ? "bg-emerald-500 text-black" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {langItem.label}
                </button>
              ))}
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
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
                className="px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/20 text-[11px] text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer"
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
                className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/20 text-white border border-emerald-400/30 rounded-tr-none"
                    : "bg-[#051c14] text-slate-200 border border-emerald-500/20 rounded-tl-none shadow-md"
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-emerald-500/10">
                  {msg.sender === "bot" ? (
                    <button
                      type="button"
                      onClick={() => speakText(msg.audioSummary || msg.text)}
                      className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer py-0.5 px-1.5 rounded bg-emerald-950/60 border border-emerald-500/20 transition-colors"
                      title="Listen audio in selected language"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{language === "ta" ? "மீண்டும் கேள்" : language === "hi" ? "दोबारा सुनें" : "Listen"}</span>
                    </button>
                  ) : (
                    <span />
                  )}
                  <span className="text-[9px] text-slate-400">
                    {msg.time}
                  </span>
                </div>
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
            className={`p-3 rounded-2xl border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
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
                ? t.listening
                : language === "ta"
                ? "தமிழில் பேச மைக்கை அழுத்தவும் அல்லது எழுதவும்..."
                : language === "hi"
                ? "हिंदी में बोलने के लिए माइक दबाएँ या टाइप करें..."
                : t.startSpeaking
            }
            className="flex-1 px-4 py-3 rounded-2xl bg-black/40 border border-emerald-500/20 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-all"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-bold disabled:opacity-40 transition-opacity shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-2 text-center text-[10px] text-slate-400">
          Powered by Uzhavan AI Multilingual Speech Engine • English, தமிழ், हिन्दी
        </div>
      </div>
    </div>
  );
}

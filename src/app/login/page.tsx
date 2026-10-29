"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sprout,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  AlertCircle,
} from "lucide-react";
import ForgotPasswordModal from "@/components/login/ForgotPasswordModal";
import RegisterModal from "@/components/login/RegisterModal";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("farmer.arman@agripulse.ai");
  const [password, setPassword] = useState("agripulse2026");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Password cannot be blank.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  const handleDemoLogin = () => {
    setEmail("farmer.arman@agripulse.ai");
    setPassword("agripulse2026");
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 350);
  };

  const handleSocialClick = (provider: string) => {
    setSocialNotice(
      `${provider} sign-in requires live OAuth setup in production. Use the instant One-Click Demo Mode below!`
    );
    setTimeout(() => setSocialNotice(null), 4500);
  };

  return (
    <main className="relative min-h-screen bg-farmland text-[#F4F7EF] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Centered Glass Login Card matching reference styling */}
      <div className="relative z-10 w-full max-w-lg glass-panel-agri rounded-3xl p-6 sm:p-10 border border-[#E1F5DC]/20 shadow-2xl backdrop-blur-2xl">
        {/* Navigation Back */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A8D86D] hover:text-[#F4F7EF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#123D2B]/80 border border-[#A8D86D]/30 text-[10px] font-semibold text-[#A8D86D]">
            <ShieldCheck className="w-3 h-3" />
            <span>Demo Portal</span>
          </span>
        </div>

        {/* Brand Logo & Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#123D2B] border border-[#A8D86D]/40 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-black/40">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#A8D86D] fill-none stroke-current stroke-2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.4" />
              <path d="M12 18V9" />
              <path d="M12 12L8 8" />
              <path d="M12 10L16 6" />
              <circle cx="8" cy="8" r="1.5" fill="#A8D86D" />
              <circle cx="16" cy="6" r="1.5" fill="#A8D86D" />
              <circle cx="12" cy="9" r="1.5" fill="#A8D86D" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7EF] tracking-tight mb-1">
            Welcome Back
          </h1>
          <p className="text-xs text-[#B8CCAE]">
            Your smarter, sustainable farming journey starts here.
          </p>
        </div>

        {/* 1-Click Instant Demo Login Banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-[#123D2B]/85 border border-[#A8D86D]/40 shadow-lg flex items-center justify-between gap-3">
          <div className="text-left">
            <div className="flex items-center gap-1 text-xs font-bold text-[#A8D86D]">
              <Sparkles className="w-3.5 h-3.5 text-[#E6C779]" />
              <span>Reviewer Fast Pass</span>
            </div>
            <div className="text-[11px] text-[#B8CCAE]">
              Signed in as <strong className="text-[#F4F7EF]">Arman Merlo</strong> (Farm Manager)
            </div>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-[#A8D86D] hover:bg-[#b9e584] text-[#09271B] font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          >
            Enter Dashboard
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {socialNotice && (
          <div className="mb-4 p-3 rounded-xl bg-[#123D2B]/90 border border-[#A8D86D]/40 text-[#F4F7EF] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#A8D86D]" />
            <span>{socialNotice}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#B8CCAE] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#B8CCAE] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer.arman@agripulse.ai"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09271B]/70 border border-[#E1F5DC]/16 text-white placeholder-[#B8CCAE]/50 text-xs focus:outline-none focus:border-[#A8D86D]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#B8CCAE]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsForgotOpen(true)}
                className="text-xs font-semibold text-[#A8D86D] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#B8CCAE] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#09271B]/70 border border-[#E1F5DC]/16 text-white placeholder-[#B8CCAE]/50 text-xs focus:outline-none focus:border-[#A8D86D]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B8CCAE] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#E1F5DC]/20 bg-[#09271B] text-[#A8D86D] focus:ring-[#A8D86D]"
              />
              <span className="text-xs text-[#B8CCAE]">Remember me on this browser</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#A8D86D] hover:bg-[#b9e584] text-[#09271B] font-bold text-xs shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E1F5DC]/15" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider text-[#B8CCAE]">
            <span className="px-3 bg-[#0c2b1c] rounded-full">Or Continue With</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-3 gap-2.5">
          {["Google", "Apple", "GitHub"].map((provider) => (
            <button
              key={provider}
              type="button"
              onClick={() => handleSocialClick(provider)}
              className="py-2 rounded-xl bg-[#09271B]/60 hover:bg-[#123D2B]/80 border border-[#E1F5DC]/16 text-xs text-[#F4F7EF] font-medium transition-all"
            >
              {provider}
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E1F5DC]/15 text-center text-xs text-[#B8CCAE]">
          <span>Don&apos;t have a farm registered? </span>
          <button
            type="button"
            onClick={() => setIsRegisterOpen(true)}
            className="text-[#A8D86D] font-bold hover:underline cursor-pointer"
          >
            Register Your Farm
          </button>
        </div>
      </div>

      <ForgotPasswordModal isOpen={isForgotOpen} onClose={() => setIsForgotOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </main>
  );
}

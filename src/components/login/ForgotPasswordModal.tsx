"use client";

import React, { useState } from "react";
import { X, Mail, CheckCircle2, ArrowRight } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/30 bg-[#041913]/95 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-5">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Reset Password</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Enter the email registered with your AgriPulse AI account. We&apos;ll send a temporary access link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Registered Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer.arman@agripulse.ai"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-emerald-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  />
                </div>
                {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/15 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-semibold">Demo Notice:</span> In this frontend prototype, authentication is simulated. You can also bypass login using the 1-Click Demo button.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-bold text-sm hover:opacity-95 transition-opacity active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Recovery Email Sent</h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              A password reset link was dispatched to <span className="text-emerald-300 font-semibold">{email}</span>. Please verify your inbox.
            </p>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 font-semibold text-sm transition-all"
            >
              Return to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

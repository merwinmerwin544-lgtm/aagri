"use client";

import React, { useState } from "react";
import { X, Sprout, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateFarmerProfile } from "@/services/api";
import { CropType } from "@/types";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const router = useRouter();
  const [farmerName, setFarmerName] = useState("");
  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("Coimbatore South, Tamil Nadu");
  const [cropType, setCropType] = useState<CropType>("Tomato");
  const [farmSizeAcres, setFarmSizeAcres] = useState(2.0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !email.trim() || !password.trim()) {
      setError("Please complete all required fields.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await updateFarmerProfile({
        farmerName,
        farmName: farmName || `${farmerName}'s Farm`,
        location,
        cropType,
        farmSizeAcres: Number(farmSizeAcres) || 2.0,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch {
      setError("Registration setup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/30 bg-[#041913]/95 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!success ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-md mb-4">
              <div className="w-full h-full bg-[#03130e] rounded-[14px] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Create Farmer Account</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Register your farm to unlock precision NDVI telemetry, price predictions, and smart buyer matching.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Farmer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder="e.g. Arman Patel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Farm Holding Name
                  </label>
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="e.g. Green Valley Farm"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Primary Crop
                  </label>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value as CropType)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#03130e] border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Tomato">Tomato (Grade A)</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Corn">Corn (Maize)</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Chilli">Chilli</option>
                    <option value="Barley">Barley</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Farm Size (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="1000"
                    value={farmSizeAcres}
                    onChange={(e) => setFarmSizeAcres(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Farm Region & Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="arman@agripulse.ai"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {error && <p className="text-xs text-rose-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 text-black font-bold text-sm hover:opacity-95 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Registering Farm Account...</span>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Account Initialized!</h3>
            <p className="text-xs text-slate-300 mb-4">
              Welcome, <span className="text-emerald-400 font-semibold">{farmerName}</span>. Your {farmSizeAcres} acre {cropType} farm setup is stored. Redirecting you to the live dashboard...
            </p>
            <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}

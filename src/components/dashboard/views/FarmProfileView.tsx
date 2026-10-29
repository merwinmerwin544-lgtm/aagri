"use client";

import React, { useState } from "react";
import {
  Tractor,
  Save,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Sparkles,
  Info,
} from "lucide-react";
import { FarmerProfile, CropType, CropQualityGrade } from "@/types";

interface FarmProfileViewProps {
  profile: FarmerProfile;
  onSaveProfile: (updated: Partial<FarmerProfile>) => void;
}

export default function FarmProfileView({
  profile,
  onSaveProfile,
}: FarmProfileViewProps) {
  const [formData, setFormData] = useState<FarmerProfile>(profile);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#02110c] rounded-[14px] flex items-center justify-center">
                <Tractor className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Farmer Profile & Crop Input Layer
              </h2>
              <p className="text-xs text-slate-400">
                Configure your farm specifications. These inputs dynamically feed the prediction and decision engine.
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            Coimbatore South Unit
          </span>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Farm configuration successfully synchronized! Local state & downstream modules updated.</span>
        </div>
      )}

      {/* Main Profile Form (Prompt Section 6) */}
      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 border-emerald-500/25 bg-[#041a13]/70 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Farmer & Holding Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Farmer Full Name
            </label>
            <input
              type="text"
              required
              value={formData.farmerName}
              onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Farm Holding Name
            </label>
            <input
              type="text"
              required
              value={formData.farmName}
              onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Location & Mandi Belt
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-emerald-500/15">
          {/* Crop Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Crop Type
            </label>
            <select
              value={formData.cropType}
              onChange={(e) => setFormData({ ...formData, cropType: e.target.value as CropType })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            >
              <option value="Tomato">Tomato (Pusa Ruby Hybrid)</option>
              <option value="Wheat">Wheat</option>
              <option value="Corn">Corn (Maize)</option>
              <option value="Soybean">Soybean</option>
              <option value="Chilli">Chilli</option>
              <option value="Barley">Barley</option>
            </select>
          </div>

          {/* Farm Size */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Farm Size (Acres)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.farmSizeAcres}
              onChange={(e) =>
                setFormData({ ...formData, farmSizeAcres: parseFloat(e.target.value) || 1 })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Planting Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Planting Date
            </label>
            <input
              type="date"
              value={formData.plantingDate}
              onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Expected Yield */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Expected Yield (Tonnes)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.expectedYieldTonnes}
              onChange={(e) =>
                setFormData({ ...formData, expectedYieldTonnes: parseFloat(e.target.value) || 1 })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-emerald-500/15">
          {/* Estimated Harvest */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Estimated Harvest (Days)
            </label>
            <input
              type="number"
              value={formData.estimatedHarvestDays}
              onChange={(e) =>
                setFormData({ ...formData, estimatedHarvestDays: parseInt(e.target.value) || 1 })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Crop Quality */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Crop Quality Grade
            </label>
            <select
              value={formData.qualityGrade}
              onChange={(e) =>
                setFormData({ ...formData, qualityGrade: e.target.value as CropQualityGrade })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            >
              <option value="Grade A">Grade A (Optimal Firmness / Zero Blemishes)</option>
              <option value="Grade B">Grade B (Processing Puree Quality)</option>
              <option value="Grade C">Grade C (Local Bulk Mandi)</option>
              <option value="Export Grade">Export Grade (Global GAP)</option>
            </select>
          </div>

          {/* Storage Availability */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Storage Available (Days)
            </label>
            <input
              type="number"
              value={formData.storageAvailableDays}
              onChange={(e) =>
                setFormData({ ...formData, storageAvailableDays: parseInt(e.target.value) || 1 })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Storage Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Storage Type
            </label>
            <select
              value={formData.storageType}
              onChange={(e) => setFormData({ ...formData, storageType: e.target.value as any })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400"
            >
              <option value="Ventilated Warehouse">Ventilated Warehouse</option>
              <option value="Cold Storage">Cold Storage</option>
              <option value="Ambient Shed">Ambient Shed</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-emerald-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-emerald-400" />
            <span>Demonstration values are saved to local mock storage.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFormData(profile)}
              className="px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-bold text-xs flex items-center gap-1.5 hover:shadow-lg hover:shadow-emerald-400/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

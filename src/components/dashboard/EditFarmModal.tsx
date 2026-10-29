"use client";

import React, { useState } from "react";
import { X, Tractor, Save, CheckCircle2 } from "lucide-react";
import { FarmerProfile, CropType, CropQualityGrade } from "@/types";

interface EditFarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FarmerProfile;
  onSave: (updated: Partial<FarmerProfile>) => void;
}

export default function EditFarmModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditFarmModalProps) {
  const [formData, setFormData] = useState({
    farmerName: profile.farmerName,
    farmName: profile.farmName,
    cropType: profile.cropType,
    location: profile.location,
    farmSizeAcres: profile.farmSizeAcres,
    plantingDate: profile.plantingDate,
    expectedYieldTonnes: profile.expectedYieldTonnes,
    estimatedHarvestDays: profile.estimatedHarvestDays,
    qualityGrade: profile.qualityGrade,
    storageAvailableDays: profile.storageAvailableDays,
    storageType: profile.storageType,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/35 bg-[#03150e]/95 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Tractor className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Edit Farm Profile & Crop Input Layer
            </h3>
            <p className="text-xs text-slate-400">
              Update crop telemetry parameters. Changes dynamically update all dashboard intelligence.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Farmer Name
              </label>
              <input
                type="text"
                required
                value={formData.farmerName}
                onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Farm Holding
              </label>
              <input
                type="text"
                required
                value={formData.farmName}
                onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Crop Type
              </label>
              <select
                value={formData.cropType}
                onChange={(e) => setFormData({ ...formData, cropType: e.target.value as CropType })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              >
                <option value="Tomato">Tomato (Pusa Ruby Hybrid)</option>
                <option value="Wheat">Wheat (Sharbati Gold)</option>
                <option value="Corn">Corn / Maize</option>
                <option value="Soybean">Soybean (JS-335)</option>
                <option value="Chilli">Guntur Chilli</option>
                <option value="Barley">Barley</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Quality Grade Spec
              </label>
              <select
                value={formData.qualityGrade}
                onChange={(e) =>
                  setFormData({ ...formData, qualityGrade: e.target.value as CropQualityGrade })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              >
                <option value="Grade A">Grade A (Firm, Unblemished, Export/Retail)</option>
                <option value="Grade B">Grade B (Commercial Processing / Puree)</option>
                <option value="Grade C">Grade C (Standard Mandi Feed)</option>
                <option value="Export Grade">Export Grade (Global GAP)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Farm Size (Acres)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.farmSizeAcres}
                onChange={(e) =>
                  setFormData({ ...formData, farmSizeAcres: parseFloat(e.target.value) || 1 })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Expected Yield (Tonnes)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.expectedYieldTonnes}
                onChange={(e) =>
                  setFormData({ ...formData, expectedYieldTonnes: parseFloat(e.target.value) || 1 })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Estimated Harvest (Days)
              </label>
              <input
                type="number"
                value={formData.estimatedHarvestDays}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedHarvestDays: parseInt(e.target.value) || 1 })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Storage Availability (Days)
              </label>
              <input
                type="number"
                value={formData.storageAvailableDays}
                onChange={(e) =>
                  setFormData({ ...formData, storageAvailableDays: parseInt(e.target.value) || 1 })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Storage Infrastructure
              </label>
              <select
                value={formData.storageType}
                onChange={(e) => setFormData({ ...formData, storageType: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              >
                <option value="Ventilated Warehouse">Ventilated Warehouse</option>
                <option value="Cold Storage">Cold Storage (Controlled Atmosphere)</option>
                <option value="Ambient Shed">Ambient Shed (Shaded Crate Holding)</option>
                <option value="None">None (Direct Field-Side Dispatch)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Farm Location & Region
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Farm parameters updated and saved to local state!</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-emerald-500/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 text-black font-bold text-xs hover:shadow-lg hover:shadow-emerald-400/25 flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Farm Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

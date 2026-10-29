"use client";

import React, { useState } from "react";
import { X, Tractor, Save, CheckCircle2 } from "lucide-react";
import { FarmerProfile, CropType, CropQualityGrade } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t, tr } = useLanguage();
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
              {t.editFarmTitle}
            </h3>
            <p className="text-xs text-slate-400">
              {t.editFarmSubtitle}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.farmerNameLabel}
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
                {t.farmNameLabel}
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
                {t.cropTypeLabel}
              </label>
              <select
                value={formData.cropType}
                onChange={(e) => setFormData({ ...formData, cropType: e.target.value as CropType })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              >
                <option value="Tomato">{tr("Tomato")}</option>
                <option value="Wheat">{tr("Wheat")}</option>
                <option value="Corn">{tr("Corn")}</option>
                <option value="Soybean">{tr("Soybean")}</option>
                <option value="Chilli">{tr("Chilli")}</option>
                <option value="Barley">{tr("Barley")}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.qualityGradeReq}
              </label>
              <select
                value={formData.qualityGrade}
                onChange={(e) =>
                  setFormData({ ...formData, qualityGrade: e.target.value as CropQualityGrade })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              >
                <option value="Grade A">Grade A</option>
                <option value="Grade B">Grade B</option>
                <option value="Grade C">Grade C</option>
                <option value="Export Grade">Export Grade</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.farmSizeLabel}
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
                {t.expectedYield} ({t.tonnes})
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
                {t.harvestWindow} ({t.inDays})
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
                {t.perishabilityWindow} ({t.inDays})
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
                {t.storageTypeLabel}
              </label>
              <select
                value={formData.storageType}
                onChange={(e) => setFormData({ ...formData, storageType: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              >
                <option value="Ventilated Warehouse">{tr("Ventilated Warehouse")}</option>
                <option value="Cold Storage">{tr("Cold Storage")}</option>
                <option value="Ambient Shed">{tr("Ambient Shed")}</option>
                <option value="None">{tr("None")}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t.turkeyLocation}
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
              <span>{t.settingsSaved}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-emerald-500/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-slate-300 hover:text-white text-xs font-semibold"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 text-black font-bold text-xs hover:shadow-lg hover:shadow-emerald-400/25 flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t.saveChanges}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import {
  X,
  Satellite,
  Layers,
  MapPin,
  Sparkles,
  Sprout,
  Activity,
  ArrowRight,
  ShieldCheck,
  Compass,
  CloudSun,
  Droplets,
  Thermometer,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { FarmerProfile, WeatherCondition, PrecisionCropHealth } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface SatelliteParcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FarmerProfile;
  weather: WeatherCondition;
  health: PrecisionCropHealth;
  onOpenPrecisionAnalytics: () => void;
}

export default function SatelliteParcelModal({
  isOpen,
  onClose,
  profile,
  weather,
  health,
  onOpenPrecisionAnalytics,
}: SatelliteParcelModalProps) {
  const { t, tr } = useLanguage();

  if (!isOpen) return null;

  const lat = weather.latitude ?? profile.latitude ?? 11.0055;
  const lon = weather.longitude ?? profile.longitude ?? 76.9661;
  const locationLabel = weather.locationName || profile.location || "Coimbatore South, Tamil Nadu";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel-agri rounded-3xl p-6 sm:p-7 border border-[#E1F5DC]/25 bg-[#09271B]/95 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#B8CCAE] hover:text-[#F4F7EF] bg-[#123D2B]/60 hover:bg-[#123D2B] transition-colors border border-[#E1F5DC]/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#123D2B] border border-[#A8D86D]/40 flex items-center justify-center text-[#A8D86D] shadow-lg shrink-0">
            <Satellite className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#A8D86D] text-[#09271B]">
                Sentinel-2 MSI Level-2A
              </span>
              <span className="text-[10px] text-[#A8D86D] font-mono flex items-center gap-1">
                <Compass className="w-3 h-3" />
                {lat > 0 ? `${lat.toFixed(4)}°N` : `${Math.abs(lat).toFixed(4)}°S`},{" "}
                {lon > 0 ? `${lon.toFixed(4)}°E` : `${Math.abs(lon).toFixed(4)}°W`}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#F4F7EF] tracking-tight">
              {t.satelliteParcelInspector}
            </h3>
            <p className="text-xs text-[#B8CCAE] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#A8D86D]" />
              <span>{locationLabel}</span>
              <span className="text-[#A8D86D] mx-1">•</span>
              <span>{profile.farmName || "Sunrise Agro Holdings"}</span>
            </p>
          </div>
        </div>

        {/* Satellite Imagery Preview with Dynamic Geofence Polygon */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E1F5DC]/20 h-52 sm:h-60 mb-5 group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/images/farmland_bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09271B]/90 via-transparent to-[#09271B]/40" />

          {/* SVG Multi-Spectral Boundary Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240">
            <polygon
              points="150,110 270,100 260,180 140,195"
              fill="rgba(168, 216, 109, 0.16)"
              stroke="#A8D86D"
              strokeWidth="2.5"
              strokeLinejoin="round"
              filter="drop-shadow(0 0 10px #A8D86D)"
            />
          </svg>

          {/* In-Field Sensor Pins with Tooltip Badges */}
          <div className="absolute left-[37%] top-[48%] -translate-x-1/2 -translate-y-1/2 group/pin">
            <div className="p-1.5 rounded-full bg-[#123D2B] border border-[#A8D86D] text-[#A8D86D] shadow-lg animate-pulse">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <div className="opacity-0 group-hover/pin:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-[9px] text-[#A8D86D] whitespace-nowrap border border-[#A8D86D]/30 pointer-events-none">
              Node A: Moisture 38%
            </div>
          </div>

          <div className="absolute left-[52%] top-[42%] -translate-x-1/2 -translate-y-1/2 group/pin">
            <div className="p-1.5 rounded-full bg-[#123D2B] border border-[#A8D86D] text-[#A8D86D] shadow-lg">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <div className="opacity-0 group-hover/pin:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-[9px] text-[#A8D86D] whitespace-nowrap border border-[#A8D86D]/30 pointer-events-none">
              Node B: NDVI 0.84
            </div>
          </div>

          <div className="absolute left-[64%] top-[60%] -translate-x-1/2 -translate-y-1/2 group/pin">
            <div className="p-1.5 rounded-full bg-[#123D2B] border border-[#A8D86D] text-[#A8D86D] shadow-lg">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <div className="opacity-0 group-hover/pin:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-[9px] text-[#A8D86D] whitespace-nowrap border border-[#A8D86D]/30 pointer-events-none">
              Node C: Temp 24°C
            </div>
          </div>

          {/* Bottom Overlay Info Pill */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#F4F7EF] bg-[#09271B]/85 backdrop-blur-md px-3 py-2 rounded-xl border border-[#E1F5DC]/15">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#A8D86D]">{tr(profile.cropType)}</span>
              <span>•</span>
              <span>{profile.farmSizeAcres} {t.acres}</span>
              <span>•</span>
              <span className="text-[#B8CCAE]">{profile.soilType || "Red Sandy Loam"}</span>
            </div>
            <div className="font-bold text-[#A8D86D] bg-[#123D2B] px-2 py-0.5 rounded border border-[#A8D86D]/30">
              {t.cropHealth}: {health.overallScore}/100
            </div>
          </div>
        </div>

        {/* Multi-Spectral Band Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="p-3 rounded-xl bg-[#123D2B]/50 border border-[#E1F5DC]/15">
            <div className="text-[10px] text-[#B8CCAE] mb-0.5">NDVI (Vigor)</div>
            <div className="text-xl font-black text-[#A8D86D]">{health.ndviIndex}</div>
            <div className="text-[10px] text-[#B8CCAE] mt-0.5">{t.healthStatusGood}</div>
          </div>

          <div className="p-3 rounded-xl bg-[#123D2B]/50 border border-[#E1F5DC]/15">
            <div className="text-[10px] text-[#B8CCAE] mb-0.5">EVI (Enhanced Veg)</div>
            <div className="text-xl font-black text-[#85C441]">{health.eviIndex}</div>
            <div className="text-[10px] text-[#B8CCAE] mt-0.5">Optimal Biomass</div>
          </div>

          <div className="p-3 rounded-xl bg-[#123D2B]/50 border border-[#E1F5DC]/15">
            <div className="text-[10px] text-[#B8CCAE] mb-0.5">{t.cloudCover}</div>
            <div className="text-xl font-black text-[#F4F7EF]">6%</div>
            <div className="text-[10px] text-[#A8D86D] mt-0.5">Clear Sky Pass</div>
          </div>

          <div className="p-3 rounded-xl bg-[#123D2B]/50 border border-[#E1F5DC]/15">
            <div className="text-[10px] text-[#B8CCAE] mb-0.5">{t.nextPass}</div>
            <div className="text-xl font-black text-[#E6C779]">2.5 days</div>
            <div className="text-[10px] text-[#B8CCAE] mt-0.5">Sentinel-2B Swath</div>
          </div>
        </div>

        {/* Ground In-Situ Telemetry Summary */}
        <div className="p-3.5 rounded-2xl bg-[#123D2B]/40 border border-[#E1F5DC]/15 mb-5">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#F4F7EF] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#A8D86D]" />
              <span>{t.sensorTelemetry}</span>
            </h4>
            <span className="text-[10px] text-[#A8D86D] font-mono">Sync: 12 min ago</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-[#09271B]/60 border border-[#E1F5DC]/10">
              <div className="text-[10px] text-[#B8CCAE]">{t.soilMoisture}</div>
              <div className="font-extrabold text-[#F4F7EF] mt-0.5">{weather.soilMoisturePercent}%</div>
            </div>
            <div className="p-2 rounded-xl bg-[#09271B]/60 border border-[#E1F5DC]/10">
              <div className="text-[10px] text-[#B8CCAE]">{t.soilTemperature}</div>
              <div className="font-extrabold text-[#A8D86D] mt-0.5">{weather.soilTempC ?? 23}°C</div>
            </div>
            <div className="p-2 rounded-xl bg-[#09271B]/60 border border-[#E1F5DC]/10">
              <div className="text-[10px] text-[#B8CCAE]">{t.nitrogen}</div>
              <div className="font-extrabold text-[#F4F7EF] mt-0.5">{t.optimal}</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E1F5DC]/15">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#B8CCAE] hover:text-[#F4F7EF] hover:bg-[#123D2B]/60 transition-colors"
          >
            {t.close}
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenPrecisionAnalytics();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#09271B] bg-[#A8D86D] hover:bg-[#b9e584] shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <span>{t.openPrecisionAnalytics}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

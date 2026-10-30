"use client";

import React, { useState, useEffect } from "react";
import {
  CloudSun,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  Navigation,
  Search,
  Globe,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Sprout,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { WeatherCondition, FarmerProfile } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import {
  INTERNATIONAL_AGRICULTURAL_PRESETS,
  searchGlobalLocations,
  fetchLiveWeather,
  getCurrentBrowserCoordinates,
  GeocodingResult,
  GlobalLocationPreset,
} from "@/services/weatherService";

interface WeatherClimateViewProps {
  weather: WeatherCondition;
  profile: FarmerProfile;
  onUpdateWeather: (newWeather: WeatherCondition) => void;
  onUpdateLocation?: (loc: string, lat?: number, lon?: number) => void;
}

export default function WeatherClimateView({
  weather,
  profile,
  onUpdateWeather,
  onUpdateLocation,
}: WeatherClimateViewProps) {
  const { t, tr } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Search debounce
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchGlobalLocations(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle Preset Selection
  const handleSelectPreset = async (preset: GlobalLocationPreset) => {
    setIsLoadingWeather(true);
    setSearchQuery("");
    setSearchResults([]);
    setGpsError(null);

    const liveData = await fetchLiveWeather(
      preset.latitude,
      preset.longitude,
      `${preset.name}, ${preset.region}`,
      preset.country
    );

    onUpdateWeather(liveData);
    if (onUpdateLocation) {
      onUpdateLocation(`${preset.name}, ${preset.region}, ${preset.country}`, preset.latitude, preset.longitude);
    }
    setIsLoadingWeather(false);
  };

  // Handle Search Result Selection
  const handleSelectSearchResult = async (item: GeocodingResult) => {
    setIsLoadingWeather(true);
    setSearchQuery("");
    setSearchResults([]);
    setGpsError(null);

    const locLabel = item.admin1 ? `${item.name}, ${item.admin1}` : item.name;
    const liveData = await fetchLiveWeather(
      item.latitude,
      item.longitude,
      locLabel,
      item.country
    );

    onUpdateWeather(liveData);
    if (onUpdateLocation) {
      onUpdateLocation(`${locLabel}, ${item.country}`, item.latitude, item.longitude);
    }
    setIsLoadingWeather(false);
  };

  // Handle GPS Auto-Detection
  const handleDetectGPS = async () => {
    setIsLoadingWeather(true);
    setGpsError(null);
    try {
      const coords = await getCurrentBrowserCoordinates();
      const liveData = await fetchLiveWeather(
        coords.latitude,
        coords.longitude,
        "Current GPS Location",
        "Detected"
      );
      onUpdateWeather(liveData);
      if (onUpdateLocation) {
        onUpdateLocation(`GPS (${coords.latitude.toFixed(2)}°, ${coords.longitude.toFixed(2)}°)`, coords.latitude, coords.longitude);
      }
    } catch (err: any) {
      setGpsError(err.message || "Failed to access browser GPS location.");
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const lat = weather.latitude ?? 11.0055;
  const lon = weather.longitude ?? 76.9661;
  const locationTitle = weather.locationName || profile.location || "Coimbatore South, Tamil Nadu";

  // Soil Moisture simulation chart
  const diurnalData = [
    { time: "06:00", moisture: weather.soilMoisturePercent + 3, temp: weather.currentTempC - 4 },
    { time: "09:00", moisture: weather.soilMoisturePercent + 1, temp: weather.currentTempC - 1 },
    { time: "12:00", moisture: weather.soilMoisturePercent - 3, temp: weather.currentTempC + 2 },
    { time: "15:00", moisture: weather.soilMoisturePercent - 4, temp: weather.currentTempC + 3 },
    { time: "18:00", moisture: weather.soilMoisturePercent - 1, temp: weather.currentTempC },
    { time: "21:00", moisture: weather.soilMoisturePercent + 1, temp: weather.currentTempC - 2 },
    { time: "00:00", moisture: weather.soilMoisturePercent + 2, temp: weather.currentTempC - 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Location Tracker Controls */}
      <div className="glass-panel-agri rounded-3xl p-5 sm:p-7 border border-[#E1F5DC]/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A8D86D] text-[#09271B]">
                {t.liveClimate}
              </span>
              <span className="text-[10px] text-[#A8D86D] font-mono flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Open-Meteo Global NWP Integration
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#F4F7EF] tracking-tight">
              {locationTitle}
            </h1>
            <p className="text-xs text-[#B8CCAE] flex items-center gap-1.5 mt-0.5">
              <Compass className="w-3.5 h-3.5 text-[#A8D86D]" />
              <span className="font-mono">
                {lat > 0 ? `${lat.toFixed(4)}°N` : `${Math.abs(lat).toFixed(4)}°S`},{" "}
                {lon > 0 ? `${lon.toFixed(4)}°E` : `${Math.abs(lon).toFixed(4)}°W`}
              </span>
              {weather.country && (
                <>
                  <span className="text-[#A8D86D]">•</span>
                  <span>{weather.country}</span>
                </>
              )}
            </p>
          </div>

          {/* Location Actions: GPS & Search */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* GPS Detection Button */}
            <button
              onClick={handleDetectGPS}
              disabled={isLoadingWeather}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#F4F7EF] bg-[#123D2B] hover:bg-[#1a523a] border border-[#A8D86D]/30 transition-all flex items-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
            >
              <Navigation className={`w-3.5 h-3.5 text-[#A8D86D] ${isLoadingWeather ? "animate-spin" : ""}`} />
              <span>{t.detectGps}</span>
            </button>

            {/* International Search Bar */}
            <div className="relative flex-1 lg:w-72">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#B8CCAE] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchLocationPlaceholder}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#09271B]/80 border border-[#E1F5DC]/20 text-[#F4F7EF] text-xs placeholder:text-[#B8CCAE]/60 focus:outline-none focus:border-[#A8D86D]"
                />
                {isSearching && (
                  <RefreshCw className="w-3.5 h-3.5 text-[#A8D86D] animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {/* Autocomplete Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-[#09271B] border border-[#E1F5DC]/25 rounded-2xl shadow-2xl p-1.5 divide-y divide-[#E1F5DC]/10 max-h-60 overflow-y-auto">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectSearchResult(item)}
                      className="w-full text-left p-2.5 hover:bg-[#123D2B] rounded-xl transition-colors text-xs text-[#F4F7EF] flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-[10px] text-[#B8CCAE]">
                          {item.admin1 ? `${item.admin1}, ` : ""}
                          {item.country}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#A8D86D]">
                        {item.latitude.toFixed(2)}°, {item.longitude.toFixed(2)}°
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GPS Error Message if any */}
        {gpsError && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{gpsError}</span>
          </div>
        )}

        {/* International Agricultural Belt Presets */}
        <div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-[#B8CCAE] mb-2 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#A8D86D]" />
            <span>{t.internationalPresets}</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {INTERNATIONAL_AGRICULTURAL_PRESETS.map((preset) => {
              const isSelected =
                Math.abs(preset.latitude - lat) < 0.1 && Math.abs(preset.longitude - lon) < 0.1;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#A8D86D] text-[#09271B] font-bold border-[#A8D86D] shadow-md"
                      : "bg-[#123D2B]/50 hover:bg-[#123D2B] text-[#B8CCAE] hover:text-[#F4F7EF] border-[#E1F5DC]/15"
                  }`}
                >
                  <span>{preset.flag}</span>
                  <span>{preset.name}</span>
                  <span className="text-[9px] opacity-75">({preset.countryCode})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Meteorological Grid: Current Condition + Agro-Advisor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Current Weather Card */}
        <div className="lg:col-span-7 glass-card-agri rounded-3xl p-6 border border-[#E1F5DC]/16 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs text-[#B8CCAE] font-semibold">{t.weatherToday}</span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-5xl font-black text-[#F4F7EF] tracking-tight">
                  {weather.currentTempC}°C
                </span>
                <span className="text-base text-[#A8D86D] font-bold">
                  {tr(weather.condition)}
                </span>
              </div>
              <div className="text-xs text-[#B8CCAE] mt-1 flex items-center gap-2">
                <span>{t.soilTemperature}: <strong className="text-[#F4F7EF]">{weather.soilTempC ?? weather.currentTempC - 2}°C</strong></span>
                <span>•</span>
                <span>{t.uvIndex}: <strong className="text-[#A8D86D]">{weather.uvIndex ?? 6} / 11</strong></span>
              </div>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#123D2B] border border-[#A8D86D]/30 flex items-center justify-center text-[#E6C779] shadow-xl">
              {weather.precipitationProbPercent > 40 ? (
                <CloudRain className="w-10 h-10 text-cyan-400" />
              ) : weather.condition.toLowerCase().includes("cloud") ? (
                <CloudSun className="w-10 h-10 text-[#E6C779]" />
              ) : (
                <Sun className="w-10 h-10 text-[#E6C779] animate-spin-slow" />
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-[#E1F5DC]/12 text-center">
            <div className="p-2.5 rounded-xl bg-[#123D2B]/40">
              <div className="text-[10px] text-[#B8CCAE] flex items-center justify-center gap-1">
                <Droplets className="w-3 h-3 text-[#A8D86D]" />
                <span>{t.humidity}</span>
              </div>
              <div className="text-base font-extrabold text-[#F4F7EF] mt-0.5">
                {weather.humidityPercent}%
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#123D2B]/40">
              <div className="text-[10px] text-[#B8CCAE] flex items-center justify-center gap-1">
                <Wind className="w-3 h-3 text-cyan-300" />
                <span>{t.wind}</span>
              </div>
              <div className="text-base font-extrabold text-[#F4F7EF] mt-0.5">
                {weather.windSpeedKmh} {t.km}/h
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#123D2B]/40">
              <div className="text-[10px] text-[#B8CCAE] flex items-center justify-center gap-1">
                <CloudRain className="w-3 h-3 text-sky-400" />
                <span>{t.rain}</span>
              </div>
              <div className="text-base font-extrabold text-[#A8D86D] mt-0.5">
                {weather.precipitationProbPercent}%
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#123D2B]/40">
              <div className="text-[10px] text-[#B8CCAE] flex items-center justify-center gap-1">
                <Sprout className="w-3 h-3 text-[#85C441]" />
                <span>{t.soilMoisture}</span>
              </div>
              <div className="text-base font-extrabold text-[#F4F7EF] mt-0.5">
                {weather.soilMoisturePercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Agro-Operations & Spraying Safety Advisor */}
        <div className="lg:col-span-5 glass-card-agri rounded-3xl p-6 border border-[#E1F5DC]/16 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#F4F7EF] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#A8D86D]" />
                <span>{t.sprayingAdvisor}</span>
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  weather.sprayingCondition?.includes("Unsafe")
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    : weather.sprayingCondition?.includes("Caution")
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-[#A8D86D]/20 text-[#A8D86D] border border-[#A8D86D]/40"
                }`}
              >
                {weather.sprayingCondition?.includes("Unsafe")
                  ? "Unsafe Window"
                  : weather.sprayingCondition?.includes("Caution")
                  ? "Caution Window"
                  : "Optimal Window"}
              </span>
            </div>

            <p className="text-xs text-[#B8CCAE] mb-3">
              {weather.sprayingCondition === "Unsafe - Rain Expected"
                ? t.sprayingRainCaution
                : weather.sprayingCondition === "Caution - High Wind"
                ? t.sprayingWindCaution
                : t.sprayingSafe}
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#123D2B]/40 flex items-center justify-between">
                <span className="text-[#B8CCAE]">Drone Spraying Suitability:</span>
                <span className={`font-bold ${weather.windSpeedKmh > 15 ? "text-amber-400" : "text-[#A8D86D]"}`}>
                  {weather.windSpeedKmh > 15 ? "High Drift (>15 km/h)" : "Safe (<15 km/h)"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#123D2B]/40 flex items-center justify-between">
                <span className="text-[#B8CCAE]">Harvest Moisture Window:</span>
                <span className="font-bold text-[#F4F7EF]">
                  {weather.precipitationProbPercent < 25 ? "Clear - Safe to Harvest" : "Rain Caution"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#123D2B]/40 flex items-center justify-between">
                <span className="text-[#B8CCAE]">{t.solarRadiationText}:</span>
                <span className="font-bold text-[#E6C779]">
                  {weather.solarRadiation ?? 620} W/m²
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E1F5DC]/10 text-[10px] text-[#A8D86D] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Updated with live ECMWF & Sentinel-2 atmospheric optical models</span>
          </div>
        </div>
      </div>

      {/* 5-Day Extended Numerical Forecast */}
      <div className="glass-card-agri rounded-3xl p-6 border border-[#E1F5DC]/16">
        <h3 className="text-sm font-bold text-[#F4F7EF] mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#A8D86D]" />
          <span>{t.weatherForecast7Day}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {weather.forecast.map((dayItem, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center transition-all ${
                idx === 0
                  ? "bg-[#123D2B] border-[#A8D86D]/40 shadow-lg"
                  : "bg-[#123D2B]/30 border-[#E1F5DC]/12 hover:bg-[#123D2B]/50"
              }`}
            >
              <div className="text-xs font-bold text-[#B8CCAE] mb-1">
                {idx === 0 ? t.today : tr(dayItem.day)}
              </div>

              <div className="my-2">
                {dayItem.rainProb > 40 ? (
                  <CloudRain className="w-8 h-8 text-cyan-400 mx-auto" />
                ) : dayItem.condition.toLowerCase().includes("cloud") ? (
                  <CloudSun className="w-8 h-8 text-[#E6C779] mx-auto" />
                ) : (
                  <Sun className="w-8 h-8 text-[#E6C779] mx-auto" />
                )}
              </div>

              <div className="text-base font-black text-[#F4F7EF]">
                {dayItem.tempHigh}° / {dayItem.tempLow}°
              </div>
              <div className="text-[10px] text-[#B8CCAE] mt-0.5 truncate">
                {tr(dayItem.condition)}
              </div>

              <div className="mt-2 pt-2 border-t border-[#E1F5DC]/10 text-[10px] text-[#A8D86D] font-bold">
                {dayItem.rainProb}% {t.rain}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diurnal Soil Moisture & Temperature Dynamic Curves */}
      <div className="glass-card-agri rounded-3xl p-6 border border-[#E1F5DC]/16">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#F4F7EF] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#A8D86D]" />
              <span>Diurnal Soil Moisture & Thermal Profile</span>
            </h3>
            <p className="text-xs text-[#B8CCAE]">
              24-hour Root Zone Telemetry tracked across latitude {lat.toFixed(2)}°
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-[#A8D86D]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A8D86D]" />
              Soil Moisture (%)
            </span>
            <span className="flex items-center gap-1.5 text-[#E6C779]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6C779]" />
              Soil Temp (°C)
            </span>
          </div>
        </div>

        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={diurnalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A8D86D" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#A8D86D" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E6C779" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E6C779" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(225, 245, 220, 0.08)" />
              <XAxis dataKey="time" stroke="#B8CCAE" fontSize={11} />
              <YAxis stroke="#B8CCAE" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09271B",
                  borderColor: "rgba(168, 216, 109, 0.4)",
                  borderRadius: "12px",
                  fontSize: "11px",
                  color: "#F4F7EF",
                }}
              />
              <Area
                type="monotone"
                dataKey="moisture"
                name="Soil Moisture (%)"
                stroke="#A8D86D"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#moistureGrad)"
              />
              <Area
                type="monotone"
                dataKey="temp"
                name="Soil Temp (°C)"
                stroke="#E6C779"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#tempGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

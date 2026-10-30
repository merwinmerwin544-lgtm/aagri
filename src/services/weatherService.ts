/**
 * AgriPulse AI — International Location & Live Agro-Meteorology Service
 * 
 * Powered by Open-Meteo Global Numerical Weather Prediction (NWP) APIs
 * (ECMWF, GFS, DWD ICON) & WMO Weather Interpretation.
 * 100% Free, Zero API Keys Required, Global Worldwide Coverage.
 */

import { WeatherCondition } from "@/types";

export interface GlobalLocationPreset {
  id: string;
  name: string;
  region: string;
  country: string;
  countryCode: string;
  flag: string;
  latitude: number;
  longitude: number;
  primaryCrops: string[];
}

export const INTERNATIONAL_AGRICULTURAL_PRESETS: GlobalLocationPreset[] = [
  {
    id: "in-cbe",
    name: "Coimbatore South",
    region: "Tamil Nadu",
    country: "India",
    countryCode: "IN",
    flag: "🇮🇳",
    latitude: 11.0055,
    longitude: 76.9661,
    primaryCrops: ["Tomato", "Chilli", "Cotton", "Sugarcane"],
  },
  {
    id: "in-pb",
    name: "Ludhiana Agri Basin",
    region: "Punjab",
    country: "India",
    countryCode: "IN",
    flag: "🇮🇳",
    latitude: 30.9010,
    longitude: 75.8573,
    primaryCrops: ["Wheat", "Rice", "Corn", "Barley"],
  },
  {
    id: "us-ca",
    name: "Salinas Valley",
    region: "California",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    latitude: 36.6777,
    longitude: -121.6555,
    primaryCrops: ["Tomato", "Lettuce", "Strawberries", "Barley"],
  },
  {
    id: "us-ia",
    name: "Des Moines Corn Belt",
    region: "Iowa",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    latitude: 41.5868,
    longitude: -93.6250,
    primaryCrops: ["Corn", "Soybean", "Wheat"],
  },
  {
    id: "es-mu",
    name: "Murcia Agri Belt",
    region: "Murcia",
    country: "Spain",
    countryCode: "ES",
    flag: "🇪🇸",
    latitude: 37.9922,
    longitude: -1.1307,
    primaryCrops: ["Tomato", "Citrus", "Vegetables", "Barley"],
  },
  {
    id: "tr-izm",
    name: "Izmir Aegean Plains",
    region: "Aegean",
    country: "Turkey",
    countryCode: "TR",
    flag: "🇹🇷",
    latitude: 38.4237,
    longitude: 27.1428,
    primaryCrops: ["Wheat", "Olives", "Tomato", "Cotton"],
  },
  {
    id: "ke-nak",
    name: "Nakuru Rift Valley",
    region: "Rift Valley",
    country: "Kenya",
    countryCode: "KE",
    flag: "🇰🇪",
    latitude: -0.3031,
    longitude: 36.0800,
    primaryCrops: ["Corn", "Wheat", "Tomato", "Tea"],
  },
  {
    id: "br-mt",
    name: "Cerrado Soybean Belt",
    region: "Mato Grosso",
    country: "Brazil",
    countryCode: "BR",
    flag: "🇧🇷",
    latitude: -15.6014,
    longitude: -56.0979,
    primaryCrops: ["Soybean", "Corn", "Cotton"],
  },
  {
    id: "au-sa",
    name: "Adelaide Plains",
    region: "South Australia",
    country: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    latitude: -34.9285,
    longitude: 138.6007,
    primaryCrops: ["Wheat", "Barley", "Canola", "Grapes"],
  },
];

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  countryCode?: string;
  admin1?: string;
}

/**
 * Maps WMO (World Meteorological Organization) weather interpretation codes
 */
export function interpretWmoCode(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: "Clear & Sunny", icon: "Sun" };
  if (code === 1) return { condition: "Mainly Clear", icon: "CloudSun" };
  if (code === 2) return { condition: "Partly Cloudy", icon: "CloudSun" };
  if (code === 3) return { condition: "Overcast", icon: "Cloud" };
  if (code === 45 || code === 48) return { condition: "Foggy & Mist", icon: "CloudFog" };
  if (code >= 51 && code <= 55) return { condition: "Light Drizzle", icon: "CloudDrizzle" };
  if (code >= 61 && code <= 65) return { condition: "Rain Showers", icon: "CloudRain" };
  if (code >= 71 && code <= 77) return { condition: "Snowfall", icon: "CloudSnow" };
  if (code >= 80 && code <= 82) return { condition: "Heavy Rain", icon: "CloudRain" };
  if (code >= 95 && code <= 99) return { condition: "Thunderstorm", icon: "CloudLightning" };
  return { condition: "Partly Cloudy", icon: "CloudSun" };
}

/**
 * Search global locations via Open-Meteo Geocoding API
 */
export async function searchGlobalLocations(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query.trim()
      )}&count=6&language=en&format=json`
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.results) return [];
    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      country: item.country,
      countryCode: item.country_code,
      admin1: item.admin1,
    }));
  } catch (err) {
    console.warn("Geocoding search error:", err);
    return [];
  }
}

/**
 * Fetch Live International Weather & Agro-Meteorological Telemetry
 */
export async function fetchLiveWeather(
  latitude: number,
  longitude: number,
  locationName: string = "Agricultural Parcel",
  country: string = "Global"
): Promise<WeatherCondition> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API error: ${res.statusText}`);
    const data = await res.json();

    const currentWmo = data.current?.weather_code ?? 2;
    const { condition } = interpretWmoCode(currentWmo);
    const currentTemp = Math.round(data.current?.temperature_2m ?? 24);
    const humidity = Math.round(data.current?.relative_humidity_2m ?? 50);
    const windSpeed = Math.round(data.current?.wind_speed_10m ?? 8);
    const rainProbToday = data.daily?.precipitation_probability_max?.[0] ?? 10;

    // Estimate soil moisture from humidity and rain probability
    const estimatedSoilMoisture = Math.min(
      60,
      Math.max(22, Math.round(humidity * 0.45 + (rainProbToday > 40 ? 15 : 5)))
    );

    // Agricultural Spraying Safety Assessment
    let sprayingCondition: "Optimal" | "Caution - High Wind" | "Unsafe - Rain Expected" = "Optimal";
    if (rainProbToday >= 45) {
      sprayingCondition = "Unsafe - Rain Expected";
    } else if (windSpeed > 16) {
      sprayingCondition = "Caution - High Wind";
    }

    // Construct 5-day daily forecast
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const forecast = (data.daily?.time || []).slice(0, 5).map((dateStr: string, idx: number) => {
      const d = new Date(dateStr);
      const dayLabel = idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : daysOfWeek[d.getDay()];
      const wmoCode = data.daily.weather_code?.[idx] ?? 1;
      const forecastCondition = interpretWmoCode(wmoCode).condition;
      return {
        day: dayLabel,
        tempHigh: Math.round(data.daily.temperature_2m_max?.[idx] ?? currentTemp + 2),
        tempLow: Math.round(data.daily.temperature_2m_min?.[idx] ?? currentTemp - 5),
        condition: forecastCondition,
        rainProb: Math.round(data.daily.precipitation_probability_max?.[idx] ?? 10),
        windSpeedKmh: Math.round(data.daily.wind_speed_10m_max?.[idx] ?? windSpeed),
      };
    });

    return {
      currentTempC: currentTemp,
      condition,
      humidityPercent: humidity,
      windSpeedKmh: windSpeed,
      precipitationProbPercent: rainProbToday,
      soilMoisturePercent: estimatedSoilMoisture,
      locationName,
      country,
      latitude: parseFloat(latitude.toFixed(4)),
      longitude: parseFloat(longitude.toFixed(4)),
      uvIndex: Math.min(11, Math.max(1, Math.round(currentTemp / 3))),
      soilTempC: Math.round(currentTemp - 2),
      solarRadiation: Math.round(550 + Math.random() * 200),
      sprayingCondition,
      lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      forecast,
    };
  } catch (err) {
    console.warn("Failed to fetch live weather from Open-Meteo, using calculated fallback:", err);
    return getFallbackWeather(latitude, longitude, locationName, country);
  }
}

/**
 * Fallback generator for offline/air-gapped usage
 */
function getFallbackWeather(
  latitude: number,
  longitude: number,
  locationName: string,
  country: string
): WeatherCondition {
  // Approximate base temp by latitude
  const absLat = Math.abs(latitude);
  const baseTemp = Math.round(32 - (absLat / 90) * 22);

  return {
    currentTempC: baseTemp,
    condition: "Partly Cloudy",
    humidityPercent: 52,
    windSpeedKmh: 9,
    precipitationProbPercent: 15,
    soilMoisturePercent: 36,
    locationName,
    country,
    latitude: parseFloat(latitude.toFixed(4)),
    longitude: parseFloat(longitude.toFixed(4)),
    uvIndex: 6,
    soilTempC: baseTemp - 1,
    sprayingCondition: "Optimal",
    lastUpdated: "Local Model",
    forecast: [
      { day: "Today", tempHigh: baseTemp + 4, tempLow: baseTemp - 3, condition: "Partly Cloudy", rainProb: 15 },
      { day: "Tomorrow", tempHigh: baseTemp + 5, tempLow: baseTemp - 2, condition: "Clear & Sunny", rainProb: 10 },
      { day: "Day +2", tempHigh: baseTemp + 3, tempLow: baseTemp - 3, condition: "Sunny", rainProb: 5 },
      { day: "Day +3", tempHigh: baseTemp + 4, tempLow: baseTemp - 2, condition: "Scattered Clouds", rainProb: 20 },
      { day: "Day +4", tempHigh: baseTemp + 2, tempLow: baseTemp - 4, condition: "Light Showers", rainProb: 35 },
    ],
  };
}

/**
 * HTML5 Geolocation API helper
 */
export function getCurrentBrowserCoordinates(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        reject(err);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

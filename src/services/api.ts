/**
 * AgriPulse AI — API & Backend Service Layer
 * 
 * ============================================================================
 * NOTE FOR BACKEND DEVELOPER:
 * ============================================================================
 * This service layer is fully typed and abstracts all data fetching.
 * Currently, it simulates asynchronous REST/GraphQL latency and returns typed mock data.
 * 
 * To integrate with your real backend:
 * 1. Replace the mock return statements with `await fetch('/api/...')` or your SDK.
 * 2. Keep the method signatures and return types intact to avoid any frontend breaking changes.
 * 3. All types are imported from `@/types`.
 * ============================================================================
 */

import {
  FarmerProfile,
  PrecisionCropHealth,
  MarketPriceData,
  Buyer,
  LogisticsOption,
  FoodLossScenario,
  DecisionEngineStrategy,
  WhatIfScenarioResult,
  WeatherCondition,
  SoilHealthTelemetry,
  FarmTask,
  FarmAlert,
  BuyerProcurementPost,
  SupportedLanguage,
} from "@/types";
import {
  initialFarmerProfile,
  sampleCropHealth,
  sampleMarketPrices,
  sampleBuyers,
  sampleLogisticsRoutes,
  sampleFoodLossScenarios,
  sampleDecisionStrategy,
  sampleWhatIfRows,
  sampleWeather,
  sampleSoilHealth,
  sampleTasks,
  sampleAlerts,
  sampleBuyerProcurementPosts,
  regionalQuestions,
} from "./mockData";

const STORAGE_KEY_PROFILE = "agripulse_farmer_profile";
const STORAGE_KEY_TASKS = "agripulse_tasks";

function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("localStorage write failed", e);
  }
}

/**
 * BACKEND HOOK: GET /api/farmer/profile
 */
export async function getFarmerProfile(): Promise<FarmerProfile> {
  // Simulate network latency (100ms)
  await new Promise((res) => setTimeout(res, 80));
  return getLocalItem<FarmerProfile>(STORAGE_KEY_PROFILE, initialFarmerProfile);
}

/**
 * BACKEND HOOK: PUT /api/farmer/profile
 */
export async function updateFarmerProfile(
  profile: Partial<FarmerProfile>
): Promise<FarmerProfile> {
  await new Promise((res) => setTimeout(res, 120));
  const current = getLocalItem<FarmerProfile>(STORAGE_KEY_PROFILE, initialFarmerProfile);
  const updated = { ...current, ...profile };
  setLocalItem(STORAGE_KEY_PROFILE, updated);
  return updated;
}

/**
 * BACKEND HOOK: GET /api/intelligence/crop-health?crop={crop}
 */
export async function getCropHealth(crop: string = "Tomato"): Promise<PrecisionCropHealth> {
  await new Promise((res) => setTimeout(res, 80));
  // Adjust simulated values slightly based on crop
  if (crop === "Wheat") {
    return {
      ...sampleCropHealth,
      overallScore: 89,
      expectedYieldTonnes: 5.2,
      harvestWindowStartDays: 12,
      harvestWindowEndDays: 16,
      growthStage: "Grain Hardening & Desiccation",
    };
  }
  return sampleCropHealth;
}

/**
 * BACKEND HOOK: GET /api/intelligence/price-forecast?crop={crop}&region={region}
 */
export async function getMarketPriceForecast(
  crop: string = "Tomato"
): Promise<MarketPriceData> {
  await new Promise((res) => setTimeout(res, 80));
  return sampleMarketPrices[crop] || sampleMarketPrices["Tomato"];
}

/**
 * BACKEND HOOK: GET /api/marketplace/buyers?crop={crop}&quality={quality}
 */
export async function getMatchedBuyers(crop: string = "Tomato"): Promise<Buyer[]> {
  await new Promise((res) => setTimeout(res, 90));
  return sampleBuyers.map((b) => ({
    ...b,
    cropRequired: crop as any,
  }));
}

/**
 * BACKEND HOOK: GET /api/logistics/routes?buyerId={buyerId}
 */
export async function getLogisticsRoute(buyerId: string): Promise<LogisticsOption> {
  await new Promise((res) => setTimeout(res, 60));
  return sampleLogisticsRoutes[buyerId] || sampleLogisticsRoutes["buyer-a"];
}

/**
 * BACKEND HOOK: GET /api/intelligence/food-loss-scenarios
 */
export async function getFoodLossScenarios(): Promise<FoodLossScenario[]> {
  await new Promise((res) => setTimeout(res, 60));
  return sampleFoodLossScenarios;
}

/**
 * BACKEND HOOK: GET /api/decision-engine/recommendation
 */
export async function getDecisionRecommendation(): Promise<DecisionEngineStrategy> {
  await new Promise((res) => setTimeout(res, 100));
  return sampleDecisionStrategy;
}

/**
 * BACKEND HOOK: GET /api/simulator/scenarios
 */
export async function getWhatIfScenarios(): Promise<WhatIfScenarioResult[]> {
  await new Promise((res) => setTimeout(res, 80));
  return sampleWhatIfRows;
}

/**
 * BACKEND HOOK: GET /api/weather/current
 */
export async function getWeatherTelemetry(): Promise<WeatherCondition> {
  return sampleWeather;
}

/**
 * BACKEND HOOK: GET /api/sensors/soil-health
 */
export async function getSoilHealthTelemetry(): Promise<SoilHealthTelemetry> {
  return sampleSoilHealth;
}

/**
 * BACKEND HOOK: GET /api/tasks
 */
export async function getFarmTasks(): Promise<FarmTask[]> {
  return getLocalItem<FarmTask[]>(STORAGE_KEY_TASKS, sampleTasks);
}

/**
 * BACKEND HOOK: PATCH /api/tasks/:id/status
 */
export async function toggleTaskStatus(taskId: string): Promise<FarmTask[]> {
  const current = getLocalItem<FarmTask[]>(STORAGE_KEY_TASKS, sampleTasks);
  const updated = current.map((t) => {
    if (t.id === taskId) {
      const nextStatus = t.status === "Completed" ? "Pending" : "Completed";
      return { ...t, status: nextStatus as any };
    }
    return t;
  });
  setLocalItem(STORAGE_KEY_TASKS, updated);
  return updated;
}

/**
 * BACKEND HOOK: POST /api/tasks
 */
export async function createFarmTask(task: Omit<FarmTask, "id">): Promise<FarmTask[]> {
  const current = getLocalItem<FarmTask[]>(STORAGE_KEY_TASKS, sampleTasks);
  const newTask: FarmTask = {
    ...task,
    id: `task-${Date.now()}`,
  };
  const updated = [newTask, ...current];
  setLocalItem(STORAGE_KEY_TASKS, updated);
  return updated;
}

/**
 * BACKEND HOOK: GET /api/alerts
 */
export async function getFarmAlerts(): Promise<FarmAlert[]> {
  return sampleAlerts;
}

/**
 * BACKEND HOOK: GET /api/marketplace/procurement-feed
 */
export async function getBuyerProcurementFeed(): Promise<BuyerProcurementPost[]> {
  return sampleBuyerProcurementPosts;
}

/**
 * BACKEND HOOK: POST /api/ai-assistant
 */
export async function queryAIAssistant(
  prompt: string,
  lang: SupportedLanguage = "en",
  farmContext?: any
): Promise<{ text: string; audioSummary: string }> {
  try {
    const res = await fetch("/api/ai-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: prompt,
        language: lang,
        farmContext: farmContext || {
          farmerName: "Uzhavan",
          cropType: "Tomato",
          qualityGrade: "Grade A",
          spoilageHours: 41,
          expectedYieldTonnes: 3.8,
          currentTempC: 22,
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        text: data.text,
        audioSummary: data.audioSummary || data.text,
      };
    }
  } catch (err) {
    console.warn("Backend /api/ai-assistant fetch failed, using fallback:", err);
  }

  // Graceful fallback if offline
  const matched = regionalQuestions[prompt];
  if (matched) {
    return {
      text: matched.answer,
      audioSummary: matched.voiceSnippet,
    };
  }

  if (lang === "ta") {
    return {
      text: "உழவன் AI உங்கள் பயிரை கண்காணித்து வருகிறது. தற்போதைய சந்தை கணிப்பின்படி 3 நாட்களில் விற்பனை செய்வது அதிகபட்ச நிகர லாபம் ஈட்டும்.",
      audioSummary: "மூன்று நாட்களில் விற்பனை செய்வது அதிகபட்ச லாபம் ஈட்டும்.",
    };
  }
  if (lang === "hi") {
    return {
      text: "उझवन AI आपकी फसल की निगरानी कर रहा है। पूर्वानुमान के अनुसार 3 दिनों में बेचने पर अधिकतम मुनाफा होगा।",
      audioSummary: "तीन दिनों में बेचने पर अधिकतम लाभ होगा।",
    };
  }

  return {
    text: `Based on your farm's 2.0-acre Tomato plot telemetry, optimal strategy indicates harvesting in 3-5 days and routing to Kovai Fresh Mart at ₹32/kg. Soil moisture is at 34% (recommend 45-min evening drip pulse).`,
    audioSummary: "Analysis indicates harvesting in three to five days and routing to Kovai Fresh Mart.",
  };
}

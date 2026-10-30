/**
 * AgriPulse AI — Post-Harvest Spoilage & Dynamic Shelf-Life Engine
 * 
 * Computes per-batch countdown based on:
 * - Crop respiration kinetics
 * - Photo-based quality grade
 * - Forecast temperature and relative humidity (ECMWF / Open-Meteo)
 * - Cold storage vs ambient holding
 * - Transit hours to buyer gate
 */

import { CropType, CropQualityGrade, SpoilageClockState, QualityGradingResult } from "@/types";

/**
 * Base ambient shelf-life hours at 22°C standard reference temperature
 */
const BASE_SHELF_LIFE_HOURS: Record<CropType, number> = {
  Tomato: 54,     // Perishable fruit
  Chilli: 96,     // Moderate perishable
  Corn: 72,       // Sugar-to-starch conversion
  Soybean: 360,   // Low moisture pulse
  Wheat: 1440,    // Dry grain
  Barley: 1440,   // Dry grain
};

/**
 * Grade preservation multiplier
 */
const GRADE_MULTIPLIERS: Record<CropQualityGrade, number> = {
  "Export Grade": 1.20,
  "Grade A": 1.00,
  "Grade B": 0.82, // Micro-abrasions speed decay
  "Grade C": 0.65,
};

export interface SpoilageCalculationInput {
  cropType: CropType;
  grade: CropQualityGrade;
  temperatureC: number;
  humidityPercent: number;
  transportHours: number;
  isColdStorage: boolean;
  totalBatchQuantityTonnes: number;
  baseMarketPricePerKg: number;
}

/**
 * Calculates real-time spoilage clock parameters
 */
export function calculateSpoilageClock(input: SpoilageCalculationInput): SpoilageClockState {
  const {
    cropType,
    grade,
    temperatureC,
    humidityPercent,
    transportHours,
    isColdStorage,
    totalBatchQuantityTonnes,
    baseMarketPricePerKg,
  } = input;

  // 1. Base hours from crop biology
  const baseHours = BASE_SHELF_LIFE_HOURS[cropType] || 54;
  const gradeFactor = GRADE_MULTIPLIERS[grade] || 1.0;

  // 2. Temperature adjustment ($Q_{10}$ thermal degradation)
  // Optimal cold chain storage is ~6°C for tomatoes/chillies
  const effectiveTemp = isColdStorage ? 6 : temperatureC;
  const tempDiff = effectiveTemp - 22;
  // Respiration rate doubles roughly every 10°C
  const tempMultiplier = tempDiff > 0 
    ? Math.max(0.45, 1 - (tempDiff * 0.055)) 
    : Math.min(3.2, 1 + (Math.abs(tempDiff) * 0.12));

  // 3. Humidity factor
  // Very dry (<45%) or very wet (>90% warm) accelerates desiccation or botrytis mold
  let humidityFactor = 1.0;
  if (!isColdStorage) {
    if (humidityPercent < 45) humidityFactor = 0.88;
    else if (humidityPercent > 88 && effectiveTemp > 24) humidityFactor = 0.82;
  }

  // 4. Calculate total effective shelf-life
  const totalShelfLifeHours = Math.round(baseHours * gradeFactor * tempMultiplier * humidityFactor);

  // 5. Subtract transport window buffer
  const criticalHours = Math.max(12, Math.round(totalShelfLifeHours - transportHours));

  // 6. Value loss estimation if delayed beyond critical window
  // Standard market penalty: 12% at the 41h inflection, climbing to 28% at 72h
  const valueLossPercent = grade === "Export Grade" ? 9.5 : grade === "Grade A" ? 12.0 : 16.5;

  const totalValueInr = Math.round(totalBatchQuantityTonnes * 1000 * baseMarketPricePerKg);
  const projectedLossInr = Math.round((totalValueInr * valueLossPercent) / 100);

  // Remaining simulated countdown (default set to 41 hours for demonstration)
  const remainingHours = Math.min(criticalHours, 41.5);
  const remainingSeconds = Math.round(remainingHours * 3600);

  return {
    batchId: `BATCH-${cropType.toUpperCase().slice(0, 3)}-${grade.replace(/\s+/g, "").toUpperCase()}`,
    cropType,
    grade,
    initialHours: totalShelfLifeHours,
    remainingSeconds,
    criticalThresholdHours: Math.round(remainingHours),
    valueLossAtThresholdPercent: valueLossPercent,
    currentValueInr: totalValueInr,
    projectedLossInr,
    effectiveTemperatureC: effectiveTemp,
    effectiveHumidityPercent: isColdStorage ? 90 : humidityPercent,
    transportDurationHours: transportHours,
    isColdStorageActive: isColdStorage,
    status: remainingHours > 24 ? "Fresh" : remainingHours > 12 ? "Decision Window" : "Critical Decay",
  };
}

/**
 * Sample Photo-Based Quality Grading presets for instant interactive testing
 */
export const SAMPLE_QUALITY_PRESETS: Record<string, QualityGradingResult> = {
  "tomato-grade-a": {
    batchId: "BATCH-TOM-GA-01",
    timestamp: "Just Now",
    cropType: "Tomato",
    variety: "Pusa Ruby Hybrid",
    imageUrl: "/images/tomato_grade_a.jpg",
    grade: "Grade A",
    confidenceScore: 97.4,
    ripenessPercentage: 88,
    ripenessStage: "Firm Ripe",
    visibleDefectPercent: 1.8,
    defectDetails: {
      blemishRate: 1.2,
      bruisingRate: 0.4,
      pestDamageRate: 0.2,
      shapeUniformity: 95.8,
    },
    recommendedShelfLifeHours: 41,
    certificateCode: "AGRI-CERT-2026-T9812",
    inspectorVerdict: "Excellent chromatic uniformity, taut cuticle with zero botrytis signs. Meets strict Grade A wholesale procurement specs.",
  },
  "tomato-grade-b": {
    batchId: "BATCH-TOM-GB-02",
    timestamp: "Just Now",
    cropType: "Tomato",
    variety: "Pusa Ruby Hybrid",
    imageUrl: "/images/tomato_grade_b.jpg",
    grade: "Grade B",
    confidenceScore: 94.8,
    ripenessPercentage: 94,
    ripenessStage: "Full Ripe",
    visibleDefectPercent: 6.2,
    defectDetails: {
      blemishRate: 4.1,
      bruisingRate: 1.8,
      pestDamageRate: 0.3,
      shapeUniformity: 86.4,
    },
    recommendedShelfLifeHours: 26,
    certificateCode: "AGRI-CERT-2026-T9813",
    inspectorVerdict: "Surface scarring and micro-cracking observed. Suitable for local processing and quick-turn retail, not recommended for multi-day long-haul transit.",
  },
  "tomato-export": {
    batchId: "BATCH-TOM-EXP-03",
    timestamp: "Just Now",
    cropType: "Tomato",
    variety: "Export Cherry / Roma",
    imageUrl: "/images/tomato_grade_a.jpg",
    grade: "Export Grade",
    confidenceScore: 98.9,
    ripenessPercentage: 82,
    ripenessStage: "Breaker / Turning",
    visibleDefectPercent: 0.4,
    defectDetails: {
      blemishRate: 0.2,
      bruisingRate: 0.1,
      pestDamageRate: 0.0,
      shapeUniformity: 98.5,
    },
    recommendedShelfLifeHours: 58,
    certificateCode: "AGRI-CERT-2026-EXP01",
    inspectorVerdict: "Pristine export caliber with exceptional firmness and stem retention. Exceeds GlobalGAP quality benchmarks.",
  },
};

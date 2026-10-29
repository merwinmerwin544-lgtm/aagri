/**
 * AgriPulse AI — Core Domain Type Definitions
 * 
 * NOTE FOR BACKEND DEVELOPER:
 * These interfaces define the complete domain model for AgriPulse AI.
 * The frontend uses mock implementations of these contracts in `src/services/api.ts`
 * and `src/services/mockData.ts`. You can directly map these interfaces to your
 * ORM (e.g. Prisma), REST API payloads, or GraphQL schemas.
 */

export type CropType = "Tomato" | "Wheat" | "Corn" | "Soybean" | "Chilli" | "Barley";
export type CropQualityGrade = "Grade A" | "Grade B" | "Grade C" | "Export Grade";
export type SupportedLanguage = "en" | "ta" | "hi";

export interface FarmerProfile {
  id: string;
  farmerName: string;
  farmName: string;
  cropType: CropType;
  variety: string;
  location: string;
  region: string;
  farmSizeAcres: number;
  plantingDate: string;
  expectedYieldTonnes: number;
  estimatedHarvestDays: number;
  qualityGrade: CropQualityGrade;
  storageAvailableDays: number;
  storageType: "Ambient Shed" | "Cold Storage" | "Ventilated Warehouse" | "None";
  soilType: string;
  irrigationMethod: "Drip Irrigation" | "Sprinkler" | "Flood Canal" | "Smart Sensor Drip";
}

export interface PrecisionCropHealth {
  overallScore: number; // 0 - 100
  status: "Excellent" | "Good" | "Moderate" | "Stressed";
  ndviIndex: number; // 0.0 - 1.0 (Simulated Normalized Difference Veg Index)
  eviIndex: number;  // 0.0 - 1.0 (Enhanced Veg Index)
  growthStage: string; // e.g. "Ripening & Fruit Filling"
  growthProgressPercent: number;
  expectedYieldTonnes: number;
  yieldConfidencePercent: number;
  harvestWindowStartDays: number;
  harvestWindowEndDays: number;
  chlorophyllContent: string;
  moistureDeficitRisk: "Low" | "Medium" | "High";
  pestDiseaseRisk: "Negligible" | "Mild Warning" | "High Alert";
  historicalHealthTrend: {
    week: string;
    score: number;
    benchmark: number;
  }[];
}

export interface PriceForecastPoint {
  dayLabel: string;
  dateStr: string;
  predictedPricePerKg: number;
  confidenceLower: number;
  confidenceUpper: number;
  isPeakOpportunity?: boolean;
}

export interface MarketPriceData {
  currentPricePerKg: number;
  historicalSevenDays: number[];
  forecastFiveDays: PriceForecastPoint[];
  marketDemand: "Very High" | "High" | "Moderate" | "Oversupplied";
  keyTrendSummary: string;
  peakSellingDayIndex: number;
  wholesaleMandiName: string;
}

export interface BuyerScoringBreakdown {
  priceScore: number;       // 30% weight
  qualityScore: number;     // 20% weight
  distanceScore: number;    // 15% weight
  demandScore: number;      // 15% weight
  quantityScore: number;    // 10% weight
  reliabilityScore: number; // 10% weight
  overallMatchScore: number;// 0 - 100%
}

export interface Buyer {
  id: string;
  name: string;
  organization: string;
  cropRequired: CropType;
  quantityRequiredTonnes: number;
  offeredPricePerKg: number;
  qualityRequirement: CropQualityGrade;
  location: string;
  distanceKm: number;
  demandUrgency: "Immediate (1-2 days)" | "Standard (3-5 days)" | "Flexible";
  deliveryWindow: string;
  reliabilityRating: number; // 1.0 - 5.0
  matchPercentage: number;
  matchReason: string;
  scoring: BuyerScoringBreakdown;
  phoneDemo: string;
  paymentTerms: string;
}

export interface LogisticsOption {
  buyerId: string;
  buyerName: string;
  destinationLocation: string;
  collectionCenter: string;
  distanceKm: number;
  travelTimeStr: string;
  travelTimeMinutes: number;
  estimatedTransportCostInr: number;
  co2eKg: number;
  routeType: "Direct Green Transit" | "Aggregated Rural Hub" | "Express Cold-Chain";
  vehicleType: "Electric Light Truck (EV)" | "Low-Emission Diesel mini-truck" | "Refrigerated Carrier";
  recommended: boolean;
  waypoints: {
    label: string;
    lat: number;
    lng: number;
    type: "farm" | "hub" | "buyer";
  }[];
}

export interface FoodLossScenario {
  scenarioName: string;
  daysWaiting: number;
  lossPercentage: number;
  lossQuantityTonnes: number;
  lossValueInr: number;
  storageCondition: string;
  spoilageRisk: "Minimal (Safe)" | "Elevated Risk" | "Severe Loss";
  shelfLifeRemainingDays: number;
}

export interface DecisionEngineStrategy {
  id: string;
  title: string;
  summary: string;
  allocation: {
    primaryBuyerName: string;
    primaryPercent: number;
    primaryTimeline: string;
    secondaryAction: string;
    secondaryPercent: number;
    secondaryTimeline: string;
  };
  expectedGrossRevenueInr: number;
  transportCostInr: number;
  expectedLossInr: number;
  netRevenueInr: number;
  carbonFootprintKg: number;
  confidenceScore: number;
  sustainabilityRating: "Optimal" | "Good" | "Sub-optimal";
  isPrimaryRecommendation: boolean;
  whyChosenExplanation: string;
  positiveTradeoffs: string[];
  negativeTradeoffs: string[];
  residualUncertainty: string;
}

export interface WhatIfScenarioResult {
  id: string;
  label: string;
  daysAhead: number;
  projectedPricePerKg: number;
  foodLossPercent: number;
  grossRevenueInr: number;
  transportCostInr: number;
  storageCostInr: number;
  netProfitInr: number;
  co2eKg: number;
  riskLevel: "Low" | "Medium" | "High";
  outcomeVerdict: string;
  isRecommended: boolean;
}

export interface WeatherCondition {
  currentTempC: number;
  condition: string;
  humidityPercent: number;
  windSpeedKmh: number;
  precipitationProbPercent: number;
  soilMoisturePercent: number;
  forecast: {
    day: string;
    tempHigh: number;
    tempLow: number;
    condition: string;
    rainProb: number;
  }[];
}

export interface SoilHealthTelemetry {
  nitrogenStatus: "Low" | "Medium" | "High" | "Optimal";
  phosphorusStatus: "Low" | "Medium" | "High" | "Optimal";
  potassiumStatus: "Low" | "Medium" | "High" | "Optimal";
  soilOrganicMatterPercent: number;
  phLevel: number;
  soilMoistureTrend: {
    timestamp: string;
    actualMoisture: number;
    forecastMoisture: number;
    optimalThreshold: number;
  }[];
  conditionSummary: string;
}

export interface FarmTask {
  id: string;
  title: string;
  fieldName: string;
  scheduledTime: string;
  category: "Irrigation" | "Fertilizer" | "Pest Monitoring" | "Harvest Prep" | "Logistics Pickup";
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  notes?: string;
}

export interface AIAssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    actionPayload: string;
  }[];
  isSimulatedDemo?: boolean;
}

export interface FarmAlert {
  id: string;
  title: string;
  description: string;
  severity: "urgent" | "warning" | "info";
  timeAgo: string;
  read: boolean;
  actionRoute?: string;
}

export interface BuyerProcurementPost {
  id: string;
  cropRequired: CropType;
  buyerName: string;
  location: string;
  targetQuantityTonnes: number;
  targetPriceRange: string;
  qualityStandard: CropQualityGrade;
  postedDate: string;
  status: "Open" | "Fulfilling" | "Closed";
  matchesFound: number;
}

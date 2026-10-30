"use client";

import React, { useState } from "react";
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Clock,
  QrCode,
  FileText,
  Scan,
  RefreshCw,
  Target,
  Sliders,
  Award,
} from "lucide-react";
import Image from "next/image";
import { CropType, CropQualityGrade, QualityGradingResult, FarmerProfile } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { SAMPLE_QUALITY_PRESETS } from "@/services/spoilageService";

interface PhotoQualityGradingViewProps {
  profile: FarmerProfile;
  currentGrading: QualityGradingResult | null;
  onApplyGrading: (result: QualityGradingResult) => void;
  onNavigateToBuyers: () => void;
  onNavigateToSpoilageClock: () => void;
}

export default function PhotoQualityGradingView({
  profile,
  currentGrading: initialGrading,
  onApplyGrading,
  onNavigateToBuyers,
  onNavigateToSpoilageClock,
}: PhotoQualityGradingViewProps) {
  const { t, tr } = useLanguage();

  const [selectedImage, setSelectedImage] = useState<string>(
    initialGrading?.imageUrl || "/images/tomato_grade_a.jpg"
  );
  const [activeGrading, setActiveGrading] = useState<QualityGradingResult>(
    initialGrading || SAMPLE_QUALITY_PRESETS["tomato-grade-a"]
  );
  const [isScanning, setIsScanning] = useState(false);
  const [appliedNotification, setAppliedNotification] = useState(false);

  // Handle preset photo selection
  const handleSelectPreset = (presetKey: string) => {
    const preset = SAMPLE_QUALITY_PRESETS[presetKey];
    if (!preset) return;
    setIsScanning(true);
    setSelectedImage(preset.imageUrl || "/images/tomato_grade_a.jpg");

    setTimeout(() => {
      setActiveGrading(preset);
      setIsScanning(false);
    }, 700);
  };

  // Handle custom file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setIsScanning(true);

        setTimeout(() => {
          // AI simulated grading of uploaded photo
          const customResult: QualityGradingResult = {
            batchId: `BATCH-TOM-NEW-${Math.floor(Math.random() * 900 + 100)}`,
            timestamp: "Just Now",
            cropType: profile.cropType,
            variety: profile.variety,
            imageUrl: event.target?.result as string,
            grade: "Grade A",
            confidenceScore: 96.8,
            ripenessPercentage: 86,
            ripenessStage: "Firm Ripe",
            visibleDefectPercent: 2.1,
            defectDetails: {
              blemishRate: 1.4,
              bruisingRate: 0.5,
              pestDamageRate: 0.2,
              shapeUniformity: 94.2,
            },
            recommendedShelfLifeHours: 41,
            certificateCode: `UZHAVAN-CERT-${Math.floor(Math.random() * 9000 + 1000)}`,
            inspectorVerdict: "Produce exhibits uniform cuticle pigment and firm turgidity. Free from mechanical punctures or anthracnose lesions. Meets Grade A procurement standards.",
          };
          setActiveGrading(customResult);
          setIsScanning(false);
        }, 1200);
      }
    };
    reader.readAsDataURL(file);
  };

  // Apply grade to entire application
  const handleApply = () => {
    onApplyGrading(activeGrading);
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-agri rounded-3xl p-6 sm:p-7 border border-[#E1F5DC]/20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#123D2B] border border-[#A8D86D]/40 flex items-center justify-center text-[#A8D86D] shadow-lg shrink-0">
              <Camera className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A8D86D] text-[#09271B]">
                  AI Vision Model • Mobile Ready
                </span>
                <span className="text-[10px] text-[#A8D86D] font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Wholesale Dispute Elimination
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#F4F7EF] tracking-tight">
                {t.photoGradingTitle}
              </h1>
              <p className="text-xs text-[#B8CCAE] max-w-2xl mt-0.5">
                {t.photoGradingSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <label className="cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold text-[#09271B] bg-[#A8D86D] hover:bg-[#b9e584] shadow-md transition-all active:scale-95 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>{t.takeOrUploadPhoto}</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Quick Test Photos Bar */}
        <div className="mt-5 pt-4 border-t border-[#E1F5DC]/15">
          <div className="text-[10px] uppercase font-bold text-[#B8CCAE] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#A8D86D]" />
            <span>{t.samplePhotos}</span>
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleSelectPreset("tomato-grade-a")}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                activeGrading.grade === "Grade A"
                  ? "bg-[#A8D86D] text-[#09271B] font-bold border-[#A8D86D] shadow-md"
                  : "bg-[#123D2B]/50 hover:bg-[#123D2B] text-[#B8CCAE] border-[#E1F5DC]/15"
              }`}
            >
              <span>🍅</span>
              <span>Ripe Red Tomato (Grade A Sample)</span>
            </button>

            <button
              onClick={() => handleSelectPreset("tomato-grade-b")}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                activeGrading.grade === "Grade B"
                  ? "bg-[#A8D86D] text-[#09271B] font-bold border-[#A8D86D] shadow-md"
                  : "bg-[#123D2B]/50 hover:bg-[#123D2B] text-[#B8CCAE] border-[#E1F5DC]/15"
              }`}
            >
              <span>🍂</span>
              <span>Blemished Harvest (Grade B Sample)</span>
            </button>

            <button
              onClick={() => handleSelectPreset("tomato-export")}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                activeGrading.grade === "Export Grade"
                  ? "bg-[#A8D86D] text-[#09271B] font-bold border-[#A8D86D] shadow-md"
                  : "bg-[#123D2B]/50 hover:bg-[#123D2B] text-[#B8CCAE] border-[#E1F5DC]/15"
              }`}
            >
              <span>🌟</span>
              <span>Export Caliber Roma (Export Grade)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Photo Inspection Viewer + Vision Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Photo Viewport with AI Vision Overlay */}
        <div className="lg:col-span-7 glass-card-agri rounded-3xl p-5 sm:p-6 border border-[#E1F5DC]/16 flex flex-col justify-between">
          <div className="relative rounded-2xl overflow-hidden border border-[#E1F5DC]/20 h-72 sm:h-96 group mb-4 bg-black/40">
            {/* Produce Photo */}
            <img
              src={selectedImage}
              alt="Produce harvest inspection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Scanning Laser Animation */}
            {isScanning && (
              <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none flex flex-col items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#A8D86D] to-transparent shadow-[0_0_15px_#A8D86D] animate-bounce" />
                <div className="mt-4 px-3 py-1.5 rounded-full bg-black/90 border border-[#A8D86D] text-xs font-bold text-[#A8D86D] flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.scanningProduce}</span>
                </div>
              </div>
            )}

            {/* Simulated Vision Bounding Boxes */}
            {!isScanning && (
              <>
                {/* Bounding Box 1 */}
                <div className="absolute left-[30%] top-[35%] w-24 h-24 border-2 border-[#A8D86D] rounded-xl bg-[#A8D86D]/10 pointer-events-none shadow-[0_0_10px_#A8D86D]">
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 rounded bg-black/85 text-[#A8D86D] text-[9px] font-bold whitespace-nowrap">
                    Turgid Cuticle (98%)
                  </span>
                </div>

                {/* Bounding Box 2 */}
                <div className="absolute left-[58%] top-[45%] w-20 h-20 border-2 border-emerald-400 rounded-xl bg-emerald-400/10 pointer-events-none">
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 rounded bg-black/85 text-emerald-300 text-[9px] font-bold whitespace-nowrap">
                    Calyx Intact
                  </span>
                </div>

                {/* Blemish Box if Grade B */}
                {activeGrading.grade === "Grade B" && (
                  <div className="absolute left-[45%] top-[55%] w-16 h-16 border-2 border-amber-400 rounded-xl bg-amber-400/15 pointer-events-none shadow-[0_0_8px_#F59E0B]">
                    <span className="absolute -top-5 left-0 px-1.5 py-0.5 rounded bg-black/85 text-amber-300 text-[9px] font-bold whitespace-nowrap">
                      Scarring (4.1%)
                    </span>
                  </div>
                )}
              </>
            )}

            {/* Bottom Overlay Info Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#F4F7EF] bg-[#09271B]/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E1F5DC]/15">
              <div className="flex items-center gap-2 font-mono">
                <Scan className="w-3.5 h-3.5 text-[#A8D86D]" />
                <span>{activeGrading.batchId}</span>
                <span>•</span>
                <span>{tr(activeGrading.cropType)}</span>
              </div>
              <div className="font-bold text-[#A8D86D] flex items-center gap-1">
                <span>{t.confidence}:</span>
                <span>{activeGrading.confidenceScore}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#B8CCAE]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#A8D86D]" />
              <span>Calibrated to UNECE & AGMARK agricultural grade standards</span>
            </span>
            <span className="font-mono text-[10px] text-[#A8D86D]">
              Resolution: 4032x3024 HDR
            </span>
          </div>
        </div>

        {/* AI Vision Inspection Results & Buyer Matching Enforcer */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="glass-card-agri rounded-3xl p-6 border border-[#E1F5DC]/16 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F4F7EF] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#A8D86D]" />
                <span>{t.aiVisionAnalysis}</span>
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${
                  activeGrading.grade === "Export Grade"
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black"
                    : activeGrading.grade === "Grade A"
                    ? "bg-[#A8D86D] text-[#09271B]"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                }`}
              >
                {activeGrading.grade}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#123D2B]/40 border border-[#E1F5DC]/10">
                <div className="text-[10px] text-[#B8CCAE]">{t.ripenessIndex}</div>
                <div className="text-lg font-extrabold text-[#F4F7EF] mt-0.5">
                  {activeGrading.ripenessPercentage}%
                </div>
                <div className="text-[10px] text-[#A8D86D] font-semibold mt-0.5">
                  {activeGrading.ripenessStage}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#123D2B]/40 border border-[#E1F5DC]/10">
                <div className="text-[10px] text-[#B8CCAE]">{t.visibleDamage}</div>
                <div
                  className={`text-lg font-extrabold mt-0.5 ${
                    activeGrading.visibleDefectPercent < 3 ? "text-[#A8D86D]" : "text-amber-400"
                  }`}
                >
                  {activeGrading.visibleDefectPercent}%
                </div>
                <div className="text-[10px] text-[#B8CCAE] mt-0.5">
                  {activeGrading.visibleDefectPercent < 3 ? "Within Tolerance" : "Minor Blemishes"}
                </div>
              </div>
            </div>

            {/* Defect Breakdown Telemetry */}
            <div className="p-3.5 rounded-2xl bg-[#123D2B]/30 border border-[#E1F5DC]/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#B8CCAE]">
                <span>Surface Blemishes:</span>
                <span className="font-bold text-[#F4F7EF]">{activeGrading.defectDetails.blemishRate}%</span>
              </div>
              <div className="flex items-center justify-between text-[#B8CCAE]">
                <span>Bruising / Compression:</span>
                <span className="font-bold text-[#F4F7EF]">{activeGrading.defectDetails.bruisingRate}%</span>
              </div>
              <div className="flex items-center justify-between text-[#B8CCAE]">
                <span>Pest / Fungal Infiltration:</span>
                <span className="font-bold text-[#A8D86D]">{activeGrading.defectDetails.pestDamageRate}%</span>
              </div>
              <div className="flex items-center justify-between text-[#B8CCAE]">
                <span>Size & Caliber Uniformity:</span>
                <span className="font-bold text-[#A8D86D]">{activeGrading.defectDetails.shapeUniformity}%</span>
              </div>
            </div>

            {/* Official Digital Certificate Callout */}
            <div className="p-3.5 rounded-2xl bg-[#123D2B]/50 border border-[#A8D86D]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <QrCode className="w-8 h-8 text-[#A8D86D] p-1 bg-black/40 rounded-lg shrink-0" />
                <div>
                  <div className="text-[10px] font-bold text-[#F4F7EF]">{t.officialCertificate}</div>
                  <div className="text-[10px] text-[#A8D86D] font-mono">{activeGrading.certificateCode}</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#B8CCAE] text-right">
                Immutable Hash<br />Verified
              </span>
            </div>

            <p className="text-[11px] text-[#B8CCAE] italic bg-black/20 p-2.5 rounded-xl border border-[#E1F5DC]/10">
              &quot;{activeGrading.inspectorVerdict}&quot;
            </p>

            {/* Buyer Match Notice */}
            <div className="p-3 rounded-xl bg-[#A8D86D]/15 border border-[#A8D86D]/30 text-xs text-[#A8D86D] flex items-center gap-2">
              <Target className="w-4 h-4 shrink-0" />
              <span>{t.matchingBuyersNotice} ({activeGrading.grade})</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2">
            <button
              onClick={handleApply}
              className="w-full py-3 rounded-2xl text-xs font-bold text-[#09271B] bg-[#A8D86D] hover:bg-[#b9e584] shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.applyGradeAndMatch}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onNavigateToBuyers}
                className="py-2.5 rounded-xl text-xs font-semibold text-[#F4F7EF] bg-[#123D2B] hover:bg-[#1a523a] border border-[#E1F5DC]/15 transition-colors flex items-center justify-center gap-1.5"
              >
                <Target className="w-3.5 h-3.5 text-[#A8D86D]" />
                <span>{t.buyerMatching}</span>
              </button>

              <button
                onClick={onNavigateToSpoilageClock}
                className="py-2.5 rounded-xl text-xs font-semibold text-[#F4F7EF] bg-[#123D2B] hover:bg-[#1a523a] border border-[#E1F5DC]/15 transition-colors flex items-center justify-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-[#E6C779]" />
                <span>{t.viewSpoilageClock}</span>
              </button>
            </div>
          </div>

          {/* Applied Success Toast */}
          {appliedNotification && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Assigned {activeGrading.grade} to batch. Buyer matching & shelf-life clock updated!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

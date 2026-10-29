import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import DecisionPipelineSection from "@/components/landing/DecisionPipelineSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import AboutSection from "@/components/landing/AboutSection";
import SustainabilityImpact from "@/components/landing/SustainabilityImpact";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-farmland overflow-hidden text-[#F4F7EF] selection:bg-[#A8D86D]/30 selection:text-[#F4F7EF]">
      {/* Floating Translucent Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Decision Pipeline Flow (Farm Data -> Predict -> Match -> Optimize -> Reduce Loss -> Best Action) */}
      <DecisionPipelineSection />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* About AgriPulse AI */}
      <AboutSection />

      {/* Sustainability Impact Metrics */}
      <SustainabilityImpact />

      {/* Call to Action Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

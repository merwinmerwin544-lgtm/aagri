"use client";

import React, { useState, useEffect } from "react";
import Sidebar, { DashboardTab } from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewView from "@/components/dashboard/views/OverviewView";
import FarmProfileView from "@/components/dashboard/views/FarmProfileView";
import PrecisionIntelligenceView from "@/components/dashboard/views/PrecisionIntelligenceView";
import PricePredictionView from "@/components/dashboard/views/PricePredictionView";
import BuyerMatchingView from "@/components/dashboard/views/BuyerMatchingView";
import LogisticsView from "@/components/dashboard/views/LogisticsView";
import FoodLossView from "@/components/dashboard/views/FoodLossView";
import DecisionEngineView from "@/components/dashboard/views/DecisionEngineView";
import WhatIfSimulatorView from "@/components/dashboard/views/WhatIfSimulatorView";
import BuyerProcurementView from "@/components/dashboard/views/BuyerProcurementView";
import ReportsView from "@/components/dashboard/views/ReportsView";
import AlertsView from "@/components/dashboard/views/AlertsView";
import SettingsView from "@/components/dashboard/views/SettingsView";

import VoiceCopilotModal from "@/components/dashboard/VoiceCopilotModal";
import AIExplanationModal from "@/components/dashboard/AIExplanationModal";
import CompareBuyersModal from "@/components/dashboard/CompareBuyersModal";
import EditFarmModal from "@/components/dashboard/EditFarmModal";
import NewTaskModal from "@/components/dashboard/NewTaskModal";

import {
  FarmerProfile,
  PrecisionCropHealth,
  DecisionEngineStrategy,
  Buyer,
  SoilHealthTelemetry,
  WeatherCondition,
  FarmTask,
  FarmAlert,
  SupportedLanguage,
} from "@/types";

import {
  getFarmerProfile,
  updateFarmerProfile,
  getCropHealth,
  getMatchedBuyers,
  getSoilHealthTelemetry,
  getWeatherTelemetry,
  getFarmTasks,
  toggleTaskStatus,
  createFarmTask,
  getFarmAlerts,
} from "@/services/api";

import {
  initialFarmerProfile,
  sampleCropHealth,
  sampleDecisionStrategy,
  sampleBuyers,
  sampleSoilHealth,
  sampleWeather,
  sampleTasks,
  sampleAlerts,
} from "@/services/mockData";

import { useLanguage } from "@/context/LanguageContext";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const { language, setLanguage, t, tr } = useLanguage();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [profile, setProfile] = useState<FarmerProfile>(initialFarmerProfile);
  const [health, setHealth] = useState<PrecisionCropHealth>(sampleCropHealth);
  const [strategy, setStrategy] = useState<DecisionEngineStrategy>(sampleDecisionStrategy);
  const [buyers, setBuyers] = useState<Buyer[]>(sampleBuyers);
  const [selectedBuyerId, setSelectedBuyerId] = useState<string>("buyer-a");
  const [soilHealth, setSoilHealth] = useState<SoilHealthTelemetry>(sampleSoilHealth);
  const [weather, setWeather] = useState<WeatherCondition>(sampleWeather);
  const [tasks, setTasks] = useState<FarmTask[]>(sampleTasks);
  const [alerts, setAlerts] = useState<FarmAlert[]>(sampleAlerts);

  // Modals
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [whyModalOpen, setWhyModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [editFarmModalOpen, setEditFarmModalOpen] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const loadedProfile = await getFarmerProfile();
        setProfile(loadedProfile);
        const loadedTasks = await getFarmTasks();
        setTasks(loadedTasks);
        const loadedAlerts = await getFarmAlerts();
        setAlerts(loadedAlerts);
      } catch (e) {
        console.warn("API load error", e);
      }
    }
    loadData();
  }, []);

  const handleSaveProfile = async (updated: Partial<FarmerProfile>) => {
    try {
      const res = await updateFarmerProfile(updated);
      setProfile(res);
      if (updated.cropType) {
        const newHealth = await getCropHealth(updated.cropType);
        setHealth(newHealth);
        const newBuyers = await getMatchedBuyers(updated.cropType);
        setBuyers(newBuyers);
      }
    } catch (e) {
      console.warn("Failed to save profile", e);
    }
  };

  const handleToggleTask = async (taskId: string) => {
    try {
      const updated = await toggleTaskStatus(taskId);
      setTasks(updated);
    } catch (e) {
      console.warn("Failed to toggle task", e);
    }
  };

  const handleAddTask = async (task: Omit<FarmTask, "id">) => {
    try {
      const updated = await createFarmTask(task);
      setTasks(updated);
    } catch (e) {
      console.warn("Failed to add task", e);
    }
  };

  return (
    <div className="min-h-screen bg-farmland text-[#F4F7EF] flex p-2 sm:p-4 gap-4 selection:bg-[#A8D86D]/30 selection:text-[#F4F7EF]">
      {/* Sidebar matching reference image */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        language={language}
        onLanguageChange={setLanguage}
        onOpenVoice={() => setVoiceModalOpen(true)}
        unreadAlertsCount={alerts.filter((a) => !a.read).length}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-68 flex flex-col min-w-0">
        {/* Top Header */}
        <DashboardHeader
          farmerName={profile.farmerName}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenVoice={() => setVoiceModalOpen(true)}
          onOpenNewTask={() => setNewTaskModalOpen(true)}
          onOpenEditProfile={() => setEditFarmModalOpen(true)}
          alerts={alerts}
          onSelectTab={(tab) => setActiveTab(tab)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* View Renderer */}
        <main className="flex-1 p-2 sm:p-3 lg:p-4 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && (
            <OverviewView
              profile={profile}
              health={health}
              strategy={strategy}
              soilHealth={soilHealth}
              weather={weather}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onOpenWhyRecommendation={() => setWhyModalOpen(true)}
              onOpenWhatIf={() => setActiveTab("what-if")}
              onOpenMatchedBuyers={() => setActiveTab("buyer-matching")}
              onOpenLogistics={() => setActiveTab("logistics")}
              onOpenVoice={() => setVoiceModalOpen(true)}
              onOpenEditProfile={() => setEditFarmModalOpen(true)}
              onOpenNewTask={() => setNewTaskModalOpen(true)}
            />
          )}

          {activeTab === "crop-management" && (
            <PrecisionIntelligenceView
              health={health}
              profile={profile}
            />
          )}

          {activeTab === "field-monitoring" && (
            <OverviewView
              profile={profile}
              health={health}
              strategy={strategy}
              soilHealth={soilHealth}
              weather={weather}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onOpenWhyRecommendation={() => setWhyModalOpen(true)}
              onOpenWhatIf={() => setActiveTab("what-if")}
              onOpenMatchedBuyers={() => setActiveTab("buyer-matching")}
              onOpenLogistics={() => setActiveTab("logistics")}
              onOpenVoice={() => setVoiceModalOpen(true)}
              onOpenEditProfile={() => setEditFarmModalOpen(true)}
              onOpenNewTask={() => setNewTaskModalOpen(true)}
            />
          )}

          {activeTab === "soil-health" && (
            <PrecisionIntelligenceView
              health={health}
              profile={profile}
            />
          )}

          {activeTab === "weather" && (
            <PrecisionIntelligenceView
              health={health}
              profile={profile}
            />
          )}

          {activeTab === "irrigation" && (
            <LogisticsView
              buyers={buyers}
              selectedBuyerId={selectedBuyerId}
              onSelectBuyer={(id) => setSelectedBuyerId(id)}
            />
          )}

          {activeTab === "equipment" && (
            <FarmProfileView
              profile={profile}
              onSaveProfile={handleSaveProfile}
            />
          )}

          {activeTab === "decision-engine" && (
            <DecisionEngineView
              strategy={strategy}
              profile={profile}
              onOpenWhy={() => setWhyModalOpen(true)}
              onOpenWhatIf={() => setActiveTab("what-if")}
            />
          )}

          {activeTab === "price-forecast" && (
            <PricePredictionView
              initialCrop={profile.cropType}
            />
          )}

          {activeTab === "buyer-matching" && (
            <BuyerMatchingView
              buyers={buyers}
              selectedBuyerId={selectedBuyerId}
              onSelectBuyer={(id) => setSelectedBuyerId(id)}
              onOpenCompare={() => setCompareModalOpen(true)}
            />
          )}

          {activeTab === "logistics" && (
            <LogisticsView
              buyers={buyers}
              selectedBuyerId={selectedBuyerId}
              onSelectBuyer={(id) => setSelectedBuyerId(id)}
            />
          )}

          {activeTab === "food-loss" && <FoodLossView />}

          {activeTab === "what-if" && <WhatIfSimulatorView />}

          {activeTab === "buyer-procurement" && <BuyerProcurementView />}

          {activeTab === "reports" && <ReportsView profile={profile} />}

          {activeTab === "alerts" && (
            <AlertsView
              alerts={alerts}
              onSelectTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "settings" && (
            <SettingsView
              language={language}
              onLanguageChange={setLanguage}
            />
          )}
        </main>
      </div>

      {/* Voice Co-pilot Modal */}
      <VoiceCopilotModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Why This Recommendation Modal */}
      <AIExplanationModal
        isOpen={whyModalOpen}
        onClose={() => setWhyModalOpen(false)}
        strategy={strategy}
        onOpenWhatIf={() => {
          setWhyModalOpen(false);
          setActiveTab("what-if");
        }}
      />

      {/* Compare Buyers Modal */}
      <CompareBuyersModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        buyers={buyers}
        selectedBuyerId={selectedBuyerId}
        onSelectBuyer={(id) => setSelectedBuyerId(id)}
      />

      {/* Edit Farm Profile Modal */}
      <EditFarmModal
        isOpen={editFarmModalOpen}
        onClose={() => setEditFarmModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={newTaskModalOpen}
        onClose={() => setNewTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

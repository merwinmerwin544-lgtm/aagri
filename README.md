# 🌾 Uzhavan AI (உழவன் AI)

### AI-Driven Farm-to-Market Decision Intelligence for Sustainable Farming

> **"Farmers don't need another dashboard full of numbers. They need an answer."**

**Uzhavan AI** is an AI-driven farm-to-market decision platform designed to help farmers decide **what to sell, when to sell, whom to sell to, and why**.

Instead of treating farm health, market prices, buyers, logistics, food loss, and sustainability as separate problems, Uzhavan AI unifies them into a single, cohesive decision-support workflow.

---


### Core Principle

> **ML predicts. Optimization decides. AI explains.**

---

## 📸 Platform Preview

![Uzhavan AI Decision Intelligence Dashboard](public/images/dashboard-preview.png)

*Figure 1: Uzhavan AI Precision Farm Dashboard showcasing single-farmer persona (Tomato, 2.0 Acres, 3.8 Tonnes harvest), simulated Sentinel-2 satellite telemetry, modeled spoilage clock value window, and 7-language multilingual voice support.*

---

## 🏆 Hackathon Details

- **Team:** ByteForge
- **Project:** Uzhavan AI (உழவன் AI)
- **Hackathon:** 2nd OneEarth International Hackathon 2026
- **Theme:** AI-Driven Precision Agriculture for Sustainable Farming
- **Status:** **Finalist** (Selected among the Top 11 finalist teams globally)

---

## 📋 Table of Contents

- [The Agricultural Problem](#-the-agricultural-problem)
- [Our Solution](#-our-solution)
- [Core Decision Engine](#-core-decision-engine)
- [Sustainability by Design](#-sustainability-by-design)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Production Architecture](#-production-architecture)
- [Technical Philosophy](#-technical-philosophy)
- [Walkthrough Example Decision](#-walkthrough-example-decision)
- [Scalability & Regional Adapters](#-scalability--regional-adapters)
- [User Journey](#-user-journey)
- [Expected Impact](#-expected-impact)
- [Responsible AI & Technical Honesty](#-responsible-ai--technical-honesty)
- [Future Development Roadmap](#-future-development-roadmap)
- [Prototype vs Production Architecture](#-prototype-vs-production-architecture)
- [Getting Started / Local Setup](#-getting-started--local-setup)
- [Team & Acknowledgments](#-team--acknowledgments)

---

# 🎯 The Agricultural Problem

Smallholder and commercial farmers make dozens of critical, interconnected decisions throughout the harvest-to-market cycle:

- *When will my crop actually be ready for harvest?*
- *How much volume will I yield?*
- *What will market prices look like over the next 3 to 5 days?*
- *Which buyer is legitimately the best partner for my produce?*
- *How much will transportation and logistics eat into my margin?*
- *Should I harvest and sell today, or wait for better prices?*
- *How much value will I lose to post-harvest biological spoilage if I delay?*
- *What is the environmental and carbon footprint of each logistical route?*

Today, these signals are deeply fragmented across disparate apps, mandis, weather portals, and middlemen:

A farmer may know today's mandi spot price, but that doesn't inform them of the **best net action**:
> *Example:* A buyer quoting ₹35/kg located 70 km away may yield **less net income** than a local buyer offering ₹33/kg once transport fuel, transit time, and heat-induced transit spoilage are factored in.

Similarly:
> *Example:* Holding produce for an expected ₹2/kg price rise over three days can cause a net financial loss if biological degradation causes 10–15% weight and grade devaluation.

Uzhavan AI bridges this gap by translating fragmented agricultural signals into **actionable, risk-adjusted decision recommendations**.

---

# 💡 Our Solution

Uzhavan AI executes an end-to-end, multi-stage decision pipeline:

```text
Farmer & Parcel Input
          ↓
Environmental & Satellite Intelligence (Sentinel-2 Simulation)
          ↓
ML Yield & Price Trajectory Forecasting
          ↓
Computer Vision Quality Assessment (Visible Surface Defect Detection)
          ↓
Buyer & Transport Logistics Intelligence
          ↓
Constrained Mathematical Optimization (Simplex / MILP)
          ↓
Unified Recommendation (Sell / Store / Split Allocation)
          ↓
Multilingual AI Explanation Layer (Gemini + Voice Synthesis)
```

The platform unifies:
- 🌾 **Farm & Parcel Intelligence**
- 📈 **Dynamic Price Trajectory Forecasting**
- 📷 **Device-Camera Quality Grading**
- 🏪 **Multi-Criteria Buyer Matching**
- 🚚 **Logistics & Route Emission Estimation**
- 🧊 **Biochemical Spoilage & Value-Loss Modeling**
- 🌱 **Sustainability & Food-Loss Scenario Analysis**
- 🧠 **Constrained Decision Optimization Engine**
- 🗣️ **Multilingual Voice-First AI Explanation (7 Languages)**

The goal is not to present another screen crowded with disconnected charts, but to answer:

> **"Given everything known about your farm, crop condition, spoilage window, and the market today—what is the optimal action to take right now?"**

---

# 🧠 Core Decision Engine

The **Decision Engine** is the central hero feature of Uzhavan AI. 

While individual AI models generate discrete estimates, the Decision Engine unifies them to evaluate and compare trade-offs between competing actions:
- **Sell Now (100%)**
- **Wait / Stagger Harvest**
- **Store in Cold/Evaporative Storage**
- **Split Sale Across Optimal Channels (e.g., 70% Premium Contract / 30% Local Hedge)**

The optimization engine computes:
$$\text{Net Payout} = \sum (\text{Allocated Volume} \times \text{Agreed Price}) - \text{Transport Cost} - \text{Modeled Spoilage Loss} - \text{Storage Overhead}$$

### Real-World Demo Scenario

Consider a demo farmer with **3.8 tonnes of Grade A Tomatoes**:
Rather than an LLM guessing numbers or simply stating *"prices might rise in 3 days"*, Uzhavan AI mathematically calculates the optimal risk-hedged split:

```text
═══════════════════════════════════════════════════════════════════════
OPTIMIZED ALLOCATION RECOMMENDATION:
• Sell 70% (2.66 tonnes) → Pazhamudir Nilayam Premium Stores @ ₹32.00/kg
• Retain 30% (1.14 tonnes) → Local APMC Mandi / Food Processor @ ₹27.50/kg
───────────────────────────────────────────────────────────────────────
Gross Revenue:            ₹118,400
Estimated Transport:     -  ₹1,850 (18 km transit route)
Projected Spoilage Risk: -  ₹3,904 (3.2% modeled value loss)
───────────────────────────────────────────────────────────────────────
Net Expected Payout:      ₹112,646  (vs. ₹104,200 if sold entirely at spot)
Transport Carbon Impact:   8.2 kg CO₂e
═══════════════════════════════════════════════════════════════════════
```

This balances guaranteed premium revenue against perishability, transport distance, and price fluctuation risk.

---

# 🌱 Sustainability by Design

Sustainability is not an afterthought or vanity metric in Uzhavan AI—it is built directly into the objective function:

### 1. Food Loss & Value Preservation
Perishable horticultural crops degrade rapidly under tropical ambient temperatures ($30^\circ\text{C}-35^\circ\text{C}$). The **Spoilage Clock** dynamically calculates the remaining value window using biological degradation models (Arrhenius kinetics and $Q_{10}$ thermal coefficients), preventing distress dumping.

### 2. Intelligent Transport Routing
Logistics intelligence matches farmers with buyers considering travel time, road conditions, and vehicle capacity, reducing empty return trips and avoidable mileage.

### 3. Transport Carbon Impact
Transportation-related emissions are quantified for each buyer route (modeled in $\text{kg CO}_2\text{e}$)$, allowing farmers and aggregators to evaluate the environmental cost of distant buyers versus closer alternatives.

### 4. Risk-Adjusted Sustainable Value
Rather than pursuing volatile, high-emission spot prices, the platform optimizes for durable, **risk-adjusted sustainable profit**.

---

# 🌾 Key Features

## 1. Precision Farm Intelligence
Combines farm telemetry, soil properties, and satellite-derived vegetation indices to track crop health, maturity stage, and harvest readiness.
* **Demonstrated Persona:** Tomato (*Pusa Ruby Hybrid*), 2.0 acres total across 2 parcels (East: 1.2 ac, West: 0.8 ac), Coimbatore South, Tamil Nadu.
* *Note on Satellite Data:* The hackathon prototype uses a simulated Sentinel-2 Level-2A data feed (NDVI/EVI indices) to demonstrate the spatial decision workflow. Production architecture connects directly to Copernicus Open Access Hub.

## 2. AI Price Trajectory Forecasting
Provides 7-day forward price trajectories incorporating historical mandi arrivals, seasonality, weather forecasts, and demand surges, showing confidence intervals rather than misleading single-point certainty.

## 3. AI Produce Quality Assessment
Farmers capture produce photos using standard smartphone cameras. The computer vision pipeline inspects **visible surface characteristics**:
* Ripeness uniformity & color distribution
* Visible surface damage, skin abrasions, and blemishes
* Bruising indicators and geometric size uniformity
* *Technical Credibility Note:* The system explicitly focuses on surface visual indicators and does not claim to measure internal chemical or cellular properties with a standard RGB camera.
* Issues an **Uzhavan AI Digital Quality Assessment Record** (`UZHAVAN-QA-XXXXX`) to match produce with verified buyer specifications.

## 4. Multi-Factor Buyer Matching
Ranks commercial buyers, retail chains, and APMC mandis using a multi-criteria compatibility matrix:
1. **Price Offered** (mandi benchmark comparison)
2. **Quality Compatibility** (Grade A/B matching)
3. **Quantity Alignment** (contract minimums vs. 3.8-tonne lot size)
4. **Logistical Feasibility** (distance, vehicle availability, road transit time)
5. **Buyer Reliability & Payment Terms**

## 5. Logistics Intelligence
Computes point-to-point road transit costs, vehicle load efficiency, delivery times, and modeled transport emissions ($\text{kg CO}_2\text{e}$), enabling net-margin calculations before committing to dispatch.

## 6. Spoilage Clock
Translates biological perishability into actionable economic metrics:
* **Remaining Value Window** (e.g., *Sell within 41 hours*)
* **Estimated Value Loss** under ambient vs. cold storage conditions
* Translates perishability into: **Time + Money + Risk**.

## 7. What-If Decision Simulator
Allows farmers to evaluate hypothetical scenarios via interactive sliders:
* *"What if I delay selling by 3 days for a projected ₹3/kg price increase?"*
* Instantly compares additional gross revenue against storage costs, modeled spoilage decay, and weather risk.

## 8. Multilingual AI Assistant (7 Languages)
Provides natural voice and text explanations in **English, தமிழ் (Tamil), हिन्दी (Hindi), Español (Spanish), Deutsch (German), Français (French), and 日本語 (Japanese)**.
* **Strict Architecture:** The generative AI model (Google Gemini 1.5 Flash) operates strictly as an **explanation layer** for structured optimization outcomes. It explains *why* a decision was made without inventing or hallucinative calculation of economic figures.

---

# 🛠️ Technology Stack

### Hackathon Prototype

| Layer | Technologies |
|---|---|
| **Frontend Framework** | Next.js 16.4.3 (Turbopack, App Router), React 19.3.0 |
| **Language & Styling** | TypeScript 5.x, Tailwind CSS v4, Lucide React, Framer Motion |
| **Data Visualization** | Recharts (Responsive charts, Radar distributions, Sparklines) |
| **Browser APIs** | HTML5 Camera API, Web Speech API (Speech Recognition & Speech Synthesis), LocalStorage |
| **Generative AI** | Google Gemini 1.5 Flash via Next.js Serverless Route Handlers |
| **Weather Telemetry** | Open-Meteo High-Resolution Historical & Forecast Weather API |
| **Localization** | Custom React Context `LanguageProvider` with 7 languages & dynamic agronomic dictionary |

---

# 🏗️ Production Architecture

Uzhavan AI is architected for modular, enterprise-grade cloud scaling:

```text
                           UZHAVAN AI
                               │
               Farmer Web / Mobile Application
             Next.js + React 19 + Web Speech API
                               │
                               ▼
                   FastAPI Gateway (Python)
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
    Farm Vision AI        Market Forecast AI    Geospatial Telemetry
 (PyTorch, YOLOv10,     (LightGBM, XGBoost,       (Sentinel-2 L2A,
      OpenCV)               Prophet)             PostGIS, GeoPandas)
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               ▼
                   Constrained Decision Engine
                Google OR-Tools (MILP & Simplex)
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
      Logistics Engine   Perishability Model   Carbon Impact
     (OSRM / GraphHopper)  (Arrhenius Q10)    (Emission Factor DB)
            │                  │                  │
            └──────────────────┼──────────────────┘
                               ▼
                    Structured Optimization
                               │
                               ▼
                   Gemini Explanation Layer
              (Structured Context → Farmer Prompt)
                               │
                               ▼
                  Multilingual Voice & Text
```

---

# 🔬 Technical Philosophy

Uzhavan AI strictly separates three critical algorithmic responsibilities:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Machine Learning PREDICTS                                           │
│    • Yield volumes, harvest windows, price trajectories, crop quality   │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Mathematical Optimization DECIDES                                   │
│    • Linear programming / OR-Tools allocates quantities, buyers, routes│
├────────────────────────────────────────────────────────────────────────┤
│ 3. Generative AI EXPLAINS                                              │
│    • Gemini translates complex matrices into clear, supportive language│
└────────────────────────────────────────────────────────────────────────┘
```

By decoupling calculation from text generation, Uzhavan AI eliminates hallucinated numbers, ensures defensible economics, and gives farmers transparent, trustworthy guidance.

---

# 📊 Walkthrough Example Decision

| Decision Option | Quoted Price | Road Distance | Transit Risk | Transport Carbon | Net Realized Outcome |
|---|---:|---:|---|---|---|
| **Option 1: Buyer A (Local Organic)** | **₹32.00/kg** | 10 km | Very Low | ~4.5 kg $\text{CO}_2$ | **Recommended (70% Allocation)** |
| **Option 2: Buyer B (Distant Mandi)** | **₹35.00/kg** | 70 km | High (Heat Spoilage) | ~28.0 kg $\text{CO}_2$ | **Sub-optimal (Higher logistics & loss)** |
| **Option 3: Hold 3 Days for Price Rise** | **₹36.50/kg (est.)** | — | High (Perishability) | Depends on storage | **Hedged (30% Local Buffer)** |

*Result:* The Decision Engine automatically identifies that blindly chasing Option 2's ₹35/kg quote yields lower net profit than splitting between Buyer A and a local buffer, while saving transit emissions and eliminating perishability risk.

---

# 🌍 Scalability & Regional Adapters

Uzhavan AI is designed on the principle:
> **"Localize the data, not the intelligence architecture."**

The platform adapts seamlessly across:
- **Crops:** Horticultural vegetables (tomato, onion, potato), grains (rice, wheat), pulses, and fruits.
- **Geographies:** Built and demonstrated in Tamil Nadu, India, with architecture ready for ASEAN, African, and Latin American smallholder farming ecosystems.
- **Languages:** Rapid addition of regional dialects through modular localization dictionaries.

---

# 👨‍🌾 User Journey

```text
1. Farmer Persona & Parcel Overview (2.0 acres Tomato, Coimbatore South)
       ↓
2. Field Telemetry & Satellite Crop Health (Simulated Sentinel-2 NDVI)
       ↓
3. Produce Photography & Quality Assessment (Visible defect detection & Grade A issuance)
       ↓
4. Spoilage Clock Review (Remaining value window: 41 hours at 32°C)
       ↓
5. Price Trajectory & Mandi Forecast (7-day forward pricing trend)
       ↓
6. Buyer Compatibility Matching (Pazhamudir Nilayam vs. APMC Mandi)
       ↓
7. Decision Engine Recommendation (70% Premium Contract / 30% Local Hedge)
       ↓
8. Multilingual AI Assistant Voice Explanation (Tamil / Hindi / English / etc.)
       ↓
9. Action Execution & Farmer Dispatch
```

---

# 🔐 Responsible AI & Technical Honesty

In accordance with responsible engineering standards for hackathon prototypes:
- **Simulated Satellite Telemetry:** Satellite vegetation data is clearly labeled as a simulated Sentinel-2 Level-2A feed to accurately reflect prototype capabilities.
- **Visible Computer Vision:** Produce grading explicitly estimates visible surface characteristics (color, blemishes, size uniformity) and does not falsely claim to measure hidden cellular or chemical properties with a phone camera.
- **AI Assessment Record:** Replaced blockchain or immutable certificate claims with an honest **Uzhavan AI Digital Quality Assessment Record**.
- **Model Scenario Estimates:** Environmental and food-loss metrics (-65% loss reduction, -42% logistics emissions) are transparently labeled as **modeled scenario estimates**.

---

# 🧩 Prototype vs Production Architecture

| Capability | Hackathon Prototype | Production Architecture |
|---|---|---|
| **Frontend** | Next.js 16.4.3 + React 19 + Tailwind v4 | Next.js 16 + React Native Mobile App |
| **AI Explanation** | Google Gemini 1.5 Flash | Google Gemini 1.5 Pro / Flash with Fine-Tuning |
| **Voice Processing** | Web Speech API (Browser Native STT/TTS) | Whisper API + Google Cloud Text-to-Speech |
| **Weather** | Open-Meteo High-Resolution API | Open-Meteo + Regional IMD Radar API |
| **State & Storage** | LocalStorage + Context API | PostgreSQL + PostGIS + Redis Cache |
| **Optimization** | TypeScript Linear Optimization Module | Python Google OR-Tools (MILP / Simplex) |
| **Satellite Feed** | Simulated Sentinel-2 Level-2A Feed | Copernicus Open Access Hub Live Pipelines |
| **Computer Vision** | Browser Canvas + Gemini Vision Analysis | PyTorch / YOLOv10 Custom Trained Produce Models |
| **Routing** | Modeled Distance & Road Factors | OSRM / OpenStreetMap Routing API |

---

# 🚀 Getting Started / Local Setup

### Prerequisites
- **Node.js**: v18.17+ or v20+ recommended
- **npm** or **pnpm**

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables (Optional for Gemini Assistant):**
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
   *(Note: The application includes an embedded agronomic NLP fallback, allowing full functionality even without an active API key).*

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to experience Uzhavan AI.

---

# 👥 Team & Acknowledgments

### Team ByteForge
*Proudly built for the **2nd OneEarth International Hackathon 2026**.*

- **Theme:** AI-Driven Precision Agriculture for Sustainable Farming
- **Product:** Uzhavan AI (உழவன் AI)
- **Tagline:** *Predict. Optimize. Act.*

---

> **Uzhavan AI — Where Intelligence Meets Sustainable Agriculture.**  
> *Dedicated to empowering smallholder farmers with actionable, sustainable decision intelligence.*

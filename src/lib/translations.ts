export type SupportedLanguage = "en" | "ta" | "hi";

export interface TranslationDictionary {
  // Navigation & Brand
  brandName: string;
  tagline: string;
  dashboard: string;
  cropManagement: string;
  fieldMonitoring: string;
  soilHealth: string;
  weather: string;
  irrigation: string;
  equipment: string;
  reports: string;
  alerts: string;
  settings: string;
  aiAssistant: string;
  askAiAssistant: string;
  aiAssistantSubtitle: string;
  agripulseEngine: string;

  // AgriPulse Suite
  decisionEngine: string;
  priceForecast: string;
  buyerMatching: string;
  logistics: string;
  foodLoss: string;
  whatIfSimulator: string;
  buyerDemand: string;

  // Header & Welcome
  welcomeBack: string;
  farmStatusToday: string;
  searchPlaceholder: string;
  farmManager: string;
  dateRange: string;
  editFarmProfile: string;
  signOut: string;
  unreadAlerts: string;
  farmAlerts: string;

  // Metric Cards
  totalFields: string;
  activeFields: string;
  inactiveFields: string;
  totalArea: string;
  areaGrowthMonth: string;
  cropsGrowing: string;
  cropSampleList: string;
  aiHealthScore: string;
  healthStatusGood: string;

  // Main Panels
  fieldHealthOverview: string;
  aiPoweredAnalysis: string;
  excellent: string;
  good: string;
  average: string;
  poor: string;
  weeklyImprovement: string;

  // Aerial Field
  satelliteTelemetry: string;
  georkField: string;
  wheatCrop: string;
  healthScoreText: string;

  // Weather Today
  weatherToday: string;
  turkeyLocation: string;
  partlyCloudy: string;
  humidity: string;
  wind: string;
  rain: string;
  today: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;

  // Soil Health Summary
  soilHealthSummary: string;
  averageAcrossFields: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  medium: string;
  high: string;
  soilOrganicMatter: string;
  goodLevel: string;

  // Bottom Row
  upcomingTasks: string;
  viewAllTasks: string;
  upcomingBadge: string;
  doneBadge: string;
  task1Title: string;
  task1Due: string;
  task2Title: string;
  task2Due: string;
  task3Title: string;
  task3Due: string;
  soilMoistureTrend: string;
  actualMoisture: string;
  forecastMoisture: string;
  cropDistribution: string;
  byArea: string;
  totalText: string;
  viewDetails: string;
  cropWheat: string;
  cropCorn: string;
  cropSoybean: string;
  cropBarley: string;
  cropOther: string;

  // Decision Recommendation Ribbon
  decisionRecTitle: string;
  decisionConfidence: string;
  recommendationAction: string;
  whyThisRecommendation: string;
  whatIfButton: string;

  // Voice Assistant
  voiceCopilotTitle: string;
  voiceListening: string;
  voiceClickToSpeak: string;
  suggestedQueries: string;
  sampleQ1: string;
  sampleQ2: string;
  sampleQ3: string;
  sampleQ4: string;
  sampleQ5: string;

  // Landing Page & Navbar
  navHome: string;
  navSolutions: string;
  navPipeline: string;
  navSustainability: string;
  navAbout: string;
  navClientApp: string;
  navGetStarted: string;

  // Language Labels
  langEn: string;
  langTa: string;
  langHi: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandName: "AgriPulse AI",
    tagline: "Sustainable Agriculture",
    dashboard: "Dashboard",
    cropManagement: "Crop Management",
    fieldMonitoring: "Field Monitoring",
    soilHealth: "Soil Health",
    weather: "Weather",
    irrigation: "Irrigation",
    equipment: "Equipment",
    reports: "Reports",
    alerts: "Alerts",
    settings: "Settings",
    aiAssistant: "AI Assistant",
    askAiAssistant: "Ask AI Assistant",
    aiAssistantSubtitle: "Hello! I'm your AI farming assistant. Ask me anything about your farm.",
    agripulseEngine: "AgriPulse Engine",

    decisionEngine: "Decision Engine",
    priceForecast: "Price Forecasting",
    buyerMatching: "Buyer Matching",
    logistics: "Logistics Optimization",
    foodLoss: "Food-Loss Prediction",
    whatIfSimulator: "What-If Simulator",
    buyerDemand: "Buyer Demand Board",

    welcomeBack: "Welcome back, Arman 👋",
    farmStatusToday: "Here's what's happening on your farm today.",
    searchPlaceholder: "Search fields, crops, reports...",
    farmManager: "Farm Manager",
    dateRange: "Jun 20 - Jun 26, 2024",
    editFarmProfile: "Edit Farm Profile",
    signOut: "Sign Out",
    unreadAlerts: "Unread",
    farmAlerts: "Farm Alerts",

    totalFields: "Total Fields",
    activeFields: "Active",
    inactiveFields: "Inactive",
    totalArea: "Total Area",
    areaGrowthMonth: "8.4 ha this month",
    cropsGrowing: "Crops Growing",
    cropSampleList: "Wheat, Corn, Soybean...",
    aiHealthScore: "AI Health Score",
    healthStatusGood: "Good",

    fieldHealthOverview: "Field Health Overview",
    aiPoweredAnalysis: "AI-powered vegetation & soil analysis",
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    poor: "Poor",
    weeklyImprovement: "12% improvement from last week",

    satelliteTelemetry: "Satellite Telemetry • Sentinel-2",
    georkField: "Geork Field",
    wheatCrop: "Wheat • 2.0 ha",
    healthScoreText: "Health Score: 92",

    weatherToday: "Weather Today",
    turkeyLocation: "Mamasinan, Turkey",
    partlyCloudy: "Partly Cloudy",
    humidity: "Humidity",
    wind: "Wind",
    rain: "Rain",
    today: "Today",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",

    soilHealthSummary: "Soil Health Summary",
    averageAcrossFields: "Average across all fields",
    nitrogen: "Nitrogen",
    phosphorus: "Phosphorus",
    potassium: "Potassium",
    medium: "Medium",
    high: "High",
    soilOrganicMatter: "Soil Organic Matter",
    goodLevel: "Good level",

    upcomingTasks: "Upcoming Tasks",
    viewAllTasks: "View All Tasks",
    upcomingBadge: "Upcoming",
    doneBadge: "Done",
    task1Title: "Soil Nutrient Test - Plot 4",
    task1Due: "Due Today",
    task2Title: "Irrigation Check - Geork Field",
    task2Due: "Due Tomorrow",
    task3Title: "Apply Organic Fertilizer - Plot 2",
    task3Due: "Due in 3 days",
    soilMoistureTrend: "Soil Moisture Trend",
    actualMoisture: "Actual",
    forecastMoisture: "Forecast",
    cropDistribution: "Crop Distribution",
    byArea: "By Area",
    totalText: "Total",
    viewDetails: "View Details",
    cropWheat: "Wheat",
    cropCorn: "Corn",
    cropSoybean: "Soybean",
    cropBarley: "Barley",
    cropOther: "Other",

    decisionRecTitle: "AGRIPULSE DECISION RECOMMENDATION",
    decisionConfidence: "88% Confidence",
    recommendationAction: "Sell 70% to Buyer A (₹32/kg in 3 days) • Retain 30% for local hedge (+₹11,300 net gain)",
    whyThisRecommendation: "Why This Recommendation?",
    whatIfButton: "What-If Simulator",

    voiceCopilotTitle: "AgriPulse Voice Co-pilot",
    voiceListening: "Listening... speak now",
    voiceClickToSpeak: "Click microphone to speak",
    suggestedQueries: "Suggested Farmer Queries:",
    sampleQ1: "Should I sell my tomatoes today?",
    sampleQ2: "What is my expected yield?",
    sampleQ3: "Which buyer is best for my crop?",
    sampleQ4: "When should I irrigate?",
    sampleQ5: "How can I reduce food loss?",

    navHome: "Home",
    navSolutions: "Solutions",
    navPipeline: "How It Works",
    navSustainability: "Sustainability",
    navAbout: "About",
    navClientApp: "Live Client App",
    navGetStarted: "Get Started",

    langEn: "English",
    langTa: "தமிழ்",
    langHi: "हिन्दी",
  },

  ta: {
    brandName: "அக்ரிபல்ஸ் AI",
    tagline: "நிலையான விவசாய உகப்பாக்கம்",
    dashboard: "டாஷ்போர்டு",
    cropManagement: "பயிர் மேலாண்மை",
    fieldMonitoring: "நில கண்காணிப்பு",
    soilHealth: "மண் வளம்",
    weather: "வானிலை",
    irrigation: "நீர்ப்பாசனம்",
    equipment: "உபகரணங்கள்",
    reports: "அறிக்கைகள்",
    alerts: "எச்சரிக்கைகள்",
    settings: "அமைப்புகள்",
    aiAssistant: "AI உதவியாளர்",
    askAiAssistant: "AI உதவியாளரிடம் கேளுங்கள்",
    aiAssistantSubtitle: "வணக்கம்! நான் உங்கள் விவசாய AI உதவியாளர். உங்கள் பண்ணை பற்றி எதையும் கேளுங்கள்.",
    agripulseEngine: "அக்ரிபல்ஸ் இயங்குதளம்",

    decisionEngine: "முடிவெடுக்கும் இயந்திரம்",
    priceForecast: "விலை கணிப்பு",
    buyerMatching: "வாங்குபவர் இணைப்பு",
    logistics: "போக்குவரத்து உகப்பாக்கம்",
    foodLoss: "உணவு இழப்பு கணிப்பு",
    whatIfSimulator: "என்ன-ஆனால் சிமுலேட்டர்",
    buyerDemand: "வாங்குபவர் தேவைகள் பலகை",

    welcomeBack: "மீண்டும் வருக, அர்மான் 👋",
    farmStatusToday: "இன்று உங்கள் பண்ணையில் என்ன நடக்கிறது என்பது இங்கே.",
    searchPlaceholder: "நிலங்கள், பயிர்கள், அறிக்கைகளைத் தேடுங்கள்...",
    farmManager: "பண்ணை மேலாளர்",
    dateRange: "ஜூன் 20 - ஜூன் 26, 2024",
    editFarmProfile: "பண்ணை சுயவிவரம்",
    signOut: "வெளியேறு",
    unreadAlerts: "புதியது",
    farmAlerts: "பண்ணை எச்சரிக்கைகள்",

    totalFields: "மொத்த நிலங்கள்",
    activeFields: "செயலில்",
    inactiveFields: "செயலற்றது",
    totalArea: "மொத்த பரப்பளவு",
    areaGrowthMonth: "இந்த மாதம் 8.4 ஹெக் அதிகரிப்பு",
    cropsGrowing: "வளரும் பயிர்கள்",
    cropSampleList: "கோதுமை, சோளம், சோயாபீன்...",
    aiHealthScore: "AI பயிர் ஆரோக்கியம்",
    healthStatusGood: "நன்று",

    fieldHealthOverview: "நில ஆரோக்கிய மேலோட்டம்",
    aiPoweredAnalysis: "AI அடிப்படையிலான தாவர & மண் பகுப்பாய்வு",
    excellent: "சிறந்தது",
    good: "நன்று",
    average: "சராசரி",
    poor: "குறைவு",
    weeklyImprovement: "கடந்த வாரத்தை விட 12% முன்னேற்றம்",

    satelliteTelemetry: "செயற்கைக்கோள் தரவு • சென்டினல்-2",
    georkField: "ஜியோர்க் நிலம்",
    wheatCrop: "கோதுமை • 2.0 ஹெக்",
    healthScoreText: "ஆரோக்கிய மதிப்பெண்: 92",

    weatherToday: "இன்றைய வானிலை",
    turkeyLocation: "மாமசினான் மண்டலம்",
    partlyCloudy: "பகுதி மேகமூட்டம்",
    humidity: "ஈரப்பதம்",
    wind: "காற்று",
    rain: "மழை வாய்ப்பு",
    today: "இன்று",
    tue: "செவ்",
    wed: "புதன்",
    thu: "வியா",
    fri: "வெள்",

    soilHealthSummary: "மண் ஆரோக்கிய சுருக்கம்",
    averageAcrossFields: "அனைத்து நிலங்களின் சராசரி",
    nitrogen: "நைட்ரஜன்",
    phosphorus: "பாஸ்பரஸ்",
    potassium: "பொட்டாசியம்",
    medium: "நடுத்தரம்",
    high: "அதிகம்",
    soilOrganicMatter: "மண் கரிமப் பொருள்",
    goodLevel: "நல்ல அளவு",

    upcomingTasks: "வரவிருக்கும் பணிகள்",
    viewAllTasks: "அனைத்து பணிகளையும் காண்க",
    upcomingBadge: "வரவிருப்பது",
    doneBadge: "முடிந்தது",
    task1Title: "மண் ஊட்டச்சத்து ஆய்வு - நிலம் 4",
    task1Due: "இன்று முடிக்க வேண்டும்",
    task2Title: "நீர்ப்பாசன வால்வு ஆய்வு - ஜியோர்க்",
    task2Due: "நாளை முடிக்க வேண்டும்",
    task3Title: "கரிம உரம் இடுதல் - பிளாட் 2",
    task3Due: "3 நாட்களில்",
    soilMoistureTrend: "மண் ஈரப்பதப் போக்கு",
    actualMoisture: "உண்மை",
    forecastMoisture: "கணிப்பு",
    cropDistribution: "பயிர் பரப்பளவு விநியோகம்",
    byArea: "பரப்பளவு வாரியாக",
    totalText: "மொத்தம்",
    viewDetails: "விவரங்களைக் காண்க",
    cropWheat: "கோதுமை",
    cropCorn: "சோளம்",
    cropSoybean: "சோயாபீன்",
    cropBarley: "பார்லி",
    cropOther: "மற்றவை",

    decisionRecTitle: "அக்ரிபல்ஸ் பரிந்துரைக்கப்பட்ட உத்தி",
    decisionConfidence: "88% துல்லியம்",
    recommendationAction: "70% விளைச்சலை வாங்குபவர் A-க்கு விற்கவும் (3 நாட்களில் ₹32/கிலோ) • 30% உள்ளூர் சந்தைக்கு வைக்கவும் (+₹11,300 லாபம்)",
    whyThisRecommendation: "இந்த பரிந்துரை ஏன்?",
    whatIfButton: "மாற்று சிமுலேட்டர்",

    voiceCopilotTitle: "அக்ரிபல்ஸ் குரல் உதவியாளர்",
    voiceListening: "கேட்கிறது... தமிழில் பேசுங்கள்",
    voiceClickToSpeak: "பேச மைக்ரோஃபோனை அழுத்தவும்",
    suggestedQueries: "பரிந்துரைக்கப்பட்ட விவசாயக் கேள்விகள்:",
    sampleQ1: "இன்று எனது தக்காளியை விற்க வேண்டுமா?",
    sampleQ2: "எனது எதிர்பார்க்கப்படும் மகசூல் என்ன?",
    sampleQ3: "எனது பயிருக்கு எந்த வாங்குபவர் சிறந்தவர்?",
    sampleQ4: "நான் எப்போது பாசனம் செய்ய வேண்டும்?",
    sampleQ5: "உணவு இழப்பை நான் எவ்வாறு குறைக்கலாம்?",

    navHome: "முகப்பு",
    navSolutions: "தீர்வுகள்",
    navPipeline: "இயங்கும் முறை",
    navSustainability: "நிலையான தாக்கம்",
    navAbout: "எங்களை பற்றி",
    navClientApp: "லைவ் டாஷ்போர்டு",
    navGetStarted: "தொடங்கவும்",

    langEn: "English",
    langTa: "தமிழ்",
    langHi: "हिन्दी",
  },

  hi: {
    brandName: "एग्रीपल्स AI",
    tagline: "सतत कृषि अनुकूलन",
    dashboard: "डैशबोर्ड",
    cropManagement: "फसल प्रबंधन",
    fieldMonitoring: "खेत निगरानी",
    soilHealth: "मृदा स्वास्थ्य",
    weather: "मौसम",
    irrigation: "सिंचाई",
    equipment: "उपकरण",
    reports: "रिपोर्ट्स",
    alerts: "अलर्ट्स",
    settings: "सेटिंग्स",
    aiAssistant: "AI सहायक",
    askAiAssistant: "AI सहायक से पूछें",
    aiAssistantSubtitle: "नमस्ते! मैं आपका कृषि AI सहायक हूँ। अपने खेत के बारे में कुछ भी पूछें।",
    agripulseEngine: "एग्रीपल्स इंजन",

    decisionEngine: "निर्णय इंजन",
    priceForecast: "मूल्य पूर्वानुमान",
    buyerMatching: "खरीदार मिलान",
    logistics: "रसद अनुकूलन",
    foodLoss: "खाद्य हानि पूर्वानुमान",
    whatIfSimulator: "व्हाट-इफ सिम्युलेटर",
    buyerDemand: "खरीदार मांग बोर्ड",

    welcomeBack: "वापसी पर स्वागत है, अरमान 👋",
    farmStatusToday: "आज आपके खेत में क्या हो रहा है, यहाँ देखें।",
    searchPlaceholder: "खेत, फसल, रिपोर्ट्स खोजें...",
    farmManager: "फार्म मैनेजर",
    dateRange: "20 जून - 26 जून, 2024",
    editFarmProfile: "फार्म प्रोफाइल",
    signOut: "साइन आउट",
    unreadAlerts: "अपठित",
    farmAlerts: "फार्म अलर्ट्स",

    totalFields: "कुल खेत",
    activeFields: "सक्रिय",
    inactiveFields: "निष्क्रिय",
    totalArea: "कुल क्षेत्रफल",
    areaGrowthMonth: "इस माह 8.4 हेक्टेयर वृद्धि",
    cropsGrowing: "उगने वाली फसलें",
    cropSampleList: "गेहूँ, मक्का, सोयाबीन...",
    aiHealthScore: "AI स्वास्थ्य स्कोर",
    healthStatusGood: "अच्छा",

    fieldHealthOverview: "खेत स्वास्थ्य अवलोकन",
    aiPoweredAnalysis: "AI-संचालित वनस्पति और मृदा विश्लेषण",
    excellent: "उत्कृष्ट",
    good: "अच्छा",
    average: "औसत",
    poor: "कमज़ोर",
    weeklyImprovement: "पिछले सप्ताह से 12% सुधार",

    satelliteTelemetry: "उपग्रह डेटा • सेंटीनेल-2",
    georkField: "जियोर्क खेत",
    wheatCrop: "गेहूँ • 2.0 हेक्टे",
    healthScoreText: "स्वास्थ्य स्कोर: 92",

    weatherToday: "आज का मौसम",
    turkeyLocation: "मामासिनान क्षेत्र",
    partlyCloudy: "आंशिक बादल",
    humidity: "आर्द्रता",
    wind: "हवा",
    rain: "बारिश संभावना",
    today: "आज",
    tue: "मंगल",
    wed: "बुध",
    thu: "गुरु",
    fri: "शुक्र",

    soilHealthSummary: "मृदा स्वास्थ्य सारांश",
    averageAcrossFields: "सभी खेतों का औसत",
    nitrogen: "नाइट्रोजन",
    phosphorus: "फास्फोरस",
    potassium: "पोटेशियम",
    medium: "मध्यम",
    high: "उच्च",
    soilOrganicMatter: "मृदा कार्बनिक पदार्थ",
    goodLevel: "अच्छा स्तर",

    upcomingTasks: "आगामी कार्य",
    viewAllTasks: "सभी कार्य देखें",
    upcomingBadge: "आगामी",
    doneBadge: "पूर्ण",
    task1Title: "मृदा पोषक तत्व परीक्षण - प्लॉट 4",
    task1Due: "आज देय",
    task2Title: "सिंचाई वाल्व निरीक्षण - जियोर्क खेत",
    task2Due: "कल देय",
    task3Title: "जैविक खाद का प्रयोग - प्लॉट 2",
    task3Due: "3 दिनों में",
    soilMoistureTrend: "मृदा नमी रुझान",
    actualMoisture: "वास्तविक",
    forecastMoisture: "पूर्वानुमान",
    cropDistribution: "फसल क्षेत्रफल वितरण",
    byArea: "क्षेत्रफल अनुसार",
    totalText: "कुल",
    viewDetails: "विवरण देखें",
    cropWheat: "गेहूँ",
    cropCorn: "मक्का",
    cropSoybean: "सोयाबीन",
    cropBarley: "जौ",
    cropOther: "अन्य",

    decisionRecTitle: "एग्रीपल्स अनुशंसित रणनीति",
    decisionConfidence: "88% सटीकता",
    recommendationAction: "70% फसल खरीदार A को बेचें (3 दिन में ₹32/किग्रा) • 30% स्थानीय मंडी हेतु रोकें (+₹11,300 लाभ)",
    whyThisRecommendation: "यह सिफ़ारिश क्यों?",
    whatIfButton: "व्हाट-इफ सिम्युलेटर",

    voiceCopilotTitle: "एग्रीपल्स वॉइस को-पायलट",
    voiceListening: "सुन रहा हूँ... हिंदी में बोलें",
    voiceClickToSpeak: "बोलने के लिए माइक दबाएँ",
    suggestedQueries: "सुझाए गए किसान प्रश्न:",
    sampleQ1: "क्या मुझे आज अपने टमाटर बेचने चाहिए?",
    sampleQ2: "मेरी अनुमानित उपज क्या है?",
    sampleQ3: "मेरी फसल के लिए कौन सा खरीदार सबसे अच्छा है?",
    sampleQ4: "मुझे कब सिंचाई करनी चाहिए?",
    sampleQ5: "मैं फसल की बर्बादी कैसे कम करूँ?",

    navHome: "होम",
    navSolutions: "समाधान",
    navPipeline: "कार्यप्रणाली",
    navSustainability: "सतत प्रभाव",
    navAbout: "हमारे बारे में",
    navClientApp: "लाइव ऐप",
    navGetStarted: "आरंभ करें",

    langEn: "English",
    langTa: "தமிழ்",
    langHi: "हिन्दी",
  },
};

export function getTranslation(lang: SupportedLanguage = "en"): TranslationDictionary {
  return translations[lang] || translations.en;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode } from '../types';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  languages: { code: LanguageCode; label: string; native: string }[];
}

export const SUPPORTED_LANGUAGES: { code: LanguageCode; label: string; native: string }[] = [
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'en', label: 'English', native: 'English' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  appName: {
    en: 'Rojgar Sathi — AI Livelihood Assistant',
    hi: 'पीएम-अजय एआई आजीविका सहायक',
    bn: 'পিএম-অজয় এআই জীবিকা সহকারী',
    ta: 'பிஎம்-அஜய் ஏஐ வாழ்வாதார உதவியாளர்',
    te: 'పిఎం-అజయ్ ఎఐ జీవనోపాధి సహాయకుడు',
    mr: 'पीएम-अजय एआय उपजीविका सहाय्यक',
    gu: 'પીએમ-અજય એઆઈ આજીવિકા સહાયક',
    kn: 'ಪಿಎಂ-ಅಜಯ್ ಎಐ ಜೀವನೋಪಾಯ ಸಹಾಯಕ',
    or: 'ପିଏମ-ଅଜୟ ଏଆଇ ଜୀବିକା ସହାୟକ',
    pa: 'ਪੀਐਮ-ਅਜੈ ਏਆਈ ਰੋਜ਼ੀ-ਰੋਟੀ ਸਹਾਇਕ',
  },
  tagline: {
    en: 'From Skills to Opportunities — Powered by AI, Voice and Local Insights.',
    hi: 'कौशल से अवसर तक — एआई, आवाज और स्थानीय अवसरों की शक्ति।',
    bn: 'দক্ষতা থেকে সুযোগ — এআই, ভয়েস ও স্থানীয় তথ্যের শক্তিতে।',
    ta: 'திறன்களிலிருந்து வாய்ப்புகளுக்கு — ஏஐ, குரல் மற்றும் உள்ளூர் நுண்ணறிவு.',
    te: 'నైపుణ్యాల నుండి అవకాశాల వరకు — ఎఐ, వాయిస్ మరియు స్థానిక సమాచారం.',
    mr: 'कौशल्यांकडून संधींकडे — एआय, आवाज आणि स्थानिक माहितीसह.',
    gu: 'કૌશલ્યથી તકો સુધી — એઆઈ, અવાજ અને સ્થાનિક માહિતી સાથે.',
    kn: 'ಕೌಶಲ್ಯಗಳಿಂದ ಅವಕಾಶಗಳವರೆಗೆ — ಎಐ, ಧ್ವನಿ ಮತ್ತು ಸ್ಥಳೀಯ ಒಳನೋಟಗಳ ಮೂಲಕ.',
    or: 'ଦକ୍ଷତାରୁ ସୁଯୋଗ ପର୍ଯ୍ୟନ୍ତ — ଏଆଇ, ଭଏସ୍ ଏବଂ ସ୍ଥାନୀୟ ସୂଚନା ସହିତ।',
    pa: 'ਹੁਨਰ ਤੋਂ ਮੌਕਿਆਂ ਤੱਕ — ਏਆਈ, ਆਵਾਜ਼ ਅਤੇ ਸਥਾਨਕ ਸਮਝ ਨਾਲ।',
  },
  heroTitle: {
    en: 'Find the Right Skill. Discover the Right Opportunity.',
    hi: 'सही कौशल पहचानें। सही अवसर पाएं।',
  },
  heroSubtitle: {
    en: 'An AI-powered multilingual livelihood assistant that understands your skills, interests and aspirations and connects you with suitable training, employment and self-employment opportunities.',
    hi: 'एक एआई-संचालित बहुभाषी आजीविका सहायक जो आपके कौशल, रुचि और आकांक्षाओं को समझता है और आपको उपयुक्त प्रशिक्षण, रोजगार और स्वरोजगार के अवसरों से जोड़ता है।',
  },
  talkToAI: {
    en: 'Talk to AI Assistant',
    hi: 'एआई सहायक से बात करें',
  },
  exploreOpportunities: {
    en: 'Explore Opportunities',
    hi: 'अवसर देखें',
  },
  startSkillAssessment: {
    en: 'Start Skill Assessment',
    hi: 'कौशल मूल्यांकन शुरू करें',
  },
  navHome: { en: 'Home', hi: 'होम' },
  navAssistant: { en: 'AI Assistant', hi: 'एआई सहायक' },
  navAssessment: { en: 'Skill Assessment', hi: 'कौशल मूल्यांकन' },
  navSkillGaps: { en: 'Skill Gaps', hi: 'कौशल अंतर' },
  navOpportunities: { en: 'Opportunities', hi: 'अवसर' },
  navTraining: { en: 'Training', hi: 'प्रशिक्षण' },
  navJobs: { en: 'Jobs', hi: 'नौकरियां' },
  navSelfEmployment: { en: 'Self Employment', hi: 'स्वरोजगार' },
  navSchemes: { en: 'Schemes', hi: 'सरकारी योजनाएं' },
  navLocalMarket: { en: 'Local Market', hi: 'स्थानीय बाजार' },
  navTracking: { en: 'Progress Tracking', hi: 'प्रगति ट्रैकिंग' },
  navKiosk: { en: 'Kiosk Mode', hi: 'कियोस्क मोड' },
  navIVR: { en: 'IVR Call', hi: 'आईवीआर कॉल' },
  navWhatsApp: { en: 'WhatsApp Voice', hi: 'व्हाट्सएप वॉयस' },
  navAdmin: { en: 'Admin Portal', hi: 'एडमिन पोर्टल' },
  navLogin: { en: 'Login / Register', hi: 'लॉगिन / पंजीकरण' },
  navDashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  navProfile: { en: 'Profile', hi: 'प्रोफाइल' },
  navLogout: { en: 'Logout', hi: 'लॉगआउट' },
  officialNotice: {
    en: 'Demo Data — Replace with authorized API data for production.',
    hi: 'डेमो डेटा — उत्पादन हेतु अधिकृत सरकारी एपीआई डेटा से प्रतिस्थापित करें।',
  },
  govMinistry: {
    en: 'Ministry of Social Justice & Empowerment, Govt. of India',
    hi: 'सामाजिक न्याय एवं अधिकारिता मंत्रालय, भारत सरकार',
  },
  applyNow: { en: 'Apply Now', hi: 'आवेदन करें' },
  viewDetails: { en: 'View Details', hi: 'विवरण देखें' },
  matchScore: { en: 'Match', hi: 'मिलान' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('hi');

  useEffect(() => {
    const saved = localStorage.getItem('rojgar_sathi_lang') as LanguageCode;
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('rojgar_sathi_lang', lang);
  };

  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[language] || entry['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

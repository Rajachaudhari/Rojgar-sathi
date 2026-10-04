import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { GovBanner } from './components/GovBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { VoiceProfileCreationPage } from './pages/VoiceProfileCreationPage';
import { SkillAssessmentPage } from './pages/SkillAssessmentPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { TrainingPage } from './pages/TrainingPage';
import { JobsPage } from './pages/JobsPage';
import { SelfEmploymentPage } from './pages/SelfEmploymentPage';
import { SchemesPage } from './pages/SchemesPage';
import { LocalMarketPage } from './pages/LocalMarketPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { ProgressTrackingPage } from './pages/ProgressTrackingPage';
import { PostTrainingFollowUpPage } from './pages/PostTrainingFollowUpPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { SavedOpportunitiesPage } from './pages/SavedOpportunitiesPage';
import { ConsentPage } from './pages/ConsentPage';
import { KioskModePage } from './pages/KioskModePage';
import { IVRSimulationPage } from './pages/IVRSimulationPage';
import { WhatsAppSimulationPage } from './pages/WhatsAppSimulationPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HelpFaqPage } from './pages/HelpFaqPage';
import { NotificationsPage } from './pages/NotificationsPage';

export const App: React.FC = () => {
  const location = useLocation();
  const isKiosk = location.pathname === '/kiosk';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {!isKiosk && <GovBanner />}
      <OfflineStatusBanner />
      {!isKiosk && <Navbar />}

      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assistant" element={<AIAssistantPage />} />
          <Route path="/voice-profile" element={<VoiceProfileCreationPage />} />
          <Route path="/assessment" element={<SkillAssessmentPage />} />
          <Route path="/skill-gaps" element={<SkillGapPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/self-employment" element={<SelfEmploymentPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/local-market" element={<LocalMarketPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/progress" element={<ProgressTrackingPage />} />
          <Route path="/post-training-followup" element={<PostTrainingFollowUpPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/saved" element={<SavedOpportunitiesPage />} />
          <Route path="/consent" element={<ConsentPage />} />
          <Route path="/kiosk" element={<KioskModePage />} />
          <Route path="/ivr" element={<IVRSimulationPage />} />
          <Route path="/whatsapp" element={<WhatsAppSimulationPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<HelpFaqPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {!isKiosk && <Footer />}
    </div>
  );
};

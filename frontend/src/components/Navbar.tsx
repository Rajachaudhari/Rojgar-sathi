import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import {
  Sparkles,
  Mic,
  Briefcase,
  GraduationCap,
  Landmark,
  TrendingUp,
  MapPin,
  ListChecks,
  User,
  LogOut,
  Menu,
  X,
  PhoneCall,
  MessageSquare,
  Monitor,
  Shield,
  Bell,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout, switchRole, notifications } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [opportunitiesDropdown, setOpportunitiesDropdown] = useState(false);
  const [channelsDropdown, setChannelsDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & National Identity */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-blue-900 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition">
              {/* Ashoka chakra styled emblem */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-orange-400 rounded-full"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <Sparkles className="w-4 h-4 text-orange-400 absolute" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-blue-950 leading-none">
                  Rojgar Sathi
                </span>
                <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  AI ASSISTANT
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-tight truncate max-w-[200px] sm:max-w-xs">
                {t('appName')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs font-semibold text-slate-700">
            <Link
              to="/"
              className={`px-2.5 py-1.5 rounded-lg transition ${
                isActive('/') ? 'text-blue-700 bg-blue-50 font-bold' : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              {t('navHome')}
            </Link>

            <Link
              to="/assistant"
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition ${
                isActive('/assistant')
                  ? 'bg-orange-600 text-white font-bold shadow-xs'
                  : 'bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100 font-bold'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{t('navAssistant')}</span>
            </Link>

            <Link
              to="/assessment"
              className={`px-2.5 py-1.5 rounded-lg transition ${
                isActive('/assessment') ? 'text-blue-700 bg-blue-50 font-bold' : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              {t('navAssessment')}
            </Link>

            <Link
              to="/skill-gaps"
              className={`px-2.5 py-1.5 rounded-lg transition ${
                isActive('/skill-gaps') ? 'text-blue-700 bg-blue-50 font-bold' : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              {t('navSkillGaps')}
            </Link>

            {/* Opportunities Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpportunitiesDropdown(!opportunitiesDropdown)}
                onBlur={() => setTimeout(() => setOpportunitiesDropdown(false), 200)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition ${
                  location.pathname.startsWith('/training') ||
                  location.pathname.startsWith('/jobs') ||
                  location.pathname.startsWith('/self-employment') ||
                  location.pathname.startsWith('/schemes')
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                <span>{t('navOpportunities')}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {opportunitiesDropdown && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <Link
                    to="/training"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition"
                  >
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>{t('navTraining')}</span>
                  </Link>
                  <Link
                    to="/jobs"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition"
                  >
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span>{t('navJobs')}</span>
                  </Link>
                  <Link
                    to="/self-employment"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition"
                  >
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span>{t('navSelfEmployment')}</span>
                  </Link>
                  <Link
                    to="/schemes"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition"
                  >
                    <Landmark className="w-4 h-4 text-amber-600" />
                    <span>{t('navSchemes')}</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/local-market"
              className={`px-2.5 py-1.5 rounded-lg transition ${
                isActive('/local-market') ? 'text-blue-700 bg-blue-50 font-bold' : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              {t('navLocalMarket')}
            </Link>

            <Link
              to="/progress"
              className={`px-2.5 py-1.5 rounded-lg transition ${
                isActive('/progress') ? 'text-blue-700 bg-blue-50 font-bold' : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              {t('navTracking')}
            </Link>

            {/* Channels & Simulations Dropdown */}
            <div className="relative">
              <button
                onClick={() => setChannelsDropdown(!channelsDropdown)}
                onBlur={() => setTimeout(() => setChannelsDropdown(false), 200)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50"
              >
                <span>Channels</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {channelsDropdown && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50">
                  <Link
                    to="/kiosk"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition"
                  >
                    <Monitor className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="font-bold text-xs">{t('navKiosk')}</div>
                      <div className="text-[10px] text-slate-400">CSC Gram Panchayat touch screen</div>
                    </div>
                  </Link>
                  <Link
                    to="/ivr"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-xs">{t('navIVR')}</div>
                      <div className="text-[10px] text-slate-400">Toll-free phone dialer simulator</div>
                    </div>
                  </Link>
                  <Link
                    to="/whatsapp"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition"
                  >
                    <MessageSquare className="w-4 h-4 text-teal-600" />
                    <div>
                      <div className="font-bold text-xs">{t('navWhatsApp')}</div>
                      <div className="text-[10px] text-slate-400">Voice note to AI transcript</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Auth Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <LanguageSelector />

            {/* Role Switcher for seamless demo inspection */}
            <div className="hidden xl:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-[10px]">
              <button
                onClick={() => switchRole('beneficiary')}
                className={`px-2 py-0.5 rounded-lg transition ${
                  !isAdmin ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                Beneficiary
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`px-2 py-0.5 rounded-lg transition ${
                  isAdmin ? 'bg-orange-600 font-bold text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Notifications */}
            {isAuthenticated && (
              <Link
                to="/notifications"
                title="Notifications"
                className="relative p-2 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-600"></span>
                )}
              </Link>
            )}

            {/* Authenticated State */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition"
                  >
                    <Shield className="w-3.5 h-3.5 text-orange-400" />
                    <span>Admin Panel</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-blue-950 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-xl transition"
                  >
                    <User className="w-3.5 h-3.5 text-blue-700" />
                    <span className="truncate max-w-[100px]">{user?.name?.split(' ')[0]}</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-xl transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-xl transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-blue-50 hover:text-blue-700"
            >
              {t('navHome')}
            </Link>
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-orange-50 text-orange-800 font-bold flex items-center space-x-1"
            >
              <Mic className="w-4 h-4 text-orange-600" />
              <span>{t('navAssistant')}</span>
            </Link>
            <Link
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-blue-50"
            >
              {t('navAssessment')}
            </Link>
            <Link
              to="/skill-gaps"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-blue-50"
            >
              {t('navSkillGaps')}
            </Link>
            <Link
              to="/training"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-blue-50"
            >
              {t('navTraining')}
            </Link>
            <Link
              to="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-blue-50"
            >
              {t('navJobs')}
            </Link>
            <Link
              to="/self-employment"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-blue-50"
            >
              {t('navSelfEmployment')}
            </Link>
            <Link
              to="/schemes"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-blue-50"
            >
              {t('navSchemes')}
            </Link>
            <Link
              to="/local-market"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-blue-50"
            >
              {t('navLocalMarket')}
            </Link>
            <Link
              to="/progress"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-blue-50"
            >
              {t('navTracking')}
            </Link>
            <Link
              to="/kiosk"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-indigo-50 text-indigo-900 font-bold"
            >
              {t('navKiosk')}
            </Link>
            <Link
              to="/ivr"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 font-bold"
            >
              {t('navIVR')}
            </Link>
            <Link
              to="/whatsapp"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-teal-50 text-teal-900 font-bold"
            >
              {t('navWhatsApp')}
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-900 text-white font-bold"
            >
              Admin Dashboard
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-blue-700"
                >
                  My Dashboard ({user?.name})
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2 w-full">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-bold border border-slate-300 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-bold bg-blue-700 text-white rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { request } from '../services/apiClient';
import { User, BeneficiaryProfile, ApplicationRecord, ProgressMilestone, NotificationItem } from '../types';

interface AuthContextType {
  user: User | null;
  profile: BeneficiaryProfile;
  isAuthenticated: boolean;
  isAdmin: boolean;
  savedOpportunityIds: string[];
  applications: ApplicationRecord[];
  milestones: ProgressMilestone[];
  notifications: NotificationItem[];
  hasConsented: boolean;
  login: (mobileOrEmail: string, password?: string, asAdmin?: boolean) => Promise<boolean>;
  register: (userData: Partial<User> & { password?: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<BeneficiaryProfile>) => void;
  toggleSaveOpportunity: (id: string) => void;
  submitApplication: (app: Omit<ApplicationRecord, 'id' | 'appliedDate' | 'status' | 'userId'>) => Promise<boolean>;
  updateMilestone: (key: string, status: 'completed' | 'in_progress' | 'pending') => void;
  grantConsent: (preferences?: { shareWithTraining?: boolean; shareWithEmployers?: boolean; shareWithSchemes?: boolean; voiceAnalysis?: boolean }) => void;
  revokeConsent: () => void;
  switchRole: (role: 'beneficiary' | 'admin') => void;
}

const DEFAULT_PROFILE: BeneficiaryProfile = {
  userId: 'USR-DEMO-001',
  name: 'Ramesh Kumar Gautam',
  education: '10th Pass',
  currentOccupation: 'Unemployed / Informal Daily Wage',
  previousOccupation: 'Apprentice Helper at Local Electrical Shop',
  traditionalOccupation: 'Leather Crafts & Weaving',
  existingSkills: ['Basic Electrical Wiring', 'Hand Tool Repair', 'Smartphone Usage'],
  technicalSkills: ['Switchboard Fitting', 'Continuity Testing', 'Soldering'],
  softSkills: ['Hardworking', 'Good Communication in Hindi', 'Punctual'],
  interests: ['Solar Energy', 'Electrical Maintenance', 'Setting up Village Repair Shop'],
  hobbies: ['Listening to folk music', 'Community events'],
  workExperienceYears: 1,
  monthlyIncomeRange: 'Below ₹10,000',
  employmentPreference: 'both',
  preferredWorkLocation: 'local_district',
  mobilityConstraints: {
    canTravelLocally: true,
    canRelocate: false,
    maxTravelDistanceKm: 20,
    requiresWfh: false,
  },
  trainingPreferences: {
    preferredSector: 'Green Energy / Renewables',
    preferredDuration: 'short_term_1_3mo',
    trainingMode: 'classroom',
  },
  currentSkillLevel: 'Intermediate',
};

const DEFAULT_USER: User = {
  id: 'USR-DEMO-001',
  name: 'Ramesh Kumar Gautam',
  mobile: '9876543210',
  email: 'ramesh.gautam@example.com',
  age: 24,
  gender: 'male',
  role: 'beneficiary',
  location: {
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    block: 'Arajiline',
    pincode: '221003',
    isRural: true,
  },
  preferredLanguage: 'hi',
  hasConsented: true,
  createdAt: '2026-09-01',
};

const DEFAULT_MILESTONES: ProgressMilestone[] = [
  { step: 1, key: 'profile_created', title: 'Profile Created', description: 'Personal, educational and mobility details verified', status: 'completed', completedDate: '2026-09-05' },
  { step: 2, key: 'assessment_completed', title: 'Skill Assessment Completed', description: 'Assessed vocational aptitude and technical baseline', status: 'completed', completedDate: '2026-09-06' },
  { step: 3, key: 'training_recommended', title: 'Training Recommended', description: 'Suryamitra Solar PV & Electrical courses matched', status: 'completed', completedDate: '2026-09-07' },
  { step: 4, key: 'training_started', title: 'Training Started', description: 'Enrolled in Rojgar Sathi District Skill Hub batch', status: 'in_progress' },
  { step: 5, key: 'training_completed', title: 'Training Completed', description: '300 hours theoretical & practical module', status: 'pending' },
  { step: 6, key: 'certificate_received', title: 'Certificate Received', description: 'NSQF Level 4 Government Certification', status: 'pending' },
  { step: 7, key: 'job_recommended', title: 'Job / Enterprise Linked', description: 'Matching with solar EPC contractors & Mudra loan', status: 'pending' },
  { step: 8, key: 'application_submitted', title: 'Application Submitted', description: 'Formal placement or subsidy application sent', status: 'pending' },
  { step: 9, key: 'employment_achieved', title: 'Sustainable Livelihood Secured', description: 'Regular income or self-employment operational', status: 'pending' },
];

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-1',
    title: 'New Rojgar Sathi Solar Batch Starting Soon',
    message: 'District Skill Hub Varanasi has 6 seats remaining for Suryamitra Solar PV Installer. 100% free with stipend.',
    type: 'course',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/training',
  },
  {
    id: 'NOTIF-2',
    title: 'High Match Job Alert: Solar Technician',
    message: 'Surya Shakti Renewable Solutions Ltd is hiring in Varanasi (92% match with your profile).',
    type: 'job',
    timestamp: '1 day ago',
    read: false,
    actionUrl: '/jobs',
  },
  {
    id: 'NOTIF-3',
    title: 'PM Vishwakarma Toolkit Voucher Eligible',
    message: 'Your traditional craft skills qualify you for a ₹15,000 modern toolkit e-voucher.',
    type: 'scheme',
    timestamp: '3 days ago',
    read: true,
    actionUrl: '/schemes',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<BeneficiaryProfile>(DEFAULT_PROFILE);
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('rojgar_sathi_saved_opportunities') || '[]'); } catch { return []; }
  });
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [milestones, setMilestones] = useState<ProgressMilestone[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEFAULT_NOTIFICATIONS);

  const hydrate = async () => {
    const token = localStorage.getItem('rojgar_sathi_auth_token');
    if (!token) return;
    try {
      const me = await request<User>('/auth/me');
      setUser(me);
      setHasConsented(Boolean(me.hasConsented));
      const [profileRes, apps, progress, saved, consent] = await Promise.all([
        request<{ user: User; profile: BeneficiaryProfile }>('/profile'),
        request<ApplicationRecord[]>('/applications'),
        request<ProgressMilestone[]>('/progress'),
        request<string[]>('/saved-opportunities').catch(() => []),
        request<any>('/consent').catch(() => null),
      ]);
      setProfile({ ...DEFAULT_PROFILE, ...(profileRes.profile || {}), userId: me.id, name: me.name });
      setApplications(apps || []);
      setMilestones(progress || []);
      setSavedOpportunityIds(saved || []);
      if (consent) setHasConsented(Boolean(me.hasConsented));
      localStorage.setItem('rojgar_sathi_user', JSON.stringify(me));
    } catch (error) {
      console.warn('Session restore failed:', error);
      localStorage.removeItem('rojgar_sathi_auth_token');
      localStorage.removeItem('rojgar_sathi_user');
      setUser(null);
    }
  };

  useEffect(() => { void hydrate(); }, []);

  const login = async (mobileOrEmail: string, password = '', _asAdmin = false): Promise<boolean> => {
    try {
      const res = await request<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ mobileOrEmail, password }),
      });
      localStorage.setItem('rojgar_sathi_auth_token', res.token);
      localStorage.setItem('rojgar_sathi_user', JSON.stringify(res.user));
      setUser(res.user);
      setHasConsented(Boolean(res.user.hasConsented));
      const [profileRes, apps, progress, saved] = await Promise.all([
        request<{ profile: BeneficiaryProfile }>('/profile'),
        request<ApplicationRecord[]>('/applications'),
        request<ProgressMilestone[]>('/progress'),
        request<string[]>('/saved-opportunities').catch(() => []),
      ]);
      setProfile({ ...DEFAULT_PROFILE, ...(profileRes.profile || {}), userId: res.user.id, name: res.user.name });
      setApplications(apps || []);
      setMilestones(progress || []);
      setSavedOpportunityIds(saved || []);
      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (userData: Partial<User> & { password?: string }): Promise<boolean> => {
    try {
      const res = await request<{ token: string; user: User }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: userData.name,
          mobile: userData.mobile,
          email: userData.email,
          age: userData.age,
          gender: userData.gender,
          state: userData.location?.state,
          district: userData.location?.district,
          block: userData.location?.block,
          pincode: userData.location?.pincode,
          preferredLanguage: userData.preferredLanguage || 'hi',
          password: userData.password,
        }),
      });
      localStorage.setItem('rojgar_sathi_auth_token', res.token);
      localStorage.setItem('rojgar_sathi_user', JSON.stringify(res.user));
      setUser(res.user);
      setHasConsented(Boolean(res.user.hasConsented));
      const profileRes = await request<{ profile: BeneficiaryProfile }>('/profile');
      setProfile({ ...DEFAULT_PROFILE, ...(profileRes.profile || {}), userId: res.user.id, name: res.user.name });
      const [progress, saved] = await Promise.all([
        request<ProgressMilestone[]>('/progress').catch(() => []),
        request<string[]>('/saved-opportunities').catch(() => []),
      ]);
      setMilestones(progress);
      setSavedOpportunityIds(saved);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setHasConsented(false);
    setApplications([]);
    setMilestones([]);
    localStorage.removeItem('rojgar_sathi_user');
    localStorage.removeItem('rojgar_sathi_auth_token');
  };

  const updateProfile = (updates: Partial<BeneficiaryProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    if (user) {
      void request('/profile', { method: 'PUT', body: JSON.stringify(updates) }).catch(error => console.error('Profile save failed:', error));
    }
  };

  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunityIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    if (user) {
      void request(`/saved-opportunities/${id}/toggle`, { method: 'POST' }).catch(error => console.error('Saved opportunity update failed:', error));
    }
  };

  const submitApplication = async (app: Omit<ApplicationRecord, 'id' | 'appliedDate' | 'status' | 'userId'>): Promise<boolean> => {
    try {
      const newApp = await request<ApplicationRecord>('/applications', { method: 'POST', body: JSON.stringify(app) });
      setApplications(prev => [newApp, ...prev]);
      setMilestones(prev => prev.map(m => m.key === 'application_submitted' ? { ...m, status: 'completed', completedDate: new Date().toISOString().split('T')[0] } : m));
      return true;
    } catch (error) {
      console.error('Application save failed:', error);
      return false;
    }
  };

  const updateMilestone = (key: string, status: 'completed' | 'in_progress' | 'pending') => {
    setMilestones(prev => prev.map(m => m.key === key ? { ...m, status, completedDate: status === 'completed' ? new Date().toISOString().split('T')[0] : m.completedDate } : m));
    if (user) void request(`/progress/${key}`, { method: 'PUT', body: JSON.stringify({ status }) }).catch(error => console.error('Milestone save failed:', error));
  };

  const grantConsent = (preferences = {}) => {
    setHasConsented(true);
    if (user) {
      setUser({ ...user, hasConsented: true });
      void request('/consent', { method: 'POST', body: JSON.stringify({ granted: true, shareWithTraining: true, shareWithEmployers: true, shareWithSchemes: true, voiceAnalysis: true, ...preferences }) }).catch(error => console.error('Consent save failed:', error));
    }
  };

  const revokeConsent = () => {
    setHasConsented(false);
    if (user) {
      setUser({ ...user, hasConsented: false });
      void request('/consent', { method: 'POST', body: JSON.stringify({ granted: false, shareWithTraining: false, shareWithEmployers: false, shareWithSchemes: false, voiceAnalysis: false }) }).catch(error => console.error('Consent revoke failed:', error));
    }
  };

  const switchRole = (role: 'beneficiary' | 'admin') => {
    if (role === 'admin') void login('admin@rojgarsathi.local', 'admin', true);
    else void login('9876543210', 'demo', false);
  };

  return (
    <AuthContext.Provider value={{
      user, profile, isAuthenticated: !!user, isAdmin: user?.role === 'admin', savedOpportunityIds,
      applications, milestones, notifications, hasConsented, login, register, logout, updateProfile,
      toggleSaveOpportunity, submitApplication, updateMilestone, grantConsent, revokeConsent, switchRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

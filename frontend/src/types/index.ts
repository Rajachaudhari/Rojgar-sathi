export type LanguageCode = 'hi' | 'en' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'or' | 'pa';

export interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  role: 'beneficiary' | 'admin' | 'trainer' | 'counselor';
  location: {
    state: string;
    district: string;
    block?: string;
    pincode?: string;
    isRural: boolean;
  };
  preferredLanguage: LanguageCode;
  hasConsented: boolean;
  createdAt: string;
}

export interface BeneficiaryProfile {
  userId: string;
  name: string;
  education: string; // e.g. "10th Pass", "12th Pass", "Graduate", "No Formal Education"
  currentOccupation: string;
  previousOccupation?: string;
  traditionalOccupation?: string;
  existingSkills: string[];
  technicalSkills: string[];
  softSkills: string[];
  interests: string[];
  hobbies: string[];
  workExperienceYears: number;
  monthlyIncomeRange: string;
  employmentPreference: 'wage_employment' | 'self_employment' | 'both';
  preferredWorkLocation: 'local_district' | 'within_state' | 'anywhere_india' | 'work_from_home';
  mobilityConstraints: {
    canTravelLocally: boolean;
    canRelocate: boolean;
    maxTravelDistanceKm: number;
    requiresWfh: boolean;
    physicalConstraints?: string;
  };
  trainingPreferences: {
    preferredSector: string;
    preferredDuration: 'short_term_1_3mo' | 'medium_term_3_6mo' | 'long_term_6mo_plus';
    trainingMode: 'classroom' | 'hybrid' | 'on_the_job';
  };
  currentSkillLevel: 'Beginner' | 'Intermediate' | 'Skilled' | 'Advanced';
}

export interface AssessmentQuestion {
  id: string;
  sector: string;
  question: {
    en: string;
    hi: string;
  };
  options: {
    id: string;
    text: {
      en: string;
      hi: string;
    };
    skillScore: number;
    skillTags: string[];
  }[];
}

export interface AssessmentResult {
  id: string;
  userId: string;
  completedAt: string;
  overallScore: number;
  currentSkillLevel: string;
  strongSkills: string[];
  emergingSkills: string[];
  missingSkills: string[];
  recommendedPathways: string[];
  sectorBreakdown: { sector: string; score: number }[];
}

export interface SkillGapItem {
  id: string;
  targetRole: string;
  targetSector: string;
  requiredSkills: string[];
  userCurrentSkills: string[];
  missingSkills: string[];
  readinessPercentage: number;
  estimatedTrainingHours: number;
  recommendedCourseIds: string[];
}

export interface TrainingProgram {
  id: string;
  title: string;
  sector: string;
  jobRole: string;
  nsqfLevel: number;
  durationHours: number;
  durationMonths: number;
  trainingProvider: string;
  trainingCenter: {
    name: string;
    district: string;
    state: string;
    distanceKm: number;
    address: string;
    contactPhone: string;
  };
  eligibility: string;
  certification: string;
  stipendAvailable: boolean;
  stipendAmount?: number;
  freeUnderROJGAR_SATHI: boolean;
  totalSeats: number;
  availableSeats: number;
  batchStartDate: string;
  employmentAssistance: boolean;
  officialPortalUrl: string;
  isDemoData: boolean;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  sector: string;
  location: {
    district: string;
    state: string;
    distanceKm: number;
  };
  requiredSkills: string[];
  educationRequired: string;
  experienceRequiredYears: number;
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: 'month' | 'day';
  employmentType: 'Full-time' | 'Part-time' | 'Apprenticeship' | 'Contract';
  vacancies: number;
  matchPercentage: number;
  matchBreakdown: {
    skills: number; // weight 30%
    interest: number; // weight 20%
    education: number; // weight 15%
    location: number; // weight 15%
    experience: number; // weight 10%
    preference: number; // weight 10%
  };
  whyMatches: string[];
  officialSource: string;
  isDemoData: boolean;
}

export interface SelfEmploymentOpportunity {
  id: string;
  businessTitle: string;
  sector: string;
  description: string;
  requiredSkills: string[];
  initialInvestmentMin: number;
  initialInvestmentMax: number;
  potentialMonthlyIncome: number;
  trainingRecommended: string;
  applicableSchemes: string[];
  subsidyPercentage: number;
  localMarketDemand: 'High' | 'Very High' | 'Moderate';
  equipmentNeeded: string[];
  nextSteps: string[];
  isDemoData: boolean;
}

export interface GovernmentScheme {
  id: string;
  schemeName: string;
  nodalMinistry: string;
  targetBeneficiaries: string;
  purpose: string;
  benefits: string[];
  financialAssistance: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationMode: 'Online' | 'CSC / District Center' | 'Bank Branch';
  officialPortalUrl: string;
  isDemoData: boolean;
}

export interface ApplicationRecord {
  id: string;
  userId: string;
  opportunityType: 'training' | 'job' | 'scheme' | 'self_employment';
  opportunityId: string;
  opportunityTitle: string;
  providerOrEmployer: string;
  appliedDate: string;
  status: 'Submitted' | 'Document Verification' | 'Assessment / Interview' | 'Approved / Enrolled' | 'Rejected' | 'Placed';
  remarks?: string;
  centerAddress?: string;
  nextActionDate?: string;
}

export interface ProgressMilestone {
  step: number;
  key: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  completedDate?: string;
}

export interface LocalMarketCluster {
  id: string;
  district: string;
  state: string;
  coordinates: [number, number]; // lat, lng
  primaryIndustries: string[];
  highDemandRoles: string[];
  activeTrainingCentersCount: number;
  openVacanciesCount: number;
  microEnterpriseGrowthSectors: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'course' | 'job' | 'scheme' | 'system' | 'followup';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  audioUrl?: string;
  timestamp: string;
  suggestedQuickReplies?: string[];
  extractedProfileUpdates?: Partial<BeneficiaryProfile>;
}

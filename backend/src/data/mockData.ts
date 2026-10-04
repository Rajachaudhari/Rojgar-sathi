import {
  TrainingProgram,
  JobOpportunity,
  SelfEmploymentOpportunity,
  GovernmentScheme,
  LocalMarketCluster,
  AssessmentQuestion,
  SkillGapItem
} from '../types';

export const MOCK_TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'TRN-SOLAR-01',
    title: 'Solar PV Installer (Suryamitra)',
    sector: 'Green Energy / Renewables',
    jobRole: 'Solar Panel Installation & Maintenance Technician',
    nsqfLevel: 4,
    durationHours: 300,
    durationMonths: 3,
    trainingProvider: 'National Institute of Solar Energy (NISE) Partner Center',
    trainingCenter: {
      name: 'Rojgar Sathi District Skill Hub - Varanasi',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      distanceKm: 8.5,
      address: 'Industrial Estate, Shivpur, Varanasi, UP - 221003',
      contactPhone: '+91 542 2289100'
    },
    eligibility: '10th pass + ITI (Electrical/Wireman) or 12th pass with Science',
    certification: 'NSDC & Skill Council for Green Jobs (SCGJ)',
    stipendAvailable: true,
    stipendAmount: 1500,
    freeUnderROJGAR_SATHI: true,
    totalSeats: 35,
    availableSeats: 6,
    batchStartDate: '2026-10-15',
    employmentAssistance: true,
    officialPortalUrl: 'https://skillindia.gov.in',
    isDemoData: true
  },
  {
    id: 'TRN-ELEC-02',
    title: 'Assistant Electrician & Home Automation Wiring',
    sector: 'Construction & Electrical',
    jobRole: 'Assistant Electrician',
    nsqfLevel: 3,
    durationHours: 400,
    durationMonths: 3,
    trainingProvider: 'Pradhan Mantri Kaushal Kendra (PMKK)',
    trainingCenter: {
      name: 'PMKK Skill Development Institute',
      district: 'Patna',
      state: 'Bihar',
      distanceKm: 12.0,
      address: 'Bailey Road, Saguna More, Patna, BR - 801503',
      contactPhone: '+91 612 2548890'
    },
    eligibility: '8th or 10th pass',
    certification: 'Construction Skill Development Council of India (CSDCI)',
    stipendAvailable: true,
    stipendAmount: 1200,
    freeUnderROJGAR_SATHI: true,
    totalSeats: 40,
    availableSeats: 11,
    batchStartDate: '2026-10-20',
    employmentAssistance: true,
    officialPortalUrl: 'https://nsdcindia.org',
    isDemoData: true
  },
  {
    id: 'TRN-APPAREL-03',
    title: 'Self Employed Tailor & Boutique Production',
    sector: 'Apparel, Made-Ups & Home Furnishing',
    jobRole: 'Self-Employed Tailor / Garment Maker',
    nsqfLevel: 4,
    durationHours: 350,
    durationMonths: 3,
    trainingProvider: 'Apparel Training & Design Centre (ATDC)',
    trainingCenter: {
      name: 'RSETI Rural Self Employment Training Institute',
      district: 'Ranchi',
      state: 'Jharkhand',
      distanceKm: 5.2,
      address: 'Near Morabadi Ground, Ranchi, JH - 834008',
      contactPhone: '+91 651 2490123'
    },
    eligibility: '8th pass or traditional craft knowledge',
    certification: 'Apparel Made-ups and Home Furnishing Sector Skill Council',
    stipendAvailable: true,
    stipendAmount: 1000,
    freeUnderROJGAR_SATHI: true,
    totalSeats: 30,
    availableSeats: 4,
    batchStartDate: '2026-10-10',
    employmentAssistance: true,
    officialPortalUrl: 'https://atdcindia.co.in',
    isDemoData: true
  },
  {
    id: 'TRN-DIGITAL-04',
    title: 'Domestic Data Entry Operator & CSC Operator',
    sector: 'IT-ITeS / Digital Services',
    jobRole: 'Data Entry Operator / E-Governance Kiosk Executive',
    nsqfLevel: 4,
    durationHours: 400,
    durationMonths: 4,
    trainingProvider: 'NIELIT Facilitation Center',
    trainingCenter: {
      name: 'District Community Skill Development Center',
      district: 'Nagpur',
      state: 'Maharashtra',
      distanceKm: 4.8,
      address: 'Civil Lines, Nagpur, MH - 440001',
      contactPhone: '+91 712 2567844'
    },
    eligibility: '10th pass with basic English/Regional typing',
    certification: 'IT-ITeS Sector Skills Council NASSCOM',
    stipendAvailable: false,
    freeUnderROJGAR_SATHI: true,
    totalSeats: 50,
    availableSeats: 14,
    batchStartDate: '2026-10-25',
    employmentAssistance: true,
    officialPortalUrl: 'https://nielit.gov.in',
    isDemoData: true
  },
  {
    id: 'TRN-AGRI-05',
    title: 'Micro-Irrigation & Organic Dairy Entrepreneurship',
    sector: 'Agriculture & Allied',
    jobRole: 'Dairy Farm Supervisor & Farm Entrepreneur',
    nsqfLevel: 4,
    durationHours: 250,
    durationMonths: 2,
    trainingProvider: 'Krishi Vigyan Kendra (KVK)',
    trainingCenter: {
      name: 'KVK Center for Rural Livelihoods',
      district: 'Bhopal',
      state: 'Madhya Pradesh',
      distanceKm: 16.5,
      address: 'Berasia Road, Bhopal, MP - 462038',
      contactPhone: '+91 755 2741982'
    },
    eligibility: 'No formal schooling required / 5th pass preferred',
    certification: 'Agriculture Skill Council of India (ASCI)',
    stipendAvailable: true,
    stipendAmount: 1200,
    freeUnderROJGAR_SATHI: true,
    totalSeats: 30,
    availableSeats: 8,
    batchStartDate: '2026-10-18',
    employmentAssistance: true,
    officialPortalUrl: 'https://asci-india.com',
    isDemoData: true
  },
  {
    id: 'TRN-AUTO-06',
    title: 'Two & Three-Wheeler EV Repair Technician',
    sector: 'Automotive / EV',
    jobRole: 'EV Service Technician',
    nsqfLevel: 4,
    durationHours: 350,
    durationMonths: 3,
    trainingProvider: 'Automotive Skills Development Council (ASDC)',
    trainingCenter: {
      name: 'State ITI Campus Center of Excellence',
      district: 'Jaipur',
      state: 'Rajasthan',
      distanceKm: 9.0,
      address: 'Malviya Nagar Industrial Area, Jaipur, RJ - 302017',
      contactPhone: '+91 141 2750912'
    },
    eligibility: '10th pass with ITI or basic mechanical familiarity',
    certification: 'Automotive Skills Development Council',
    stipendAvailable: true,
    stipendAmount: 1800,
    freeUnderROJGAR_SATHI: true,
    totalSeats: 25,
    availableSeats: 5,
    batchStartDate: '2026-11-01',
    employmentAssistance: true,
    officialPortalUrl: 'https://asdc.org.in',
    isDemoData: true
  }
];

export const MOCK_JOBS: JobOpportunity[] = [
  {
    id: 'JOB-ELEC-101',
    title: 'Solar Inverter & Wiring Technician',
    company: 'Surya Shakti Renewable Solutions Ltd.',
    sector: 'Green Energy / Electrical',
    location: {
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      distanceKm: 11.2
    },
    requiredSkills: ['Electrical wiring', 'Basic electronics', 'Solar panel mounting', 'Safety protocols'],
    educationRequired: '10th or 12th pass / ITI',
    experienceRequiredYears: 0.5,
    salaryMin: 14000,
    salaryMax: 18500,
    salaryPeriod: 'month',
    employmentType: 'Full-time',
    vacancies: 8,
    matchPercentage: 92,
    matchBreakdown: {
      skills: 28,
      interest: 19,
      education: 15,
      location: 14,
      experience: 8,
      preference: 8
    },
    whyMatches: [
      'Your hands-on electrical repairs score matches requirements.',
      'Located within your preferred 15 km district commuting boundary.',
      'Entry-level induction provided with Rojgar Sathi employer tie-up.',
      'Direct wage employment with PF & ESI medical benefits.'
    ],
    officialSource: 'National Career Service (NCS) Portal & Rojgar Sathi Placement Cell',
    isDemoData: true
  },
  {
    id: 'JOB-CSC-102',
    title: 'Customer Service & CSC Operator',
    company: 'Gramin Jan Seva Kendra Network',
    sector: 'IT-ITeS & Citizen Services',
    location: {
      district: 'Nagpur',
      state: 'Maharashtra',
      distanceKm: 6.4
    },
    requiredSkills: ['Computer typing', 'Document scanning', 'Online form submission', 'Hindi/Local language'],
    educationRequired: '10th or 12th pass',
    experienceRequiredYears: 0,
    salaryMin: 12000,
    salaryMax: 16000,
    salaryPeriod: 'month',
    employmentType: 'Full-time',
    vacancies: 5,
    matchPercentage: 86,
    matchBreakdown: {
      skills: 25,
      interest: 20,
      education: 15,
      location: 13,
      experience: 5,
      preference: 8
    },
    whyMatches: [
      'High match with your interest in computer services & citizen aid.',
      'Flexible desk environment suitable for local commute.',
      'Freshers with basic typing speed are welcome.'
    ],
    officialSource: 'District Employment Exchange / NCS',
    isDemoData: true
  },
  {
    id: 'JOB-TEXT-103',
    title: 'Industrial Sewing Machine Operator',
    company: 'Bharat Fab Crafts Export Cluster',
    sector: 'Apparel & Textiles',
    location: {
      district: 'Ranchi',
      state: 'Jharkhand',
      distanceKm: 8.0
    },
    requiredSkills: ['Stitching', 'Pattern cutting', 'Machine handling', 'Quality inspection'],
    educationRequired: '8th pass or above',
    experienceRequiredYears: 0,
    salaryMin: 11500,
    salaryMax: 15000,
    salaryPeriod: 'month',
    employmentType: 'Full-time',
    vacancies: 15,
    matchPercentage: 84,
    matchBreakdown: {
      skills: 26,
      interest: 18,
      education: 14,
      location: 14,
      experience: 4,
      preference: 8
    },
    whyMatches: [
      'Recognizes your prior tailoring knowledge & manual dexterity.',
      'Subsidized transport provided by the employer cluster.',
      'Weekly performance incentive scheme.'
    ],
    officialSource: 'Apparel SSC Job Fair Database',
    isDemoData: true
  },
  {
    id: 'JOB-LOG-104',
    title: 'Warehouse Inventory Associate & Scanner',
    company: 'QuickLogistics Fulfillment Hub',
    sector: 'Logistics & Supply Chain',
    location: {
      district: 'Patna',
      state: 'Bihar',
      distanceKm: 14.5
    },
    requiredSkills: ['Barcode scanning', 'Inventory sorting', 'Material handling', 'Basic smartphone usage'],
    educationRequired: '10th pass',
    experienceRequiredYears: 0,
    salaryMin: 13500,
    salaryMax: 17000,
    salaryPeriod: 'month',
    employmentType: 'Full-time',
    vacancies: 20,
    matchPercentage: 79,
    matchBreakdown: {
      skills: 22,
      interest: 17,
      education: 15,
      location: 11,
      experience: 6,
      preference: 8
    },
    whyMatches: [
      'Quick on-the-job training provided.',
      'Overtime allowance + medical insurance included.'
    ],
    officialSource: 'Logistics Skill Council Employment Portal',
    isDemoData: true
  },
  {
    id: 'JOB-EV-105',
    title: 'E-Rickshaw Fleet Service Assistant',
    company: 'GreenMobility Local Transport Co.',
    sector: 'Automotive & EV',
    location: {
      district: 'Jaipur',
      state: 'Rajasthan',
      distanceKm: 7.8
    },
    requiredSkills: ['Battery charging checks', 'Brake adjustment', 'Basic multimeter testing', 'Customer interaction'],
    educationRequired: '8th or 10th pass',
    experienceRequiredYears: 0.5,
    salaryMin: 13000,
    salaryMax: 18000,
    salaryPeriod: 'month',
    employmentType: 'Full-time',
    vacancies: 6,
    matchPercentage: 88,
    matchBreakdown: {
      skills: 27,
      interest: 19,
      education: 14,
      location: 14,
      experience: 7,
      preference: 7
    },
    whyMatches: [
      'High growth sector in your municipal corporation area.',
      'Fits your stated preference for mechanical and electrical jobs.'
    ],
    officialSource: 'State Skill Mission Job Aggregator',
    isDemoData: true
  }
];

export const MOCK_SELF_EMPLOYMENT: SelfEmploymentOpportunity[] = [
  {
    id: 'SE-01',
    businessTitle: 'Common Service Center (CSC) & Digital Seva Kendra',
    sector: 'Digital Services & Citizen Facilitation',
    description: 'Provide Aadhar updating, PAN card, PM Kisan registration, utility bills, train ticketing, and online form submissions in your village or ward.',
    requiredSkills: ['Computer operations', 'Internet navigation', 'Printer/scanner handling', 'Citizen communications'],
    initialInvestmentMin: 35000,
    initialInvestmentMax: 65000,
    potentialMonthlyIncome: 18000,
    trainingRecommended: 'Domestic Data Entry & CSC Operator (NSQF Level 4)',
    applicableSchemes: ['Rojgar Sathi Income Generating Scheme', 'PMMY Shishu / Kishore Mudra', 'Digital India CSC Scheme'],
    subsidyPercentage: 50,
    localMarketDemand: 'Very High',
    equipmentNeeded: ['Desktop or Laptop', 'Multifunction Scanner & Printer', 'Biometric Fingerprint Scanner', 'Broadband / 4G Dongle'],
    nextSteps: [
      'Enroll in CSC VLE certification via authorized PMKK center.',
      'Submit Rojgar Sathi capital subsidy grant form at District Social Welfare Office.',
      'Identify a 100 sq ft shop near Panchayat Bhawan or market hub.',
      'Obtain bank loan sanction under PMMY Kishore Scheme.'
    ],
    isDemoData: true
  },
  {
    id: 'SE-02',
    businessTitle: 'Custom Tailoring & Readymade Alteration Boutique',
    sector: 'Apparel & Garment Enterprise',
    description: 'Set up an independent tailoring workshop providing blouse stitching, school uniforms, festive attire, and quick alteration services.',
    requiredSkills: ['Garment cutting', 'Power sewing machine operation', 'Pattern designing', 'Measurement accuracy'],
    initialInvestmentMin: 25000,
    initialInvestmentMax: 50000,
    potentialMonthlyIncome: 15000,
    trainingRecommended: 'Self-Employed Tailor (ATDC / RSETI)',
    applicableSchemes: ['PM Vishwakarma Yojana (Tailor Darzi)', 'Rojgar Sathi Special Central Assistance', 'Stand-Up India'],
    subsidyPercentage: 60,
    localMarketDemand: 'Very High',
    equipmentNeeded: ['High-speed industrial sewing machine', 'Overlock machine', 'Ironing station & table', 'Cutting shears & accessories'],
    nextSteps: [
      'Register under PM Vishwakarma for free modern toolkit & ₹15,000 voucher.',
      'Complete 5-day basic skill verification at nearest CSC.',
      'Apply for collateral-free ₹1,00,000 credit at 5% subsidized interest.',
      'Display product samples at local weekly haats.'
    ],
    isDemoData: true
  },
  {
    id: 'SE-03',
    businessTitle: 'Rooftop Solar & Electrical Repair Services',
    sector: 'Renewable Energy & Home Electricals',
    description: 'Offer neighborhood electrical maintenance, inverter-battery servicing, solar panel washing, and rooftop installation assistance.',
    requiredSkills: ['Electrical wiring', 'Circuit testing with multimeter', 'Solar inverter installation', 'Safety equipment usage'],
    initialInvestmentMin: 40000,
    initialInvestmentMax: 80000,
    potentialMonthlyIncome: 22000,
    trainingRecommended: 'Suryamitra Solar PV Technician',
    applicableSchemes: ['PM Surya Ghar Muft Bijli Yojana Vendor Linkage', 'PMMY Kishore Mudra', 'Rojgar Sathi Self Employment Grant'],
    subsidyPercentage: 45,
    localMarketDemand: 'High',
    equipmentNeeded: ['Digital multimeter & clamp meter', 'Heavy duty drill & impact driver', 'Safety harness & insulated toolkit', 'Two-wheeler transport'],
    nextSteps: [
      'Complete NSQF 4 certification under Skill India.',
      'Register as empanelled technician on PM Surya Ghar vendor portal.',
      'Distribute service cards across residential colonies & commercial shops.',
      'Partner with 2 local solar hardware distributors.'
    ],
    isDemoData: true
  },
  {
    id: 'SE-04',
    businessTitle: 'Mini Dairy Unit (2 to 4 Milch Animals)',
    sector: 'Agriculture & Animal Husbandry',
    description: 'Start a commercial micro-dairy farm producing fresh cow/buffalo milk, curd, paneer, and vermicompost organic fertilizer.',
    requiredSkills: ['Animal nutrition', 'Clean milking practices', 'Cattle health hygiene', 'Milk testing with lactometer'],
    initialInvestmentMin: 80000,
    initialInvestmentMax: 180000,
    potentialMonthlyIncome: 25000,
    trainingRecommended: 'Dairy Farmer & Entrepreneur (KVK / ASCI)',
    applicableSchemes: ['National Livestock Mission (NLM)', 'Rojgar Sathi Capital Asset Subsidy', 'Kisan Credit Card (Animal Husbandry)'],
    subsidyPercentage: 50,
    localMarketDemand: 'Very High',
    equipmentNeeded: ['Cattle shed with concrete flooring & drainage', 'Stainless steel milk cans', 'Chaff cutter for green fodder', 'Lactometer & weighing scale'],
    nextSteps: [
      'Obtain KVK training certificate on modern breed management.',
      'Apply through District Animal Husbandry Officer for subsidy.',
      'Secure milk supply contract with local cooperative dairy society (e.g. Amul / Sudha / Mother Dairy).',
      'Avail subsidized veterinary vaccination support.'
    ],
    isDemoData: true
  }
];

export const MOCK_SCHEMES: GovernmentScheme[] = [
  {
    id: 'SCH-ROJGAR_SATHI',
    schemeName: 'Rojgar Sathi (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana)',
    nodalMinistry: 'Ministry of Social Justice and Empowerment, Govt. of India',
    targetBeneficiaries: 'Scheduled Caste (SC) individuals and households with annual family income up to ₹2.50 Lakh',
    purpose: 'Comprehensive development through income generation, skill development training, and village infrastructure augmentation to reduce poverty.',
    benefits: [
      '100% free skill training with stipend up to ₹1,500/month.',
      'Capital subsidy grant up to ₹50,000 or 50% of project cost for self-employment.',
      'Direct linkage to government loan schemes and micro-finance.',
      'Adarsh Gram development in villages with >50% SC population.'
    ],
    financialAssistance: 'Up to ₹50,000 non-refundable subsidy per beneficiary for income-generating units.',
    eligibilityCriteria: [
      'Applicant belongs to Scheduled Caste (SC) community.',
      'Family annual income not exceeding ₹2,50,000.',
      'Age between 18 and 50 years for skill/business support.',
      'Resident of the project block or district.'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'SC Caste Certificate issued by Tehsildar / Competent Authority',
      'Income Certificate / Ration Card',
      'Bank Passbook with Aadhaar seeding',
      'Passport size photograph'
    ],
    applicationMode: 'CSC / District Center',
    officialPortalUrl: 'https://rojgar-sathi.dosje.gov.in',
    isDemoData: false
  },
  {
    id: 'SCH-VISHWAKARMA',
    schemeName: 'PM Vishwakarma Scheme',
    nodalMinistry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    targetBeneficiaries: 'Traditional artisans and craftspeople working with hands and tools (18 trades including Carpenter, Blacksmith, Tailor, Cobbler, Mason)',
    purpose: 'Holistic end-to-end support to traditional craftspersons in training, modern toolkit, collateral-free credit, and marketing linkage.',
    benefits: [
      'Recognition through PM Vishwakarma Certificate and ID Card.',
      'Skill verification (5-7 days) with ₹500/day stipend.',
      'Toolkit incentive of ₹15,000 as e-vouchers.',
      'Collateral-free enterprise credit: 1st tranche ₹1 Lakh (18 mos) & 2nd tranche ₹2 Lakhs (30 mos) at concessional 5% interest rate.'
    ],
    financialAssistance: '₹15,000 toolkit voucher + up to ₹3,00,000 low-interest credit.',
    eligibilityCriteria: [
      'Artisan engaged in one of the 18 specified traditional family trades.',
      'Minimum age 18 years on date of application.',
      'Beneficiary should not have availed loans under PMEGP or PM Swanidhi recently.',
      'One member per family eligible.'
    ],
    requiredDocuments: [
      'Aadhaar Card with mobile linking',
      'Bank Account Details',
      'Ration Card / Family Proof'
    ],
    applicationMode: 'Online',
    officialPortalUrl: 'https://pmvishwakarma.gov.in',
    isDemoData: false
  },
  {
    id: 'SCH-MUDRA',
    schemeName: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    nodalMinistry: 'Ministry of Finance, Govt. of India',
    targetBeneficiaries: 'Non-Corporate, Non-Farm Small/Micro Enterprises',
    purpose: 'Funding the unfunded: provides collateral-free institutional credit to micro units for income generation.',
    benefits: [
      'Shishu loan: Loans up to ₹50,000 for startup stage.',
      'Kishore loan: Loans from ₹50,000 up to ₹5,00,000 for equipment purchase.',
      'Tarun loan: Loans from ₹5,00,000 up to ₹10,00,000 for expansion.',
      'No collateral requirement; MUDRA Card for working capital withdrawals.'
    ],
    financialAssistance: 'Collateral-free micro loans from ₹50,000 to ₹10,00,000.',
    eligibilityCriteria: [
      'Any Indian citizen having a viable business plan for non-farm income generating activity.',
      'Clean credit history with commercial / rural / cooperative banks.'
    ],
    requiredDocuments: [
      'Identity & Address Proof (Aadhaar / Voter ID)',
      'Business Registration / Shop Establishment certificate (if applicable)',
      'Quotation of machinery/equipment to be purchased',
      'Bank statement for last 6 months'
    ],
    applicationMode: 'Bank Branch',
    officialPortalUrl: 'https://www.mudra.org.in',
    isDemoData: false
  },
  {
    id: 'SCH-PMKVY',
    schemeName: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)',
    nodalMinistry: 'Ministry of Skill Development and Entrepreneurship (MSDE)',
    targetBeneficiaries: 'Youth seeking industry-relevant skill training and certification',
    purpose: 'Enable Indian youth to take up industry-relevant skill training that helps them in securing a better livelihood.',
    benefits: [
      'Completely free training courseware, examination, and NSDC certification.',
      'Special focus on Industry 4.0, Green skills, AI/Robotics, and Mechatronics.',
      'Stipend and travel reimbursement for eligible candidates.',
      'National Rozgar Mela placement drives.'
    ],
    financialAssistance: '100% course fee covered by Government of India.',
    eligibilityCriteria: [
      'Indian nationality.',
      'Unemployed youth or school/college dropouts.',
      'Valid Aadhaar card and bank account.'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Educational marksheets (8th/10th/12th)',
      'Bank passbook photocopy'
    ],
    applicationMode: 'Online',
    officialPortalUrl: 'https://www.pmkvyofficial.org',
    isDemoData: false
  }
];

export const MOCK_LOCAL_CLUSTERS: LocalMarketCluster[] = [
  {
    id: 'LOC-VARANASI',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    coordinates: [25.3176, 82.9739],
    primaryIndustries: ['Silk Weaving & Handlooms', 'Solar Rooftop & Smart City Infrastructure', 'Tourism & Hospitality', 'Light Engineering'],
    highDemandRoles: ['Solar PV Technician', 'Handloom Quality Inspector', 'E-Rickshaw Fleet Operator', 'Retail Store Associate'],
    activeTrainingCentersCount: 14,
    openVacanciesCount: 340,
    microEnterpriseGrowthSectors: ['Solar Equipment Maintenance', 'Banarasi Silk Online Boutique', 'Homestay & Hospitality Services']
  },
  {
    id: 'LOC-PATNA',
    district: 'Patna',
    state: 'Bihar',
    coordinates: [25.5941, 85.1376],
    primaryIndustries: ['Food Processing & Cold Storage', 'Construction & Electrical Wiring', 'Logistics Warehousing', 'IT/Digital Seva'],
    highDemandRoles: ['Assistant Electrician', 'Warehouse Scanner', 'Data Entry Executive', 'Refrigeration Technician'],
    activeTrainingCentersCount: 18,
    openVacanciesCount: 520,
    microEnterpriseGrowthSectors: ['Agri Cold-chain Services', 'CSC Citizen Kiosk', 'Electrical Appliance Service']
  },
  {
    id: 'LOC-RANCHI',
    district: 'Ranchi',
    state: 'Jharkhand',
    coordinates: [23.3441, 85.3096],
    primaryIndustries: ['Garment Manufacturing', 'Mining Equipment Maintenance', 'Organic Farming & Sericulture', 'Auto Components'],
    highDemandRoles: ['Sewing Machine Operator', 'Heavy Machinery Greaser', 'Mushroom Cultivator', 'Electrician'],
    activeTrainingCentersCount: 11,
    openVacanciesCount: 290,
    microEnterpriseGrowthSectors: ['Custom Tailoring Boutique', 'Lac & Forest Produce Micro-unit', 'Two-Wheeler Service']
  },
  {
    id: 'LOC-NAGPUR',
    district: 'Nagpur',
    state: 'Maharashtra',
    coordinates: [21.1458, 79.0882],
    primaryIndustries: ['Multi-modal Logistics Hub', 'Textiles & Garments', 'Solar Energy Installations', 'Digital Services / BPO'],
    highDemandRoles: ['Forklift & Warehouse Executive', 'Solar Plant Assessor', 'CSC Operator', 'Apparel Pattern Master'],
    activeTrainingCentersCount: 22,
    openVacanciesCount: 680,
    microEnterpriseGrowthSectors: ['Last-mile Delivery Franchise', 'Rooftop Solar Maintenance', 'Garment Alteration Hub']
  },
  {
    id: 'LOC-JAIPUR',
    district: 'Jaipur',
    state: 'Rajasthan',
    coordinates: [26.9124, 75.7873],
    primaryIndustries: ['Automotive & EV Hub', 'Gemstones & Handicrafts', 'Solar Generation Farms', 'Apparel Printing'],
    highDemandRoles: ['Two-Wheeler EV Technician', 'Hand Block Printing Artisan', 'Solar Array Assembler', 'Storekeeper'],
    activeTrainingCentersCount: 25,
    openVacanciesCount: 610,
    microEnterpriseGrowthSectors: ['EV Battery Charging Station', 'Craft E-commerce Store', 'Organic Dairy Unit']
  }
];

export const MOCK_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'Q1',
    sector: 'Education & Basic Literacy',
    question: {
      en: 'What is your highest level of formal education completed?',
      hi: 'आपने अपनी शिक्षा कहाँ तक पूरी की है?'
    },
    options: [
      { id: 'Q1_A', text: { en: 'No formal schooling (Practical knowledge only)', hi: 'कोई औपचारिक शिक्षा नहीं (केवल व्यावहारिक ज्ञान)' }, skillScore: 20, skillTags: ['Practical Learner', 'Hands-on Work'] },
      { id: 'Q1_B', text: { en: 'Up to 8th class', hi: '8वीं कक्षा तक' }, skillScore: 40, skillTags: ['Basic Literacy', 'Vocational Ready'] },
      { id: 'Q1_C', text: { en: '10th class pass (Matriculation)', hi: '10वीं कक्षा उत्तीर्ण' }, skillScore: 65, skillTags: ['Matriculation', 'Technical Aptitude'] },
      { id: 'Q1_D', text: { en: '12th class / ITI diploma / Graduate', hi: '12वीं कक्षा / आईटीआई डिप्लोमा / स्नातक' }, skillScore: 85, skillTags: ['Higher Secondary', 'Technical Specialization'] }
    ]
  },
  {
    id: 'Q2',
    sector: 'Technical & Practical Aptitude',
    question: {
      en: 'How comfortable are you with repairing things or working with tools and machines?',
      hi: 'औजारों, मशीनों या चीजों की मरम्मत करने में आप कितने सहज हैं?'
    },
    options: [
      { id: 'Q2_A', text: { en: 'I have never worked with tools or electrical items', hi: 'मैंने कभी औजारों या बिजली के सामान पर काम नहीं किया' }, skillScore: 15, skillTags: ['Non-Technical', 'Service Aptitude'] },
      { id: 'Q2_B', text: { en: 'I can do minor home repairs (fuse, bulb, simple fixing)', hi: 'मैं घर की छोटी-मोटी मरम्मत कर सकता हूँ (फ्यूज, बल्ब, सरल मरम्मत)' }, skillScore: 50, skillTags: ['Basic Repair', 'General Maintenance'] },
      { id: 'Q2_C', text: { en: 'I regularly handle electrical/mechanical/tailoring equipment', hi: 'मैं नियमित रूप से बिजली/मैकेनिकल/सिलाई मशीन संभालता हूँ' }, skillScore: 80, skillTags: ['Electrical Skills', 'Mechanical Dexterity'] },
      { id: 'Q2_D', text: { en: 'I have formal workshop or vocational experience', hi: 'मेरे पास वर्कशॉप या व्यावसायिक अनुभव है' }, skillScore: 95, skillTags: ['Vocational Skilled', 'Troubleshooting'] }
    ]
  },
  {
    id: 'Q3',
    sector: 'Digital Literacy',
    question: {
      en: 'How do you use mobile phones and computers in your daily life?',
      hi: 'आप अपने दैनिक जीवन में मोबाइल फोन और कंप्यूटर का उपयोग कैसे करते हैं?'
    },
    options: [
      { id: 'Q3_A', text: { en: 'Voice calling only on basic phone', hi: 'साधारण फोन पर केवल फोन कॉल' }, skillScore: 20, skillTags: ['Basic Mobile'] },
      { id: 'Q3_B', text: { en: 'Use smartphone for YouTube, WhatsApp, and UPI payments', hi: 'यूट्यूब, व्हाट्सएप और यूपीआई भुगतान के लिए स्मार्टफोन' }, skillScore: 60, skillTags: ['Smartphone Fluent', 'UPI Aware'] },
      { id: 'Q3_C', text: { en: 'Comfortable typing, filling forms, and searching online', hi: 'टाइपिंग, ऑनलाइन फॉर्म भरने और इंटरनेट सर्च में सहज' }, skillScore: 85, skillTags: ['Digital Literacy', 'Computer Operator Ready'] },
      { id: 'Q3_D', text: { en: 'Skilled in MS Office, online portals, or computer troubleshooting', hi: 'एमएस ऑफिस, ऑनलाइन पोर्टल और कंप्यूटर में कुशल' }, skillScore: 95, skillTags: ['IT Proficient', 'Data Entry'] }
    ]
  },
  {
    id: 'Q4',
    sector: 'Work & Livelihood Preference',
    question: {
      en: 'What type of livelihood opportunity do you prefer most?',
      hi: 'आप किस प्रकार का आजीविका विकल्प सबसे अधिक पसंद करते हैं?'
    },
    options: [
      { id: 'Q4_A', text: { en: 'A steady monthly salary job with fixed hours', hi: 'निश्चित समय वाली नियमित मासिक वेतन की नौकरी' }, skillScore: 70, skillTags: ['Wage Employment', 'Team Player'] },
      { id: 'Q4_B', text: { en: 'Starting my own shop, enterprise, or service business', hi: 'अपनी खुद की दुकान, उद्यम या सेवा व्यवसाय शुरू करना' }, skillScore: 85, skillTags: ['Self-Employment', 'Entrepreneurial Spirit'] },
      { id: 'Q4_C', text: { en: 'Work near home / Work from home with flexible timing', hi: 'घर के पास या घर से काम (लचीला समय)' }, skillScore: 65, skillTags: ['Local Employment', 'Flexible Hours'] },
      { id: 'Q4_D', text: { en: 'Willing to learn any trade that offers highest immediate income', hi: 'जो भी काम तुरंत सबसे अच्छी आमदनी दे, उसे सीखने को तैयार' }, skillScore: 75, skillTags: ['High Adaptability', 'Quick Learner'] }
    ]
  },
  {
    id: 'Q5',
    sector: 'Traditional / Family Craft',
    question: {
      en: 'Does your family or community have a traditional craft or trade?',
      hi: 'क्या आपके परिवार या समुदाय का कोई पारंपरिक शिल्प या व्यवसाय है?'
    },
    options: [
      { id: 'Q5_A', text: { en: 'Tailoring, stitching, embroidery, or handloom', hi: 'सिलाई, कढ़ाई, बुनाई या हथकरघा' }, skillScore: 80, skillTags: ['Textile Craft', 'Traditional Artisan'] },
      { id: 'Q5_B', text: { en: 'Pottery, masonry, carpentry, or blacksmithing', hi: 'कुम्हारी, राजमिस्त्री, बढ़ईगीरी या लोहार' }, skillScore: 85, skillTags: ['Construction Craft', 'Vishwakarma Trade'] },
      { id: 'Q5_C', text: { en: 'Farming, dairy, goat rearing, or poultry', hi: 'खेती, डेयरी, बकरी पालन या मुर्गी पालन' }, skillScore: 80, skillTags: ['Animal Husbandry', 'Agri Enterprise'] },
      { id: 'Q5_D', text: { en: 'No traditional craft; interested in modern technical skills', hi: 'कोई पारंपरिक शिल्प नहीं; आधुनिक तकनीकी कौशल में रुचि' }, skillScore: 75, skillTags: ['Modern Trades', 'New Sector Ready'] }
    ]
  }
];

export const MOCK_SKILL_GAPS: SkillGapItem[] = [
  {
    id: 'GAP-SOLAR',
    targetRole: 'Solar PV Installer & Rooftop Technician',
    targetSector: 'Green Energy / Renewables',
    requiredSkills: [
      'Basic electrical knowledge',
      'Solar panel mounting',
      'Inverter & battery wiring',
      'Electrical safety regulations',
      'Solar PV troubleshooting'
    ],
    userCurrentSkills: [
      'Basic electrical knowledge',
      'Tool handling'
    ],
    missingSkills: [
      'Solar panel mounting',
      'Inverter & battery wiring',
      'Electrical safety regulations',
      'Solar PV troubleshooting'
    ],
    readinessPercentage: 40,
    estimatedTrainingHours: 300,
    recommendedCourseIds: ['TRN-SOLAR-01']
  },
  {
    id: 'GAP-CSC',
    targetRole: 'Common Service Center (CSC) & Citizen Seva Operator',
    targetSector: 'IT-ITeS & Digital Services',
    requiredSkills: [
      'Hindi/English computer typing',
      'Document scanning & upload',
      'Govt portal navigation',
      'Customer service & record keeping'
    ],
    userCurrentSkills: [
      'Smartphone usage',
      'Customer service'
    ],
    missingSkills: [
      'Hindi/English computer typing',
      'Document scanning & upload',
      'Govt portal navigation'
    ],
    readinessPercentage: 55,
    estimatedTrainingHours: 200,
    recommendedCourseIds: ['TRN-DIGITAL-04']
  },
  {
    id: 'GAP-TAILOR',
    targetRole: 'Commercial Boutique & Garment Entrepreneur',
    targetSector: 'Apparel & Fashion',
    requiredSkills: [
      'Hand stitching basics',
      'Industrial electric sewing machine',
      'Pattern drafting & cutting',
      'Costing & customer pricing'
    ],
    userCurrentSkills: [
      'Hand stitching basics',
      'Fabric familiarity'
    ],
    missingSkills: [
      'Industrial electric sewing machine',
      'Pattern drafting & cutting',
      'Costing & customer pricing'
    ],
    readinessPercentage: 50,
    estimatedTrainingHours: 240,
    recommendedCourseIds: ['TRN-APPAREL-03']
  }
];

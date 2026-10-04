import { createRequire } from 'node:module';
import { randomBytes, scryptSync, timingSafeEqual, createHmac } from 'node:crypto';
import { MOCK_TRAINING_PROGRAMS, MOCK_JOBS, MOCK_SELF_EMPLOYMENT, MOCK_SCHEMES, MOCK_LOCAL_CLUSTERS } from '../src/data/mockData.js';

const require = createRequire(import.meta.url);

let PoolCtor: any = null;
try {
  PoolCtor = require('pg').Pool;
} catch {
  PoolCtor = null;
}

export const DEMO_USER_ID = 'USR-DEMO-001';
export const ADMIN_USER_ID = 'ADMIN-001';

export interface DatabaseState {
  mode: 'postgres' | 'memory';
  pool?: any;
}

const memory = {
  users: new Map<string, any>(),
  profiles: new Map<string, any>(),
  applications: [] as any[],
  consents: new Map<string, any>(),
  milestones: new Map<string, any[]>(),
  assessments: [] as any[],
  saved: new Map<string, Set<string>>(),
};

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

export const verifyPassword = (password: string, stored: string) => {
  const [salt, expectedHex] = String(stored || '').split(':');
  if (!salt || !expectedHex) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, 'hex');
  return expected.length === actual.length && timingSafeEqual(actual, expected);
};

const base64url = (value: string | Buffer) => Buffer.from(value).toString('base64url');

export const createToken = (payload: Record<string, unknown>) => {
  const secret = process.env.JWT_SECRET || 'change-me-rojgar-sathi-dev-secret';
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64url(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 }));
  const signature = base64url(createHmac('sha256', secret).update(`${header}.${body}`).digest());
  return `${header}.${body}.${signature}`;
};

export const verifyToken = (token: string) => {
  try {
    const [header, body, signature] = token.split('.');
    if (!header || !body || !signature) return null;
    const secret = process.env.JWT_SECRET || 'change-me-rojgar-sathi-dev-secret';
    const expected = base64url(createHmac('sha256', secret).update(`${header}.${body}`).digest());
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload as { userId: string; role: string };
  } catch {
    return null;
  }
};

const DEMO_PROFILE = {
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
  mobilityConstraints: { canTravelLocally: true, canRelocate: false, maxTravelDistanceKm: 20, requiresWfh: false },
  trainingPreferences: { preferredSector: 'Green Energy / Renewables', preferredDuration: 'short_term_1_3mo', trainingMode: 'classroom' },
  currentSkillLevel: 'Intermediate',
};

const DEFAULT_MILESTONES = [
  ['profile_created', 1, 'Profile Created', 'Personal, educational and mobility details verified', 'completed'],
  ['assessment_completed', 2, 'Skill Assessment Completed', 'Assessed vocational aptitude and technical baseline', 'completed'],
  ['training_recommended', 3, 'Training Recommended', 'Suryamitra Solar PV & Electrical courses matched', 'completed'],
  ['training_started', 4, 'Training Started', 'Enrolled in Rojgar Sathi District Skill Hub batch', 'in_progress'],
  ['training_completed', 5, 'Training Completed', '300 hours theoretical & practical module', 'pending'],
  ['certificate_received', 6, 'Certificate Received', 'NSQF Level 4 Government Certification', 'pending'],
  ['job_recommended', 7, 'Job / Enterprise Linked', 'Matching with solar EPC contractors & enterprise support', 'pending'],
  ['application_submitted', 8, 'Application Submitted', 'Formal placement or subsidy application sent', 'pending'],
  ['employment_achieved', 9, 'Sustainable Livelihood Secured', 'Regular income or self-employment operational', 'pending'],
];

export const publicUser = (row: any) => ({
  id: row.id,
  name: row.name,
  mobile: row.mobile,
  email: row.email || undefined,
  age: Number(row.age || 0),
  gender: row.gender,
  role: row.role,
  location: {
    state: row.state || '', district: row.district || '', block: row.block || undefined,
    pincode: row.pincode || undefined, isRural: Boolean(row.is_rural),
  },
  preferredLanguage: row.preferred_language || 'hi',
  hasConsented: Boolean(row.has_consented),
  createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at || ''),
});

const createMemoryUser = (input: any, password: string) => {
  const id = input.id || `USR-${Date.now()}`;
  const user = {
    id, name: input.name, mobile: input.mobile, email: input.email || null, age: input.age || 22,
    gender: input.gender || 'male', role: input.role || 'beneficiary', state: input.state || 'Uttar Pradesh',
    district: input.district || 'Varanasi', block: input.block || null, pincode: input.pincode || null,
    is_rural: input.isRural ?? true, preferred_language: input.preferredLanguage || 'hi',
    has_consented: input.hasConsented ?? false, created_at: new Date().toISOString(), password_hash: hashPassword(password),
  };
  memory.users.set(id, user);
  return user;
};

const ensureMemorySeed = () => {
  if (!memory.users.has(DEMO_USER_ID)) {
    memory.users.set(DEMO_USER_ID, createMemoryUser({
      id: DEMO_USER_ID, name: 'Ramesh Kumar Gautam', mobile: '9876543210', email: 'ramesh.gautam@example.com', age: 24,
      gender: 'male', role: 'beneficiary', state: 'Uttar Pradesh', district: 'Varanasi', isRural: true, preferredLanguage: 'hi', hasConsented: true,
    }, 'demo'));
    memory.profiles.set(DEMO_USER_ID, { userId: DEMO_USER_ID, name: 'Ramesh Kumar Gautam', ...DEMO_PROFILE });
  }
  if (!memory.users.has(ADMIN_USER_ID)) {
    memory.users.set(ADMIN_USER_ID, createMemoryUser({
      id: ADMIN_USER_ID, name: 'District Nodal Officer', mobile: '9999999999', email: 'admin@rojgarsathi.local', age: 42,
      gender: 'female', role: 'admin', state: 'Uttar Pradesh', district: 'Varanasi', isRural: false, preferredLanguage: 'hi', hasConsented: true,
    }, 'admin'));
  }
  if (!memory.milestones.has(DEMO_USER_ID)) {
    memory.milestones.set(DEMO_USER_ID, DEFAULT_MILESTONES.map(([key, step, title, description, status]) => ({ key, step, title, description, status })));
  }
};

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'beneficiary',
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  block TEXT,
  pincode TEXT,
  is_rural BOOLEAN NOT NULL DEFAULT TRUE,
  preferred_language TEXT NOT NULL DEFAULT 'hi',
  has_consented BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS beneficiary_profiles (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  profile JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS training_programs (id TEXT PRIMARY KEY, data JSONB NOT NULL);
CREATE TABLE IF NOT EXISTS job_opportunities (id TEXT PRIMARY KEY, data JSONB NOT NULL);
CREATE TABLE IF NOT EXISTS self_employment_opportunities (id TEXT PRIMARY KEY, data JSONB NOT NULL);
CREATE TABLE IF NOT EXISTS government_schemes (id TEXT PRIMARY KEY, data JSONB NOT NULL);
CREATE TABLE IF NOT EXISTS local_market_clusters (id TEXT PRIMARY KEY, data JSONB NOT NULL);
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  opportunity_type TEXT NOT NULL, opportunity_id TEXT NOT NULL, opportunity_title TEXT NOT NULL,
  provider_or_employer TEXT, applied_date DATE NOT NULL DEFAULT CURRENT_DATE, status TEXT NOT NULL DEFAULT 'Submitted',
  remarks TEXT, center_address TEXT, next_action_date TEXT
);
CREATE TABLE IF NOT EXISTS consent_records (
  id BIGSERIAL PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ, revoked_at TIMESTAMPTZ, share_with_training BOOLEAN NOT NULL DEFAULT FALSE,
  share_with_employers BOOLEAN NOT NULL DEFAULT FALSE, share_with_schemes BOOLEAN NOT NULL DEFAULT FALSE,
  voice_analysis BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS progress_milestones (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, key TEXT NOT NULL, step INTEGER NOT NULL,
  title TEXT NOT NULL, description TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', completed_date DATE,
  PRIMARY KEY (user_id, key)
);
CREATE TABLE IF NOT EXISTS saved_opportunities (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, opportunity_id TEXT NOT NULL,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), PRIMARY KEY (user_id, opportunity_id)
);
CREATE TABLE IF NOT EXISTS assessment_results (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), result JSONB NOT NULL
);
CREATE TABLE IF NOT EXISTS assessment_answers (
  id BIGSERIAL PRIMARY KEY, assessment_id TEXT NOT NULL REFERENCES assessment_results(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL, option_id TEXT NOT NULL, score INTEGER NOT NULL, skill_tags JSONB NOT NULL DEFAULT '[]'::jsonb
);
`;

export async function initDatabase(): Promise<DatabaseState> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || !PoolCtor) {
    ensureMemorySeed();
    if (!databaseUrl) console.warn('[DB] DATABASE_URL is not set. Running in demo memory mode.');
    if (!PoolCtor) console.warn('[DB] PostgreSQL driver "pg" is not installed. Run: npm install pg');
    return { mode: 'memory' };
  }

  const pool = new PoolCtor({
    connectionString: databaseUrl,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    max: Number(process.env.DB_POOL_MAX || 10),
    idleTimeoutMillis: 30000,
  });

  await pool.query(SCHEMA_SQL);

  const demoExists = await pool.query('SELECT id FROM users WHERE id=$1', [DEMO_USER_ID]);
  if (!demoExists.rowCount) {
    await createDbUser(pool, {
      id: DEMO_USER_ID, name: 'Ramesh Kumar Gautam', mobile: '9876543210', email: 'ramesh.gautam@example.com', age: 24,
      gender: 'male', role: 'beneficiary', state: 'Uttar Pradesh', district: 'Varanasi', isRural: true, preferredLanguage: 'hi', hasConsented: true,
    }, 'demo');
  }
  const adminExists = await pool.query('SELECT id FROM users WHERE id=$1', [ADMIN_USER_ID]);
  if (!adminExists.rowCount) {
    await createDbUser(pool, {
      id: ADMIN_USER_ID, name: 'District Nodal Officer', mobile: '9999999999', email: 'admin@rojgarsathi.local', age: 42,
      gender: 'female', role: 'admin', state: 'Uttar Pradesh', district: 'Varanasi', isRural: false, preferredLanguage: 'hi', hasConsented: true,
    }, 'admin');
  }
  await seedJsonTable(pool, 'training_programs', MOCK_TRAINING_PROGRAMS);
  await seedJsonTable(pool, 'job_opportunities', MOCK_JOBS);
  await seedJsonTable(pool, 'self_employment_opportunities', MOCK_SELF_EMPLOYMENT);
  await seedJsonTable(pool, 'government_schemes', MOCK_SCHEMES);
  await seedJsonTable(pool, 'local_market_clusters', MOCK_LOCAL_CLUSTERS);
  await seedProfile(pool, DEMO_USER_ID, { userId: DEMO_USER_ID, name: 'Ramesh Kumar Gautam', ...DEMO_PROFILE });
  await seedMilestones(pool, DEMO_USER_ID);
  return { mode: 'postgres', pool };
}

async function createDbUser(pool: any, input: any, password: string) {
  const result = await pool.query(
    `INSERT INTO users (id,name,mobile,email,password_hash,age,gender,role,state,district,block,pincode,is_rural,preferred_language,has_consented)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
    [input.id, input.name, input.mobile, input.email || null, hashPassword(password), input.age || 22, input.gender || 'male', input.role || 'beneficiary', input.state || 'Uttar Pradesh', input.district || 'Varanasi', input.block || null, input.pincode || null, input.isRural ?? true, input.preferredLanguage || 'hi', input.hasConsented ?? false]
  );
  return result.rows[0];
}

async function seedJsonTable(pool: any, table: string, items: any[]) {
  for (const item of items) await pool.query(`INSERT INTO ${table} (id,data) VALUES ($1,$2::jsonb) ON CONFLICT (id) DO NOTHING`, [item.id, JSON.stringify(item)]);
}

async function seedProfile(pool: any, userId: string, profile: any) {
  await pool.query(`INSERT INTO beneficiary_profiles (user_id,profile) VALUES ($1,$2::jsonb) ON CONFLICT (user_id) DO NOTHING`, [userId, JSON.stringify(profile)]);
}

async function seedMilestones(pool: any, userId: string) {
  for (const [key, step, title, description, status] of DEFAULT_MILESTONES) {
    await pool.query(`INSERT INTO progress_milestones (user_id,key,step,title,description,status) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (user_id,key) DO NOTHING`, [userId, key, step, title, description, status]);
  }
}

export async function createUser(db: DatabaseState, input: any, password: string) {
  if (db.mode === 'memory') return createMemoryUser(input, password);
  return createDbUser(db.pool, input, password);
}

export async function findUserByIdentifier(db: DatabaseState, identifier: string) {
  if (db.mode === 'memory') {
    ensureMemorySeed();
    return [...memory.users.values()].find(u => u.mobile === identifier || u.email?.toLowerCase() === identifier.toLowerCase()) || null;
  }
  const result = await db.pool.query('SELECT * FROM users WHERE mobile=$1 OR LOWER(email)=LOWER($1) LIMIT 1', [identifier]);
  return result.rows[0] || null;
}

export async function findUserById(db: DatabaseState, id: string) {
  if (db.mode === 'memory') { ensureMemorySeed(); return memory.users.get(id) || null; }
  const result = await db.pool.query('SELECT * FROM users WHERE id=$1', [id]);
  return result.rows[0] || null;
}

export async function getProfile(db: DatabaseState, userId: string) {
  if (db.mode === 'memory') { ensureMemorySeed(); return memory.profiles.get(userId) || { userId }; }
  const result = await db.pool.query('SELECT profile FROM beneficiary_profiles WHERE user_id=$1', [userId]);
  return result.rows[0]?.profile || { userId };
}

export async function upsertProfile(db: DatabaseState, userId: string, updates: any) {
  const current = await getProfile(db, userId);
  const merged = { ...current, ...updates, userId };
  if (db.mode === 'memory') { memory.profiles.set(userId, merged); return merged; }
  const result = await db.pool.query(`INSERT INTO beneficiary_profiles(user_id,profile,updated_at) VALUES($1,$2::jsonb,NOW()) ON CONFLICT(user_id) DO UPDATE SET profile=$2::jsonb,updated_at=NOW() RETURNING profile`, [userId, JSON.stringify(merged)]);
  return result.rows[0].profile;
}

export async function updateUserConsent(db: DatabaseState, userId: string, consent: any) {
  if (db.mode === 'memory') {
    const u = memory.users.get(userId); if (u) { u.has_consented = Boolean(consent.granted); memory.users.set(userId, u); }
    memory.consents.set(userId, { userId, grantedAt: consent.granted ? new Date().toISOString() : null, ...consent });
    return memory.consents.get(userId);
  }
  await db.pool.query('UPDATE users SET has_consented=$1 WHERE id=$2', [Boolean(consent.granted), userId]);
  const result = await db.pool.query(`INSERT INTO consent_records(user_id,granted_at,revoked_at,share_with_training,share_with_employers,share_with_schemes,voice_analysis) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`, [userId, consent.granted ? new Date() : null, consent.granted ? null : new Date(), Boolean(consent.shareWithTraining), Boolean(consent.shareWithEmployers), Boolean(consent.shareWithSchemes), Boolean(consent.voiceAnalysis)]);
  return result.rows[0];
}

export async function getConsent(db: DatabaseState, userId: string) {
  if (db.mode === 'memory') return memory.consents.get(userId) || null;
  const result = await db.pool.query('SELECT * FROM consent_records WHERE user_id=$1 ORDER BY id DESC LIMIT 1', [userId]);
  return result.rows[0] || null;
}

export async function getApplications(db: DatabaseState, userId: string) {
  if (db.mode === 'memory') return memory.applications.filter(a => a.userId === userId);
  const result = await db.pool.query('SELECT id,user_id AS "userId",opportunity_type AS "opportunityType",opportunity_id AS "opportunityId",opportunity_title AS "opportunityTitle",provider_or_employer AS "providerOrEmployer",applied_date AS "appliedDate",status,remarks,center_address AS "centerAddress",next_action_date AS "nextActionDate" FROM applications WHERE user_id=$1 ORDER BY applied_date DESC', [userId]);
  return result.rows;
}

export async function createApplication(db: DatabaseState, userId: string, app: any) {
  const id = `APP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const record = { ...app, id, userId, appliedDate: new Date().toISOString().split('T')[0], status: 'Submitted' };
  if (db.mode === 'memory') { memory.applications.unshift(record); return record; }
  const result = await db.pool.query(`INSERT INTO applications(id,user_id,opportunity_type,opportunity_id,opportunity_title,provider_or_employer,applied_date,status,remarks,center_address,next_action_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id,user_id AS "userId",opportunity_type AS "opportunityType",opportunity_id AS "opportunityId",opportunity_title AS "opportunityTitle",provider_or_employer AS "providerOrEmployer",applied_date AS "appliedDate",status,remarks,center_address AS "centerAddress",next_action_date AS "nextActionDate"`, [id,userId,app.opportunityType,app.opportunityId,app.opportunityTitle,app.providerOrEmployer || null,record.appliedDate,'Submitted',app.remarks || 'Application received and mapped to the appropriate coordinator.',app.centerAddress || null,app.nextActionDate || 'Within 3 working days']);
  return result.rows[0];
}

export async function getMilestones(db: DatabaseState, userId: string) {
  if (db.mode === 'memory') { ensureMemorySeed(); return memory.milestones.get(userId) || []; }
  const result = await db.pool.query('SELECT step,key,title,description,status,completed_date AS "completedDate" FROM progress_milestones WHERE user_id=$1 ORDER BY step', [userId]);
  return result.rows;
}

export async function updateMilestoneRecord(db: DatabaseState, userId: string, key: string, status: string) {
  if (db.mode === 'memory') {
    const list = memory.milestones.get(userId) || [];
    const item = list.find(x => x.key === key); if (item) { item.status = status; if (status === 'completed') item.completedDate = new Date().toISOString().split('T')[0]; }
    memory.milestones.set(userId, list); return item;
  }
  const result = await db.pool.query('UPDATE progress_milestones SET status=$1,completed_date=CASE WHEN $1=\'completed\' THEN CURRENT_DATE ELSE completed_date END WHERE user_id=$2 AND key=$3 RETURNING step,key,title,description,status,completed_date AS "completedDate"', [status,userId,key]);
  return result.rows[0] || null;
}

export async function getJsonCollection(db: DatabaseState, table: string, filters: { sector?: string; district?: string; q?: string } = {}) {
  if (db.mode === 'memory') {
    const source: Record<string, any[]> = {
      training_programs: MOCK_TRAINING_PROGRAMS, job_opportunities: MOCK_JOBS, self_employment_opportunities: MOCK_SELF_EMPLOYMENT,
      government_schemes: MOCK_SCHEMES, local_market_clusters: MOCK_LOCAL_CLUSTERS,
    };
    let data = [...(source[table] || [])];
    const q = filters.q?.toLowerCase();
    if (filters.sector) data = data.filter((x: any) => JSON.stringify(x).toLowerCase().includes(filters.sector!.toLowerCase()));
    if (filters.district) data = data.filter((x: any) => JSON.stringify(x).toLowerCase().includes(filters.district!.toLowerCase()));
    if (q) data = data.filter((x: any) => JSON.stringify(x).toLowerCase().includes(q));
    return data;
  }
  const result = await db.pool.query(`SELECT data FROM ${table}`);
  let data = result.rows.map((r: any) => r.data);
  const q = filters.q?.toLowerCase();
  if (filters.sector) data = data.filter((x: any) => JSON.stringify(x).toLowerCase().includes(filters.sector!.toLowerCase()));
  if (filters.district) data = data.filter((x: any) => JSON.stringify(x).toLowerCase().includes(filters.district!.toLowerCase()));
  if (q) data = data.filter((x: any) => JSON.stringify(x).toLowerCase().includes(q));
  return data;
}

export async function saveAssessment(db: DatabaseState, userId: string, result: any, answers: any[]) {
  if (db.mode === 'memory') { memory.assessments.unshift({ id: result.id, userId, result, answers, completedAt: new Date().toISOString() }); return; }
  await db.pool.query('INSERT INTO assessment_results(id,user_id,result) VALUES($1,$2,$3::jsonb)', [result.id,userId,JSON.stringify(result)]);
  for (const answer of answers) await db.pool.query('INSERT INTO assessment_answers(assessment_id,question_id,option_id,score,skill_tags) VALUES($1,$2,$3,$4,$5::jsonb)', [result.id,answer.questionId,answer.optionId,answer.score,JSON.stringify(answer.skillTags || [])]);
}


export async function getSavedOpportunities(db: DatabaseState, userId: string) {
  if (db.mode === 'memory') return [...(memory.saved.get(userId) || new Set<string>())];
  const result = await db.pool.query('SELECT opportunity_id AS "opportunityId" FROM saved_opportunities WHERE user_id=$1 ORDER BY saved_at DESC', [userId]);
  return result.rows.map((x: any) => x.opportunityId);
}

export async function toggleSavedOpportunity(db: DatabaseState, userId: string, opportunityId: string) {
  if (db.mode === 'memory') {
    const set = memory.saved.get(userId) || new Set<string>();
    if (set.has(opportunityId)) { set.delete(opportunityId); } else { set.add(opportunityId); }
    memory.saved.set(userId, set);
    return set.has(opportunityId);
  }
  const existing = await db.pool.query('SELECT 1 FROM saved_opportunities WHERE user_id=$1 AND opportunity_id=$2', [userId, opportunityId]);
  if (existing.rowCount) {
    await db.pool.query('DELETE FROM saved_opportunities WHERE user_id=$1 AND opportunity_id=$2', [userId, opportunityId]);
    return false;
  }
  await db.pool.query('INSERT INTO saved_opportunities(user_id,opportunity_id) VALUES($1,$2)', [userId, opportunityId]);
  return true;
}

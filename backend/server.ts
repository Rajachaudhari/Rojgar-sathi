import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import {
  ADMIN_USER_ID,
  createApplication,
  createToken,
  createUser,
  findUserById,
  findUserByIdentifier,
  getApplications,
  getConsent,
  getJsonCollection,
  getMilestones,
  getProfile,
  getSavedOpportunities,
  toggleSavedOpportunity,
  initDatabase,
  publicUser,
  saveAssessment,
  updateMilestoneRecord,
  updateUserConsent,
  upsertProfile,
  verifyPassword,
  verifyToken,
} from './server/db.js';

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(express.json({ limit: '2mb' }));
app.use((req, res, next) => {
  const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

let db: Awaited<ReturnType<typeof initDatabase>>;

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.header('Authorization');
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication required' });
  const payload = verifyToken(header.slice(7));
  if (!payload?.userId) return res.status(401).json({ message: 'Invalid or expired token' });
  const user = await findUserById(db, payload.userId);
  if (!user) return res.status(401).json({ message: 'User not found' });
  (req as any).auth = { userId: user.id, role: user.role };
  next();
};

const optionalAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.header('Authorization');
  if (header?.startsWith('Bearer ')) {
    const payload = verifyToken(header.slice(7));
    if (payload?.userId) (req as any).auth = payload;
  }
  next();
};


async function fetchConfiguredApi(envName: string, pathSuffix = ''): Promise<{ data: any[]; source: string } | null> {
  const baseUrl = process.env[envName];
  if (!baseUrl) return null;
  try {
    const url = `${baseUrl.replace(/\/$/, '')}${pathSuffix}`;
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (process.env.EXTERNAL_API_KEY) headers.Authorization = `Bearer ${process.env.EXTERNAL_API_KEY}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`External API returned ${response.status}`);
    const body = await response.json();
    const data = Array.isArray(body) ? body : Array.isArray(body.data) ? body.data : [];
    return { data, source: `${envName} external API` };
  } catch (error) {
    console.warn(`[API] ${envName} failed; using database fallback:`, error);
    return null;
  }
}

async function generateGeminiReply(message: string, language: string, currentProfile: any): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const prompt = `You are a multilingual livelihood assistant for a Rojgar Sathi prototype. Answer only about skills, training, employment, self-employment and relevant government-scheme navigation. Do not invent eligibility, benefits, vacancies or government facts. If a fact is not available in the supplied profile/data, say that official verification is required. Reply in ${language === 'hi' ? 'simple Hindi/Hinglish' : 'simple English'}.
Profile: ${JSON.stringify(currentProfile)}
User: ${message}`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text?.trim() || null;
  } catch (error) {
    console.warn('[AI] Gemini unavailable; using local rule engine:', error);
    return null;
  }
}

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).auth?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};

app.get('/api/health', async (_req, res) => {
  res.json({
    ok: true,
    database: db?.mode || 'starting',
    ai: process.env.GEMINI_API_KEY ? 'gemini-configured' : 'mock-rule-engine',
    externalApis: {
      training: Boolean(process.env.TRAINING_API_URL),
      jobs: Boolean(process.env.JOBS_API_URL),
      schemes: Boolean(process.env.SCHEMES_API_URL),
    },
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/integrations/status', (_req, res) => {
  res.json({
    database: db?.mode || 'starting',
    ai: { provider: process.env.GEMINI_API_KEY ? 'gemini' : 'mock', configured: Boolean(process.env.GEMINI_API_KEY) },
    training: { configured: Boolean(process.env.TRAINING_API_URL) },
    jobs: { configured: Boolean(process.env.JOBS_API_URL) },
    schemes: { configured: Boolean(process.env.SCHEMES_API_URL) },
  });
});

// ---------- Authentication ----------
app.post('/api/auth/login', async (req, res) => {
  try {
    const { mobileOrEmail, mobile, email, password } = req.body || {};
    const identifier = mobileOrEmail || mobile || email;
    if (!identifier || !password) return res.status(400).json({ message: 'Mobile/email and password are required' });

    const user = await findUserByIdentifier(db, String(identifier).trim());
    if (!user || !verifyPassword(String(password), user.password_hash)) {
      return res.status(401).json({ message: 'Invalid mobile/email or password' });
    }

    const token = createToken({ userId: user.id, role: user.role });
    return res.json({ token, user: publicUser(user), message: 'Login successful' });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login failed', detail: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, mobile, email, age, gender, state, district, block, pincode, password, preferredLanguage = 'hi' } = req.body || {};
    if (!name || !mobile || !password) return res.status(400).json({ message: 'Name, mobile and password are required' });
    if (!/^\d{10}$/.test(String(mobile))) return res.status(400).json({ message: 'Mobile number must be exactly 10 digits' });
    if (String(password).length < 6) return res.status(400).json({ message: 'Password must contain at least 6 characters' });

    const existing = await findUserByIdentifier(db, String(mobile));
    if (existing) return res.status(409).json({ message: 'Mobile number is already registered' });
    if (email) {
      const existingEmail = await findUserByIdentifier(db, String(email));
      if (existingEmail) return res.status(409).json({ message: 'Email is already registered' });
    }

    const id = `USR-${Date.now().toString(36).toUpperCase()}`;
    const user = await createUser(db, {
      id, name: String(name).trim(), mobile: String(mobile), email: email || null, age: Number(age || 22), gender: gender || 'male',
      role: 'beneficiary', state: state || 'Uttar Pradesh', district: district || 'Varanasi', block: block || null,
      pincode: pincode || null, isRural: true, preferredLanguage, hasConsented: false,
    }, String(password));

    await upsertProfile(db, id, { userId: id, name: String(name).trim() });
    const token = createToken({ userId: user.id, role: user.role });
    return res.status(201).json({ token, user: publicUser(user), message: 'Beneficiary registered successfully' });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Registration failed', detail: error.message });
  }
});

app.post('/api/auth/logout', (_req, res) => res.json({ message: 'Logged out successfully' }));

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  const user = await findUserById(db, (req as any).auth.userId);
  res.json(publicUser(user));
});

// ---------- Profile ----------
app.get('/api/profile', authMiddleware, async (req, res) => {
  const user = await findUserById(db, (req as any).auth.userId);
  const profile = await getProfile(db, (req as any).auth.userId);
  res.json({ user: publicUser(user), profile });
});

app.put('/api/profile', authMiddleware, async (req, res) => {
  const userId = (req as any).auth.userId;
  const profile = await upsertProfile(db, userId, req.body || {});
  res.json({ profile, message: 'Profile updated and stored successfully' });
});

// ---------- Training / Jobs / Schemes / Market ----------
app.get('/api/training', async (req, res) => {
  const external = await fetchConfiguredApi('TRAINING_API_URL');
  if (external) return res.json({ data: external.data, total: external.data.length, source: external.source });
  const data = await getJsonCollection(db, 'training_programs', { sector: String(req.query.sector || ''), district: String(req.query.district || ''), q: String(req.query.q || '') });
  res.json({ data, total: data.length, source: db.mode === 'postgres' ? 'PostgreSQL seeded registry / API adapter' : 'Demo Mock Data (configure DATABASE_URL for PostgreSQL)' });
});
app.get('/api/training/:id', async (req, res) => {
  const data = await getJsonCollection(db, 'training_programs');
  const item = data.find((x: any) => x.id === req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: 'Course not found' });
});

app.get('/api/jobs', async (req, res) => {
  const external = await fetchConfiguredApi('JOBS_API_URL');
  if (external) return res.json({ data: external.data, source: external.source });
  const data = await getJsonCollection(db, 'job_opportunities', { sector: String(req.query.sector || ''), district: String(req.query.district || ''), q: String(req.query.q || '') });
  res.json({ data, source: db.mode === 'postgres' ? 'PostgreSQL job registry / API adapter' : 'Demo Mock Data (National Career Service adapter)' });
});
app.get('/api/jobs/:id', async (req, res) => {
  const data = await getJsonCollection(db, 'job_opportunities');
  const item = data.find((x: any) => x.id === req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: 'Job not found' });
});

app.get('/api/self-employment', async (_req, res) => res.json({ data: await getJsonCollection(db, 'self_employment_opportunities'), source: 'Rojgar Sathi enterprise guidance adapter' }));
app.get('/api/schemes', async (_req, res) => { const external = await fetchConfiguredApi('SCHEMES_API_URL'); if (external) return res.json(external); return res.json({ data: await getJsonCollection(db, 'government_schemes'), source: 'Government scheme information adapter' }); });
app.get('/api/local-opportunities', async (_req, res) => res.json(await getJsonCollection(db, 'local_market_clusters')));
app.get('/api/location', async (req, res) => {
  const data = await getJsonCollection(db, 'local_market_clusters', { district: String(req.query.district || '') });
  res.json(data[0] || null);
});

// ---------- AI ----------
app.post('/api/ai/chat', optionalAuth, async (req, res) => {
  const { message = '', language = 'hi', currentProfile = {} } = req.body || {};
  const lower = String(message).toLowerCase();
  const isHindi = language === 'hi';
  const geminiReply = await generateGeminiReply(String(message), String(language), currentProfile);
  let replyText = geminiReply || (isHindi
    ? 'नमस्ते! मैं आपकी शिक्षा, कौशल, रुचि और स्थान के आधार पर प्रशिक्षण, रोजगार और आजीविका के विकल्प खोजने में मदद कर सकता हूँ।'
    : 'Namaste! I can help you find training, employment and livelihood options based on your education, skills, interests and location.');
  let extractedProfileUpdates: any = undefined;

  if (lower.includes('solar') || lower.includes('सोलर') || lower.includes('बिजली') || lower.includes('electric')) {
    replyText = isHindi
      ? 'सोलर और इलेक्ट्रिकल क्षेत्र आपके लिए एक संभावित pathway है। मैं आपके जिले के प्रशिक्षण और नौकरी विकल्प दिखा सकता हूँ।'
      : 'Solar and electrical work may be a relevant pathway. I can show training and job options available for your district.';
    extractedProfileUpdates = {
      existingSkills: Array.from(new Set([...(currentProfile.existingSkills || []), 'Electrical Repair'])),
      interests: Array.from(new Set([...(currentProfile.interests || []), 'Solar & Renewable Energy'])),
    };
  } else if (lower.includes('computer') || lower.includes('कंप्यूटर') || lower.includes('data entry')) {
    replyText = isHindi
      ? 'डिजिटल सेवाएं और डेटा एंट्री आपके लिए संभावित विकल्प हैं। मैं संबंधित प्रशिक्षण और स्थानीय अवसर खोज सकता हूँ।'
      : 'Digital services and data entry may be relevant options. I can find related training and local opportunities.';
    extractedProfileUpdates = { interests: Array.from(new Set([...(currentProfile.interests || []), 'IT & Digital Services'])) };
  } else if (lower.includes('tailor') || lower.includes('सिलाई') || lower.includes('boutique')) {
    replyText = isHindi
      ? 'सिलाई और गारमेंट क्षेत्र में प्रशिक्षण या self-employment विकल्प देखे जा सकते हैं।'
      : 'Training and self-employment options in tailoring and garments can be explored.';
    extractedProfileUpdates = { interests: Array.from(new Set([...(currentProfile.interests || []), 'Apparel & Garments'])) };
  }

  res.json({
    message: replyText,
    suggestedReplies: isHindi ? ['मेरे जिले की ट्रेनिंग दिखाएं', 'नौकरी के विकल्प दिखाएं', 'अपना प्रोफाइल बनाना है'] : ['Show training in my district', 'Show job options', 'Build my profile'],
    extractedProfileUpdates,
    confidenceScore: 0.9,
  });
});


// ---------- Personalized recommendations ----------
app.get('/api/recommendations', authMiddleware, async (req, res) => {
  const userId = (req as any).auth.userId;
  const profile: any = await getProfile(db, userId);
  const [training, jobs, selfEmployment] = await Promise.all([
    getJsonCollection(db, 'training_programs'),
    getJsonCollection(db, 'job_opportunities'),
    getJsonCollection(db, 'self_employment_opportunities'),
  ]);
  const skills = [...(profile.existingSkills || []), ...(profile.technicalSkills || [])].map((x: string) => x.toLowerCase());
  const interests = (profile.interests || []).map((x: string) => x.toLowerCase());
  const district = String((profile.preferredWorkLocation === 'local_district' ? profile.district : '') || '').toLowerCase();
  const score = (item: any) => {
    const text = JSON.stringify(item).toLowerCase();
    const skillHits = skills.filter(s => s && text.includes(s)).length;
    const interestHits = interests.filter(i => i && text.includes(i)).length;
    const locationHit = district && text.includes(district) ? 15 : 5;
    return Math.min(99, Math.round(Math.min(30, skillHits * 10) + Math.min(20, interestHits * 7) + 20 + locationHit + 15));
  };
  res.json({
    training: training.map((x: any) => ({ ...x, matchPercentage: score(x) })).sort((a: any,b: any) => b.matchPercentage-a.matchPercentage),
    jobs: jobs.map((x: any) => ({ ...x, matchPercentage: score(x) })).sort((a: any,b: any) => b.matchPercentage-a.matchPercentage),
    selfEmployment: selfEmployment.map((x: any) => ({ ...x, matchPercentage: score(x) })).sort((a: any,b: any) => b.matchPercentage-a.matchPercentage),
  });
});

// ---------- Assessment ----------
app.post('/api/assessment/complete', authMiddleware, async (req, res) => {
  const userId = (req as any).auth.userId;
  const { result, answers = [] } = req.body || {};
  if (!result?.id) return res.status(400).json({ message: 'Assessment result is required' });
  await saveAssessment(db, userId, { ...result, userId }, answers);
  if (result.currentSkillLevel) await upsertProfile(db, userId, { currentSkillLevel: result.currentSkillLevel, existingSkills: result.strongSkills || [] });
  await updateMilestoneRecord(db, userId, 'assessment_completed', 'completed');
  res.status(201).json({ message: 'Assessment saved successfully', result });
});

// ---------- Applications / Progress ----------
app.get('/api/applications', authMiddleware, async (req, res) => res.json(await getApplications(db, (req as any).auth.userId)));
app.post('/api/applications', authMiddleware, async (req, res) => {
  const record = await createApplication(db, (req as any).auth.userId, req.body || {});
  await updateMilestoneRecord(db, (req as any).auth.userId, 'application_submitted', 'completed');
  res.status(201).json(record);
});
app.get('/api/progress', authMiddleware, async (req, res) => res.json(await getMilestones(db, (req as any).auth.userId)));
app.put('/api/progress/:key', authMiddleware, async (req, res) => {
  const item = await updateMilestoneRecord(db, (req as any).auth.userId, req.params.key, req.body.status);
  res.json(item);
});

// ---------- Saved opportunities ----------
app.get('/api/saved-opportunities', authMiddleware, async (req, res) => {
  const userId = (req as any).auth.userId;
  res.json(await getSavedOpportunities(db, userId));
});
app.post('/api/saved-opportunities/:id/toggle', authMiddleware, async (req, res) => {
  const userId = (req as any).auth.userId;
  const saved = await toggleSavedOpportunity(db, userId, req.params.id);
  res.json({ saved, opportunityId: req.params.id });
});

// ---------- Consent ----------
app.get('/api/consent', authMiddleware, async (req, res) => res.json(await getConsent(db, (req as any).auth.userId)));
app.post('/api/consent', authMiddleware, async (req, res) => {
  const record = await updateUserConsent(db, (req as any).auth.userId, req.body || {});
  res.json({ message: 'Consent preferences stored successfully', record });
});

// ---------- Admin ----------
app.get('/api/admin/dashboard', authMiddleware, requireAdmin, async (_req, res) => {
  if (db.mode === 'memory') {
    return res.json({ totalBeneficiaries: 1, assessmentsCompleted: 1, activeTrainingEnrollments: 1, certifiedGraduates: 0, placedInWageEmployment: 0, dropoutRate: '0%' });
  }
  const [users, assessments, applications] = await Promise.all([
    db.pool.query("SELECT COUNT(*)::int AS count FROM users WHERE role='beneficiary'"),
    db.pool.query('SELECT COUNT(*)::int AS count FROM assessment_results'),
    db.pool.query("SELECT COUNT(*)::int AS count FROM applications WHERE opportunity_type='training' AND status IN ('Submitted','Document Verification','Approved / Enrolled')"),
  ]);
  res.json({ totalBeneficiaries: users.rows[0].count, assessmentsCompleted: assessments.rows[0].count, activeTrainingEnrollments: applications.rows[0].count, certifiedGraduates: 0, placedInWageEmployment: 0, dropoutRate: '—' });
});

// ---------- Vite / production ----------
async function startServer() {
  db = await initDatabase();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rojgar Sathi — AI Livelihood Assistant running on http://localhost:${PORT}`);
    console.log(`[DB] ${db.mode === 'postgres' ? 'PostgreSQL connected' : 'Demo memory mode'}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

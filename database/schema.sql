-- Rojgar Sathi — AI Livelihood Assistant
-- The application also runs this schema automatically at server startup.

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
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  opportunity_type TEXT NOT NULL,
  opportunity_id TEXT NOT NULL,
  opportunity_title TEXT NOT NULL,
  provider_or_employer TEXT,
  applied_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'Submitted',
  remarks TEXT,
  center_address TEXT,
  next_action_date TEXT
);

CREATE TABLE IF NOT EXISTS consent_records (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  share_with_training BOOLEAN NOT NULL DEFAULT FALSE,
  share_with_employers BOOLEAN NOT NULL DEFAULT FALSE,
  share_with_schemes BOOLEAN NOT NULL DEFAULT FALSE,
  voice_analysis BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS progress_milestones (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  step INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  completed_date DATE,
  PRIMARY KEY (user_id, key)
);

CREATE TABLE IF NOT EXISTS saved_opportunities (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  opportunity_id TEXT NOT NULL,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, opportunity_id)
);

CREATE TABLE IF NOT EXISTS assessment_results (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  result JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS assessment_answers (
  id BIGSERIAL PRIMARY KEY,
  assessment_id TEXT NOT NULL REFERENCES assessment_results(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  option_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  skill_tags JSONB NOT NULL DEFAULT '[]'::jsonb
);

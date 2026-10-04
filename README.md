# Rojgar Sathi — AI Livelihood Assistant

This project is split into:
- `frontend/` — React + Vite UI
- `backend/` — Express REST API + PostgreSQL integration
- `database/` — PostgreSQL schema and setup guide

## Run locally

### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Set your PostgreSQL `DATABASE_URL` in `backend/.env`.

### Frontend
Open another terminal:
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:4000  
Health check: http://localhost:4000/api/health

## Database
Create `rojgar_sathi` PostgreSQL database and follow `database/README.md`.
The backend automatically creates the tables and seeds demo data when PostgreSQL is connected.

## Demo accounts
- Beneficiary mobile: `9876543210`, password: `demo`
- Admin mobile: `9999999999`, password: `admin`

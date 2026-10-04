# Rojgar Sathi PostgreSQL Database

## 1. Create database
```sql
CREATE DATABASE rojgar_sathi;
```

## 2. Connect to `rojgar_sathi`
Run `schema.sql`.

The backend also runs the same schema automatically when `DATABASE_URL` is configured.

## 3. Backend `.env`
Set:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/rojgar_sathi
DATABASE_SSL=false
```

For Render/Neon/Supabase, use the provider's PostgreSQL connection string and set `DATABASE_SSL=true` if required.

## 4. Verify
Start backend and open:
`http://localhost:4000/api/health`

You should see `database: "postgres"` when PostgreSQL is connected.

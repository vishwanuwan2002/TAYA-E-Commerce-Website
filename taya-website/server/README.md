# Server (SQL Migration)

This backend now supports a SQL-first flow using Prisma + SQLite for core modules:
- Auth (`/api/auth/*`)
- Admin Products (`/api/admin/products/*`)
- Admin Orders (`/api/admin/orders/*`)
- Feature Images (`/api/common/feature/*`)

## Prerequisites
- Node.js 18+

## Quick Setup
```bash
cd server
npm install
npm run db:setup
npm run dev
```

## Environment
Default local `.env` values:
- `PORT=5000`
- `CLIENT_ORIGIN=http://localhost:5173`
- `DATABASE_URL="file:./prisma/dev.db"`
- `JWT_SECRET="CLIENT_SECRET_KEY"`

## SQL Helpers
- Generate Prisma client:
```bash
npm run prisma:generate
```
- Push schema to DB:
```bash
npm run prisma:push
```
- Seed starter data:
```bash
npm run db:seed
```

## Health Check
```bash
curl http://localhost:5000/api/health
```

## Notes
- Some shop flows may still rely on existing non-SQL helpers/controllers and can be migrated incrementally.
- MongoDB connection remains optional and only activates when `MONGODB_URI` is set.

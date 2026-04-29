# PREDA — AI Football Match Analyzer (Landing)

Marketing site for **PREDA**, an AI multi-agent football match analyzer (in early access). The product turns broadcast or academy match video into a clear performance report — player tracking, events, physical stats, and plain-English Q&A — at a fraction of the price of enterprise tools.

This repository contains:

- `frontend/` — React landing page (3D hero, interactive preview, FAQ accordion, optional 6-question feedback survey, waitlist).
- `backend/` — FastAPI service that persists feedback and waitlist signups to MongoDB.

## Tech stack

- React 19 + Tailwind CSS + shadcn/ui + framer-motion + @react-three/fiber
- FastAPI + Motor (async MongoDB)
- MongoDB (Atlas in production)

## Local development

```bash
# Backend
cd backend
cp .env.example .env   # fill MONGO_URL, DB_NAME, CORS_ORIGINS
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001

# Frontend (separate terminal)
cd frontend
cp .env.example .env   # fill REACT_APP_BACKEND_URL=http://localhost:8001
yarn install
yarn start
```

## Deployment

See [`DEPLOY.md`](./DEPLOY.md) for a full walkthrough — frontend on **Cloudflare Pages**, backend on **Railway**, database on **MongoDB Atlas**.

## Status

- v0.1 — Early access landing page (current).
- v1 — Hosted product with auto reports + plain-English Q&A.
- v2 — Real-time mode, calibrated meters, local-first option, more event types, full web dashboard.

---

© PREDA. All rights reserved. This is a private repository — not open source.

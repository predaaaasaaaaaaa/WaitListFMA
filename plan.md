# plan.md — PREDA Landing Page (Premium 3D)

## Objectives
- Ship a clean, modern, premium AI×football landing page for **PREDA** (in development) with a striking 3D experience.
- Explain value clearly (Opta/StatsBomb-level ambition at ~20× lower cost; replaces manual analysis).
- Provide an **interactive preview** that visually demonstrates “video → insights → report/Q&A” (simulation, not real AI).
- Include **FAQ accordion**, **optional 6-question feedback survey** saved to MongoDB, and a **waitlist**.
- Ensure fully responsive UX and Cloudflare-friendly build/deploy readiness.

**Current status:** Phase 2 is complete and validated end-to-end. Remaining work is optional Phase 3 enhancements and deployment hardening.

## Phase 1 — Core POC (SKIPPED)
- Rationale: App is landing-page + simple form persistence; Mongo CRUD is standard and template-backed; no external AI/LLM integration required.

## Phase 2 — V1 App Development (Landing Page + Feedback Persistence) ✅ COMPLETE

### User stories (V1)
1. As a visitor, I immediately understand what PREDA does and why it matters within 10 seconds.
2. As a visitor, I can watch an interactive preview that *feels real* (events feed, heatmap, stats) without needing to upload anything.
3. As a visitor, I can skim the 6-agent system explained in non-technical language.
4. As a visitor, I can browse an FAQ accordion to remove doubts quickly.
5. As a visitor, I can optionally submit the 6-question survey and see a clear success confirmation.
6. As a visitor on mobile, the experience remains fast and beautiful (3D gracefully degrades if needed).

### Implementation steps (what shipped)
**A) UX/Design build (premium + 3D)** ✅
- Visual system implemented: premium “stadium night” base, neon turf greens + ocean-blue accents (no purple), glass/HUD cards, tactical grid.
- Typography implemented (Space Grotesk + Inter + IBM Plex Mono) in `/app/frontend/src/index.css`.
- Hero 3D: @react-three/fiber v9 animated tactical pitch + 22 player dots + ball + particle field.
  - **Important implementation detail:** Canvas scene is written **without JSX** (uses `React.createElement` via `h(...)`) to bypass a babel-injected source-prop / visual-edits conflict that previously crashed R3F.
  - Graceful fallback: SVG pitch shown on small screens and `prefers-reduced-motion`.
- Motion polish: framer-motion section reveals + micro-interactions.
- Sticky translucent navbar with smooth-scroll anchors + mobile drawer.
- Single-page sections delivered:
  1) Navbar (sticky) + CTA (Join the waitlist)
  2) Hero (3D) + value prop + CTAs
  3) Problem
  4) How it works (5-step pipeline)
  5) Interactive Preview (simulated dashboard: counters, score strip, possession bar, CSS heatmap, event ticker, players table; tabs Overview/Events/Players)
  6) “6 AI Agents” cards (non-technical)
  7) Features bento grid
  8) Comparison (PREDA vs Opta vs StatsBomb)
  9) Roadmap (Now / Next V2)
  10) FAQ accordion (9 items)
  11) Feedback Survey module (optional 6 questions, multi-step with Skip)
  12) Waitlist CTA (with live counters)
  13) Footer

**B) Backend (FastAPI + MongoDB)** ✅
- Data models:
  - `FeedbackSubmission`: 6 optional string fields + optional email + metadata (`id`, `created_at`, `source`).
  - `WaitlistSignup`: `email` (required) + optional role + metadata (`id`, `created_at`, `source`).
- Endpoints (under `/api`) shipped:
  - `POST /feedback` save submission (requires at least one non-empty field; otherwise 400)
  - `GET /feedback` list submissions
  - `POST /waitlist` save email (idempotent; dedup by email; server validates with `EmailStr`)
  - `GET /waitlist` list signups
  - `GET /stats` return counts (`feedback_count`, `waitlist_count`)
  - `GET /health` health check

**C) Frontend ↔ Backend wiring** ✅
- Axios client in `/app/frontend/src/lib/api.js` wired via `REACT_APP_BACKEND_URL`.
- Feedback survey:
  - Optional fields, multi-step UX with progress bar, Skip/Back/Next.
  - Client-side check prevents empty submit; backend enforces too.
  - Success state + toast via `sonner`.
- Waitlist:
  - Email validation + idempotent signup.
  - Success state + toast.
  - Live social proof counters fetched via `/api/stats`.

**D) Performance + responsiveness** ✅
- 3D quality levels:
  - Full 3D on desktop.
  - SVG fallback on small screens and reduced-motion.
- Fixed one discovered UI bug: hero background overlay intercepting CTA clicks (added `pointer-events-none`).

### End-of-phase validation ✅
- `testing_agent_v3` executed end-to-end regression:
  - Backend: 11/11 passed.
  - Frontend: 19/20 passed initially; the single medium issue (hero overlay intercepting clicks) was fixed.
- Manual verification:
  - Hero CTAs and navbar anchors scroll correctly.
  - Feedback and waitlist submissions persist and counters update.
  - No runtime error overlays present.

## Phase 3 — Enhancements (post-V1, optional)

### User stories (Enhancements)
1. As a visitor, I can share a link that opens at a specific section (deep links).
2. As a maintainer, I can view feedback in a simple admin page (read-only) without touching DB tools.
3. As a visitor, I can see more realistic preview modes (choose match, toggle teams, filter events).
4. As a visitor, I can export the preview report as a styled PDF (sample).
5. As a maintainer, I can tag/label feedback entries for prioritization.
6. As a maintainer, I can receive email notifications on new feedback submissions.
7. As a visitor, I can optionally use an LLM-powered chatbot for FAQ-style questions.

### Implementation steps
- **Admin dashboard (optional):**
  - Add `/admin` UI to browse feedback and waitlist with basic filtering.
  - Add simple protection (token gate) for MVP.
- **Interactive preview upgrades:**
  - Add “scenes” (Physical / Events / Positions / Report) and richer filtering.
- **Deep links:**
  - Add hash-based deep linking and “copy link to section”.
- **Email notifications (optional):**
  - Send notifications on new feedback (e.g. Resend) and/or daily digest.
- **LLM chatbot (optional):**
  - Add an LLM-powered FAQ assistant (Emergent Universal Key) if desired.
- **3D variations (optional):**
  - Alternate hero mode: orbiting low-poly ball + data nodes; broadcast-style camera intro.
- **Deployment hardening:**
  - Cloudflare Pages build guidance and environment wiring.
  - Confirm CORS, API base URL, and caching headers.

### End-of-phase validation
- `testing_agent_v3` regression pass for admin, deep-links, preview modes, email flows, and responsiveness.

## Next Actions
1. Decide Phase 3 scope (admin dashboard, deep links, email notifications, LLM chatbot, preview upgrades).
2. Prepare Cloudflare deployment:
   - Frontend: `yarn build` → deploy to Cloudflare Pages.
   - Backend: deploy FastAPI to a Python host (e.g., Fly.io / Railway / Render). Set `REACT_APP_BACKEND_URL` to the deployed API origin.
   - MongoDB: keep `MONGO_URL` pointing to hosted Mongo (e.g., Atlas).
3. (Optional) Replace placeholder GitHub footer link with the real repo and add brand assets (logo/wordmark).

## Success Criteria
✅ Achieved for V1:
- Landing page loads fast, looks premium, and is fully responsive.
- 3D hero works on desktop with a graceful fallback for mobile/reduced-motion.
- Interactive preview communicates the product clearly.
- FAQ accordion works and covers core objections.
- Feedback survey saves to MongoDB reliably; user sees success state.
- Waitlist signup persists and counters render/update correctly.
- End-to-end test run passes without broken flows.

# plan.md — PREDA Landing Page (Premium 3D)

## Objectives
- Ship a clean, modern, premium AI×football landing page for **PREDA** (in development) with a striking 3D experience.
- Explain value clearly (Opta/StatsBomb-level ambition at ~20× lower cost; replaces manual analysis).
- Provide an **interactive preview** that visually demonstrates “video → insights → report/Q&A” (simulation, not real AI).
- Include **FAQ accordion** and an **optional 6-question feedback survey** saved to MongoDB.
- Ensure fully responsive UX and Cloudflare-friendly build/deploy readiness.

## Phase 1 — Core POC (SKIPPED)
- Rationale: App is landing-page + simple form persistence; Mongo CRUD is already standard and template-backed; no external AI/LLM integration required.

## Phase 2 — V1 App Development (Landing Page + Feedback Persistence)

### User stories (V1)
1. As a visitor, I immediately understand what PREDA does and why it matters within 10 seconds.
2. As a visitor, I can watch an interactive preview that *feels real* (events feed, heatmap, stats) without needing to upload anything.
3. As a visitor, I can skim the 6-agent system explained in non-technical language.
4. As a visitor, I can browse an FAQ accordion to remove doubts quickly.
5. As a visitor, I can optionally submit the 6-question survey and see a clear success confirmation.
6. As a visitor on mobile, the experience remains fast and beautiful (3D gracefully degrades if needed).

### Implementation steps
**A) UX/Design build (premium + 3D)**
- Define visual system: dark “stadium night” base, neon turf greens + electric blues, glassmorphism cards, bold typography.
- Hero: 3D scene (pitch grid + moving player dots + ball trail) using `@react-three/fiber/drei`.
- Motion polish: section transitions + micro-interactions with `framer-motion`.
- Single-page sections:
  1) Navbar (sticky) + primary CTA (Join Early Access)
  2) Hero (3D) + value prop + CTAs
  3) Problem (manual analytics is slow/expensive)
  4) How it works (5-step pipeline)
  5) Interactive Preview (simulated dashboard: stats counters, events timeline, mini heatmap)
  6) “6 AI Agents” cards (Vision, Ball, Teams, Events, Analytics, Reporting) described non-technically
  7) Features grid (reports, Q&A via Telegram, physical stats, events, affordability)
  8) Comparison block (PREDA vs Opta/StatsBomb: accessibility + cost narrative)
  9) Roadmap (V2 highlights: real-time, meter conversion, local LLM, more events, web dashboard)
  10) FAQ accordion (8+ items)
  11) Feedback Survey module (optional 6 questions)
  12) Footer (MIT, author credit, GitHub link placeholder)

**B) Backend (FastAPI + MongoDB)**
- Data models:
  - `FeedbackSubmission`: 6 optional string fields + metadata (`created_at`, `source`, `page_version`).
  - `WaitlistSignup`: `email` (required), `role` (optional), `created_at`.
- Endpoints (under `/api`):
  - `POST /feedback` save submission
  - `GET /feedback` list submissions (no auth for MVP; can be protected later)
  - `POST /waitlist` save email
  - `GET /stats` return counts (feedback_count, waitlist_count)
  - `GET /health` health check

**C) Frontend ↔ Backend wiring**
- Feedback form:
  - Optional fields, client-side validation (length, empty allowed), loading + success + error states.
  - Store submission timestamp client-side and show confirmation message.
- Waitlist CTA:
  - Email capture with proper validation + success state.
- Use `/api/stats` to show lightweight social proof (“X early signals collected”).

**D) Performance + responsiveness**
- Provide 3D quality levels:
  - Full 3D on desktop
  - Reduced motion / simplified canvas on mobile
  - Respect `prefers-reduced-motion`.
- Ensure good Lighthouse basics: compressed assets, lazy-load heavy sections.

### End-of-phase validation
- Run one full end-to-end pass with `testing_agent_v3`:
  - Submit feedback → stored in Mongo → listed via GET
  - Submit waitlist → stored → counts update
  - Verify FAQ works, interactive preview animates, and mobile layout is correct.

## Phase 3 — Enhancements (post-V1, optional)

### User stories (Enhancements)
1. As a visitor, I can share a link that opens at a specific section (deep links).
2. As a maintainer, I can view feedback in a simple admin page (read-only) without touching DB tools.
3. As a visitor, I can see more realistic preview modes (choose match, toggle teams, filter events).
4. As a visitor, I can export the preview report as a styled PDF (sample).
5. As a maintainer, I can tag/label feedback entries for prioritization.

### Implementation steps
- Add `/admin` (simple protected-by-token query param for MVP) to browse feedback + basic filtering.
- Expand interactive preview with “scenes”: Physical, Events, Positions, Report.
- Add shareable anchors + smooth-scroll.
- Optional: add basic rate limiting to feedback/waitlist endpoints.

### End-of-phase validation
- `testing_agent_v3` regression pass for forms, admin list, preview modes, and responsiveness.

## Next Actions
1. Confirm public-facing naming: keep **PREDA** + add subtitle (e.g., “AI Match Intelligence for Everyone”).
2. Confirm primary CTA wording: “Join Early Access” vs “Request a Demo”.
3. Start Phase 2 build: implement backend endpoints/models + landing page sections + 3D hero + preview.

## Success Criteria
- Landing page loads fast, looks premium, and is fully responsive.
- Interactive preview is smooth and clearly communicates the product.
- FAQ accordion works and covers core objections.
- Feedback survey saves to MongoDB reliably; user sees success state.
- Waitlist signup persists and counts render correctly.
- One full test run passes without broken flows.
# PREDA — Deployment Guide

This project ships in two pieces:

- **Frontend** (React, in `frontend/`) — deploy to **Cloudflare Pages**.
- **Backend** (FastAPI + MongoDB, in `backend/`) — deploy to a Python host (Railway / Render / Fly.io). Cloudflare Workers Python is still beta and is not currently a good fit for FastAPI + Motor.
- **Database** — use **MongoDB Atlas** (free tier is fine for early access).

This guide assumes a **private GitHub repo**.

---

## 0. Prepare your repo

From your project root:

```bash
git init
git add .
git commit -m "PREDA — initial commit"
git branch -M main
```

Create a **private** GitHub repo (e.g. `preda`) at <https://github.com/new>, then:

```bash
git remote add origin git@github.com:YOUR_USERNAME/preda.git
git push -u origin main
```

> The included `.gitignore` already excludes `.env`, `node_modules`, build artefacts and credentials. **Never commit `frontend/.env` or `backend/.env`** — use the provided `.env.example` files as templates.

---

## 1. MongoDB Atlas (database)

1. Go to <https://cloud.mongodb.com>, create a free **M0** cluster.
2. Create a database user (Database Access → *Add new database user*).
3. Allow network access from anywhere temporarily for testing (Network Access → *Add IP*: `0.0.0.0/0`). For production, restrict to your backend host’s IP / CIDR.
4. Click **Connect** → *Drivers* → copy the connection string. It looks like:

   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. Save it — you’ll need it for the backend in step 2.

---

## 2. Backend on Railway (recommended) — 5 minutes

Railway gives you a public HTTPS URL out of the box, which is what Cloudflare Pages will call.

1. Go to <https://railway.app>, sign in with GitHub, and authorize access to your private repo.
2. **New Project → Deploy from GitHub** → pick `preda`.
3. Set the **Root directory** to `backend`.
4. Add **environment variables** (Settings → *Variables*):

   | Key | Value |
   |-----|-------|
   | `MONGO_URL` | your Atlas connection string |
   | `DB_NAME` | `preda` |
   | `CORS_ORIGINS` | `https://YOUR-PROJECT.pages.dev` (you’ll know this after step 3) |

5. Add a **Start command** (Settings → *Start Command*):

   ```bash
   uvicorn server:app --host 0.0.0.0 --port $PORT
   ```

6. Railway auto-detects Python and installs `requirements.txt`.
7. After the deploy succeeds, copy the public URL Railway gives you (e.g. `https://preda-backend.up.railway.app`).
8. Test: `curl https://preda-backend.up.railway.app/api/health` → should return `{"status":"ok"}`.

> **Alternative hosts:** Render, Fly.io, Heroku, AWS App Runner. Any host that supports Python 3.10+ and lets you set environment variables works.

---

## 3. Frontend on Cloudflare Pages

1. Go to <https://dash.cloudflare.com> → **Workers & Pages** → *Create* → *Pages* → *Connect to Git*.
2. Select your private `preda` repo and authorize Cloudflare.
3. Configure the build:

   | Setting | Value |
   |---------|-------|
   | **Production branch** | `main` |
   | **Framework preset** | `Create React App` |
   | **Build command** | `yarn install --frozen-lockfile && yarn build` |
   | **Build output directory** | `build` |
   | **Root directory** | `frontend` |
   | **Node version** | `20` (set via env var `NODE_VERSION=20`) |

4. Under **Environment variables (Production)**, add:

   | Key | Value |
   |-----|-------|
   | `REACT_APP_BACKEND_URL` | `https://preda-backend.up.railway.app` (no trailing slash, no `/api`) |
   | `NODE_VERSION` | `20` |
   | `CI` | `false` (CRA otherwise treats warnings as errors) |

5. Click **Save and Deploy**.
6. Once it’s live, your URL will be something like `https://preda.pages.dev`. Note it down.
7. Go back to Railway and update **`CORS_ORIGINS`** to include that exact domain (and your custom domain later), then redeploy the backend.

### SPA routing & headers

The repo ships:

- `frontend/public/_redirects` — makes all routes fall back to `index.html` so the React app handles routing.
- `frontend/public/_headers` — sets long cache for hashed static assets and basic security headers.

Cloudflare Pages picks these up automatically.

### Custom domain (optional)

1. Cloudflare Pages → your project → **Custom domains** → *Set up a domain*.
2. Point `preda.com` (or whatever you own) at Pages — it walks you through DNS automatically if your domain is on Cloudflare.
3. Update **`CORS_ORIGINS`** on the backend to include the new domain.

---

## 4. Verify end-to-end

From your live site:

- The hero loads with the 3D pitch animation.
- The interactive preview tabs (Overview / Events / Players) switch correctly.
- The 6-question feedback survey submits successfully (you should see a success state).
- The waitlist form accepts a valid email and the counter increments.

To double-check the backend connection in the browser console:

```js
fetch(`${process.env.REACT_APP_BACKEND_URL || ''}/api/stats`).then(r => r.json()).then(console.log)
```

Expected: `{ feedback_count: <n>, waitlist_count: <n> }`.

---

## 5. Day-2 operations

- **Updating the site:** push to `main` → Cloudflare Pages auto-builds and deploys. Railway auto-deploys the backend on push too.
- **Preview environments:** Cloudflare Pages will create a preview URL for every branch / PR. The `REACT_APP_BACKEND_URL` for previews points at the same Railway URL by default — add a separate Preview env var if you want a staging backend.
- **Backups:** MongoDB Atlas free tier includes basic snapshots. For production, enable continuous backups (paid plan).
- **Logs:** Railway has a Logs tab; Cloudflare Pages logs are under *Deployments → Functions* if you ever add Pages Functions.

---

## 6. FAQ — deployment

**Can I host the backend on Cloudflare Workers?**
Not recommended right now. Workers Python is in beta, doesn’t support `motor` (async Mongo driver) or arbitrary native deps, and FastAPI assumes a long-running server. Stick to Railway / Render / Fly.io for the API and use Cloudflare for the frontend (Pages) + DNS + WAF.

**Can I run everything on a VPS instead?**
Yes — a single small VPS with Caddy + uvicorn behind it works fine. You’d skip Railway and just `git pull && systemctl restart preda-backend` on deploys. The frontend can still go on Cloudflare Pages, or be served by Caddy as static files.

**Do I need to expose `/api` anywhere?**
No. The frontend always builds the URL as `<REACT_APP_BACKEND_URL>/api/...`. Just point `REACT_APP_BACKEND_URL` at the backend origin without `/api`.

**How do I rotate the MongoDB password?**
Update it in Atlas, update the `MONGO_URL` env var on Railway, and Railway will redeploy automatically.

---

Everything in `frontend/.env` and `backend/.env` is local-only — production values live on Cloudflare Pages and Railway respectively. Keep your repo private and you’re good to ship.

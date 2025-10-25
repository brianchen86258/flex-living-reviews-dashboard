# Deployment Guide: Vercel + Render

This guide will help you deploy the Flex Living Reviews Dashboard using Vercel (frontend) and Render (backend).

## Architecture

```
┌─────────────────┐
│  Vercel         │  ← Frontend (Next.js)
│  (Free)         │
└────────┬────────┘
         │
         │ API calls
         ↓
┌─────────────────┐
│  Render         │  ← Backend (FastAPI)
│  (Free)         │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Render         │  ← Database (PostgreSQL)
│  PostgreSQL     │
└─────────────────┘
```

---

## Prerequisites

- [x] GitHub repository created and code pushed
- [ ] Vercel account (sign up at vercel.com)
- [ ] Render account (sign up at render.com)
- [ ] Hostaway API key

---

## Part 1: Deploy Backend on Render (15 minutes)

### Step 1: Create Render Account

1. Go to https://render.com
2. Click **"Get Started"** → Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create PostgreSQL Database

1. From Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure database:
   - **Name:** `flex-living-db`
   - **Database:** `flex_living`
   - **User:** `flex_living_user` (auto-generated)
   - **Region:** Oregon (or closest to you)
   - **Plan:** **Free** ($0/month)
3. Click **"Create Database"**
4. Wait ~2 minutes for database to provision
5. **Save these credentials** (you'll need them):
   - Internal Database URL (starts with `postgres://`)
   - External Database URL

### Step 3: Deploy Backend Service

1. From Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure service:
   - **Name:** `flex-living-backend`
   - **Region:** Same as database (Oregon)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan:** **Free** ($0/month)

4. Click **"Advanced"** → Add Environment Variables:

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | Click "Add from database" → Select `flex-living-db` |
   | `HOSTAWAY_API_KEY` | Your Hostaway API key |
   | `CORS_ORIGINS` | `https://your-app.vercel.app` (update after Vercel deploy) |
   | `PYTHON_VERSION` | `3.11.0` |

5. Click **"Create Web Service"**
6. Wait ~5 minutes for deployment
7. **Copy your backend URL:** `https://flex-living-backend.onrender.com`

### Step 4: Verify Backend Deployment

1. Visit: `https://your-backend-url.onrender.com/docs`
2. You should see the FastAPI interactive API documentation
3. Test the `/api/reviews/hostaway` endpoint

---

## Part 2: Deploy Frontend on Vercel (5 minutes)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"** → Continue with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project

1. From Vercel dashboard, click **"Add New..."** → **"Project"**
2. Import your GitHub repository: `flex-living-reviews-dashboard`
3. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)

### Step 3: Configure Environment Variables

Click **"Environment Variables"** and add:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.onrender.com` | Production, Preview, Development |

**Important:** Replace `your-backend.onrender.com` with your actual Render backend URL from Part 1, Step 3.

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait ~2 minutes for build and deployment
3. **Copy your frontend URL:** `https://your-app.vercel.app`
4. Visit your URL to see your deployed app!

### Step 5: Update Backend CORS

1. Go back to **Render dashboard** → Your backend service
2. Navigate to **"Environment"**
3. Update `CORS_ORIGINS` with your Vercel URL:
   ```
   https://your-app.vercel.app
   ```
4. Click **"Save Changes"**
5. Wait for automatic redeploy

---

## Part 3: Initialize Database (2 minutes)

Your database is empty, so you need to sync reviews from Hostaway:

1. Visit your frontend: `https://your-app.vercel.app`
2. Click the **"Sync Reviews"** button in the dashboard header
3. Wait for reviews to sync from Hostaway
4. Refresh the page - you should now see your properties and reviews!

---

## Verification Checklist

After deployment, verify everything works:

- [ ] Frontend loads at Vercel URL
- [ ] Backend API docs accessible at `/docs`
- [ ] Database connection successful
- [ ] Sync reviews button works
- [ ] Dashboard shows properties
- [ ] Reviews tab displays reviews
- [ ] Property details modal opens
- [ ] Public view mode works
- [ ] Approve/feature toggles persist changes

---

## Custom Domain (Optional)

### For Frontend (Vercel)

1. In Vercel project → **"Settings"** → **"Domains"**
2. Add your domain (e.g., `reviews.flexliving.com`)
3. Update DNS records as shown
4. SSL certificate auto-configured

### For Backend (Render)

1. In Render service → **"Settings"** → **"Custom Domain"**
2. Add your domain (e.g., `api.flexliving.com`)
3. Update DNS records as shown
4. SSL certificate auto-configured

**After adding domains, update:**
- Vercel `NEXT_PUBLIC_API_URL` → `https://api.flexliving.com`
- Render `CORS_ORIGINS` → `https://reviews.flexliving.com`

---

## Auto-Deployments

Both platforms auto-deploy on git push:

- **Push to `main` branch** → Production deployment
- **Create Pull Request** → Preview deployment (Vercel only)

To trigger redeployment:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

---

## Monitoring & Logs

### Vercel Logs
1. Project dashboard → **"Deployments"** → Click deployment → **"Logs"**
2. Real-time logs during build and runtime

### Render Logs
1. Service dashboard → **"Logs"** tab
2. Real-time application logs and errors

---

## Troubleshooting

### Frontend can't connect to backend
- ✅ Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
- ✅ Verify backend URL is correct (ends with `.onrender.com`)
- ✅ Check CORS_ORIGINS in backend includes your Vercel URL

### Backend database connection fails
- ✅ Verify `DATABASE_URL` is set in Render environment
- ✅ Check database is running (Render dashboard → Databases)
- ✅ View backend logs for connection errors

### Reviews not syncing
- ✅ Check `HOSTAWAY_API_KEY` is set correctly
- ✅ View backend logs for API errors
- ✅ Test `/api/reviews/hostaway` endpoint directly

### Render free tier spinning down
- ⚠️ Free tier spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- Upgrade to paid plan ($7/month) for always-on

---

## Cost Breakdown

| Service | Tier | Cost | Limits |
|---------|------|------|--------|
| Vercel | Hobby | **$0/month** | Unlimited deployments, 100GB bandwidth |
| Render Backend | Free | **$0/month** | 750 hrs/month, spins down after 15min idle |
| Render Database | Free | **$0/month** | 1GB storage, 97 hrs/month |
| **Total** | | **$0/month** | Good for demo/testing |

### Recommended Production Setup

| Service | Tier | Cost | Benefits |
|---------|------|------|----------|
| Vercel | Pro | **$20/month** | Faster builds, more bandwidth, team features |
| Render Backend | Starter | **$7/month** | Always-on, no spin-down |
| Render Database | Starter | **$7/month** | 10GB storage, always-on |
| **Total** | | **$34/month** | Production-ready |

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Next.js Docs:** https://nextjs.org/docs

---

## Next Steps After Deployment

1. ✅ Set up custom domain
2. ✅ Enable Vercel Analytics
3. ✅ Set up monitoring (Sentry, LogRocket)
4. ✅ Configure backup strategy for database
5. ✅ Set up staging environment (separate Render service)
6. ✅ Add CI/CD tests before deployment

Congratulations! Your app is now live! 🎉

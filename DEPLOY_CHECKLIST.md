# 🚀 Deployment Checklist - Vercel + Render

Use this checklist to deploy your app step-by-step.

---

## ☑️ Pre-Deployment

- [ ] Code pushed to GitHub
- [ ] `.gitignore` excludes `.env` files
- [ ] No API keys committed to git
- [ ] Have Hostaway API key ready

---

## 🗄️ Part 1: Render Database (5 min)

1. [ ] Sign up at https://render.com with GitHub
2. [ ] Click **"New +"** → **"PostgreSQL"**
3. [ ] Configure:
   - Name: `flex-living-db`
   - Plan: **Free**
   - Region: Oregon
4. [ ] Click **"Create Database"**
5. [ ] Copy **Internal Database URL** ✏️ `_______________________________`

---

## 🐍 Part 2: Render Backend (10 min)

1. [ ] Click **"New +"** → **"Web Service"**
2. [ ] Select your GitHub repo
3. [ ] Configure:
   - Name: `flex-living-backend`
   - Root Directory: `backend`
   - Runtime: Python 3
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Plan: **Free**

4. [ ] Add Environment Variables:
   ```
   DATABASE_URL → Add from database (flex-living-db)
   HOSTAWAY_API_KEY → [Your Hostaway key]
   CORS_ORIGINS → https://*.vercel.app
   PYTHON_VERSION → 3.11.0
   ```

5. [ ] Click **"Create Web Service"**
6. [ ] Wait for deployment (~5 min)
7. [ ] Copy backend URL ✏️ `_______________________________`
8. [ ] Test: Visit `https://your-backend.onrender.com/docs`
9. [ ] Verify FastAPI docs page loads ✅

---

## ⚡ Part 3: Vercel Frontend (5 min)

1. [ ] Sign up at https://vercel.com with GitHub
2. [ ] Click **"Add New..."** → **"Project"**
3. [ ] Import your GitHub repo
4. [ ] Configure:
   - Framework: Next.js (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build`

5. [ ] Add Environment Variable:
   ```
   NEXT_PUBLIC_API_URL → [Your Render backend URL from Part 2]
   ```

6. [ ] Click **"Deploy"**
7. [ ] Wait for deployment (~2 min)
8. [ ] Copy Vercel URL ✏️ `_______________________________`
9. [ ] Visit your Vercel URL ✅

---

## 🔗 Part 4: Connect Frontend & Backend (2 min)

1. [ ] Go back to **Render** → Your backend service
2. [ ] Navigate to **"Environment"** tab
3. [ ] Update `CORS_ORIGINS`:
   ```
   https://your-app.vercel.app
   ```
   (Use your actual Vercel URL from Part 3, step 8)
4. [ ] Click **"Save Changes"**
5. [ ] Wait for auto-redeploy (~1 min)

---

## 📊 Part 5: Initialize Data (2 min)

1. [ ] Visit your Vercel URL
2. [ ] Click **"Sync Reviews"** button (top right)
3. [ ] Wait for sync to complete
4. [ ] Refresh page
5. [ ] Verify you see properties and reviews ✅

---

## ✅ Verification Tests

Test each feature:

- [ ] Dashboard loads without errors
- [ ] Stats show correct numbers
- [ ] Sync button works
- [ ] Properties tab shows property cards
- [ ] Click "View Details" on property → modal opens
- [ ] Reviews tab shows review table
- [ ] Toggle approve → saves and persists
- [ ] Toggle featured → saves and persists
- [ ] Public View tab loads
- [ ] Select different property → content updates
- [ ] Exit Public View → returns to dashboard

---

## 📝 Save These URLs

Write down your deployment URLs:

```
Frontend: https://_________________________.vercel.app
Backend:  https://_________________________.onrender.com
Database: Internal URL (in Render dashboard)
```

---

## 🎯 Optional Enhancements

After basic deployment works:

- [ ] Add custom domain to Vercel
- [ ] Add custom domain to Render backend
- [ ] Update CORS and API URL with custom domains
- [ ] Set up monitoring (Vercel Analytics)
- [ ] Configure backup for database
- [ ] Upgrade Render to paid tier (remove spin-down)

---

## ⚠️ Common Issues

**"Network Error" when syncing reviews**
→ Check CORS_ORIGINS includes your Vercel URL

**Backend returns 500 error**
→ Check Render logs for database connection issues

**Frontend shows "Failed to fetch"**
→ Verify NEXT_PUBLIC_API_URL is correct

**First request is very slow (30 sec)**
→ Normal on free tier - backend was spun down

---

## 🆘 Need Help?

1. Check Vercel logs: Project → Deployments → [Latest] → Logs
2. Check Render logs: Service → Logs tab
3. Review full guide: See DEPLOYMENT.md

---

## ✨ You're Done!

Once all checks pass, your app is live! 🎉

Share your URL: `https://your-app.vercel.app`

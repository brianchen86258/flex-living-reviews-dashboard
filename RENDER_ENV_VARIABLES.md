# Required Environment Variables for Render

## ✅ Complete List for Backend Service

Go to your Render backend service → **Environment** tab and add ALL of these:

| Variable Name | Value | Where to Get It |
|--------------|-------|-----------------|
| `DATABASE_URL` | *Auto-filled* | Click "Add from database" → Select `flex-living-db` |
| `HOSTAWAY_API_KEY` | `your_api_key_here` | From your Hostaway dashboard |
| `HOSTAWAY_ACCOUNT_ID` | `your_account_id_here` | **See instructions below** |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Your Vercel URL (add after Vercel deploy) |
| `CORS_ORIGINS` | `https://your-app.vercel.app` | Same as FRONTEND_URL |
| `ENVIRONMENT` | `production` | Literally type: production |

---

## 🔍 How to Find Your Hostaway Account ID

### Option 1: From Hostaway Dashboard
1. Log in to Hostaway
2. Go to **Settings** → **API Access**
3. Your Account ID should be displayed there

### Option 2: From API Response
1. Make a test API call to Hostaway
2. The account ID is usually in the response

### Option 3: Ask Hostaway Support
If you can't find it, contact Hostaway support - they can provide it quickly.

---

## 📝 Step-by-Step: Adding Variables to Render

1. Go to https://dashboard.render.com
2. Click on your **backend service** (e.g., `flex-living-backend`)
3. Click **"Environment"** in the left sidebar
4. Click **"Add Environment Variable"**
5. For each variable:
   - Enter the **Key** (exact name from table above)
   - Enter the **Value**
   - Click **"Save Changes"**

### Special: DATABASE_URL

For `DATABASE_URL`:
- Click **"Add Environment Variable"**
- In the **Value** field, click **"Add from database"**
- Select your database: `flex-living-db`
- Click **"Add"**
- This auto-fills the correct PostgreSQL connection string

---

## ⚠️ Important Notes

1. **Case Sensitive**: Variable names must match exactly (all CAPS where shown)
2. **No Quotes**: Don't add quotes around values in Render UI
3. **Save**: Click "Save Changes" after adding each variable
4. **Auto-Redeploy**: Render will automatically redeploy when you save

---

## 🔄 After Adding All Variables

1. Wait for automatic redeploy (~3-5 minutes)
2. Check logs for errors:
   - Go to **"Logs"** tab
   - Look for: "Application startup complete"
3. Visit your API docs: `https://your-backend.onrender.com/docs`
4. Should see FastAPI interactive documentation

---

## ✅ Verification

After deployment succeeds, verify:

```bash
# Visit in browser:
https://your-backend.onrender.com/docs

# You should see:
✓ FastAPI documentation page
✓ Green "Authorize" button
✓ List of API endpoints
```

---

## 🐛 Troubleshooting

**Error: "HOSTAWAY_ACCOUNT_ID field required"**
→ You forgot to add this variable. Add it and redeploy.

**Error: "Database connection failed"**
→ Check that DATABASE_URL was added from database (not manually typed)

**Error: "CORS error" from frontend**
→ Make sure CORS_ORIGINS and FRONTEND_URL match your Vercel URL exactly

**Deployment keeps failing**
→ Check the **Logs** tab for the specific error message

---

## 🎯 Example Values (DO NOT COPY - Use Your Own!)

```
DATABASE_URL=postgres://user:pass@dpg-xxx.oregon-postgres.render.com/flex_living_db
HOSTAWAY_API_KEY=sk_live_abc123xyz789
HOSTAWAY_ACCOUNT_ID=12345
FRONTEND_URL=https://my-app-xyz.vercel.app
CORS_ORIGINS=https://my-app-xyz.vercel.app
ENVIRONMENT=production
```

---

## 📌 What Changed

We updated `requirements.txt` to use:
- ✅ `asyncpg==0.30.0` - Async PostgreSQL driver (required for Render)
- ✅ `aiosqlite==0.20.0` - Async SQLite driver (for local development)
- ❌ Removed `psycopg2-binary` - This is sync only, doesn't work with async SQLAlchemy

The app will now:
- Use **PostgreSQL** in production (Render) via `asyncpg`
- Use **SQLite** in development (local) via `aiosqlite`
- Both work with async SQLAlchemy

---

## 🚀 Next Steps

1. ✅ Add all environment variables to Render
2. ✅ Wait for deployment to complete
3. ✅ Test `/docs` endpoint
4. ✅ Proceed to deploy frontend on Vercel
5. ✅ Sync reviews from Hostaway

---

**Need Help?** Check the logs in Render dashboard → Your service → Logs tab

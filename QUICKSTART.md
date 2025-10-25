# Quick Start Guide - Flex Living Reviews Dashboard

Get up and running in 5 minutes!

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm

## Step 1: Install Backend Dependencies (2 min)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Step 2: Start Backend Server (30 sec)

```bash
# Make sure you're in backend/ directory with venv activated
uvicorn app.main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
Database initialized
INFO:     Application startup complete.
```

✅ Backend is running!

## Step 3: Test the API (1 min)

Open http://localhost:8000/docs in your browser.

**Try the main endpoint:**
1. Click on **GET /api/reviews/hostaway**
2. Click "Try it out"
3. Click "Execute"
4. You should see 7 mock reviews returned

**Populate the database:**
1. Click on **POST /api/reviews/sync**
2. Click "Try it out"
3. Click "Execute"
4. Should respond: "Synced 7 new reviews from Hostaway"

✅ API is working!

## Step 4: Install Frontend Dependencies (1 min)

Open a **new terminal** (keep backend running):

```bash
cd frontend
npm install
```

## Step 5: Start Frontend Server (30 sec)

```bash
# In frontend/ directory
npm run dev
```

You should see:
```
▲ Next.js 15.x
- Local:        http://localhost:3000
```

✅ Frontend is running!

## Step 6: View the App (30 sec)

Open http://localhost:3000 in your browser.

You should see:
- Home page with links to "Manager Dashboard" and "Property Reviews"
- Links to API docs

✅ You're all set!

---

## What's Next?

### Option 1: Build UI Components with v0.dev

1. Open [V0_PROMPTS.md](V0_PROMPTS.md)
2. Copy prompts to https://v0.dev
3. Generate beautiful UI components
4. Ask Claude Code to integrate them

### Option 2: Test the API

1. Visit http://localhost:8000/docs
2. Try all endpoints:
   - `/api/reviews/hostaway` - Get reviews
   - `/api/reviews/stats/dashboard` - Get statistics
   - `/api/reviews/{id}` (PATCH) - Approve reviews
3. See the data structure

### Option 3: Read the Full Guide

- [README.md](README.md) - Complete project documentation
- [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) - Detailed integration walkthrough
- [V0_PROMPTS.md](V0_PROMPTS.md) - UI component prompts

---

## Quick Commands Reference

### Backend
```bash
# Start server
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000

# Stop server
Ctrl+C
```

### Frontend
```bash
# Start server
cd frontend
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Stop server
Ctrl+C
```

### Both at Once (Unix/Mac/Linux)
```bash
# From project root
chmod +x start-dev.sh
./start-dev.sh
```

---

## Troubleshooting

**Backend won't start:**
- Check Python version: `python3 --version` (need 3.10+)
- Activate venv: `source venv/bin/activate`
- Install deps: `pip install -r requirements.txt`

**Frontend won't start:**
- Check Node version: `node --version` (need 18+)
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

**Can't connect to API:**
- Make sure backend is running on port 8000
- Check `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8000`

**CORS errors:**
- Check backend `.env` has `FRONTEND_URL=http://localhost:3000`
- Restart backend server

---

## Project Structure

```
flex-living-reviews/
├── backend/              # Python FastAPI
│   ├── app/
│   │   ├── main.py      # ⭐ Start here
│   │   ├── api/routes/  # API endpoints
│   │   └── services/    # Business logic
│   └── requirements.txt
│
├── frontend/            # Next.js
│   ├── app/
│   │   └── page.tsx    # ⭐ Home page
│   ├── components/     # UI components (add v0.dev components here)
│   └── lib/            # API client, types
│
├── README.md           # Full documentation
├── INTEGRATION_GUIDE.md # Step-by-step integration
└── V0_PROMPTS.md       # v0.dev prompts
```

---

## Next Steps for Assessment

To complete the Flex Living assessment, you need to:

1. ✅ Backend API - **DONE**
   - ✅ `/api/reviews/hostaway` endpoint
   - ✅ Review normalization
   - ✅ Database setup

2. 🔄 Manager Dashboard - **Use v0.dev**
   - Summary statistics
   - Reviews table with filters
   - Approval workflow
   - Property performance cards

3. 🔄 Public Review Display - **Use v0.dev**
   - Property page layout
   - Review cards
   - Filtering and sorting

4. 🔄 Documentation - **Mostly done**
   - Tech stack explained in README
   - API behaviors documented
   - Deployment guides provided

5. ⏳ Google Reviews - **Optional exploration**
   - Research Google Places API
   - Document findings

**Recommended workflow:**
1. Use v0.dev prompts to generate UI components
2. Ask Claude Code to integrate them with the backend
3. Test everything together
4. Deploy to Railway or Render+Vercel

---

## Getting Help

**Ask Claude Code (me):**
```
"Help me integrate the ReviewsTable component from v0.dev"
"Add a new API endpoint for filtering reviews by date"
"Debug this error: [paste error]"
"Deploy to Railway step by step"
```

**Check the docs:**
- API Docs: http://localhost:8000/docs
- Next.js: https://nextjs.org/docs
- FastAPI: https://fastapi.tiangolo.com

---

🚀 **Ready to build? Start by generating your first component with v0.dev!**

Use the "Manager Dashboard - Main Layout" prompt from [V0_PROMPTS.md](V0_PROMPTS.md) and then ask me to integrate it.

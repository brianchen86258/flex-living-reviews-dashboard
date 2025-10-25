# Complete Integration Guide: Claude Code + v0.dev + Deployment

This guide walks you through the complete workflow from setup to deployment.

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Testing the Backend](#testing-the-backend)
3. [Generating UI with v0.dev](#generating-ui-with-v0dev)
4. [Integrating Components with Claude Code](#integrating-components-with-claude-code)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Initial Setup

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
npm install
```

**Or use the automated script:**
```bash
chmod +x setup.sh
./setup.sh
```

### Step 2: Verify Environment Variables

**Backend** - Check `backend/.env`:
```
HOSTAWAY_API_KEY=f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152
HOSTAWAY_ACCOUNT_ID=61148
DATABASE_URL=sqlite+aiosqlite:///./flexliving.db
ENVIRONMENT=development
FRONTEND_URL=http://localhost:3000
```

**Frontend** - Check `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Testing the Backend

### Step 1: Start the Backend Server

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
Database initialized
```

### Step 2: Test the API

Open http://localhost:8000/docs in your browser.

**Test these endpoints:**

1. **GET /api/reviews/hostaway** (REQUIRED ENDPOINT)
   - Click "Try it out" → "Execute"
   - Should return 7 mock reviews
   - This is the main endpoint required by the assessment

2. **POST /api/reviews/sync**
   - Syncs reviews from Hostaway to database
   - Run this to populate the database

3. **GET /api/reviews/stats/dashboard**
   - Returns dashboard statistics
   - Should show 3 properties with stats

4. **PATCH /api/reviews/{review_id}**
   - Try review_id: "7453"
   - Body: `{"is_approved": true, "is_featured": false}`
   - Approves the review

### Step 3: Verify Database

After syncing, the SQLite database file `flexliving.db` should be created in the backend directory.

---

## Generating UI with v0.dev

### Recommended Order

Generate components in this order for best results:

1. **Manager Dashboard Cards** (easiest, good starting point)
2. **Reviews Table** (most complex, core feature)
3. **Property Performance Cards** (medium complexity)
4. **Public Review Display** (similar to table)
5. **Charts** (if needed)

### Example Workflow: Creating the Reviews Table

**Step 1: Go to v0.dev**
- Visit https://v0.dev

**Step 2: Use the Prompt**
- Open [V0_PROMPTS.md](V0_PROMPTS.md)
- Copy "2. Reviews Table Component" prompt
- Paste into v0.dev

**Step 3: Review Generated Code**
- v0.dev will generate the component
- Preview the component
- Click "Copy code" or customize first

**Step 4: You'll get code like:**
```tsx
// ReviewsTable component with filters, sorting, etc.
export default function ReviewsTable() {
  // ... generated code
}
```

---

## Integrating Components with Claude Code

This is where Claude Code (me!) comes in to connect v0.dev components to your backend.

### Method 1: Direct Integration Request

**Ask me:**
```
I generated a ReviewsTable component with v0.dev. Here's the code:

[paste the v0.dev code]

Please:
1. Save this to frontend/components/ReviewsTable.tsx
2. Connect it to the /api/reviews endpoint
3. Use our types from lib/types.ts
4. Add React Query for data fetching with loading/error states
5. Create a dashboard page at app/dashboard/page.tsx that uses this component
6. Add proper TypeScript types everywhere
```

**I will:**
- Save the component file
- Create API integration using React Query
- Add proper TypeScript types
- Handle loading and error states
- Create the dashboard page
- Set up routing

### Method 2: Step-by-Step Integration

**Step 1: Ask me to save the component**
```
Save this v0.dev component to frontend/components/ReviewsTable.tsx:
[paste code]
```

**Step 2: Ask me to add data fetching**
```
Update ReviewsTable.tsx to:
- Fetch data from /api/reviews using our reviewsApi.getReviews() function
- Use React Query (@tanstack/react-query)
- Show loading spinner while fetching
- Show error message if fetch fails
- Add proper types from lib/types.ts
```

**Step 3: Ask me to create the page**
```
Create app/dashboard/page.tsx that:
- Uses the ReviewsTable component
- Has a header with "Reviews Dashboard" title
- Includes a "Sync Reviews" button that calls /api/reviews/sync
- Shows total count from the API response
```

### Example: Complete Integration Flow

**You:**
> I generated a dashboard summary cards component with v0.dev. Can you help integrate it?

**Me (Claude Code):**
> Sure! Please paste the v0.dev code and I'll integrate it with your backend API.

**You:**
> [pastes v0.dev code for DashboardCards component]

**Me:**
> I'll integrate this now. [Creates files, adds API calls, types, etc.]

**Result:**
- Component saved to `frontend/components/DashboardCards.tsx`
- Connected to `/api/reviews/stats/dashboard` endpoint
- Uses React Query for caching
- Proper TypeScript types
- Loading and error states
- Page created at `app/dashboard/page.tsx`

---

## Common Integration Patterns

### Pattern 1: Simple Display Component

**v0.dev generates:** A component that displays data

**Claude Code adds:**
- API integration with React Query
- TypeScript types from your schema
- Loading skeleton
- Error boundary
- Data transformation if needed

### Pattern 2: Interactive Component (Table, Forms)

**v0.dev generates:** Component with filters, sorting, actions

**Claude Code adds:**
- API integration for fetching
- API calls for mutations (approve, update)
- Optimistic updates
- State management
- Form validation
- Error handling

### Pattern 3: Charts/Analytics

**v0.dev generates:** Chart component with Recharts

**Claude Code adds:**
- Data fetching from stats endpoint
- Data transformation for chart format
- Responsive container
- Loading state
- Empty state handling

---

## Full Example: Building the Manager Dashboard

### Step-by-Step Process

**1. Generate Dashboard Header (v0.dev)**
```
[Use prompt #1 from V0_PROMPTS.md]
```

**2. Ask Claude Code to integrate:**
```
I have a DashboardHeader component from v0.dev:
[paste code]

Please integrate it:
- Save to components/DashboardHeader.tsx
- Fetch stats from /api/reviews/stats/dashboard
- Add a working "Sync Reviews" button that calls /api/reviews/sync
- Show success toast on sync
```

**3. Generate Reviews Table (v0.dev)**
```
[Use prompt #2 from V0_PROMPTS.md]
```

**4. Ask Claude Code to integrate:**
```
I have a ReviewsTable component from v0.dev:
[paste code]

Please integrate it:
- Save to components/ReviewsTable.tsx
- Fetch from /api/reviews with filter params
- Add approval toggle that calls PATCH /api/reviews/{id}
- Add optimistic updates
- Connect all filters to API params
```

**5. Generate Property Cards (v0.dev)**
```
[Use prompt #3 from V0_PROMPTS.md]
```

**6. Ask Claude Code to integrate:**
```
I have PropertyCards component from v0.dev:
[paste code]

Please integrate and create the full dashboard page at app/dashboard/page.tsx using all three components.
```

**Result:** A fully functional manager dashboard!

---

## Deployment

### Option 1: Railway (Easiest - All-in-One)

**Step 1: Install Railway CLI**
```bash
npm i -g @railway/cli
railway login
```

**Step 2: Initialize Project**
```bash
railway init
```

**Step 3: Add PostgreSQL (Optional)**
```bash
railway add postgresql
```

**Step 4: Deploy Backend**
```bash
cd backend
railway up
```

**Step 5: Deploy Frontend**
```bash
cd ../frontend
railway up
```

**Step 6: Set Environment Variables**

In Railway dashboard:
- Backend: Add HOSTAWAY_API_KEY, HOSTAWAY_ACCOUNT_ID, DATABASE_URL
- Frontend: Add NEXT_PUBLIC_API_URL (your backend URL)

**Step 7: Test**
Visit your Railway URLs to verify deployment.

### Option 2: Render (Backend) + Vercel (Frontend)

**Backend on Render:**

1. Push code to GitHub
2. Go to https://render.com
3. New → Web Service
4. Connect GitHub repo, select `backend` folder
5. Settings:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables
7. Deploy

Copy your Render URL (e.g., `https://flex-living-api.onrender.com`)

**Frontend on Vercel:**

```bash
cd frontend
npm i -g vercel
vercel
```

Or via Vercel website:
1. Import GitHub repo
2. Select `frontend` folder
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render backend URL
4. Deploy

### Option 3: Docker (All Platforms)

**For local testing:**
```bash
docker-compose up
```

**For production:**
Build and push Docker images to any container platform (Railway, Render, DigitalOcean, AWS, etc.)

---

## Testing Your Deployed App

### Backend Health Check
```bash
curl https://your-backend-url.com/health
```

Expected response:
```json
{"status": "healthy", "environment": "production"}
```

### Test Main Endpoint
```bash
curl https://your-backend-url.com/api/reviews/hostaway
```

Should return reviews data.

### Frontend Test
1. Visit your frontend URL
2. Navigate to /dashboard
3. Verify reviews load
4. Test approval toggle
5. Test sync button

---

## Troubleshooting

### Backend Issues

**Problem: Module not found errors**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

**Problem: Database not initialized**
- Delete `flexliving.db`
- Restart server (it recreates on startup)

**Problem: CORS errors**
- Verify FRONTEND_URL in backend/.env matches your frontend URL
- Check CORS middleware in app/main.py

**Problem: API key errors**
- Verify HOSTAWAY_API_KEY in .env
- The sandbox API may have no real data (mock data is provided)

### Frontend Issues

**Problem: Can't connect to API**
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check backend is running
- Check browser console for errors

**Problem: Build errors**
```bash
cd frontend
rm -rf node_modules .next
npm install
npm run build
```

**Problem: Type errors**
- Verify types in lib/types.ts match backend schemas
- Ask Claude Code to sync types

### Deployment Issues

**Problem: Build fails on platform**
- Check build logs
- Verify all dependencies in requirements.txt / package.json
- Ensure environment variables are set

**Problem: Database connection errors (Production)**
- Switch from SQLite to PostgreSQL for production
- Update DATABASE_URL format
- Railway/Render provide managed PostgreSQL

**Problem: Frontend can't reach backend**
- Verify NEXT_PUBLIC_API_URL is set correctly
- Check CORS settings in backend
- Ensure backend is deployed and healthy

---

## Advanced: Adding New Features

### Adding a New API Endpoint

**Step 1: Ask Claude Code**
```
Add a new endpoint GET /api/reviews/featured that returns only featured reviews.
Include in:
- backend/app/api/routes/reviews.py
- frontend/lib/api.ts
- Add types if needed
```

**Step 2: Generate UI with v0.dev**
```
Create a "Featured Reviews" section with cards showing featured reviews only.
```

**Step 3: Integrate**
```
I have a FeaturedReviews component from v0.dev.
Please integrate it with the new /api/reviews/featured endpoint.
```

### Adding Google Reviews Integration

**Step 1: Research**
```
Ask me: "Research Google Places API for reviews integration.
What's needed and how to implement it?"
```

**Step 2: Backend Implementation**
```
Ask me: "Implement Google Places API integration:
- Add service in services/google_places.py
- Add endpoint /api/reviews/google
- Merge with Hostaway reviews
- Add to dashboard stats"
```

**Step 3: Update Frontend**
```
Ask me: "Update dashboard to show Google reviews alongside Hostaway reviews.
Add a filter for review source (Hostaway/Google/All)."
```

---

## Best Practices

### 1. Always Use TypeScript Types
- Define types in lib/types.ts
- Match backend Pydantic schemas
- Use types in all components

### 2. Error Handling
- Show user-friendly error messages
- Log errors to console for debugging
- Provide retry mechanisms

### 3. Loading States
- Show skeletons or spinners
- Disable buttons during operations
- Indicate progress

### 4. Optimistic Updates
- Update UI immediately
- Revert on error
- Show confirmation

### 5. Code Organization
- Components in components/
- Pages in app/
- Utilities in lib/
- Keep components focused and small

### 6. Testing
- Test API endpoints in /docs
- Test UI interactions manually
- Check mobile responsiveness
- Verify error cases

---

## Getting Help

**From Claude Code (Me!):**
- Ask me to debug errors
- Request code explanations
- Get help with integration
- Optimize performance
- Add new features

**From Documentation:**
- FastAPI: https://fastapi.tiangolo.com
- Next.js: https://nextjs.org/docs
- React Query: https://tanstack.com/query
- Tailwind: https://tailwindcss.com

**From v0.dev:**
- UI component generation
- Design inspiration
- Component variations

---

## Summary of the Complete Workflow

1. ✅ **Setup** - Run setup.sh or install manually
2. ✅ **Test Backend** - Verify all endpoints work at /docs
3. 🔄 **Generate UI** - Use v0.dev with provided prompts
4. 🔄 **Integrate** - Ask Claude Code to connect components to API
5. 🔄 **Test Locally** - Verify everything works together
6. 🔄 **Deploy** - Push to Railway/Render/Vercel
7. ✅ **Verify** - Test production deployment

---

Good luck with your Flex Living assessment! 🚀

If you get stuck at any point, just ask me (Claude Code) for help. I'm here to assist with:
- Debugging
- Integration
- New features
- Optimization
- Deployment issues

Just describe what you need and I'll help you implement it!

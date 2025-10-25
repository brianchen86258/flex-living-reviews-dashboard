# ⚡ Quick Start - v0.dev Frontend + Backend Integration

## 🎯 3 Steps to Launch

### Step 1: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Backend
```bash
# Terminal 1
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

Then visit http://localhost:8000/docs and run:
- **POST /api/reviews/sync** (loads data into database)

### Step 3: Start Frontend
```bash
# Terminal 2
cd frontend
npm run dev
```

---

## 🌐 Open Your App

- **Dashboard:** http://localhost:3000
- **Properties:** http://localhost:3000/properties
- **Analytics:** http://localhost:3000/analytics
- **API Docs:** http://localhost:8000/docs

---

## ✅ What's Integrated

All your v0.dev pages now use **REAL backend data**:

| Page | v0 Component | Backend API | Status |
|------|-------------|-------------|--------|
| Main Dashboard (`/`) | ✅ | ✅ Reviews + Stats | **Working** |
| Properties (`/properties`) | ✅ | ✅ Property Stats | **Working** |
| Analytics (`/analytics`) | ✅ | ✅ Charts Data | **Working** |
| Property Details | ✅ | ⏳ Static (can enhance) | **Working** |
| Demos | ✅ | N/A | **Working** |

---

## 🔧 Files Created/Modified

**Created:**
- ✅ `lib/api.ts` - API client
- ✅ `hooks/use-reviews.ts` - React Query hooks
- ✅ `lib/providers.tsx` - Providers
- ✅ `.env.local` - Environment config

**Modified:**
- ✅ `app/layout.tsx` - Added providers
- ✅ `app/page.tsx` - Main dashboard with API
- ✅ `app/properties/page.tsx` - Properties with API
- ✅ `app/analytics/page.tsx` - Analytics with API
- ✅ `package.json` - Added React Query + Axios

**Unchanged:**
- ✅ All v0 components in `components/` (work as-is)
- ✅ All UI components in `components/ui/`
- ✅ Types in `types/review.ts` (already matched backend)

---

## 🧪 Quick Test (2 min)

1. ✅ Backend running? Visit http://localhost:8000/docs
2. ✅ Data synced? POST /api/reviews/sync should return 7 reviews
3. ✅ Frontend running? Visit http://localhost:3000
4. ✅ See stats cards with numbers?
5. ✅ See reviews table?
6. ✅ Click approval toggle → see toast?
7. ✅ Click "Sync Reviews" → see loading?
8. ✅ Navigate to /properties → see property cards?
9. ✅ Navigate to /analytics → see charts?
10. ✅ Open DevTools Network tab → see API calls?

---

## 🐛 Troubleshooting

**No reviews showing?**
→ Run POST /api/reviews/sync at http://localhost:8000/docs

**CORS errors?**
→ Check backend is on 8000, frontend on 3000

**Module not found errors?**
→ Run `npm install` in frontend directory

**TypeScript errors?**
→ Run `npm run build` to check for issues

---

## 📚 Full Documentation

- **[COMPLETE_INTEGRATION_GUIDE.md](COMPLETE_INTEGRATION_GUIDE.md)** ← Read this for details
- **[README.md](README.md)** - Project overview
- **[INTEGRATION_COMPLETE.md](INTEGRATION_COMPLETE.md)** - First integration summary

---

## 🎉 You're Ready!

Your v0.dev frontend is now fully connected to your FastAPI backend with:
- Real-time data fetching
- React Query caching
- Toast notifications
- Loading states
- Error handling
- Type-safe TypeScript

**Open http://localhost:3000 and test all features!** 🚀

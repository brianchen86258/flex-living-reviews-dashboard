# 🚀 START HERE - Quick Launch Guide

## Your v0.dev components are fully integrated! Follow these steps to see it in action.

---

## ⚡ 3-Step Launch (5 Minutes)

### Step 1: Start Backend (Terminal 1)

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

**✅ Success when you see:**
```
INFO: Uvicorn running on http://0.0.0.0:8000
Database initialized
```

---

### Step 2: Load Data (One Time Only)

1. Open: http://localhost:8000/docs
2. Find: **POST /api/reviews/sync**
3. Click: "Try it out" → "Execute"
4. **✅ Success:** Should say "Synced 7 new reviews"

This loads the mock review data into your database.

---

### Step 3: Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

**✅ Success when you see:**
```
▲ Next.js 15.x
- Local: http://localhost:3000
```

---

## 🎯 Open Your Dashboard

### http://localhost:3000/dashboard

**You should see:**
- ✅ 4 stat cards (Total Reviews, Avg Rating, Properties, Pending)
- ✅ Search and filter controls
- ✅ Table with 7 reviews
- ✅ Approval toggles and featured stars
- ✅ Sync button in header

---

## 🧪 Quick Test (2 Minutes)

**Test 1:** Toggle Approval
- Click any approval switch → Should see green toast "Review approved!"

**Test 2:** Mark as Featured
- Click a star icon → Star turns yellow, toast appears

**Test 3:** Filter Reviews
- Type a name in search box → Table filters instantly

**Test 4:** Sort Reviews
- Click "Property" column header → Reviews sort

**Test 5:** Sync Reviews
- Click "Sync Reviews" button → Shows loading, then success toast

---

## ✅ Everything Working?

**Congratulations!** Your integration is complete.

### What's Working:
- ✅ Backend API serving data
- ✅ Frontend displaying v0 components
- ✅ React Query fetching from API
- ✅ Approval/Featured toggles calling backend
- ✅ Filters and sorting working
- ✅ Toast notifications showing
- ✅ Data persisting in SQLite

---

## 📚 Learn More

**For Testing & Features:**
→ Read [GETTING_STARTED.md](GETTING_STARTED.md)

**For Complete Overview:**
→ Read [INTEGRATION_COMPLETE.md](INTEGRATION_COMPLETE.md)

**For Deployment:**
→ Read [README.md](README.md) (Deployment section)

---

## 🐛 Troubleshooting

**No reviews showing?**
→ Did you run POST /api/reviews/sync? (Step 2)

**CORS errors?**
→ Check backend is on port 8000, frontend on 3000

**TypeScript errors?**
→ Run `cd frontend && npm run build` to check

**Backend won't start?**
→ Did you activate venv? `source venv/bin/activate`

---

## 🆘 Get Help

If anything doesn't work, ask me (Claude Code):

```
"The dashboard shows no reviews"
"I'm getting a CORS error"
"How do I deploy this?"
"Add a new feature: [describe]"
```

---

## 🎉 Next Steps

1. **Test all features** - Try filters, sorting, approvals
2. **Check API calls** - Open DevTools Network tab
3. **Add more pages** - Create public property pages
4. **Deploy** - Push to Railway or Vercel
5. **Extend** - Use V0_PROMPTS.md for more components

---

**You're all set! Open the dashboard and start testing.** 🚀

http://localhost:3000/dashboard

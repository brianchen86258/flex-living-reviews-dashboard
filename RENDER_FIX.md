# Render Deployment Fix

## Issue
Build failed with `pydantic-core` compilation error on Render.

## Root Cause
- Render defaulted to Python 3.13
- Old package versions tried to compile Rust components from source
- Compilation failed due to read-only file system

## Solution Applied

### 1. Updated `requirements.txt` with newer versions:
```
fastapi==0.115.5         (was 0.104.1)
pydantic==2.10.3         (was 2.5.0)
uvicorn[standard]==0.34.0 (was 0.24.0)
sqlalchemy==2.0.36       (was 2.0.23)
+ psycopg2-binary==2.9.10 (for PostgreSQL)
+ gunicorn==23.0.0        (production server)
```

### 2. Created `.python-version` file:
```
3.11
```

### 3. Kept `render.yaml` configuration:
```yaml
envVars:
  - key: PYTHON_VERSION
    value: 3.11.0
```

## Deploy Steps

1. **Commit and push these changes:**
   ```bash
   git add -A
   git commit -m "Fix: Update dependencies for Render deployment"
   git push origin main
   ```

2. **Render will auto-redeploy** (takes ~5 minutes)

3. **Manual redeploy option:**
   - Go to Render dashboard
   - Click your backend service
   - Click "Manual Deploy" → "Clear build cache & deploy"

## Verify Deployment

After deployment succeeds:

1. Check logs: Render dashboard → Your service → "Logs"
2. Visit: `https://your-backend.onrender.com/docs`
3. Should see FastAPI documentation page
4. Test endpoint: `GET /api/reviews/hostaway`

## Additional Render Settings (Optional)

If still having issues, set in Render Dashboard:

**Environment Variables:**
```
PYTHON_VERSION = 3.11.0
```

**Build Command:**
```
pip install --upgrade pip && pip install -r requirements.txt
```

**Start Command:**
```
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

## Why These Versions?

- **FastAPI 0.115.5**: Latest stable, better performance
- **Pydantic 2.10.3**: Pre-built wheels for Python 3.11
- **psycopg2-binary**: PostgreSQL driver (required for Render Postgres)
- **gunicorn**: Production WSGI server (recommended by Render)

## Troubleshooting

**If build still fails:**

1. Check Python version in logs:
   ```
   Look for: "Python 3.11.x"
   ```

2. Clear build cache:
   - Render dashboard → Service Settings
   - "Clear build cache & deploy"

3. Check for typos in `requirements.txt`

4. Verify database connection string is set

**If deployment succeeds but app crashes:**

1. Check logs for errors
2. Verify environment variables are set:
   - `DATABASE_URL`
   - `HOSTAWAY_API_KEY`
   - `CORS_ORIGINS`

3. Test database connection:
   ```python
   # Should see in logs: "Database connected"
   ```

## Success Indicators

✅ Build completes without errors
✅ Service shows "Live" status
✅ `/docs` endpoint loads
✅ Logs show "Uvicorn running on..."
✅ No database connection errors

---

**Next:** Once backend deploys successfully, proceed with Vercel frontend deployment.

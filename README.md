# Flex Living Reviews Dashboard

A full-stack application for managing and displaying property reviews from Hostaway.

## Features

- 📊 **Dashboard** - Overview of all properties and review statistics
- 🏠 **Properties** - Detailed performance metrics for each property
- ⭐ **Reviews Management** - Approve and feature reviews
- 👁️ **Public View** - Preview how guests see your property pages

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React Query** - Data fetching and caching

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Production database
- **Hostaway API Integration** - Review synchronization

## Getting Started

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Deployment

Recommended: Vercel (frontend) + Railway (backend)

See deployment documentation for details.

#!/bin/bash

echo "🚀 Setting up Flex Living Reviews Dashboard..."

# Backend setup
echo "📦 Setting up Python backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

echo "✅ Backend setup complete!"

# Frontend setup
echo "📦 Setting up Next.js frontend..."
cd ../frontend

# Install dependencies
npm install

echo "✅ Frontend setup complete!"

echo ""
echo "🎉 Setup complete! You can now start the servers:"
echo ""
echo "Backend (in backend/ directory):"
echo "  source venv/bin/activate"
echo "  uvicorn app.main:app --reload --port 8000"
echo ""
echo "Frontend (in frontend/ directory):"
echo "  npm run dev"
echo ""
echo "Then visit:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API Docs: http://localhost:8000/docs"

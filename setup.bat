@echo off

echo Setting up Flex Living Reviews Dashboard...

REM Backend setup
echo Setting up Python backend...
cd backend

REM Create virtual environment
python -m venv venv
call venv\Scripts\activate

REM Install dependencies
pip install -r requirements.txt

echo Backend setup complete!

REM Frontend setup
echo Setting up Next.js frontend...
cd ..\frontend

REM Install dependencies
call npm install

echo Frontend setup complete!

echo.
echo Setup complete! You can now start the servers:
echo.
echo Backend (in backend\ directory):
echo   venv\Scripts\activate
echo   uvicorn app.main:app --reload --port 8000
echo.
echo Frontend (in frontend\ directory):
echo   npm run dev
echo.
echo Then visit:
echo   Frontend: http://localhost:3000
echo   Backend API Docs: http://localhost:8000/docs

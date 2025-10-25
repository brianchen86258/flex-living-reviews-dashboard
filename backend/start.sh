#!/bin/bash
# Render startup script for FastAPI

# Get port from environment or use default
PORT=${PORT:-10000}

echo "Starting FastAPI server on 0.0.0.0:$PORT"

# Start uvicorn
exec uvicorn app.main:app --host 0.0.0.0 --port $PORT

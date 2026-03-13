@echo off
title Safe Chat AI - Startup

echo ============================================
echo        Safe Chat AI - Setup and Launch
echo ============================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed or not running.
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    echo After installing, restart your computer and run this file again.
    pause
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is installed but not running.
    echo Please open Docker Desktop and wait for it to start, then run this file again.
    pause
    exit /b 1
)

echo [OK] Docker is running.
echo.

REM Check if .env file exists
if not exist ".env" (
    echo [SETUP] No .env file found. Let's create one.
    echo.
    set /p GEMINI_KEY="Enter your Gemini API Key: "
    echo GEMINI_API_KEY=%GEMINI_KEY%> .env
    echo [OK] .env file created.
    echo.
)

echo [INFO] Starting the application with Docker...
echo [INFO] This may take a few minutes the first time (downloading dependencies).
echo.

docker compose up --build -d

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Something went wrong. Please check the error above.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   Application is running!
echo ============================================
echo.
echo   Frontend:  http://localhost:3000
echo   Backend:   http://localhost:8000
echo.
echo   To stop the app, run:  docker compose down
echo ============================================
echo.

REM Open browser automatically
start http://localhost:3000

pause

@echo off
:: Car Parts Bulgaria - Development Setup Script for Windows
:: This script helps you get the project running quickly on Windows

echo 🚗 Car Parts Bulgaria - Development Setup
echo ========================================

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version

:: Check if package.json exists
if not exist "package.json" (
    echo ❌ package.json not found. Are you in the right directory?
    pause
    exit /b 1
)

:: Install dependencies
echo 📦 Installing dependencies...
where yarn >nul 2>&1
if errorlevel 1 (
    npm install
) else (
    yarn install
)

:: Check if .env.local exists
if not exist ".env.local" (
    echo ⚠️  .env.local not found. Creating from example...
    if exist ".env.local.example" (
        copy ".env.local.example" ".env.local"
        echo ✅ .env.local created from example
        echo 📝 Please edit .env.local with your Firebase configuration
    ) else (
        echo ❌ .env.local.example not found
    )
)

echo.
echo 🎉 Setup complete!
echo.
echo To start development:
echo   yarn dev    (if using Yarn)
echo   npm run dev (if using npm)
echo.
echo The application will be available at:
echo   http://localhost:3001
echo.
echo 🔧 Don't forget to:
echo   1. Configure Firebase in .env.local
echo   2. Set up your Firebase project  
echo   3. Add car parts data to your database
echo.
echo Happy coding! 🚀
pause
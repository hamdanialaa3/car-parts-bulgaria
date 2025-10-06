#!/bin/bash

# Car Parts Bulgaria - Development Setup Script
# This script helps you get the project running quickly

echo "🚗 Car Parts Bulgaria - Development Setup"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if ! node -e "console.log(process.version.slice(1) >= '$REQUIRED_VERSION' ? 'ok' : 'old')" | grep -q "ok"; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Are you in the right directory?"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
if command -v yarn &> /dev/null; then
    yarn install
else
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating from example..."
    if [ -f ".env.local.example" ]; then
        cp .env.local.example .env.local
        echo "✅ .env.local created from example"
        echo "📝 Please edit .env.local with your Firebase configuration"
    else
        echo "❌ .env.local.example not found"
    fi
fi

# Build and start
echo "🏗️  Building the project..."
if command -v yarn &> /dev/null; then
    yarn build
else
    npm run build
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start development:"
echo "  yarn dev    (if using Yarn)"
echo "  npm run dev (if using npm)"
echo ""
echo "The application will be available at:"
echo "  http://localhost:3001"
echo ""
echo "🔧 Don't forget to:"
echo "  1. Configure Firebase in .env.local"
echo "  2. Set up your Firebase project"
echo "  3. Add car parts data to your database"
echo ""
echo "Happy coding! 🚀"
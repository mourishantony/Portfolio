# Portfolio Quick Setup Script

Write-Host "🚀 Setting up Backend Developer Portfolio..." -ForegroundColor Cyan
Write-Host ""

# Backend Setup
Write-Host "📦 Setting up Backend..." -ForegroundColor Yellow
Set-Location backend

# Check if Python is installed
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "✓ Python found" -ForegroundColor Green
} else {
    Write-Host "✗ Python not found. Please install Python 3.9+" -ForegroundColor Red
    exit 1
}

# Create virtual environment
Write-Host "Creating virtual environment..." -ForegroundColor Cyan
python -m venv venv

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Cyan
.\venv\Scripts\Activate.ps1

# Install dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Cyan
pip install -r requirements.txt

# Create .env file
if (-Not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Cyan
    Copy-Item .env.example .env
    Write-Host "⚠ Please edit backend/.env with your settings!" -ForegroundColor Yellow
}

Write-Host "✓ Backend setup complete!" -ForegroundColor Green
Write-Host ""

# Frontend Setup
Set-Location ../frontend
Write-Host "📦 Setting up Frontend..." -ForegroundColor Yellow

# Check if Node.js is installed
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "✓ Node.js found" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing Node.js dependencies..." -ForegroundColor Cyan
npm install

# Create .env file
if (-Not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Cyan
    Copy-Item .env.example .env
    Write-Host "⚠ Please edit frontend/.env with your settings!" -ForegroundColor Yellow
}

Write-Host "✓ Frontend setup complete!" -ForegroundColor Green
Write-Host ""

# Final Instructions
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Start MongoDB:" -ForegroundColor White
Write-Host "   mongod" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Edit backend/.env with your settings" -ForegroundColor White
Write-Host ""
Write-Host "3. Start Backend (in backend/ folder):" -ForegroundColor White
Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor Gray
Write-Host "   uvicorn main:app --reload" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Start Frontend (in frontend/ folder):" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Access:" -ForegroundColor White
Write-Host "   Portfolio: http://localhost:5173" -ForegroundColor Gray
Write-Host "   API Docs:  http://localhost:8000/docs" -ForegroundColor Gray
Write-Host "   Admin:     http://localhost:5173/[your-admin-path]" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📚 For deployment, see:" -ForegroundColor Yellow
Write-Host "   - backend/DEPLOYMENT.md" -ForegroundColor Gray
Write-Host "   - frontend/DEPLOYMENT.md" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan

# CRM Deployment Script for PowerShell
# This script helps you deploy your CRM application

Write-Host "🚀 CRM Application Deployment Helper" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

# Check if GitHub remote exists
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host ""
    Write-Host "🔗 Setting up GitHub remote..." -ForegroundColor Yellow
    $githubUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/dev-ploy/Customer_Relationship_Management.git)"
    git remote add origin $githubUrl
    Write-Host "✅ GitHub remote added" -ForegroundColor Green
} else {
    Write-Host "✅ GitHub remote already configured: $remoteUrl" -ForegroundColor Green
}

# Add .env files to gitignore if not already there
Write-Host ""
Write-Host "🔒 Ensuring .env files are ignored..." -ForegroundColor Yellow
$gitignoreContent = Get-Content ".gitignore" -Raw 2>$null
if ($gitignoreContent -notlike "*.env*") {
    Add-Content ".gitignore" "`n# Environment files`n.env`n.env.local`n.env.production"
    Write-Host "✅ .env files added to .gitignore" -ForegroundColor Green
} else {
    Write-Host "✅ .env files already in .gitignore" -ForegroundColor Green
}

# Commit and push
Write-Host ""
Write-Host "📝 Preparing to commit and push..." -ForegroundColor Yellow
git add .
$commitMessage = Read-Host "Enter commit message (default: 'Initial deployment setup')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial deployment setup"
}
git commit -m "$commitMessage"

Write-Host ""
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host ""
Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Deploy database on Render: https://render.com/" -ForegroundColor White
Write-Host "2. Deploy backend on Render with PostgreSQL" -ForegroundColor White
Write-Host "3. Deploy frontend on Vercel: https://vercel.com/" -ForegroundColor White
Write-Host ""
Write-Host "📖 Read DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Yellow
Write-Host ""

# Test Build Script for RideFix Angular Project
# This script will test the build process and verify budget configuration

Write-Host "Testing Angular Build Configuration..." -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Clean previous builds
Write-Host "Cleaning previous builds..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✓ Previous builds cleaned" -ForegroundColor Green
}

# Install dependencies if needed
Write-Host "Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
}

# Test production build
Write-Host "Testing production build..." -ForegroundColor Yellow
Write-Host "Command: npm run build" -ForegroundColor Cyan

try {
    npm run build
    Write-Host "✓ Build completed successfully!" -ForegroundColor Green
    Write-Host "✓ Budget limits should now be applied" -ForegroundColor Green
} catch {
    Write-Host "✗ Build failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "=====================================" -ForegroundColor Green
Write-Host "Build test completed!" -ForegroundColor Green
Write-Host "Check the output above for any budget errors." -ForegroundColor Cyan


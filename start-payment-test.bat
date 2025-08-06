@echo off
echo 🚀 Starting SkillBridge Payment Test Environment...
echo.
echo 📋 Test Accounts:
echo Seller: seller@test.com / password123
echo Buyer: buyer@test.com / password123
echo.
echo 💡 Test Flow:
echo 1. Login as buyer (buyer@test.com)
echo 2. Browse gigs and select one created by sarah_dev
echo 3. Click "Continue to Payment" to test Stripe checkout
echo.
echo Starting servers...
echo.

start "SkillBridge Server" cmd /k "cd /d c:\Users\Acer\freelance-marketplace\server && npm run dev"
timeout /t 3 /nobreak > nul
start "SkillBridge Client" cmd /k "cd /d c:\Users\Acer\freelance-marketplace\client && npm start"

echo.
echo ✅ Both servers are starting...
echo 🌐 Client will be available at: http://localhost:3000
echo 🔧 Server will be available at: http://localhost:5000
echo.
pause
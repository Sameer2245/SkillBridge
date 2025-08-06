# 🐛 Registration Debug Guide

## Current Status
✅ MongoDB Connection: Configured and working
✅ Backend Route: `/api/auth/register` exists
✅ Password Hashing: bcrypt implemented
✅ CORS: Enabled in Express
✅ Frontend API Call: Properly configured
✅ Environment Variables: Set correctly

## Debug Steps Added

### 1. Backend Debug Logs (server/routes/auth.js)
```javascript
console.log("🔍 Registration attempt:", { body: req.body, timestamp: new Date().toISOString() });
console.log("🔍 Checking for existing email:", email);
console.log("🔍 Checking for existing username:", username);
console.log("🔐 Hashing password...");
console.log("👤 Creating new user...");
console.log("💾 Saving user to database...");
console.log("✅ User saved successfully:", newUser._id);
console.log("🔑 Generating JWT token...");
console.log("✅ JWT token generated successfully");
console.log("🎉 Registration successful, sending response...");
```

### 2. Frontend Debug Logs
- Register.js: Form submission and data processing
- AuthService: API call logging
- AuthContext: Registration process tracking

## Testing Steps

### 1. Start the Backend Server
```bash
cd server
npm start
```
Check console for:
- ✅ MongoDB connected
- 🔊 Server listening on port 5000

### 2. Start the Frontend
```bash
cd client
npm start
```

### 3. Test Registration Manually
1. Go to http://localhost:3000/register
2. Fill out the form
3. Check browser console for frontend logs
4. Check server console for backend logs

### 4. Run Test Script
```bash
node test-registration.js
```

## Common Issues & Solutions

### Issue 1: "Registration failed" with no specific error
**Solution**: Check server console for detailed error logs

### Issue 2: CORS errors
**Solution**: Verify CORS is enabled in server.js:
```javascript
app.use(cors());
```

### Issue 3: MongoDB connection issues
**Solution**: Check MONGO_URI in .env file and network connectivity

### Issue 4: JWT_SECRET missing
**Solution**: Ensure JWT_SECRET is set in server/.env

### Issue 5: Frontend can't reach backend
**Solution**: Verify API_URL in client/.env matches server port

## Environment Variables Check

### Server (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
CLIENT_URL=http://localhost:3000
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Complete Registration Flow

1. **Frontend Form Submission** → Register.js
2. **Auth Context Processing** → AuthContext.js
3. **API Service Call** → auth.js service
4. **HTTP Request** → axios to backend
5. **Backend Route Handler** → /api/auth/register
6. **Database Operations** → User model save
7. **JWT Generation** → Token creation
8. **Response** → Success/Error back to frontend

## Debugging Commands

### Check if server is running:
```bash
curl http://localhost:5000
```

### Test registration endpoint:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","isSeller":false}'
```

### Check MongoDB connection:
```bash
# In MongoDB Compass or CLI
# Connect to: mongodb+srv://trxearningwithsam:Sameer%40123@cluster0.t1yo6h3.mongodb.net/freelanceDB
```

## Next Steps
1. Run the test script to verify backend
2. Check browser network tab for failed requests
3. Monitor server console during registration attempts
4. Verify all environment variables are loaded correctly
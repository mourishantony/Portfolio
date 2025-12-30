# 🔧 Troubleshooting Guide

Common issues and their solutions for your portfolio application.

## Table of Contents
1. [Installation Issues](#installation-issues)
2. [Backend Issues](#backend-issues)
3. [Frontend Issues](#frontend-issues)
4. [Database Issues](#database-issues)
5. [Authentication Issues](#authentication-issues)
6. [Deployment Issues](#deployment-issues)
7. [General Tips](#general-tips)

---

## Installation Issues

### Python: "python/python3 not found"

**Solution:**
1. Download from https://www.python.org/
2. During installation, check "Add Python to PATH"
3. Restart terminal
4. Verify: `python --version`

### Node.js: "npm/node not found"

**Solution:**
1. Download from https://nodejs.org/
2. Install LTS version
3. Restart terminal
4. Verify: `node --version` and `npm --version`

### pip: "pip not recognized"

**Solution:**
```bash
python -m ensurepip --upgrade
python -m pip install --upgrade pip
```

---

## Backend Issues

### Issue: "ModuleNotFoundError: No module named 'X'"

**Solution:**
```bash
cd backend
# Activate venv first!
.\venv\Scripts\Activate.ps1  # Windows
# source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt
```

### Issue: "Address already in use" (Port 8000)

**Solution:**

**Windows:**
```powershell
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:8000 | xargs kill -9
```

Or run on different port:
```bash
uvicorn main:app --reload --port 8001
```

### Issue: Backend starts but gives 500 errors

**Check:**
1. Is MongoDB running? `mongod`
2. Check `.env` file exists and is configured
3. Look at terminal for error messages
4. Check `/health` endpoint works
5. Review API docs: http://localhost:8000/docs

### Issue: "Could not connect to MongoDB"

**Solutions:**

**If using local MongoDB:**
```bash
# Start MongoDB
mongod

# Check if running
mongo --eval "db.version()"
```

**If using MongoDB Atlas:**
1. Check connection string in `.env`
2. Whitelist your IP in Atlas
3. Verify username/password
4. Check database name in URL

### Issue: CORS errors in console

**Solution:**

Update `backend/.env`:
```env
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Important:**
- No trailing slashes!
- Include http:// or https://
- Comma-separated, no spaces
- Must restart backend after changing

---

## Frontend Issues

### Issue: "npm install" fails

**Solutions:**

1. Clear cache:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

2. Try different Node version:
```bash
node --version  # Should be 18+
```

3. Use npm instead of yarn/pnpm

### Issue: "VITE_API_URL is undefined"

**Solution:**

1. Check `.env` file exists in `frontend/` folder
2. Variables must start with `VITE_`
3. Restart dev server after changing `.env`
4. Check no extra spaces:
```env
VITE_API_URL=http://localhost:8000/api
# NOT: VITE_API_URL = http://localhost:8000/api
```

### Issue: White screen / Nothing loads

**Check:**
1. Browser console (F12) for errors
2. Is backend running?
3. Network tab - API calls failing?
4. Try clearing browser cache (Ctrl+Shift+Delete)

### Issue: Animations not working / Styling broken

**Solutions:**

1. Rebuild Tailwind:
```bash
cd frontend
npm run dev
```

2. Check CSS import in `main.jsx`:
```jsx
import './index.css'
```

3. Clear browser cache

### Issue: "Cannot find module 'react'"

**Solution:**
```bash
cd frontend
rm -rf node_modules
npm install
```

---

## Database Issues

### Issue: "Database 'portfolio_db' not found"

**Solution:**

MongoDB creates databases automatically. Just make sure:
1. MongoDB is running
2. Connection string is correct
3. Backend is running

The database will be created on first data insert!

### Issue: Can't see data in admin panel

**Check:**
1. Is backend connected to MongoDB?
2. Check terminal for database connection message
3. Try adding data through API docs: http://localhost:8000/docs
4. Check MongoDB Compass (GUI tool)

### Issue: MongoDB Compass can't connect

**Solution:**

Connection string:
- Local: `mongodb://localhost:27017`
- Atlas: Use the full connection string from Atlas dashboard

---

## Authentication Issues

### Issue: Can't login to admin panel

**Checklist:**
1. ✅ Is backend running?
2. ✅ Using correct URL? (with ADMIN_SECRET_PATH)
3. ✅ Correct username/password from `.env`?
4. ✅ `ADMIN_SECRET_PATH` matches in both frontend & backend?
5. ✅ `SECRET_KEY` is set in backend `.env`?

**Debug Steps:**

1. Test backend auth endpoint directly:
```bash
curl -X POST http://localhost:8000/api/admin-YOUR-PATH/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

2. Check browser console (F12) for errors

3. Verify environment variables:
```bash
# Backend
cd backend
cat .env | grep ADMIN

# Frontend
cd frontend
cat .env | grep VITE_ADMIN
```

### Issue: "Token expired" / Keep getting logged out

**Solution:**

In `backend/.env`, increase token expiry:
```env
ACCESS_TOKEN_EXPIRE_MINUTES=43200  # 30 days
```

### Issue: Admin panel shows "Unauthorized"

**Solutions:**

1. Clear browser localStorage:
```javascript
// In browser console (F12)
localStorage.clear()
location.reload()
```

2. Login again

3. Check token in localStorage:
```javascript
// In console
localStorage.getItem('token')
```

---

## Deployment Issues

### Vercel Deployment Issues

**Issue: Environment variables not working**

**Solution:**
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add each variable
3. **Important:** Redeploy after adding variables!

**Issue: "Failed to compile"**

**Check:**
1. Build works locally? `npm run build`
2. All dependencies in `package.json`?
3. Check Vercel build logs for specific error

### Render Deployment Issues

**Issue: Build fails**

**Check:**
1. Python version in `runtime.txt` (3.11.0)
2. All packages in `requirements.txt`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Issue: Service starts but crashes**

**Check:**
1. Environment variables set in Render dashboard
2. MongoDB connection string is correct
3. Check Render logs for errors

### MongoDB Atlas Issues

**Issue: "MongoServerError: bad auth"**

**Solution:**
1. Check username/password in connection string
2. Escape special characters in password:
   - @ → %40
   - # → %23
   - $ → %24

**Issue: "Connection timeout"**

**Solution:**
1. Network Access → Add IP Address
2. For testing: Allow from anywhere (0.0.0.0/0)
3. For production: Add your server IPs

---

## General Tips

### Debugging Checklist

When something doesn't work:

1. ✅ Check browser console (F12) for errors
2. ✅ Check backend terminal for errors
3. ✅ Check if services are running (backend, MongoDB)
4. ✅ Verify `.env` files are configured
5. ✅ Try in incognito/private browsing mode
6. ✅ Clear browser cache
7. ✅ Restart all services

### Useful Commands

**Check if services are running:**
```bash
# Backend
curl http://localhost:8000/health

# Frontend
curl http://localhost:5173
```

**View environment variables:**
```bash
# Windows
type backend\.env
type frontend\.env

# Mac/Linux
cat backend/.env
cat frontend/.env
```

**Fresh start:**
```bash
# Kill all Node processes
# Windows: Task Manager → End node.exe
# Mac/Linux: killall node

# Kill Python/uvicorn
# Similar process

# Restart everything
```

### Getting Help

**Check logs:**
1. Backend terminal output
2. Frontend terminal output
3. Browser console (F12)
4. Network tab (F12) for API calls

**API Testing:**
1. Use Swagger UI: http://localhost:8000/docs
2. Test endpoints directly
3. Check request/response

**Database Inspection:**
1. MongoDB Compass (GUI tool)
2. Connect to `mongodb://localhost:27017`
3. Browse collections and documents

### Common Error Messages

| Error | Likely Cause | Solution |
|-------|--------------|----------|
| "Failed to fetch" | Backend not running | Start backend |
| "Network Error" | Wrong API URL | Check `.env` |
| "401 Unauthorized" | Not logged in | Login again |
| "500 Internal Server Error" | Backend error | Check backend logs |
| "Cannot connect to MongoDB" | MongoDB not running | Start mongod |

---

## Still Having Issues?

### Self-Diagnosis Steps:

1. **Fresh Install:**
```bash
# Backend
cd backend
rm -rf venv
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

2. **Check Versions:**
```bash
python --version   # Should be 3.9+
node --version     # Should be 18+
npm --version
mongod --version
```

3. **Test Components Separately:**
```bash
# Test MongoDB
mongo --eval "db.version()"

# Test Backend
curl http://localhost:8000/health

# Test Frontend build
cd frontend
npm run build
```

4. **Review Configuration:**
- All `.env` files present?
- All values filled in?
- No extra spaces or quotes?
- Paths correct?

### Documentation Resources:

- [Main README](README.md)
- [Getting Started Guide](GETTING_STARTED.md)
- [Backend Deployment](backend/DEPLOYMENT.md)
- [Frontend Deployment](frontend/DEPLOYMENT.md)
- [Project Summary](PROJECT_SUMMARY.md)

### External Resources:

- FastAPI Docs: https://fastapi.tiangolo.com/
- React Docs: https://react.dev/
- MongoDB Docs: https://docs.mongodb.com/
- Vite Docs: https://vitejs.dev/
- Tailwind Docs: https://tailwindcss.com/

---

## Prevention Tips

### Before You Start:
- ✅ Read documentation first
- ✅ Install all prerequisites
- ✅ Follow setup steps in order
- ✅ Don't skip configuration steps

### During Development:
- ✅ Commit code regularly (git)
- ✅ Test in incognito mode
- ✅ Check console for warnings
- ✅ Keep dependencies updated

### Before Deployment:
- ✅ Test everything locally
- ✅ Review all environment variables
- ✅ Test with production database
- ✅ Check all links work

---

**Remember:** 90% of issues are environment configuration or service not running! 🔧

Good luck! 🚀

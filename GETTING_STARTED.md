# 🚀 Quick Start Guide

Welcome! This guide will get your portfolio up and running in minutes.

## ⚡ Prerequisites

Make sure you have these installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (3.9 or higher) - [Download](https://www.python.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database)

## 🎯 Quick Setup (Automated)

### Windows (PowerShell):
```powershell
cd Portfolio
.\setup.ps1
```

### macOS/Linux:
```bash
cd Portfolio
chmod +x setup.sh
./setup.sh
```

## 📝 Manual Setup

### Step 1: Configure Backend

1. Navigate to backend folder:
```bash
cd backend
```

2. Create and activate virtual environment:

**Windows:**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:

Edit `backend/.env` file and update these important values:

```env
# Generate a secure SECRET_KEY (run this in Python):
# python -c "import secrets; print(secrets.token_urlsafe(32))"
SECRET_KEY=your-generated-secure-key-here

# Change these credentials!
ADMIN_USERNAME=yourusername
ADMIN_PASSWORD=YourSecurePassword123!

# MongoDB (if using Atlas, paste your connection string)
MONGODB_URL=mongodb://localhost:27017

# Important: Change this to a unique cryptographic string!
ADMIN_SECRET_PATH=admin-X9kP2mN8qW5eR7tY
```

### Step 2: Configure Frontend

1. Navigate to frontend folder:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Edit `frontend/.env` file:

```env
VITE_API_URL=http://localhost:8000/api

# Must match backend's ADMIN_SECRET_PATH!
VITE_ADMIN_SECRET_PATH=admin-X9kP2mN8qW5eR7tY
```

## 🎮 Running the Application

### Step 1: Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas** (recommended for deployment):
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URL` in `backend/.env`

### Step 2: Start Backend

Open a terminal in `backend/` folder:

**Windows:**
```powershell
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

**macOS/Linux:**
```bash
source venv/bin/activate
uvicorn main:app --reload
```

Backend running at: **http://localhost:8000**
API Docs at: **http://localhost:8000/docs**

### Step 3: Start Frontend

Open a **new terminal** in `frontend/` folder:

```bash
npm run dev
```

Frontend running at: **http://localhost:5173**

## 🎨 Using Your Portfolio

### Public View
Visit: **http://localhost:5173**

You'll see your portfolio with:
- Twinkling stars background 🌟
- Hero section
- About section
- Projects, Skills, Hackathons, Certificates
- Contact form

### Admin Panel
Visit: **http://localhost:5173/admin-X9kP2mN8qW5eR7tY**
(Replace with your `ADMIN_SECRET_PATH`)

Login with:
- Username: (from your `.env`)
- Password: (from your `.env`)

From admin panel, you can:
- ✏️ Edit profile information
- ➕ Add/edit/delete projects
- 🛠️ Manage skills
- 🏆 Add hackathon wins
- 📜 Add certificates
- 📧 View contact messages

## 📊 Adding Your First Project

1. Login to admin panel
2. Click "Projects" tab
3. Click "Add Project"
4. Fill in:
   - **Title**: Your project name
   - **Description**: What it does
   - **Technologies**: Python, FastAPI, React (comma-separated)
   - **GitHub Link**: Your repo URL
   - **Demo Video Link**: Google Drive link to demo video
   - **Thumbnail**: Image URL (optional)
5. Click "Save"

Your project now appears on the public portfolio!

## 🎬 Google Drive Links Setup

For demo videos and certificates:

1. Upload file to Google Drive
2. Right-click → Share → Get link
3. Change to "Anyone with the link"
4. Copy link
5. Paste in admin form

## 🔧 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution:**
```bash
# Backend
cd backend
pip install -r requirements.txt --upgrade

# Frontend
cd frontend
npm install
```

### Issue: Can't connect to MongoDB
**Solution:**
- Check if MongoDB is running: `mongod`
- Or use MongoDB Atlas (cloud database)
- Verify `MONGODB_URL` in `.env`

### Issue: CORS errors
**Solution:**
- Make sure backend is running
- Check `CORS_ORIGINS` in `backend/.env` includes `http://localhost:5173`

### Issue: Admin login not working
**Solution:**
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `backend/.env`
- Check `ADMIN_SECRET_PATH` matches in both frontend and backend `.env`
- Clear browser cache

### Issue: Port already in use
**Solution:**
```bash
# Find and kill process on port 8000 (backend)
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:8000 | xargs kill -9

# Or use different port:
uvicorn main:app --reload --port 8001
```

## 🌐 Deployment

Ready to go live? See detailed guides:
- [Backend Deployment](backend/DEPLOYMENT.md) - Deploy to Render/Railway
- [Frontend Deployment](frontend/DEPLOYMENT.md) - Deploy to Vercel

**Quick Deployment Summary:**

1. **Backend** → Render (free tier)
2. **Frontend** → Vercel (free tier)
3. **Database** → MongoDB Atlas (free tier)

Total cost: **$0** 🎉

## 📚 Project Structure

```
Portfolio/
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── routes/   # API endpoints
│   │   ├── models.py # Data models
│   │   ├── auth.py   # Authentication
│   │   └── database.py
│   ├── main.py       # Entry point
│   └── .env          # Configuration
│
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/      # Admin CRUD components
│   │   │   └── sections/   # Portfolio sections
│   │   ├── pages/          # Main pages
│   │   ├── services/       # API calls
│   │   └── store/          # State management
│   └── .env          # Configuration
│
└── README.md         # You are here!
```

## 🎯 Next Steps

1. **Customize Profile**
   - Add your info in admin panel
   - Upload profile picture
   - Add social links

2. **Add Projects**
   - Add 3-5 best projects
   - Include demo videos from Drive
   - Link to GitHub repos

3. **Add Skills**
   - List your tech stack
   - Set proficiency levels
   - Group by category

4. **Add Achievements**
   - Hackathon wins
   - Certificates
   - Awards

5. **Test Everything**
   - Contact form
   - All links work
   - Mobile responsive

6. **Deploy**
   - Follow deployment guides
   - Get your portfolio live!
   - Share with the world 🚀

## 💡 Tips

- **Demo Videos**: Keep under 2 minutes, show key features
- **Projects**: Focus on 3-5 best projects, not quantity
- **Skills**: Be honest about proficiency levels
- **Contact Form**: Check messages regularly in admin panel
- **Security**: Never share your admin credentials!

## 🆘 Need Help?

1. Check the detailed [README](README.md)
2. Review [Backend Deployment Guide](backend/DEPLOYMENT.md)
3. Review [Frontend Deployment Guide](frontend/DEPLOYMENT.md)
4. Check API documentation: `http://localhost:8000/docs`
5. Look at browser console for errors (F12)

## ✅ Checklist

Before going live:

- [ ] Changed `SECRET_KEY` in backend/.env
- [ ] Changed `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- [ ] Changed `ADMIN_SECRET_PATH` to unique value
- [ ] Updated profile with your information
- [ ] Added at least 3 projects
- [ ] Added your skills
- [ ] Added social media links
- [ ] Tested contact form
- [ ] Tested on mobile device
- [ ] All links work correctly
- [ ] Ready to deploy!

---

## 🎉 You're Ready!

Your beautiful backend developer portfolio is set up and ready to showcase your work. Happy coding! 💻✨

Remember: This portfolio grows with you. Keep adding projects, skills, and achievements as you progress in your career!

---

**Built with ❤️ using React, FastAPI, and MongoDB**

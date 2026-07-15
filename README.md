# Backend Developer Portfolio

A stunning, full-stack portfolio application for backend developers featuring a dark theme with twinkling stars animation, admin panel for content management, and secure authentication.

## 🌟 Features

### Public Portfolio
- **Animated Dark Theme** with twinkling stars background
- **Responsive Design** for all devices
- **Smooth Animations** using Framer Motion
- Sections:
  - Hero with animated icons
  - About Me with profile info
  - Featured Projects with GitHub & demo links
  - Technical Skills with proficiency bars
  - Hackathon Achievements
  - Certifications
  - Contact Form with WhatsApp integration

### Admin Panel
- **Secure Hidden Login** (cryptographic URL)
- **JWT Authentication**
- Full CRUD operations for:
  - Profile Information
  - Projects
  - Skills
  - Hackathons
  - Certificates
- **Message Inbox** to view contact form submissions
- Real-time content updates

## 🛠️ Tech Stack

### Frontend
- **React.js** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **Axios** for API calls
- **React Router** for navigation
- **React Toastify** for notifications

### Backend
- **FastAPI** (Python)
- **MongoDB** with Motor (async driver)
- **JWT** for authentication
- **Pydantic** for data validation
- **Python-JOSE** for token handling

## 📁 Project Structure

```
Portfolio/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── projects.py
│   │   │   ├── hackathons.py
│   │   │   ├── skills.py
│   │   │   ├── certificates.py
│   │   │   ├── contact.py
│   │   │   └── profile.py
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── config.py
│   │   ├── database.py
│   │   └── models.py
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── admin/
    │   │   │   ├── ProfileManager.jsx
    │   │   │   ├── ProjectsManager.jsx
    │   │   │   ├── SkillsManager.jsx
    │   │   │   ├── HackathonsManager.jsx
    │   │   │   ├── CertificatesManager.jsx
    │   │   │   └── MessagesManager.jsx
    │   │   ├── sections/
    │   │   │   ├── Hero.jsx
    │   │   │   ├── About.jsx
    │   │   │   ├── Projects.jsx
    │   │   │   ├── Skills.jsx
    │   │   │   ├── Hackathons.jsx
    │   │   │   ├── Certificates.jsx
    │   │   │   └── Contact.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── StarBackground.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── AdminLogin.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── store/
    │   │   └── authStore.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── .env.example
    └── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (3.9 or higher)
- **MongoDB** (local or MongoDB Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Edit `.env` with your settings:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=portfolio_db
SECRET_KEY=your-super-secret-key-here-change-this
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
CORS_ORIGINS=http://localhost:5173
ADMIN_SECRET_PATH=admin-7f9k2p8x3q1w5e6r
```

6. Start the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env`:
```env
VITE_API_URL=http://localhost:8000/api
VITE_ADMIN_SECRET_PATH=admin-7f9k2p8x3q1w5e6r
```

5. Start development server:
```bash
npm run dev

```

The app will be available at `http://localhost:5173`

## 🔒 Admin Access

1. Navigate to the hidden admin URL: `http://localhost:5173/admin-7f9k2p8x3q1w5e6r`
2. Login with credentials from `.env`
3. Manage your portfolio content!

**⚠️ Security Note:** Change the `ADMIN_SECRET_PATH` to a unique cryptographic string in production!

## 📦 Deployment

### Backend (Render/Railway)

1. Create a new Web Service
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URL` (MongoDB Atlas connection string)
   - `SECRET_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `CORS_ORIGINS` (your frontend URL)
   - `ADMIN_SECRET_PATH`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variables:
   - `VITE_API_URL` (your backend URL + /api)
   - `VITE_ADMIN_SECRET_PATH`
4. Deploy!

### MongoDB Atlas Setup

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string
6. Update `MONGODB_URL` in backend `.env`

## 📝 Usage Guide

### Adding Projects
1. Login to admin panel
2. Go to "Projects" tab
3. Click "Add Project"
4. Fill in details (use Google Drive links for demo videos)
5. Save!

### Adding Hackathon Wins
1. Go to "Hackathons" tab
2. Click "Add Hackathon"
3. Include achievement details and certificate links
4. Save!

### Managing Skills
1. Go to "Skills" tab
2. Add skills with categories and proficiency levels
3. Skills auto-group by category

### Viewing Messages
1. Check "Messages" tab for contact form submissions
2. Reply directly via email or WhatsApp

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  primary: {...},
  accent: {
    purple: '#a855f7',
    pink: '#ec4899',
    // Add your colors
  }
}
```

### Star Animation
Modify `StarBackground.jsx` to adjust:
- Number of stars
- Twinkle speed
- Star colors

## 🔧 API Documentation

Once backend is running, visit:
- API Docs: `http://localhost:8000/docs`
- Alternative Docs: `http://localhost:8000/redoc`

## 📄 License

MIT License - feel free to use for your own portfolio!

## 🤝 Support

For questions or issues:
1. Check the code comments
2. Review the API documentation
3. Test endpoints with the Swagger UI at `/docs`

## 🌟 Features Roadmap

- [ ] Image upload to cloud storage
- [ ] Blog section
- [ ] Analytics dashboard
- [ ] Email notifications for contact form
- [ ] Dark/Light theme toggle
- [ ] Multi-language support

---

Built with ❤️ using React, FastAPI, and MongoDB

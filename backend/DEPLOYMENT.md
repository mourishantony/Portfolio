# Backend Setup and Deployment Guide

## Local Development

### 1. Setup Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and update:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=portfolio_db
SECRET_KEY=generate-a-secure-random-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
CORS_ORIGINS=http://localhost:5173
ADMIN_SECRET_PATH=admin-unique-cryptographic-string
```

**Generate a secure SECRET_KEY:**
```python
import secrets
print(secrets.token_urlsafe(32))
```

### 4. Start MongoDB
Make sure MongoDB is running locally:
```bash
mongod
```

Or use MongoDB Atlas (cloud):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URL in .env

### 5. Run the Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Access:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

## Deployment to Render

### 1. Prepare Repository
1. Push code to GitHub
2. Make sure `.env` is in `.gitignore`

### 2. Create Render Account
Visit: https://render.com

### 3. Create Web Service
1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Configure:
   - **Name:** portfolio-backend
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 4. Set Environment Variables
In Render dashboard, add:
```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio_db
DATABASE_NAME=portfolio_db
SECRET_KEY=your-generated-secure-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
CORS_ORIGINS=https://your-frontend-domain.vercel.app
ADMIN_SECRET_PATH=your-unique-admin-path
```

### 5. Deploy
Click "Create Web Service" - Render will auto-deploy!

Your API will be at: `https://your-app.onrender.com`

## Deployment to Railway

### 1. Create Railway Account
Visit: https://railway.app

### 2. New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect repository

### 3. Configure
Railway auto-detects Python. Set environment variables in dashboard.

### 4. Deploy
Automatic! Railway provides a URL.

## MongoDB Atlas Setup (Required for Production)

### 1. Create Cluster
1. Visit https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Choose cloud provider & region

### 2. Database Access
1. Go to "Database Access"
2. Add new database user
3. Set username & password
4. Grant read/write permissions

### 3. Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add specific IPs

### 4. Get Connection String
1. Click "Connect" on cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your password
5. Replace `<dbname>` with `portfolio_db`

Example:
```
mongodb+srv://admin:mypassword@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority
```

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URL | MongoDB connection string | mongodb://localhost:27017 |
| DATABASE_NAME | Database name | portfolio_db |
| SECRET_KEY | JWT signing key | generated-secure-key-here |
| ADMIN_USERNAME | Admin login username | admin |
| ADMIN_PASSWORD | Admin login password | MySecurePass123! |
| CORS_ORIGINS | Allowed frontend origins | https://mysite.vercel.app |
| ADMIN_SECRET_PATH | Hidden admin route | admin-7f9k2p8x3q1w5e6r |

## Troubleshooting

### Cannot connect to MongoDB
- Check if MongoDB is running locally
- Verify MONGODB_URL is correct
- For Atlas: Check network access whitelist

### CORS Errors
- Ensure frontend URL is in CORS_ORIGINS
- Include http/https and port

### Admin Login Not Working
- Verify ADMIN_USERNAME and ADMIN_PASSWORD in .env
- Check SECRET_KEY is set
- Ensure ADMIN_SECRET_PATH matches frontend config

### Module Not Found Errors
```bash
pip install -r requirements.txt --upgrade
```

## Testing API

### Using curl:
```bash
# Health check
curl http://localhost:8000/health

# Get projects
curl http://localhost:8000/api/projects

# Admin login
curl -X POST http://localhost:8000/api/admin-secret-path/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

### Using Swagger UI:
Visit: http://localhost:8000/docs

## Security Checklist

- [ ] Changed SECRET_KEY from example
- [ ] Changed ADMIN_PASSWORD from default
- [ ] Changed ADMIN_SECRET_PATH to unique string
- [ ] Added proper CORS_ORIGINS
- [ ] MongoDB user has limited permissions
- [ ] MongoDB network access is restricted
- [ ] .env file is in .gitignore
- [ ] Using HTTPS in production

## Performance Tips

1. **Database Indexes:** Already created for common queries
2. **Connection Pooling:** Motor handles this automatically
3. **Caching:** Consider Redis for frequently accessed data
4. **Rate Limiting:** Add rate limiting for production

## Monitoring

### Check Logs (Render):
Dashboard → Logs tab

### Check Logs (Railway):
Dashboard → Deployments → View Logs

### Health Endpoint:
Regular checks to `/health` endpoint

---

Need help? Check:
1. API Docs: http://localhost:8000/docs
2. Logs: Check terminal output
3. MongoDB: Use MongoDB Compass for GUI

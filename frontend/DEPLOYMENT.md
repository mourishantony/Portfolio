# Frontend Setup and Deployment Guide

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:8000/api
VITE_ADMIN_SECRET_PATH=admin-7f9k2p8x3q1w5e6r
```

**Important:** `VITE_ADMIN_SECRET_PATH` must match the backend's `ADMIN_SECRET_PATH`!

### 3. Start Development Server
```bash
npm run dev
```

Access at: http://localhost:5173

### 4. Build for Production
```bash
npm run build
```

Output in `dist/` folder.

## Deployment to Vercel (Recommended)

### Why Vercel?
- ✅ Free tier for personal projects
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-deploys on git push
- ✅ Easy environment variables
- ✅ Perfect for React/Vite apps

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy via GitHub (Recommended)

#### a. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

#### b. Import to Vercel
1. Visit https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite configuration!

#### c. Configure Environment Variables
In Vercel dashboard:
```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_ADMIN_SECRET_PATH=your-unique-admin-path
```

**Note:** Update these after deploying backend!

#### d. Deploy
Click "Deploy" - Done! 🎉

Your site: `https://your-project.vercel.app`

### 3. Deploy via CLI
```bash
cd frontend
vercel
```

Follow prompts:
- Set up and deploy: Y
- Which scope: your account
- Link to existing project: N
- Project name: portfolio-frontend
- Directory: ./
- Override settings: N

Set environment variables:
```bash
vercel env add VITE_API_URL
vercel env add VITE_ADMIN_SECRET_PATH
```

Deploy production:
```bash
vercel --prod
```

## Alternative: Netlify

### 1. Build Settings
- Build command: `npm run build`
- Publish directory: `dist`

### 2. Deploy via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### 3. Set Environment Variables
In Netlify dashboard:
- Site settings → Environment variables
- Add `VITE_API_URL` and `VITE_ADMIN_SECRET_PATH`

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### After Domain Setup
Update backend CORS_ORIGINS:
```env
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## Environment Variables

### Development (.env)
```env
VITE_API_URL=http://localhost:8000/api
VITE_ADMIN_SECRET_PATH=admin-7f9k2p8x3q1w5e6r
```

### Production (Vercel/Netlify)
```env
VITE_API_URL=https://your-backend.onrender.com/api
VITE_ADMIN_SECRET_PATH=your-unique-admin-path
```

## Troubleshooting

### CORS Errors
**Problem:** API requests blocked by CORS

**Solution:**
1. Check backend CORS_ORIGINS includes your frontend URL
2. Include https:// prefix
3. No trailing slash
4. Restart backend after changing CORS_ORIGINS

Example backend .env:
```env
CORS_ORIGINS=https://myportfolio.vercel.app
```

### Admin Login Not Working
**Problem:** Can't access admin panel

**Solutions:**
1. Verify VITE_ADMIN_SECRET_PATH matches backend
2. Clear browser cache
3. Check browser console for errors
4. Verify backend is running

### Build Fails
**Problem:** npm run build fails

**Solutions:**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check for errors
npm run build
```

### Environment Variables Not Working
**Problem:** Variables are undefined

**Solutions:**
1. Prefix with `VITE_` (required!)
2. Restart dev server after changing .env
3. In Vercel: Redeploy after adding variables
4. Check spelling and format

### Images/Assets Not Loading
**Problem:** 404 errors for images

**Solutions:**
1. Place images in `public/` folder
2. Reference as `/image.jpg` not `./image.jpg`
3. Or use full URLs (CDN/Drive)

## Performance Optimization

### 1. Image Optimization
Use image CDNs:
- Cloudinary
- ImgIX  
- Google Drive with direct links

### 2. Code Splitting
Already handled by Vite! ✅

### 3. Lazy Loading
```jsx
import { lazy, Suspense } from 'react'

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

<Suspense fallback={<div>Loading...</div>}>
  <AdminDashboard />
</Suspense>
```

### 4. Bundle Size
Check bundle size:
```bash
npm run build
```

## Security Checklist

- [ ] VITE_ADMIN_SECRET_PATH is unique and random
- [ ] Backend URL uses HTTPS in production
- [ ] No sensitive data in frontend code
- [ ] .env is in .gitignore
- [ ] Environment variables set in hosting platform
- [ ] Admin credentials are strong

## Monitoring

### Vercel Analytics
Enable in dashboard:
- Project Settings → Analytics → Enable

### Performance Monitoring
```bash
npm run build
npm run preview
```

Check Lighthouse score:
- Open DevTools
- Lighthouse tab
- Run audit

## Continuous Deployment

### Auto-Deploy on Push (Vercel)
Already enabled! Push to GitHub triggers deploy.

### Deploy Branches
- `main` branch → Production
- Other branches → Preview deployments

### Preview Deployments
Every pull request gets a preview URL!

## Testing Before Deployment

### 1. Build Locally
```bash
npm run build
npm run preview
```

### 2. Test Features
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] Admin login works
- [ ] Data loads from API
- [ ] Mobile responsive
- [ ] Animations smooth

### 3. Check Console
No errors in browser console!

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod

# Check for updates
npm outdated
```

## Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm install react@latest

# Security audit
npm audit
npm audit fix
```

## Domain Examples

After deployment, your portfolio will be at:
- Vercel: `https://your-project.vercel.app`
- Custom: `https://yourdomain.com`

Admin panel:
- `https://your-project.vercel.app/admin-secret-path`

---

## Quick Deploy Checklist

- [ ] Backend deployed and URL obtained
- [ ] Frontend environment variables set
- [ ] Pushed to GitHub
- [ ] Connected to Vercel
- [ ] Environment variables added in Vercel
- [ ] Deployed successfully
- [ ] Tested admin login
- [ ] Tested contact form
- [ ] Updated backend CORS_ORIGINS
- [ ] SSL certificate active (automatic)
- [ ] Custom domain configured (optional)

🎉 Your portfolio is live!

---

Need help? 
1. Check Vercel logs
2. Review browser console
3. Test API endpoints at /docs
4. Verify environment variables

# Deployment Guide

Step-by-step instructions for deploying the AI Chat App.

## Prerequisites

- GitHub account
- Render account (free tier)
- Vercel account (free tier)

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: AI Chat App"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend on Render

### 2.1 Create Web Service

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository

### 2.2 Configure Service

Fill in the following:

- **Name:** `ai-chat-backend` (or your preferred name)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 2.3 Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

- **Key:** `HF_MODEL_URL`
- **Value:** `https://api-inference.huggingface.co/models/google/flan-t5-base`

- **Key:** `PORT`
- **Value:** `3000`

### 2.4 Add Persistent Disk (CRITICAL)

1. Go to **"Disks"** tab in your service
2. Click **"Add Disk"**
3. Configure:
   - **Name:** `chat-storage`
   - **Mount Path:** `/opt/render/project/src/backend/storage`
   - **Size:** 1 GB (minimum)

**⚠️ IMPORTANT:** Without the persistent disk, your chat history will be lost on every deployment!

### 2.5 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (first deploy takes ~5 minutes)
3. Once deployed, copy your service URL (e.g., `https://ai-chat-backend.onrender.com`)

### 2.6 Test Backend

Test your backend endpoints:

```bash
# Health check
curl https://your-backend-url.onrender.com/

# Get history (should return empty array initially)
curl https://your-backend-url.onrender.com/history
```

## Step 3: Deploy Frontend on Vercel

### 3.1 Import Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository

### 3.2 Configure Project

- **Framework Preset:** `Vite`
- **Root Directory:** `frontend`
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `dist` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

### 3.3 Environment Variables

Click **"Environment Variables"** and add:

- **Key:** `VITE_API_URL`
- **Value:** `https://your-backend-url.onrender.com` (use your actual Render URL)

**⚠️ IMPORTANT:** 
- Do NOT include trailing slash
- Use `https://` not `http://`
- After adding, you may need to redeploy

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Copy your deployment URL (e.g., `https://ai-chat-app.vercel.app`)

### 3.5 Test Frontend

1. Open your Vercel URL in browser
2. Send a test message
3. Verify AI responds
4. Refresh page - history should persist

## Step 4: Update README

Update `README.md` with your live URLs:

```markdown
## 🚀 Live Demo

- **Frontend (Vercel):** https://your-app.vercel.app
- **Backend (Render):** https://your-backend.onrender.com
```

## Step 5: Troubleshooting

### Backend Issues

**Problem:** Backend returns 503 or doesn't start
- **Solution:** Check Render logs, ensure `npm start` command is correct

**Problem:** Chat history not persisting
- **Solution:** Verify persistent disk is mounted correctly at `/opt/render/project/src/backend/storage`

**Problem:** CORS errors
- **Solution:** Backend already includes CORS middleware, ensure it's running

### Frontend Issues

**Problem:** Cannot connect to backend
- **Solution:** 
  1. Check `VITE_API_URL` environment variable in Vercel
  2. Verify backend URL is correct (no trailing slash)
  3. Redeploy frontend after changing env vars

**Problem:** Build fails
- **Solution:** Check Vercel build logs, ensure all dependencies are in package.json

### General Issues

**Problem:** AI responses not working
- **Solution:** HuggingFace API may be rate-limited. App includes fallback responses.

**Problem:** Slow responses
- **Solution:** HuggingFace free tier can be slow. This is expected behavior.

## Step 6: Verify Deployment

Checklist:

- [ ] Backend health check returns success
- [ ] Frontend loads without errors
- [ ] Can send messages and receive AI responses
- [ ] Chat history persists after page refresh
- [ ] Mobile responsive design works
- [ ] Error handling shows toast notifications

## Step 7: Capture Screenshots

Follow instructions in `/screenshots/README.txt` to capture required screenshots.

## Next Steps

1. Update README.md with live URLs
2. Capture screenshots
3. Prepare submission email using `SUBMISSION_EMAIL_TEMPLATE.md`
4. Submit your assignment!

---

**Need Help?** Check the main README.md for more details.


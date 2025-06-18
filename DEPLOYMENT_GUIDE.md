# Smart Palette Extractor - Deployment Guide

This project is configured to deploy on both **GitHub Pages** and **Vercel**. Choose the platform that best suits your needs!

## 🚀 Quick Deployment Options

### Option 1: GitHub Pages (Traditional)
- **URL**: `https://varma9398.github.io/SMART`
- **Best for**: Static hosting, GitHub integration
- **Deploy**: `npm run deploy`

### Option 2: Vercel (Recommended)
- **URL**: `https://your-project-name.vercel.app`
- **Best for**: Modern hosting, automatic deployments, better performance
- **Deploy**: Connect GitHub repo to Vercel

---

## 📋 GitHub Pages Deployment

### Prerequisites
- GitHub repository
- Node.js & npm installed
- `gh-pages` package (already installed)

### Step-by-Step Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update for deployment"
   git push origin main
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**:
   - Go to your GitHub repository
   - Navigate to Settings → Pages
   - Set source to "Deploy from a branch"
   - Select `gh-pages` branch
   - Save

4. **Access your site**:
   - Your app will be available at: `https://varma9398.github.io/SMART`
   - It may take a few minutes to become available

### GitHub Pages Configuration
- **Base path**: `/SMART/` (for GitHub Pages)
- **Build output**: `dist/` directory
- **Branch**: `gh-pages` (auto-created)

---

## ⚡ Vercel Deployment

### Prerequisites
- Vercel account ([sign up here](https://vercel.com))
- GitHub repository

### Method 1: Dashboard Deployment (Recommended)

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

3. **Environment Variables** (if needed):
   - Add `VERCEL=true` to ensure correct base path
   - Add any other environment variables your app needs

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy

### Method 2: CLI Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**:
   ```bash
   vercel login
   vercel
   ```

### Method 3: GitHub Integration

1. **Connect GitHub**:
   - In Vercel dashboard: Settings → Git
   - Connect your GitHub account
   - Select your repository

2. **Automatic Deployments**:
   - Every push to `main` triggers deployment
   - Pull requests create preview deployments

### Vercel Configuration
- **Base path**: `/` (root domain)
- **Build output**: `dist/` directory
- **Automatic deployments**: Enabled
- **Custom domains**: Supported

---

## 🔧 Configuration Details

### Dual Platform Support

The project is configured to work on both platforms:

```typescript
// vite.config.ts
base: process.env.VERCEL ? '/' : (process.env.NODE_ENV === 'production' ? '/SMART/' : '/SPP/')
```

- **Vercel**: Uses root path `/`
- **GitHub Pages**: Uses `/SMART/` path
- **Development**: Uses `/SPP/` path

### Package.json Scripts

```json
{
  "homepage": "https://varma9398.github.io/SMART",
  "scripts": {
    "build": "tsc && vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🌐 Custom Domains

### GitHub Pages
1. Go to repository Settings → Pages
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS

### Vercel
1. Go to project Settings → Domains
2. Add custom domain
3. Configure DNS as instructed
4. Automatic HTTPS

---

## 📊 Platform Comparison

| Feature | GitHub Pages | Vercel |
|---------|-------------|--------|
| **Setup** | Manual | Automatic |
| **Deployments** | Manual (`npm run deploy`) | Automatic (on push) |
| **Performance** | Good | Excellent (CDN) |
| **Custom Domains** | ✅ | ✅ |
| **HTTPS** | ✅ | ✅ |
| **Preview Deployments** | ❌ | ✅ |
| **Analytics** | ❌ | ✅ |
| **Edge Functions** | ❌ | ✅ |

---

## 🚨 Troubleshooting

### GitHub Pages Issues

1. **404 Errors**:
   - Ensure base path is correct (`/SMART/`)
   - Check `gh-pages` branch exists
   - Verify GitHub Pages is enabled

2. **Build Failures**:
   ```bash
   npm run build
   npm run deploy
   ```

### Vercel Issues

1. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are installed
   - Verify TypeScript compilation

2. **Routing Issues**:
   - The `vercel.json` handles SPA routing
   - Ensure React Router is configured correctly

---

## 🎯 Recommended Workflow

1. **Development**: Use `npm run dev` for local development
2. **GitHub Pages**: Use `npm run deploy` for traditional hosting
3. **Vercel**: Connect GitHub repo for modern hosting with automatic deployments

Both platforms will work simultaneously - you can have your app deployed on both!

---

## 📞 Support

- **GitHub Pages**: Check repository Settings → Pages
- **Vercel**: Use Vercel dashboard or [Vercel documentation](https://vercel.com/docs)
- **Project Issues**: Check the project repository issues

Your Smart Palette Extractor is ready for deployment on both platforms! 🎉 
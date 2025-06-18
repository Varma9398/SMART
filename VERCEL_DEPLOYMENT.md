# Vercel Deployment Guide for Smart Palette Extractor

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Node.js**: Version 16 or higher (Vercel will use this automatically)

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset**: Select "Vite"
   - **Root Directory**: Leave as `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Environment Variables** (if needed):
   - Add any environment variables your app requires
   - Common ones: API keys, database URLs, etc.

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   cd "Smart Palette Extractor"
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Deploy

### Method 3: Deploy via GitHub Integration

1. **Connect GitHub**:
   - In Vercel dashboard, go to "Settings" → "Git"
   - Connect your GitHub account
   - Select your repository

2. **Automatic Deployments**:
   - Every push to `main` branch will trigger automatic deployment
   - Pull requests will create preview deployments

## Configuration Files

### vercel.json
This file is already created and configured for your Vite app:
- Specifies build command and output directory
- Handles client-side routing with rewrites
- Optimizes asset caching

### vite.config.ts
Updated to work with Vercel:
- Base path set to `/` for root domain
- Build output optimized for production

## Post-Deployment

### Custom Domain (Optional)
1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### Environment Variables
If your app needs environment variables:
1. Go to "Settings" → "Environment Variables"
2. Add variables for Production, Preview, and Development
3. Redeploy to apply changes

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

2. **Routing Issues**:
   - The `vercel.json` includes rewrites for SPA routing
   - Ensure your React Router is configured correctly

3. **Asset Loading**:
   - Assets are automatically optimized by Vercel
   - Check that all imports use relative paths

### Performance Optimization

Vercel automatically:
- Optimizes images and assets
- Enables CDN distribution
- Provides edge caching
- Offers analytics and monitoring

## Monitoring

- **Analytics**: Available in Vercel dashboard
- **Logs**: View function and build logs
- **Performance**: Core Web Vitals monitoring
- **Uptime**: Automatic uptime monitoring

## Next Steps

After successful deployment:
1. Test all functionality on the live site
2. Set up custom domain if desired
3. Configure environment variables
4. Set up monitoring and analytics
5. Enable automatic deployments for future updates

Your Smart Palette Extractor will be live at: `https://your-project-name.vercel.app` 
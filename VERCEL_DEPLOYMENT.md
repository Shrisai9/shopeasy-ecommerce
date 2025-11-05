# Vercel Deployment Guide for ShopEasy E-commerce

## 🚀 Deploy Your E-commerce Platform to Vercel

### Prerequisites
- ✅ Supabase project set up (follow SUPABASE_SETUP.md)
- ✅ GitHub account
- ✅ Vercel account (free tier available)

## 1. Prepare Your Project for Deployment

### Update Environment Variables
Create a production-ready environment configuration:

```bash
# .env.local (for local development)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# .env.production (for production - optional)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Add Vercel Configuration (Optional)
Create `vercel.json` for custom configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key"
  }
}
```

## 2. Push to GitHub

### Initialize Git Repository (if not done)
```bash
git init
git add .
git commit -m "Initial commit - ShopEasy e-commerce platform"
```

### Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `shopeasy-ecommerce`
4. Make it public or private
5. Don't initialize with README (you already have files)

### Push to GitHub
```bash
git remote add origin https://github.com/yourusername/shopeasy-ecommerce.git
git branch -M main
git push -u origin main
```

## 3. Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository**
   - Select "shopeasy-ecommerce"
   - Click "Import"

5. **Configure Project Settings**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

6. **Add Environment Variables**
   - Click "Environment Variables"
   - Add these variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   ```

7. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: shopeasy-ecommerce
# - Directory: ./
# - Override settings? N

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Redeploy with environment variables
vercel --prod
```

## 4. Configure Supabase for Production

### Update Supabase Settings

1. **Go to your Supabase project**
2. **Navigate to Authentication → Settings**
3. **Update Site URL**:
   ```
   https://your-app-name.vercel.app
   ```

4. **Add Redirect URLs**:
   ```
   https://your-app-name.vercel.app/**
   https://your-app-name.vercel.app/auth/callback
   ```

5. **Update CORS Origins** (if needed):
   ```
   https://your-app-name.vercel.app
   ```

## 5. Test Your Deployment

### Verify Everything Works
1. **Visit your deployed site**: `https://your-app-name.vercel.app`
2. **Test registration**: Create a new account
3. **Test login**: Login with your credentials
4. **Test shopping cart**: Add items to cart
5. **Test checkout**: Complete a purchase
6. **Check database**: Verify data in Supabase dashboard

### Common URLs to Test
- Homepage: `https://your-app-name.vercel.app`
- Products: `https://your-app-name.vercel.app/products`
- Login: `https://your-app-name.vercel.app/login`
- Register: `https://your-app-name.vercel.app/register`
- Profile: `https://your-app-name.vercel.app/profile`
- Admin: `https://your-app-name.vercel.app/admin`

## 6. Custom Domain (Optional)

### Add Your Own Domain

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Domains"
   - Add your domain: `yourdomain.com`

2. **Update DNS Records**:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.19.61`

3. **Update Supabase URLs**:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/**`

## 7. Automatic Deployments

### Set Up Continuous Deployment
Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically builds and deploys
# Check deployment status at vercel.com/dashboard
```

### Branch Deployments
- **Main branch** → Production deployment
- **Other branches** → Preview deployments
- Each pull request gets its own preview URL

## 8. Performance Optimization

### Vercel Optimizations (Automatic)
- ✅ **Edge Network**: Global CDN
- ✅ **Image Optimization**: Next.js Image component
- ✅ **Static Generation**: Pre-built pages
- ✅ **Serverless Functions**: API routes
- ✅ **Compression**: Gzip/Brotli

### Additional Optimizations
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig
```

## 9. Monitoring & Analytics

### Vercel Analytics (Optional)
```bash
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Environment-Specific Configuration
```javascript
// lib/config.ts
export const config = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  siteUrl: process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000'
}
```

## 10. Troubleshooting

### Common Issues & Solutions

**Build Errors:**
```bash
# Check build locally first
npm run build

# Fix TypeScript errors
npm run type-check
```

**Environment Variables Not Working:**
- Ensure variables start with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Check Vercel dashboard → Settings → Environment Variables

**Supabase Connection Issues:**
- Verify URLs in Supabase settings
- Check CORS configuration
- Ensure RLS policies are correct

**Image Loading Issues:**
- Add image domains to `next.config.js`
- Use Next.js Image component
- Check image URLs are accessible

### Useful Commands
```bash
# Check deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm project-name

# Check environment variables
vercel env ls
```

## 11. Production Checklist

Before going live:

- [ ] ✅ Supabase tables created with RLS
- [ ] ✅ Environment variables configured
- [ ] ✅ Site URL updated in Supabase
- [ ] ✅ All features tested on production
- [ ] ✅ Custom domain configured (optional)
- [ ] ✅ Analytics set up (optional)
- [ ] ✅ Error monitoring configured
- [ ] ✅ Backup strategy for database

## 12. Scaling Considerations

### Vercel Limits (Free Tier)
- **Bandwidth**: 100GB/month
- **Serverless Function Execution**: 100GB-hours/month
- **Build Minutes**: 6,000 minutes/month
- **Deployments**: Unlimited

### Upgrade When Needed
- **Pro Plan**: $20/month per user
- **Team Plan**: $20/month per user + collaboration
- **Enterprise**: Custom pricing

Your ShopEasy e-commerce platform is now ready for production on Vercel! 🎉

## Quick Deploy Summary

1. Push code to GitHub
2. Connect GitHub to Vercel
3. Add environment variables
4. Update Supabase URLs
5. Deploy and test

**Estimated deployment time**: 5-10 minutes
**Cost**: Free (Vercel + Supabase free tiers)
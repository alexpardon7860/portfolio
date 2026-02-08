# Netlify Deployment Fix Guide

## Problem
Your site deploys successfully when you drag-and-drop the build folder to Netlify, but fails when deploying via GitHub auto-deploy.

## Solution
I've created a `netlify.toml` configuration file that will fix the auto-deploy issue.

## What the netlify.toml does:

1. **Build Command**: Uses `yarn build` (consistent with your package.json)
2. **Publish Directory**: Specifies `build` as the output folder
3. **Node Version**: Sets Node.js to version 18 (stable and compatible with your dependencies)
4. **Yarn Version**: Matches your package manager version (1.22.22)
5. **CI = "false"**: Prevents build failures from ESLint warnings
6. **SPA Redirects**: Handles client-side routing by redirecting all routes to index.html

## Steps to Deploy:

### 1. Commit and Push the netlify.toml file
```bash
git add netlify.toml
git commit -m "Add Netlify configuration for auto-deploy"
git push origin main
```

### 2. Verify Netlify Settings (Important!)
Go to your Netlify dashboard → Site settings → Build & deploy → Build settings

Ensure these match:
- **Build command**: `yarn build` (or leave empty, netlify.toml will handle it)
- **Publish directory**: `build`
- **Base directory**: (leave empty)

### 3. Clear Cache and Redeploy
In Netlify dashboard:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**

## Common Issues & Solutions:

### If build still fails:

**Check Build Logs**: Look for specific error messages in Netlify's deploy logs

**Memory Issues**: If you see "JavaScript heap out of memory":
- Go to Site settings → Build & deploy → Environment
- Add environment variable: `NODE_OPTIONS` = `--max_old_space_size=4096`

**Dependency Issues**: 
- Make sure all dependencies in package.json are correct
- Check for any peer dependency warnings

**Path Issues with Images**:
- The HEAD COORDINATOR CERTIFICATE.jpg has spaces in the filename which might cause issues
- If you encounter import errors, consider renaming it to `head-coordinator-certificate.jpg`

### File Naming Recommendation:
If you encounter issues with the certificate import, rename the file:
```bash
# In the src/data folder, rename:
HEAD COORDINATOR CERTIFICATE.jpg → head-coordinator-certificate.jpg

# Then update DomeGallery.jsx line 12:
import headCoordinatorCert from '../data/head-coordinator-certificate.jpg';
```

## Verification:
After deploying, your site should:
1. Build successfully via GitHub auto-deploy
2. Display all 7 certificates in color
3. Have smooth orbital timeline animations without lag
4. Properly handle React Router navigation

---

**Need help?** Check the Netlify build logs for specific error messages.

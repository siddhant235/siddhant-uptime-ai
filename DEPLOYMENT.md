# Deployment Guide - GitHub Pages

## Overview
Your project is now configured to deploy to GitHub Pages automatically using GitHub Actions.

## Quick Deploy

### Option 1: Deploy via GitHub Actions (Recommended)

1. **Push your changes to GitHub:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin master
   ```

2. **Enable GitHub Pages in your repository:**
   - Go to your repository: https://github.com/siddhant235/siddhant-uptime-ai
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Add GitHub Token as Secret (Optional but Recommended):**
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `VITE_GITHUB_TOKEN`
   - Value: Your GitHub Personal Access Token
   - Click **Add secret**

4. **Wait for deployment:**
   - Go to **Actions** tab
   - Watch the deployment workflow run
   - Once complete, your site will be live at: **https://siddhant235.github.io/siddhant-uptime-ai/**

### Option 2: Manual Deploy via Command Line

```bash
# Build and deploy manually
npm run deploy
```

This will:
1. Build your project
2. Create a `gh-pages` branch
3. Deploy to GitHub Pages

## Configuration Files

### 1. `vite.config.ts`
Updated with base path for GitHub Pages:
```typescript
base: '/siddhant-uptime-ai/'
```

### 2. `package.json`
Added deployment scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### 3. `.github/workflows/deploy.yml`
GitHub Actions workflow for automatic deployment on push.

## Deployment URLs

After successful deployment, your site will be available at:

**🌐 Live URL:** https://siddhant235.github.io/siddhant-uptime-ai/

## GitHub Pages Settings

To enable GitHub Pages:

1. Go to repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**:
   - Select **GitHub Actions** (for automatic deployment)
   - OR select **Deploy from a branch** and choose `gh-pages` (for manual deployment)

## Environment Variables

To use the GitHub API token in production:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add a new repository secret:
   - **Name:** `VITE_GITHUB_TOKEN`
   - **Value:** Your GitHub Personal Access Token
3. The workflow will automatically use this token during build

## Automatic Deployment

The GitHub Actions workflow automatically deploys when:
- ✅ You push to the `master` branch
- ✅ You manually trigger the workflow from the Actions tab
- ✅ Someone merges a pull request to `master`

## Build Process

The deployment process:

1. **Install dependencies** - `npm ci`
2. **Build the project** - `npm run build`
3. **Upload artifact** - Build output from `dist/` folder
4. **Deploy to GitHub Pages** - Makes the site live

## Troubleshooting

### Build Fails

**Problem:** Build fails in GitHub Actions
**Solution:** 
- Check the Actions log for errors
- Ensure all dependencies are in `package.json`
- Test build locally: `npm run build`

### 404 Error on Deployed Site

**Problem:** Site shows 404 error
**Solution:**
- Verify GitHub Pages is enabled in Settings
- Check the base path in `vite.config.ts` matches repository name
- Ensure you're accessing the correct URL

### Assets Not Loading

**Problem:** CSS/JS files return 404
**Solution:**
- Verify `base: '/siddhant-uptime-ai/'` in `vite.config.ts`
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### GitHub API Rate Limits

**Problem:** API rate limit exceeded on live site
**Solution:**
- Add `VITE_GITHUB_TOKEN` secret in repository settings
- Rebuild and redeploy

## Manual Deployment Steps

If you prefer to deploy manually:

```bash
# 1. Build the project
npm run build

# 2. Deploy to gh-pages branch
npm run deploy

# 3. Push to GitHub (if not already pushed)
git push origin master
```

## Updating the Deployment

To update your deployed site:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin master

# Deployment happens automatically via GitHub Actions
```

## Local Preview of Production Build

To preview the production build locally:

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Visit http://localhost:4173/siddhant-uptime-ai/
```

## Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Create a `CNAME` file in the `public/` folder with your domain
4. Configure DNS records with your domain provider
5. Redeploy

## Deployment Checklist

Before deploying:

- [ ] All code is committed
- [ ] Build runs successfully locally (`npm run build`)
- [ ] Environment variables are set (if needed)
- [ ] `vite.config.ts` has correct base path
- [ ] GitHub Pages is enabled in repository settings
- [ ] Secrets are added (if using GitHub token)

## Monitoring Deployment

Watch deployment progress:

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Watch the build and deploy jobs
4. Check for any errors in the logs

## Post-Deployment

After successful deployment:

1. ✅ Visit your live site: https://siddhant235.github.io/siddhant-uptime-ai/
2. ✅ Test all features
3. ✅ Verify API calls work
4. ✅ Check responsive design
5. ✅ Test on different browsers

## Rollback

To rollback to a previous version:

1. Go to **Actions** tab
2. Find the successful deployment you want to restore
3. Click **Re-run jobs**

OR

```bash
# Checkout previous commit
git checkout <commit-hash>

# Deploy
npm run deploy

# Return to master
git checkout master
```

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

If you encounter issues:
1. Check the Actions logs
2. Review this deployment guide
3. Test locally with `npm run build && npm run preview`
4. Verify all settings in GitHub repository

---

**🚀 Ready to Deploy!**

Run: `git push origin master`

Your site will be live at: **https://siddhant235.github.io/siddhant-uptime-ai/**


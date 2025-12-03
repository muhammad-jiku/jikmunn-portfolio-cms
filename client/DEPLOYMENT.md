# Deployment Guide - AWS Amplify

This guide walks you through deploying the Portfolio CMS frontend to AWS Amplify.

## Prerequisites

- AWS account with Amplify access
- GitHub repository with your code
- Backend API deployed and accessible
- AWS Cognito User Pool configured

## Step 1: Prepare Your Repository

1. Ensure all code is committed and pushed to GitHub:

   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. Verify `.env.local` is in `.gitignore` (should be by default)

3. Ensure `amplify.yml` is in the `client` directory

## Step 2: AWS Amplify Setup

### 2.1 Create New App

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **New app** → **Host web app**
3. Select **GitHub** as your Git provider
4. Authorize AWS Amplify to access your GitHub account

### 2.2 Connect Repository

1. Select your repository: `jikmunn-portfolio-cms`
2. Select branch: `main`
3. Click **Next**

### 2.3 Configure Build Settings

1. **App name:** `portfolio-cms-frontend`
2. **Environment:** Select or create `production`
3. **Build settings:** Auto-detected from `amplify.yml`
4. **Advanced settings:**
   - **Node version:** `20`
   - **Package manager:** `npm`
   - **Base directory:** `client`
5. Click **Next**

### 2.4 Add Environment Variables

Go to **App settings** → **Environment variables** and add:

```
NEXT_PUBLIC_API_URL = https://your-backend-api.com
NEXT_PUBLIC_SITE_URL = https://your-amplify-domain.amplifyapp.com
NEXT_PUBLIC_AWS_REGION = us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID = us-east-1_XXXXXXXXX
NEXT_PUBLIC_COGNITO_CLIENT_ID = xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SOCKET_URL = https://your-backend-api.com
```

> 📝 **Note:** Replace placeholder values with your actual configuration

### 2.5 Review and Deploy

1. Review all settings
2. Click **Save and deploy**
3. Wait for the build to complete (5-10 minutes)

## Step 3: Configure Custom Domain (Optional)

1. Go to **App settings** → **Domain management**
2. Click **Add domain**
3. Enter your domain (e.g., `portfolio.yourdomain.com`)
4. Follow the DNS configuration instructions
5. Wait for SSL certificate provisioning

## Step 4: Enable Build Previews

1. Go to **App settings** → **Previews**
2. Enable **Automatically deploy branch pull requests**
3. Select branches to preview (e.g., `develop`, `staging`)

## Step 5: Configure Performance

### 5.1 Enable CDN

CloudFront is automatically configured. Verify:

- Go to **App settings** → **General**
- Check **CloudFront distribution** is enabled

### 5.2 Configure Headers

1. Go to **App settings** → **Rewrites and redirects**
2. Add custom headers for security:

```
# Security Headers
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### 5.3 Configure Redirects

Add redirects for SPA routing:

```
# SPA Routing
/*    /index.html    200

# Redirect HTTP to HTTPS
http://*    https://*    301

# Redirect non-www to www (or vice versa)
https://yourdomain.com    https://www.yourdomain.com    301
```

## Step 6: Configure CI/CD

### 6.1 Auto Deployment

Already configured! Every push to `main` triggers automatic deployment.

### 6.2 Manual Deployment

1. Go to **App settings** → **Build settings**
2. Click **Redeploy this version** on any build

### 6.3 Rollback

1. Go to the **Deployments** tab
2. Find a previous successful build
3. Click **⋮** → **Promote to main**

## Step 7: Monitoring and Logs

### 7.1 Build Logs

1. Go to the **Deployments** tab
2. Click on any build
3. View **Provision**, **Build**, and **Deploy** logs

### 7.2 Access Logs

1. Go to **App settings** → **Monitoring**
2. Enable **Access logs**
3. Configure S3 bucket for log storage

### 7.3 Metrics

View real-time metrics:

- **Requests:** Total requests per time period
- **Data transfer:** Bandwidth usage
- **4xx/5xx errors:** Error rates

## Step 8: Error Tracking (Optional)

### Option 1: Sentry

1. Install Sentry:

   ```bash
   npm install @sentry/nextjs
   ```

2. Configure Sentry:

   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```

3. Add Sentry DSN to environment variables:
   ```
   NEXT_PUBLIC_SENTRY_DSN = https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   ```

### Option 2: AWS CloudWatch

1. Enable CloudWatch in Amplify Console
2. Go to **App settings** → **Monitoring** → **CloudWatch**
3. View logs in CloudWatch console

## Step 9: Post-Deployment Verification

### 9.1 Health Check

Visit your deployed URL and verify:

- ✅ Homepage loads successfully
- ✅ Authentication works (login/register)
- ✅ Dashboard accessible after login
- ✅ API calls to backend succeed
- ✅ Socket.IO connection established
- ✅ Images load from S3
- ✅ Theme toggle works
- ✅ Responsive design on mobile

### 9.2 Performance Check

Run Lighthouse audit:

1. Open Chrome DevTools
2. Go to **Lighthouse** tab
3. Run audit for Performance, Accessibility, Best Practices, SEO
4. Target: All scores > 90

### 9.3 SEO Verification

Check SEO implementation:

- ✅ Visit `/sitemap.xml` - Should list all pages
- ✅ Visit `/robots.txt` - Should have correct rules
- ✅ Check meta tags in page source
- ✅ Test social sharing (Open Graph preview)

## Troubleshooting

### Build Fails

**Error:** "Module not found"

```bash
# Clear cache and rebuild
1. Go to App settings → Build settings
2. Click Edit → Clear cache
3. Redeploy
```

**Error:** "Environment variable not defined"

```bash
# Verify all required env vars are set in Amplify Console
```

### Runtime Issues

**Issue:** API calls failing

- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend CORS configuration
- Ensure backend is deployed and accessible

**Issue:** Cognito authentication not working

- Verify Cognito credentials in environment variables
- Check Cognito User Pool has correct OAuth flows
- Ensure redirect URLs are configured in Cognito

### Performance Issues

**Issue:** Slow page loads

- Enable CloudFront compression
- Check image optimization settings
- Verify CDN is enabled

## Maintenance

### Update Node Version

1. Go to **App settings** → **Build settings**
2. Edit build image
3. Select Node 20 (or latest LTS)
4. Save and redeploy

### Update Dependencies

```bash
# In your local environment
npm update
npm audit fix

# Test locally
npm run build
npm start

# Commit and push
git add package.json package-lock.json
git commit -m "Update dependencies"
git push origin main
```

## Costs

AWS Amplify Pricing (as of 2025):

- **Build minutes:** $0.01 per minute
- **Hosting:** $0.15 per GB stored
- **Data transfer:** $0.15 per GB served
- **Free tier:** 1000 build minutes/month, 15 GB served/month

Typical monthly cost for this app: **$5-20**

## Support

- [AWS Amplify Documentation](https://docs.amplify.aws/nextjs/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Amplify Discord Community](https://discord.gg/amplify)

## Next Steps

After successful deployment:

1. ✅ Configure custom domain
2. ✅ Set up error tracking (Sentry)
3. ✅ Enable monitoring and alerts
4. ✅ Configure backup strategy
5. ✅ Document deployment process for team
6. ✅ Set up staging environment
7. ✅ Configure automated testing in CI/CD

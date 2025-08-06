# GitHub Deployment Guide - FreelanceHub

This guide will help you deploy your FreelanceHub application to GitHub and set up automatic deployments.

## 🚀 Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Repository name: `freelance-marketplace` or `skillbridge`
4. Choose Public or Private
5. **Don't initialize** with README, .gitignore, or license
6. Click "Create repository"

### 2. Push Code to GitHub

After creating your repository, run these commands (replace with your actual GitHub URL):

```bash
# Add GitHub remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### 3. Set Up Vercel for Frontend Deployment

1. **Sign up for Vercel**: Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. **Import your repository**: Click "New Project" → Import your repository
3. **Configure build settings**:
   - Framework: React
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Add environment variables** in Vercel dashboard:
   - `REACT_APP_SERVER_URL`: Your Railway backend URL
   - `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

### 4. Set Up Railway for Backend Deployment

1. **Sign up for Railway**: Go to [railway.app](https://railway.app) and sign in with GitHub
2. **Create new project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select your repository** and choose the server directory
4. **Configure environment variables** in Railway dashboard:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key
   - `CLIENT_URL`: Your Vercel frontend URL
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
   - And other environment variables from your `.env.production` file

### 5. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets for automatic deployment:

#### Frontend (Vercel) Secrets:
- `VERCEL_TOKEN`: Your Vercel API token (get from Vercel → Settings → Tokens)
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `REACT_APP_SERVER_URL`: Your Railway backend URL
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

#### Backend (Railway) Secrets:
- `RAILWAY_TOKEN`: Your Railway API token (get from Railway → Settings → Tokens)
- `RAILWAY_SERVICE_NAME`: Your Railway service name
- `RAILWAY_URL`: Your Railway deployment URL (https://your-service.railway.app)

### 6. Get Your Vercel Project Details

To get your Vercel organization ID and project ID:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to your client directory
cd client

# Link to existing project
vercel link

# Get project info
vercel project ls
```

### 7. Get Your Railway Project Details

To get your Railway service details:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to existing project
railway link

# Get project info
railway status
```

## 🔄 Automatic Deployment Workflow

Once configured, your application will automatically deploy when you push to the `main` branch:

1. **Push code** → GitHub Actions triggers
2. **Tests run** for both frontend and backend
3. **Frontend deploys** to Vercel
4. **Backend deploys** to Railway
5. **Health checks** verify deployment success

## 📁 Repository Structure

```
freelance-marketplace/
├── .github/workflows/          # GitHub Actions workflows
│   ├── ci-cd.yml              # Main CI/CD pipeline
│   ├── deploy-frontend.yml    # Frontend-only deployment
│   └── deploy-backend.yml     # Backend-only deployment
├── client/                    # React frontend
├── server/                    # Node.js backend
└── GITHUB_DEPLOYMENT_GUIDE.md # This guide
```

## 🌐 Live URLs

After deployment, you'll have:

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-service.railway.app`
- **Repository**: `https://github.com/your-username/your-repo`

## 🔧 Manual Deployment Commands

If you need to deploy manually:

### Frontend (Vercel):
```bash
cd client
vercel --prod
```

### Backend (Railway):
```bash
railway up
```

## 🚨 Important Notes

1. **Environment Variables**: Make sure all required environment variables are set in both Vercel and Railway dashboards
2. **CORS Settings**: Update your backend CORS settings to include your Vercel domain
3. **Stripe Webhooks**: Update your Stripe webhook URLs to point to your Railway backend
4. **Database**: Ensure your MongoDB Atlas is properly configured with correct IP whitelisting

## 📊 Monitoring

- **Vercel**: Monitor deployments in Vercel dashboard
- **Railway**: Monitor deployments and logs in Railway dashboard  
- **GitHub Actions**: Monitor CI/CD pipeline in GitHub Actions tab

## 🔄 Making Updates

To update your application:

1. Make changes locally
2. Test locally
3. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
4. GitHub Actions will automatically deploy your changes

## 🆘 Troubleshooting

### Common Issues:

1. **Build Failures**: Check GitHub Actions logs
2. **Environment Variables**: Verify all secrets are correctly set
3. **CORS Errors**: Update backend CORS settings
4. **Database Connection**: Check MongoDB Atlas network settings

### Useful Commands:

```bash
# Check deployment status
vercel --prod --confirm
railway status

# View logs
railway logs
vercel logs

# Test locally before deploying
npm run dev  # in both client and server directories
```

## ✅ Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project set up
- [ ] Railway project set up
- [ ] All environment variables configured
- [ ] GitHub secrets added
- [ ] First deployment successful
- [ ] Frontend and backend communicating
- [ ] Stripe webhooks updated
- [ ] Domain configured (optional)

---

**Your FreelanceHub is now ready for continuous deployment! 🎉**

# FreelanceHub Deployment Guide

This guide covers deploying FreelanceHub to various platforms including Heroku, Railway, Vercel, and Netlify.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- MongoDB database (local or MongoDB Atlas)
- Stripe account for payments
- Cloudinary account (optional, for image uploads)

### Local Development Setup

1. **Clone and Install**
```bash
git clone <your-repo-url>
cd freelance-marketplace
npm run setup
```

2. **Configure Environment Variables**
   - Update `server/.env` with your database and API keys
   - Update `client/.env` with your client-side configuration

3. **Start Development Servers**
```bash
npm run dev
```

This will start both frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

## 🌐 Production Deployment

### Backend Deployment (Heroku)

1. **Prepare for Heroku**
```bash
cd server
# Create Procfile
echo "web: npm start" > Procfile

# Install Heroku CLI and login
heroku login
heroku create your-app-name-api
```

2. **Set Environment Variables**
```bash
heroku config:set MONGO_URI="your-mongodb-atlas-connection-string"
heroku config:set JWT_SECRET="your-jwt-secret"
heroku config:set CLIENT_URL="https://your-frontend-domain.com"
heroku config:set STRIPE_SECRET_KEY="your-stripe-secret-key"
heroku config:set STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
heroku config:set STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
heroku config:set CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
heroku config:set CLOUDINARY_API_KEY="your-cloudinary-api-key"
heroku config:set CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

3. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

4. **Set up Stripe Webhooks**
   - Go to Stripe Dashboard > Webhooks
   - Add endpoint: `https://your-app-name-api.herokuapp.com/api/payments/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### Backend Deployment (Railway)

1. **Connect to Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

2. **Set Environment Variables in Railway Dashboard**
   - Go to your Railway project dashboard
   - Add all the environment variables from the Heroku section above

### Frontend Deployment (Vercel)

1. **Prepare for Vercel**
```bash
cd client
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

2. **Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add:
     - `REACT_APP_SERVER_URL`: Your backend URL
     - `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### Frontend Deployment (Netlify)

1. **Build the Project**
```bash
cd client
npm run build
```

2. **Deploy to Netlify**
   - Drag and drop the `build` folder to Netlify
   - Or connect your GitHub repository

3. **Environment Variables**
   - In Netlify dashboard, go to Site Settings > Environment Variables
   - Add the same variables as Vercel section

4. **Redirects for SPA**
   Create `client/public/_redirects`:
```
/*    /index.html   200
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Production)

1. **Create Cluster**
   - Go to https://cloud.mongodb.com
   - Create a new cluster
   - Choose your preferred region

2. **Database User**
   - Create a database user with read/write permissions
   - Note the username and password

3. **Network Access**
   - Add IP address `0.0.0.0/0` for all access (or specific IPs)

4. **Connection String**
   - Get the connection string from "Connect" > "Connect your application"
   - Replace `<password>` with your database user password
   - Use this as your `MONGO_URI`

### Local MongoDB (Development)

1. **Install MongoDB**
   - Download from https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS

2. **Start MongoDB**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

## 💳 Stripe Configuration

### Development Setup

1. **Get API Keys**
   - Go to Stripe Dashboard > Developers > API Keys
   - Copy "Publishable key" and "Secret key" (test mode)

2. **Webhook Setup**
   - Install Stripe CLI: https://stripe.com/docs/stripe-cli
   - Forward events to local server:
```bash
stripe listen --forward-to localhost:5000/api/payments/webhook
```

### Production Setup

1. **Switch to Live Mode**
   - Get live API keys from Stripe Dashboard
   - Update environment variables with live keys

2. **Production Webhooks**
   - Create webhook endpoint in Stripe Dashboard
   - URL: `https://your-api-domain.com/api/payments/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

## 📁 File Upload Configuration

### Cloudinary Setup (Recommended)

1. **Create Account**
   - Sign up at https://cloudinary.com
   - Get your cloud name, API key, and API secret

2. **Configure Environment**
   - Add Cloudinary credentials to your environment variables
   - The app will automatically use Cloudinary for file uploads

### Local File Storage (Development)

- Files are stored in `server/uploads/` directory
- Make sure this directory exists and has write permissions

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use different secrets for development and production
- Rotate secrets regularly

### CORS Configuration
- Update CORS settings in `server/server.js` for production domains
- Remove development URLs from production CORS config

### Rate Limiting
- Consider adding rate limiting middleware for production
- Implement API key authentication for sensitive endpoints

### HTTPS
- Always use HTTPS in production
- Most hosting platforms provide SSL certificates automatically

## 📊 Monitoring and Analytics

### Error Tracking
Consider integrating error tracking services:
- Sentry for error monitoring
- LogRocket for session replay
- New Relic for performance monitoring

### Analytics
- Google Analytics for user behavior
- Stripe Dashboard for payment analytics
- Custom analytics for business metrics

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-app-name-api"
          heroku_email: "your-email@example.com"
          appdir: "server"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          working-directory: ./client
```

## 🧪 Testing in Production

### Health Checks
- Test all API endpoints
- Verify database connections
- Check file upload functionality
- Test payment processing with Stripe test cards

### Performance Testing
- Use tools like Lighthouse for frontend performance
- Monitor API response times
- Test with realistic data volumes

## 📞 Support and Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration in server
   - Verify CLIENT_URL environment variable

2. **Database Connection Issues**
   - Verify MongoDB connection string
   - Check network access settings in MongoDB Atlas

3. **Payment Issues**
   - Verify Stripe keys are correct
   - Check webhook endpoint configuration
   - Test with Stripe test cards

4. **File Upload Issues**
   - Check Cloudinary configuration
   - Verify file size limits
   - Test with different file types

### Getting Help
- Check the GitHub issues page
- Review the documentation
- Contact support team

## 🔄 Updates and Maintenance

### Regular Tasks
- Update dependencies regularly
- Monitor security vulnerabilities
- Backup database regularly
- Review and rotate API keys
- Monitor application performance

### Scaling Considerations
- Database indexing for better performance
- CDN for static assets
- Load balancing for high traffic
- Caching strategies for frequently accessed data

---

**Happy Deploying! 🚀**
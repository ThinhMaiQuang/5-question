# AWS Elastic Beanstalk Deployment Guide

This project is configured to automatically deploy to AWS Elastic Beanstalk using GitHub Actions.

## Prerequisites

1. **AWS Account** with Elastic Beanstalk access
2. **GitHub repository** with this code
3. **AWS Credentials** (already configured in your `.aws/credentials`)

## Step 1: Create Elastic Beanstalk Application

Choose one of these methods:

### Option A: Using AWS Console

1. Go to [AWS Elastic Beanstalk Console](https://console.aws.amazon.com/elasticbeanstalk)
2. Click **Create Application**
3. Settings:
   - **Application name**: `5-question-app`
   - **Platform**: Node.js 20
   - **Platform branch**: Node.js 20 running on 64bit Amazon Linux 2023
4. Click **Create environment**
   - **Environment name**: `5-question-app-env`
   - **Domain**: (will be auto-generated)
   - **Instance type**: t2.micro (free tier eligible)
5. Click **Create environment** and wait for it to finish (~5 minutes)

### Option B: Using EB CLI

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB in your project
eb init -p "Node.js 20" -r us-east-1 5-question-app

# Create environment
eb create 5-question-app-env --instance-type t2.micro
```

## Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these two secrets:

   **Secret 1:**
   - Name: `AWS_ACCESS_KEY_ID`
   - Value: 'USER_ID'

   **Secret 2:**
   - Name: `AWS_SECRET_ACCESS_KEY`
   - Value: `ACCESSKEY`

## Step 3: Deploy

Push your changes to the master branch:

```bash
git add .
git commit -m "Add AWS deployment configuration"
git push origin master
```

The GitHub Action will automatically:

1. ✅ Run tests
2. 🏗️ Build the React app
3. 📦 Create deployment package
4. 🚀 Deploy to Elastic Beanstalk

## Step 4: Monitor Deployment

1. Go to GitHub → **Actions** tab to see the deployment progress
2. Go to AWS Elastic Beanstalk Console to see your environment
3. Once deployed, access your app at: `http://5-question-app-env.eba-xxxxxx.us-east-1.elasticbeanstalk.com`

## Manual Deployment (Alternative)

If you prefer to deploy manually without GitHub Actions:

```bash
# Build the app
npm run build

# Create deployment package
zip -r deploy.zip dist package.json package-lock.json .ebextensions

# Deploy using EB CLI
eb deploy
```

## Configuration Files

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `.ebextensions/nginx.config` - Nginx web server configuration
- `.ebextensions/nodecommand.config` - Node.js startup configuration
- `package.json` - Added `start` script for production

## Troubleshooting

### Deployment fails at build step

- Check that all tests pass locally: `npm run test:run`
- Ensure build works: `npm run build`

### 502 Bad Gateway after deployment

- Check EB logs: `eb logs` or in AWS Console
- Verify the `start` script runs: `npm start` (after building)

### Environment not found

- Verify application and environment names match in `.github/workflows/deploy.yml`
- Check AWS region is correct (default: us-east-1)

## Cost Considerations

- **t2.micro**: Free tier eligible (750 hours/month for 12 months)
- **Data transfer**: First 1GB/month is free
- **Load balancer**: Additional cost if enabled (not required for t2.micro)

## Security Notes

⚠️ **Important**: Your AWS credentials are visible in `.aws/credentials`.

**Best practices:**

1. Use IAM roles with minimal permissions
2. Rotate credentials regularly
3. Never commit credentials to git
4. Consider using AWS SSO or temporary credentials

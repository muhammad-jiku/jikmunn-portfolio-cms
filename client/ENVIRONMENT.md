# Environment Configuration

This document outlines the environment variables required for the Portfolio CMS frontend application.

## Environment Variables

### Required for All Environments

Create a `.env.local` file in the `client` directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com

# AWS Cognito Configuration
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx

# Socket.IO Configuration
NEXT_PUBLIC_SOCKET_URL=https://your-backend-api.com

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Environment-Specific Configuration

### Development (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### Production (AWS Amplify Console)

Add these variables in AWS Amplify Console under **App Settings > Environment variables**:

| Variable                           | Value                        | Description                 |
| ---------------------------------- | ---------------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL`              | `https://api.yourdomain.com` | Backend API URL             |
| `NEXT_PUBLIC_SITE_URL`             | `https://yourdomain.com`     | Frontend domain             |
| `NEXT_PUBLIC_AWS_REGION`           | `us-east-1`                  | AWS region for Cognito      |
| `NEXT_PUBLIC_COGNITO_USER_POOL_ID` | Your pool ID                 | From AWS Cognito Console    |
| `NEXT_PUBLIC_COGNITO_CLIENT_ID`    | Your client ID               | From AWS Cognito Console    |
| `NEXT_PUBLIC_SOCKET_URL`           | `https://api.yourdomain.com` | WebSocket server URL        |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`    | Your GA ID                   | Google Analytics (optional) |

## Getting AWS Cognito Credentials

1. **AWS Console** → **Cognito** → **User Pools**
2. Select your user pool (or create one if needed)
3. Copy the **User Pool ID** (format: `us-east-1_XXXXXXXXX`)
4. Go to **App Integration** → **App clients**
5. Copy the **Client ID**

## Security Notes

⚠️ **NEVER commit `.env.local` to version control!**

- `.env.local` is in `.gitignore` by default
- Use `.env.local.example` as a template
- Store sensitive values in AWS Amplify Console for production
- Rotate credentials regularly

## Validation

To verify your environment variables are loaded correctly:

```bash
# In development
npm run dev

# Check console for any missing variable warnings
# All NEXT_PUBLIC_* variables should be accessible in the browser
```

## Troubleshooting

### Issue: "NEXT_PUBLIC_API_URL is undefined"

**Solution:** Restart the dev server after adding/changing environment variables.

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Issue: Cognito authentication not working

**Solution:** Verify Cognito credentials:

1. Check User Pool ID format: `us-east-1_XXXXXXXXX`
2. Ensure Client ID matches the app client
3. Confirm AWS region is correct
4. Check that the app client has proper OAuth flows enabled

### Issue: Socket.IO not connecting

**Solution:**

1. Ensure NEXT_PUBLIC_SOCKET_URL matches your backend URL
2. Check backend CORS configuration allows your frontend origin
3. Verify WebSocket support on your hosting platform

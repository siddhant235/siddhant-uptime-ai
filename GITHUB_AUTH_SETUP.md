# GitHub Authentication Setup

## Overview
The application now uses GitHub Personal Access Token for authenticated API requests. This increases rate limits and ensures reliable data fetching.

## Rate Limits

### Without Authentication
- **60 requests per hour** per IP address
- Limited access to public data only

### With Authentication (Recommended)
- **5,000 requests per hour** per authenticated user
- Access to more detailed data
- Better reliability

## Setup Instructions

### 1. Create a GitHub Personal Access Token

1. Go to GitHub Settings: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a descriptive name (e.g., "GitHub Profile Viewer")
4. Set expiration (recommended: 90 days or No expiration for development)
5. Select the following scopes (permissions):
   - ✅ `public_repo` - Access public repositories
   - ✅ `read:user` - Read user profile data
   - ✅ `read:org` - Read organization membership
   
   **Optional but recommended:**
   - ✅ `repo` - Full access to private repositories (if you want to see private repo stats)

6. Click **"Generate token"**
7. **IMPORTANT:** Copy the token immediately (you won't be able to see it again!)

### 2. Add Token to Your Project

Create a `.env` file in the project root:

```bash
# .env
VITE_GITHUB_TOKEN=your_github_token_here
```

Replace `your_github_token_here` with the token you copied from GitHub.

### 3. Restart Development Server

After adding the token, restart your development server:

```bash
npm run dev
```

## Security Notes

⚠️ **NEVER commit your `.env` file to version control!**

The `.env` file is already listed in `.gitignore` to prevent accidental commits.

### Best Practices

1. **Keep tokens private** - Never share your token or commit it to Git
2. **Use environment-specific tokens** - Different tokens for development/production
3. **Rotate tokens regularly** - Generate new tokens periodically
4. **Minimal permissions** - Only grant necessary scopes
5. **Monitor usage** - Check GitHub's rate limit headers

## How It Works

The application automatically adds the authentication token to all GitHub API requests:

```typescript
// Automatically added to all requests
headers: {
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': 'Bearer YOUR_TOKEN'
}
```

### API Endpoints Using Authentication

1. **`/users/{username}`** - User profile data
2. **`/users/{username}/repos`** - User repositories
3. **`/users/{username}/events/public`** - Public events
4. **`/users/{username}/orgs`** - User organizations
5. **GraphQL API** - Contribution calendar data

## Fallback Behavior

If no token is provided:
- ✅ Application still works
- ⚠️ Limited to 60 requests per hour
- ⚠️ May experience rate limit errors with frequent use
- ℹ️ All public data still accessible

## Checking Your Rate Limit

You can check your current rate limit status by opening the browser console and looking at the response headers:

```
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4999
X-RateLimit-Reset: 1605056228
```

Or visit: https://api.github.com/rate_limit

## Troubleshooting

### Issue: "API rate limit exceeded"
**Solution:** Add a GitHub token or wait for the rate limit to reset (shown in console)

### Issue: "Bad credentials"
**Solution:** 
- Check token is correctly copied to `.env` file
- Ensure no extra spaces around the token
- Verify token hasn't expired
- Regenerate token if necessary

### Issue: "Token doesn't have required scopes"
**Solution:** Regenerate token with correct scopes (see step 1)

### Issue: Changes not reflecting
**Solution:** 
- Restart development server after adding `.env` file
- Clear browser cache
- Check `.env` file is in project root (not in `src/`)

## Example .env File

```bash
# GitHub API Authentication
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Note: Token should start with 'ghp_' for Personal Access Tokens
```

## Environment Variables Explained

- **`VITE_`** prefix is required for Vite to expose the variable to the client
- Without the prefix, the variable won't be accessible in the browser
- The token is used client-side to make authenticated GitHub API requests

## Production Deployment

For production deployments, set the environment variable in your hosting platform:

### Vercel
```bash
vercel env add VITE_GITHUB_TOKEN
```

### Netlify
Add to **Site settings → Environment variables**

### Other Platforms
Consult your hosting provider's documentation for setting environment variables

## Additional Resources

- [GitHub Personal Access Tokens Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitHub GraphQL API Documentation](https://docs.github.com/en/graphql)
- [Rate Limiting Documentation](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)


# GitHub API Integration

## 🎯 Overview

The application now fetches **real GitHub user data** using the GitHub REST API. It displays actual user profiles, repositories, and stats in the left panel and repository grid.

---

## 📡 API Integration Details

### **1. GitHub API Service** (`src/services/githubApi.ts`)

Core service that handles all GitHub API requests:

```typescript
// Base URL
const GITHUB_API_BASE = 'https://api.github.com';

// Available Methods:
- getUser(username: string): Fetches user profile data
- getUserRepos(username: string, perPage: number): Fetches user repositories
- getUserEvents(username: string, perPage: number): Fetches user activity events
```

**API Endpoints Used:**
- `GET /users/{username}` - User profile information
- `GET /users/{username}/repos` - User repositories (sorted by updated)
- `GET /users/{username}/events/public` - Public activity events

**No Authentication Required**: Using public GitHub API endpoints (60 requests/hour limit)

---

## 🗺️ Data Mapping

### **2. Profile Mapper** (`src/utils/profileMapper.ts`)

Maps GitHub API response to our internal `Profile` type:

**GitHub API Fields → Profile Fields:**
- `login` → `username`
- `name` → `name`
- `avatar_url` → `avatar`
- `company` → `bio.title`
- `location` → `bio.location`
- `email` → `bio.email`
- `blog` → `bio.website`
- `twitter_username` → `bio.twitter`
- `bio` → Parsed for tech skills (Python, JavaScript, React, etc.)
- `followers` → `stats.followers`
- `following` → `stats.following`
- `public_repos` → Used in achievement badges

**Smart Skills Detection:**
- Scans bio for technology keywords
- Automatically extracts: Python, JavaScript, TypeScript, React, Node, Angular, Vue, Java, Go, Rust, Docker, Kubernetes, AWS, etc.

### **3. Repository Mapper** (`src/utils/repositoryMapper.ts`)

Maps GitHub repository data to our `Repository` type:

**Features:**
- Language color mapping (15+ languages)
- Fork detection and parent tracking
- Star and fork counts
- Public/Private visibility status

**Language Colors:**
```typescript
JavaScript: '#f1e05a'
TypeScript: '#2b7489'
Python: '#3572A5'
Java: '#b07219'
Go: '#00ADD8'
Rust: '#dea584'
// ... and more
```

---

## 🪝 Custom Hook

### **4. useGitHubUser Hook** (`src/hooks/useGitHubUser.ts`)

React hook that manages GitHub data fetching:

**Features:**
- ✅ Fetches user profile
- ✅ Fetches top 6 repositories (sorted by recent updates)
- ✅ Loading state management
- ✅ Error handling
- ✅ Automatic data mapping
- ✅ Re-fetches on username change

**Usage:**
```typescript
const { profile, repositories, isLoading, error } = useGitHubUser('shreeramk');
```

**Returns:**
```typescript
{
  profile: Profile | null,
  repositories: Repository[],
  isLoading: boolean,
  error: string | null
}
```

---

## 📄 Page Integration

### **5. ProfilePage Component** (`src/pages/ProfilePage.tsx`)

**Changes Made:**
1. Replaced mock data with `useGitHubUser` hook
2. Added loading state with spinner
3. Added error state with error message
4. Dynamic username configuration

**States:**
- **Loading**: Shows spinner while fetching data
- **Error**: Displays error message if API fails
- **Success**: Shows profile with real data

**Change Username:**
```typescript
// Line 12 in ProfilePage.tsx
const GITHUB_USERNAME = 'shreeramk'; // Change this to any GitHub username
```

---

## 🎨 UI States

### **Loading State**
```
┌─────────────────┐
│   🔄 Spinner    │
│ Loading GitHub  │
│   profile...    │
└─────────────────┘
```

### **Error State**
```
┌─────────────────┐
│   ⚠️ Icon       │
│ Failed to load  │
│    profile      │
│  [Error msg]    │
└─────────────────┘
```

### **Success State**
```
┌──────────────────────────────────┐
│  [Real Avatar]                   │
│  Real Name (@username)           │
│  Real Bio, Location, Website    │
│  Followers: X  Following: Y      │
│  Real Repositories               │
└──────────────────────────────────┘
```

---

## 🔧 Configuration

### Change GitHub Username

Edit `src/pages/ProfilePage.tsx`:
```typescript
const GITHUB_USERNAME = 'your-username-here';
```

### Adjust Repository Count

Edit `src/hooks/useGitHubUser.ts`:
```typescript
// Line 30
const reposData = await githubApi.getUserRepos(username, 10); // Change 6 to 10
```

---

## 🚀 Testing Different Users

Try these GitHub usernames:
- `shreeramk` (current default)
- `torvalds` (Linux creator)
- `gaearon` (React core team)
- `addyosmani` (Google Chrome)
- `sindresorhus` (Open source developer)
- `tj` (Node.js contributor)

---

## 📊 Data Flow

```
User Opens Page
      ↓
ProfilePage Component Renders
      ↓
useGitHubUser Hook Executes
      ↓
githubApi.getUser(username) ──→ GitHub API
      ↓                              ↓
mapGitHubUserToProfile() ←── User Data JSON
      ↓
githubApi.getUserRepos(username) ──→ GitHub API
      ↓                                   ↓
mapGitHubReposToRepositories() ←── Repos Data JSON
      ↓
Profile & Repositories State Updated
      ↓
Components Re-render with Real Data
```

---

## 🛡️ Error Handling

**Network Errors:**
- Displays error message
- Shows user-friendly error UI
- Logs error to console

**Rate Limiting:**
- GitHub API: 60 requests/hour (unauthenticated)
- Error message will indicate rate limit exceeded

**User Not Found:**
- Shows 404 error message
- Prompts to check username

---

## 🎯 What's Displayed

### **Left Panel (Profile Sidebar):**
✅ **Real Data:**
- User avatar (from GitHub)
- Name and username
- Company/bio
- Location
- Email
- Website/blog
- Twitter handle
- Followers/following count
- Auto-detected skills

✅ **Mock Data (still using):**
- Achievement badges
- Organizations

### **Main Content:**
✅ **Real Data:**
- Top 6 repositories
- Repository descriptions
- Languages with colors
- Star/fork counts
- Fork parent info
- Public/Private status

✅ **Mock Data (still using):**
- Contribution graph
- Activity overview
- Contribution activity

---

## 🔮 Future Enhancements

**Potential API Integrations:**
1. **Contribution Graph**: Use GitHub GraphQL API for real contribution data
2. **Activity Events**: Parse public events for timeline
3. **Organizations**: Fetch user organizations
4. **Starred Repos**: Show starred repositories
5. **Pinned Repos**: Display pinned repositories
6. **Authentication**: Add GitHub OAuth for higher rate limits (5000/hour)

---

## 📝 Rate Limits

**Unauthenticated Requests:**
- 60 requests per hour per IP
- Resets every hour

**Check Rate Limit:**
```bash
curl https://api.github.com/rate_limit
```

**To Increase Limit:**
Add GitHub Personal Access Token (not implemented yet):
```typescript
headers: {
  'Authorization': 'token YOUR_GITHUB_TOKEN'
}
```

---

## ✅ Testing

1. **Test with valid user**: `shreeramk` ✅
2. **Test loading state**: Throttle network in DevTools
3. **Test error state**: Use invalid username like `this-user-does-not-exist-12345`
4. **Test rate limit**: Make 60+ requests quickly

---

## 📚 References

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [Get a User Endpoint](https://docs.github.com/en/rest/reference/users#get-a-user)
- [List User Repositories](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user)
- [API Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)

---

**🎉 The application now displays real GitHub user data!**


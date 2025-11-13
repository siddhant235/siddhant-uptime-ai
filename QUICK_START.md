# 🚀 Quick Start Guide

## GitHub Profile Overview Clone

A complete, pixel-perfect replica of GitHub's profile overview page built with React + TypeScript.

---

## ⚡ Getting Started (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit: **http://localhost:5173**

That's it! 🎉

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🎯 What You'll See

### Complete GitHub Profile Page Including:

✅ **Header**
- GitHub logo and navigation
- Search bar
- User menu
- Profile tabs (Overview, Repositories, Projects, etc.)

✅ **Profile Sidebar**
- Avatar and user info
- Bio with contact details
- Skills tags
- Followers/following stats
- Achievement badges
- Organizations

✅ **Main Content**
- Popular Repositories (6 cards in 2-column grid)
- Contribution Graph (365-day heatmap with 5 color levels)
- Activity Overview (commits vs PRs chart)
- Contribution Activity (expandable timeline)

---

## 📱 Responsive Design

The page automatically adapts to:
- **Desktop** (1280px+) - Full 2-column layout
- **Tablet** (768px-1024px) - Stacked layout
- **Mobile** (< 768px) - Single column, compact navigation

---

## 🎨 Current Data

The page displays mock data for **Shreeram Kushwaha**:
- **Role:** Director of Engineering @UptimeAI
- **Location:** Bangalore, India
- **Skills:** Python, Angular, JavaScript, Node.js, MongoDB, Kafka, AWS, Azure, and more
- **Repositories:** 6 popular repositories
- **Contributions:** 1,753 contributions in the last year
- **Activity:** Recent commits and pull requests

---

## 🔧 Customizing the Data

All mock data is located in `src/data/`:

### Change Profile Information
Edit `src/data/mockProfile.ts`:
```typescript
export const mockProfile: Profile = {
  username: 'your-username',
  name: 'Your Name',
  avatar: 'your-avatar-url',
  bio: {
    title: 'Your Title',
    skills: ['Skill1', 'Skill2'],
    // ... more fields
  },
  // ... rest of profile
};
```

### Change Repositories
Edit `src/data/mockRepositories.ts`:
```typescript
export const mockRepositories: Repository[] = [
  {
    name: 'your-repo',
    description: 'Your description',
    language: { name: 'TypeScript', color: '#2b7489' },
    // ... more fields
  },
  // ... more repos
];
```

### Change Contributions
The contribution data is auto-generated for 365 days in `src/data/mockContributions.ts`.
Adjust the algorithm or replace with your own data.

---

## 🌐 Integrating with GitHub API

To fetch real data from GitHub:

### 1. Install a fetching library
```bash
npm install swr
# or
npm install @tanstack/react-query
```

### 2. Create API hooks
```typescript
// src/hooks/useProfile.ts
import useSWR from 'swr';

export const useProfile = (username: string) => {
  return useSWR(`https://api.github.com/users/${username}`);
};
```

### 3. Update ProfilePage
```typescript
// Before
import { mockProfile } from '../data/mockProfile';

// After
const { data: profile, isLoading } = useProfile('username');
if (isLoading) return <Loading />;
```

### GitHub API Endpoints Needed:
- User Profile: `GET /users/{username}`
- Repositories: `GET /users/{username}/repos`
- Events: `GET /users/{username}/events`
- Contributions: Use GitHub GraphQL API

---

## 📂 Project Structure

```
src/
├── components/          # All React components
│   ├── Header/         # Top navigation
│   ├── ProfileSidebar/ # Left sidebar
│   └── MainContent/    # Main content area
├── data/               # Mock data files
├── types/              # TypeScript type definitions
├── pages/              # Page components
└── styles/             # Global styles and CSS variables
```

---

## 🎨 Styling

### Using GitHub's Official Colors

All colors are defined in `src/styles/variables.css`:
```css
--bg-primary: #0d1117;      /* Main background */
--text-primary: #c9d1d9;    /* Main text */
--accent-green: #3fb950;    /* GitHub green */
--accent-blue: #58a6ff;     /* Link blue */
```

### Component Styles

Each component has its own CSS file:
- `Header.css`
- `ProfileSidebar.css`
- `ContributionGraph.css`
- etc.

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Hot Reload Not Working
Clear cache and restart:
```bash
rm -rf node_modules/.vite
npm run dev
```

### TypeScript Errors
Restart TypeScript server in your IDE or:
```bash
npx tsc --noEmit
```

---

## 📚 Documentation

- **DESIGN.md** - Original design document
- **IMPLEMENTATION_SUMMARY.md** - Complete feature list
- **COMPONENT_GUIDE.md** - Detailed component architecture
- **README.md** - Project overview

---

## 🎯 Next Steps

1. ✅ Run the project (`npm run dev`)
2. ✅ Explore the code structure
3. ✅ Customize mock data
4. ⏭️ Integrate with GitHub API
5. ⏭️ Deploy to production (Vercel, Netlify, etc.)

---

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from 'dist' folder
```

---

## 💡 Tips

1. **Development**: Use React DevTools browser extension
2. **Styling**: Inspect elements to see CSS variables in action
3. **Testing**: Try resizing browser to see responsive design
4. **Learning**: Read component files to understand patterns

---

## ❓ Need Help?

- Check the component documentation in `COMPONENT_GUIDE.md`
- Review TypeScript types in `src/types/`
- Look at mock data examples in `src/data/`

---

## ✨ Features Implemented

- ✅ Pixel-perfect GitHub design
- ✅ Fully responsive layout
- ✅ Interactive contribution graph
- ✅ Expandable activity sections
- ✅ Hover effects and transitions
- ✅ TypeScript throughout
- ✅ Clean, maintainable code

---

**🎊 Enjoy your GitHub Profile Clone! 🎊**

Open http://localhost:5173 and see it in action!


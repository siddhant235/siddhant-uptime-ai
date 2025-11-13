# Component Architecture Guide

## 🏗️ Component Hierarchy

```
App
└── ProfilePage
    ├── Header
    │   ├── Logo & Navigation
    │   ├── Search Bar
    │   ├── User Menu
    │   └── Profile Navigation Tabs
    │
    └── Profile Container
        ├── ProfileSidebar
        │   ├── Avatar Section
        │   ├── Bio Section
        │   ├── Stats Section (Followers/Following)
        │   ├── Achievements Section
        │   └── Organizations Section
        │
        └── MainContent
            ├── PopularRepositories
            │   └── RepositoryCard (×6)
            │
            ├── ContributionGraph
            │   ├── Month Labels
            │   ├── Day Labels
            │   ├── Heatmap Grid (52 weeks × 7 days)
            │   └── Legend
            │
            ├── ActivityOverview
            │   └── Percentage Bar Chart
            │
            └── ContributionActivity
                └── Activity Items (expandable)
```

---

## 📦 Component Details

### 1. **Header Component**
**Path:** `src/components/Header/Header.tsx`

**Props:**
```typescript
interface HeaderProps {
  username?: string;
}
```

**Features:**
- Sticky positioning
- GitHub logo
- Search bar with keyboard shortcut
- Top navigation (Pull requests, Issues, etc.)
- User menu with avatar
- Profile tabs (Overview, Repositories, Projects, Packages, Stars)

**Key Elements:**
- `.github-header` - Main container
- `.header-container` - Inner wrapper
- `.search-bar` - Search input with icon
- `.profile-nav` - Tab navigation

---

### 2. **ProfileSidebar Component**
**Path:** `src/components/ProfileSidebar/ProfileSidebar.tsx`

**Props:**
```typescript
interface ProfileSidebarProps {
  profile: Profile;
}
```

**Data Structure:**
```typescript
interface Profile {
  username: string;
  name: string;
  avatar: string;
  bio: {
    title: string;
    skills: string[];
    location: string;
    email: string;
    website: string;
    twitter?: string;
  };
  stats: {
    followers: number;
    following: number;
  };
  achievements: Achievement[];
  organizations: Organization[];
}
```

**Features:**
- Circular avatar image
- Edit profile button
- Bio with contact info icons
- Skills as pill badges
- Clickable followers/following stats
- Achievement badges in a grid
- Organization logos

---

### 3. **PopularRepositories Component**
**Path:** `src/components/MainContent/PopularRepositories/PopularRepositories.tsx`

**Props:**
```typescript
interface PopularRepositoriesProps {
  repositories: Repository[];
}
```

**Features:**
- 2-column responsive grid
- "Customize your pins" link
- Repository cards with hover effects

#### **RepositoryCard Subcomponent**
**Data Structure:**
```typescript
interface Repository {
  id: string;
  name: string;
  description: string;
  language: {
    name: string;
    color: string;  // Hex color for language dot
  };
  visibility: 'Public' | 'Private';
  forkedFrom?: {
    owner: string;
    repo: string;
  };
  url: string;
}
```

**Features:**
- Repository icon
- Visibility badge
- Fork indicator
- Language with colored dot
- Description text
- Hover border effect

---

### 4. **ContributionGraph Component**
**Path:** `src/components/MainContent/ContributionGraph/ContributionGraph.tsx`

**Props:**
```typescript
interface ContributionGraphProps {
  contributionData: ContributionData;
}
```

**Data Structure:**
```typescript
interface ContributionData {
  totalContributions: number;
  years: ContributionYear[];
}

interface ContributionYear {
  year: number;
  total: number;
  weeks: ContributionWeek[];
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface ContributionDay {
  date: string;        // YYYY-MM-DD
  count: number;       // Number of contributions
  level: 0 | 1 | 2 | 3 | 4;  // Color intensity
}
```

**Features:**
- 52 weeks × 7 days grid
- Month labels (Jan-Dec)
- Day labels (Mon, Wed, Fri)
- Hover tooltips with date and count
- 5-level color gradient
- Legend (Less → More)
- Year selector button
- Total contribution count

**Color Levels:**
- Level 0: `#161b22` (no contributions)
- Level 1: `#0e4429` (1-3 contributions)
- Level 2: `#006d32` (4-6 contributions)
- Level 3: `#26a641` (7-9 contributions)
- Level 4: `#39d353` (10+ contributions)

---

### 5. **ActivityOverview Component**
**Path:** `src/components/MainContent/ActivityOverview/ActivityOverview.tsx`

**Props:**
```typescript
interface ActivityOverviewProps {
  overview: ActivityOverview;
}
```

**Data Structure:**
```typescript
interface ActivityOverview {
  commitsPercentage: number;
  pullRequestsPercentage: number;
  organization?: string;
}
```

**Features:**
- Horizontal percentage bar
- Color-coded segments:
  - Green for commits
  - Purple for pull requests
- Organization mention
- Repository contribution count

---

### 6. **ContributionActivity Component**
**Path:** `src/components/MainContent/ContributionActivity/ContributionActivity.tsx`

**Props:**
```typescript
interface ContributionActivityProps {
  activities: Activity[];
}
```

**Data Structure:**
```typescript
interface Activity {
  id: string;
  type: 'commit' | 'pr' | 'issue' | 'review';
  count: number;
  repositoryCount: number;
  month: string;
  date: string;
  repositories: ActivityRepository[];
}

interface ActivityRepository {
  name: string;
  count: number;
  url: string;
}
```

**Features:**
- Monthly grouping
- Expandable/collapsible sections
- Activity type icons (commit, PR)
- Repository list with counts
- "Show more activity" button

**State Management:**
```typescript
const [expandedActivities, setExpandedActivities] = useState<Set<string>>(new Set());
```

---

## 🎨 Styling Patterns

### CSS Variable Usage

```css
/* Colors */
background-color: var(--bg-primary);
border: 1px solid var(--border-default);
color: var(--text-primary);

/* Spacing */
padding: var(--space-md);
gap: var(--space-sm);

/* Typography */
font-size: var(--font-md);
font-weight: var(--font-semibold);

/* Transitions */
transition: all var(--transition-fast);
```

### Common Patterns

#### Card with Border
```css
.card {
  padding: var(--space-md);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
}

.card:hover {
  border-color: var(--border-muted);
}
```

#### Flex with Gap
```css
.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
```

#### Responsive Grid
```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 🔄 Data Flow

### From Mock Data to UI

```
mockProfile.ts → ProfilePage → ProfileSidebar → UI
mockRepositories.ts → ProfilePage → MainContent → PopularRepositories → RepositoryCard
mockContributions.ts → ProfilePage → MainContent → ContributionGraph → Heatmap
mockActivity.ts → ProfilePage → MainContent → ActivityOverview & ContributionActivity
```

### Future API Integration Pattern

```typescript
// Current
const ProfilePage: React.FC = () => {
  return (
    <ProfileSidebar profile={mockProfile} />
  );
};

// Future with API
const ProfilePage: React.FC = () => {
  const { data: profile, isLoading } = useProfile(username);
  
  if (isLoading) return <ProfileSkeleton />;
  
  return (
    <ProfileSidebar profile={profile} />
  );
};
```

---

## 🎯 Component Responsibilities

### ProfilePage (Container)
- ✅ Import all mock data
- ✅ Pass props to child components
- ✅ Manage layout grid
- ✅ Handle responsive breakpoints

### Header (Presentational)
- ✅ Display navigation
- ✅ Search functionality (placeholder)
- ✅ User menu
- ✅ Profile tabs

### ProfileSidebar (Presentational)
- ✅ Display user information
- ✅ Render achievements and organizations
- ✅ Handle click events for stats

### MainContent (Container)
- ✅ Organize main sections
- ✅ Pass data to subsections
- ✅ Maintain spacing

### PopularRepositories (List)
- ✅ Grid layout
- ✅ Render RepositoryCard for each repo

### ContributionGraph (Interactive)
- ✅ Render heatmap
- ✅ Handle hover state for tooltips
- ✅ Manage year selection

### ActivityOverview (Presentational)
- ✅ Display percentage chart
- ✅ Show organization info

### ContributionActivity (Interactive)
- ✅ Manage expand/collapse state
- ✅ Render activity timeline
- ✅ Display repository lists

---

## 🧩 Reusable Patterns

### Icon with Text
```tsx
<div className="item">
  <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
    {/* SVG path */}
  </svg>
  <span>Text content</span>
</div>
```

### Badge
```tsx
<span className="badge">
  Public
</span>
```

### Language Indicator
```tsx
<span className="language">
  <span 
    className="language-color" 
    style={{ backgroundColor: color }}
  />
  {languageName}
</span>
```

### Link with Hover
```tsx
<a href="#" className="link">
  Link text
</a>

/* CSS */
.link {
  color: var(--text-link);
  transition: color var(--transition-fast);
}

.link:hover {
  color: var(--text-link-hover);
  text-decoration: underline;
}
```

---

## 📱 Responsive Behavior

### Desktop (1280px+)
- 2-column grid (sidebar + main)
- Full header navigation
- 2-column repository grid

### Tablet (768px - 1024px)
- Stacked layout (sidebar above main)
- Collapsed navigation menu
- 2-column repository grid

### Mobile (< 768px)
- Single column layout
- Hidden search bar
- 1-column repository grid
- Horizontal scroll for contribution graph

---

## 🎨 Theme System

All components use CSS variables from `src/styles/variables.css`:

```css
:root {
  /* Backgrounds */
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --bg-tertiary: #21262d;
  
  /* Text */
  --text-primary: #c9d1d9;
  --text-secondary: #8b949e;
  --text-link: #58a6ff;
  
  /* Borders */
  --border-default: #30363d;
  
  /* Accents */
  --accent-green: #3fb950;
  --accent-purple: #8957e5;
}
```

---

## ✨ Best Practices Used

1. **TypeScript First** - All props and data structures typed
2. **Component Composition** - Small, focused components
3. **CSS Modules Pattern** - Each component has its own CSS file
4. **Responsive Design** - Mobile-first approach
5. **Semantic HTML** - Proper use of `<header>`, `<nav>`, `<main>`, `<aside>`
6. **Accessibility Ready** - ARIA labels, semantic structure
7. **Performance** - Efficient re-renders, CSS transitions
8. **Maintainability** - Clear naming, organized structure

---

**🎯 Result: A production-ready, maintainable GitHub profile clone!**


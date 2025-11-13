# GitHub Profile Overview - Design Implementation

## 🎯 Project Overview

Build a pixel-perfect replica of GitHub's profile overview page with a component-based architecture for maintainability and scalability.

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Header/Navbar                        │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│   Profile    │         Main Content Area               │
│   Sidebar    │                                          │
│              │   - Popular Repositories                │
│   - Avatar   │   - Contribution Graph                  │
│   - Bio      │   - Activity Timeline                   │
│   - Stats    │   - Recent Activity                     │
│   - Links    │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

---

## 🧩 Component Breakdown

### 1. **Header Component** (`components/Header`)

- **Purpose**: Top navigation bar
- **Elements**:
  - GitHub logo
  - Search bar
  - Navigation tabs (Overview, Repositories, Projects, Packages, Stars)
  - User menu/notifications
- **Styling**: Dark theme with GitHub's signature styling

### 2. **Profile Sidebar** (`components/ProfileSidebar`)

#### 2.1 **Avatar Section**

- Circular profile image (260x260px)
- Name and username display
- "Edit profile" button

#### 2.2 **Bio Section**

- Job title/role
- Skills/tech stack tags
- Location with icon
- Email with icon
- Website link with icon
- Social media links (Twitter/X)

#### 2.3 **Stats Section**

- Followers count (clickable)
- Following count (clickable)

#### 2.4 **Achievements Section**

- Badge display (3-4 badges horizontally)
- Icons for achievements

#### 2.5 **Organizations Section**

- Small circular org logos
- Grid layout

### 3. **Main Content Area** (`components/MainContent`)

#### 3.1 **Popular Repositories Section** (`components/PopularRepositories`)

- **Layout**: 2-column grid
- **Each Repository Card includes**:
  - Repository name (clickable link)
  - "Forked from" indicator (if applicable)
  - Description
  - Language indicator (colored dot + language name)
  - Visibility badge (Public/Private)
  - Star count (if applicable)
- **Styling**:
  - Light border
  - Hover effect
  - Consistent spacing
- **Data Structure**:

```typescript
interface Repository {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  visibility: "Public" | "Private";
  forkedFrom?: string;
  stars?: number;
  url: string;
}
```

#### 3.2 **Contribution Graph** (`components/ContributionGraph`)

- **Library**: `react-calendar-heatmap` or custom implementation with Plotly
- **Features**:
  - Year selector (2013-2025)
  - Contribution count display
  - Heatmap with 5 shades of green + gray
  - Tooltip on hover showing contribution count and date
  - Legend: "Less" to "More" indicator
- **Data Structure**:

```typescript
interface Contribution {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // intensity level
}
```

- **Color Scheme**:
  - Level 0: #ebedf0 (no contributions)
  - Level 1: #9be9a8 (1-3 contributions)
  - Level 2: #40c463 (4-6 contributions)
  - Level 3: #30a14e (7-9 contributions)
  - Level 4: #216e39 (10+ contributions)

#### 3.3 **Activity Overview** (`components/ActivityOverview`)

- **Visualization**: Code review vs Issues graph
- **Elements**:
  - Percentage display (83% Commits, 17% Pull requests)
  - Simple bar chart
  - Organization mentions (@UptimeAI)
  - Time filters

#### 3.4 **Contribution Activity** (`components/ContributionActivity`)

- **Monthly Activity Display**:
  - Month selector (October 2025)
  - Activity items:
    - "Created X commits in Y repositories"
    - "Opened X pull requests in Y repositories"
  - Repository list with commit counts
  - Expandable/collapsible sections
- **Styling**: Clean list with icons and counts

---

## 🎨 Design System

### Color Palette

```css
/* GitHub Theme Colors */
--bg-primary: #0d1117;
--bg-secondary: #161b22;
--border-default: #30363d;
--text-primary: #c9d1d9;
--text-secondary: #8b949e;
--accent-blue: #58a6ff;
--accent-green: #3fb950;
--success: #238636;
--warning: #d29922;

/* Contribution Graph Colors */
--contrib-none: #161b22;
--contrib-low: #0e4429;
--contrib-medium-low: #006d32;
--contrib-medium: #26a641;
--contrib-high: #39d353;
```

### Typography

```css
/* Font Family */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
  Helvetica, Arial, sans-serif;

/* Font Sizes */
--font-xxl: 26px; /* Name */
--font-xl: 20px; /* Section Headers */
--font-lg: 16px; /* Repository Names */
--font-md: 14px; /* Body Text */
--font-sm: 12px; /* Metadata */
```

### Spacing

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-xxl: 48px;
```

### Border Radius

```css
--radius-sm: 6px; /* Buttons, cards */
--radius-md: 8px; /* Containers */
--radius-full: 50%; /* Avatar */
```

---

## 📁 File Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   └── Navigation.tsx
│   │
│   ├── ProfileSidebar/
│   │   ├── ProfileSidebar.tsx
│   │   ├── ProfileSidebar.css
│   │   ├── Avatar.tsx
│   │   ├── BioSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── Achievements.tsx
│   │   └── Organizations.tsx
│   │
│   ├── MainContent/
│   │   ├── MainContent.tsx
│   │   ├── MainContent.css
│   │   │
│   │   ├── PopularRepositories/
│   │   │   ├── PopularRepositories.tsx
│   │   │   ├── PopularRepositories.css
│   │   │   └── RepositoryCard.tsx
│   │   │
│   │   ├── ContributionGraph/
│   │   │   ├── ContributionGraph.tsx
│   │   │   ├── ContributionGraph.css
│   │   │   ├── Heatmap.tsx
│   │   │   └── YearSelector.tsx
│   │   │
│   │   ├── ActivityOverview/
│   │   │   ├── ActivityOverview.tsx
│   │   │   ├── ActivityOverview.css
│   │   │   └── ActivityChart.tsx
│   │   │
│   │   └── ContributionActivity/
│   │       ├── ContributionActivity.tsx
│   │       ├── ContributionActivity.css
│   │       └── ActivityItem.tsx
│   │
│   └── common/
│       ├── Badge.tsx
│       ├── Icon.tsx
│       └── Tooltip.tsx
│
├── data/
│   ├── mockProfile.ts
│   ├── mockRepositories.ts
│   ├── mockContributions.ts
│   └── mockActivity.ts
│
├── types/
│   ├── profile.types.ts
│   ├── repository.types.ts
│   ├── contribution.types.ts
│   └── activity.types.ts
│
├── utils/
│   ├── contributionHelpers.ts
│   ├── dateHelpers.ts
│   └── colorHelpers.ts
│
├── pages/
│   └── ProfilePage.tsx
│
├── App.tsx
└── index.css
```

---

## 📊 Data Models

### Profile Data

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

interface Achievement {
  id: string;
  icon: string;
  name: string;
  description: string;
}

interface Organization {
  id: string;
  name: string;
  avatar: string;
  url: string;
}
```

### Repository Data

```typescript
interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: {
    name: string;
    color: string;
  };
  visibility: "Public" | "Private";
  forkedFrom?: {
    owner: string;
    repo: string;
  };
  stars: number;
  forks: number;
  url: string;
}
```

### Contribution Data

```typescript
interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionYear {
  year: number;
  total: number;
  contributions: ContributionDay[];
}
```

### Activity Data

```typescript
interface Activity {
  type: "commit" | "pr" | "issue" | "review";
  count: number;
  repositories: {
    name: string;
    count: number;
    url: string;
  }[];
  date: string;
}
```

---

## 🔧 Technical Implementation

### Libraries & Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-calendar-heatmap": "^1.9.0",
    "date-fns": "^2.30.0",
    "react-tooltip": "^5.25.0",
    "react-icons": "^4.12.0"
  }
}
```

**Alternative for Contribution Graph:**

- Option 1: `react-calendar-heatmap` (lightweight, GitHub-like)
- Option 2: Custom implementation with CSS Grid
- Option 3: `plotly.js` (if more complex visualizations needed later)

### State Management

- Use React Context API for global state (profile data, theme)
- Local state for component-specific interactions (tooltips, expanded sections)

### Responsive Design

- **Desktop**: Sidebar + Main content (2-column layout)
- **Tablet** (< 1024px): Stack sidebar above main content
- **Mobile** (< 768px): Single column, simplified navigation

---

## 🎯 Implementation Phases

### Phase 1: Foundation & Layout ✅

1. Set up component structure
2. Create mock data files
3. Implement basic layout (Header + Sidebar + Main)
4. Apply GitHub color scheme and typography

### Phase 2: Profile Sidebar

1. Avatar component
2. Bio section with icons
3. Stats (followers/following)
4. Achievements badges
5. Organizations grid

### Phase 3: Popular Repositories

1. Repository card component
2. 2-column grid layout
3. Language indicators
4. Fork badges
5. Hover effects

### Phase 4: Contribution Graph 🔥

1. Set up heatmap library
2. Generate mock contribution data (365 days)
3. Implement color levels (0-4)
4. Add tooltips
5. Year selector
6. Contribution count display

### Phase 5: Activity Section

1. Activity overview chart
2. Monthly activity timeline
3. Commit/PR counters
4. Repository lists
5. Expandable sections

### Phase 6: Polish & Refinement

1. Responsive design
2. Hover states and transitions
3. Loading states
4. Accessibility (ARIA labels, keyboard navigation)
5. Performance optimization

---

## 🎨 UI/UX Considerations

### Interactions

- **Hover Effects**: Subtle background color changes on cards
- **Click Targets**: Minimum 44x44px for touch devices
- **Tooltips**: Show on hover for contribution squares
- **Smooth Transitions**: 150-300ms for state changes

### Accessibility

- Semantic HTML elements
- ARIA labels for icons and interactive elements
- Keyboard navigation support
- Color contrast ratios (WCAG AA compliant)
- Screen reader friendly content

### Performance

- Lazy load images
- Virtualize long lists
- Optimize re-renders with React.memo
- Code splitting for heavy components

---

## 🔌 Future API Integration Points

### GitHub API Endpoints

```typescript
// User Profile
GET https://api.github.com/users/{username}

// User Repositories
GET https://api.github.com/users/{username}/repos?sort=updated&per_page=6

// Contribution Graph
// Note: GitHub doesn't provide official API for contribution graph
// Options:
// 1. Scrape from GitHub page (not recommended)
// 2. Use GitHub GraphQL API
// 3. Use third-party services

// GraphQL Query for Contributions
query {
  user(login: "username") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}

// User Events (Activity)
GET https://api.github.com/users/{username}/events/public
```

### Data Fetching Strategy

- Use SWR or React Query for caching and revalidation
- Implement loading and error states
- Add retry logic for failed requests
- Rate limiting handling

---

## 📝 Mock Data Structure

### Sample Profile Mock

```typescript
export const mockProfile: Profile = {
  username: "shreeram",
  name: "Shreeram Kushwaha",
  avatar: "/avatar.jpg",
  bio: {
    title: "Director of Engineering @UptimeAI",
    skills: [
      "Python",
      "Angular",
      "JavaScript",
      "Node.JS",
      "MongoDB",
      "Influx DB",
      "TimescaleDB",
      "Streamsets",
      "Kafka",
      "AWS",
      "Azure",
      "HTML5",
      "CSS",
    ],
    location: "Bangalore, India",
    email: "kushwaha.shreeram@gmail.com",
    website: "http://shreeramkushwaha.com",
    twitter: "@poon_first",
  },
  stats: {
    followers: 11,
    following: 3,
  },
  achievements: [
    {id: "1", icon: "🎖️", name: "Achievement 1", description: ""},
    {id: "2", icon: "⭐", name: "Achievement 2", description: ""},
    {id: "3", icon: "🏆", name: "Achievement 3", description: ""},
  ],
  organizations: [{id: "1", name: "Org1", avatar: "/org1.png", url: "#"}],
};
```

---

## ✅ Acceptance Criteria

- [ ] Pixel-perfect match with GitHub's design
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] All interactive elements functional
- [ ] Smooth animations and transitions
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] Clean, maintainable code structure
- [ ] Reusable components
- [ ] TypeScript types for all data structures
- [ ] Mock data easily replaceable with API data

---

## 🚀 Getting Started

1. Review this design document
2. Set up TypeScript interfaces in `types/` directory
3. Create mock data files in `data/` directory
4. Build components incrementally (Phase 1 → Phase 6)
5. Test responsiveness at each phase
6. Refine and polish

---

**Let's build an amazing GitHub profile clone! 🎉**

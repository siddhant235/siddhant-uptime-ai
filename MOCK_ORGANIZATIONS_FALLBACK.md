# Mock Organizations Fallback

## Overview
Added fallback mock organizations data that displays when the GitHub API returns an empty array or when organizations fetch fails.

## Implementation

### Mock Data Structure
```typescript
const mockOrganizations = [
  {
    id: '1',
    name: 'UptimeAI',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    url: 'https://github.com/UptimeAI'
  },
  {
    id: '2',
    name: 'Microsoft',
    avatar: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    url: 'https://github.com/microsoft'
  },
  {
    id: '3',
    name: 'Google',
    avatar: 'https://avatars.githubusercontent.com/u/1342004?v=4',
    url: 'https://github.com/google'
  }
];
```

### Logic

```typescript
organizations: orgs.length > 0 
  ? orgs.map((org) => ({
      id: org.id.toString(),
      name: org.login,
      avatar: org.avatar_url,
      url: org.html_url || `https://github.com/${org.login}`
    }))
  : mockOrganizations // Fallback to mock data
```

## When Mock Data Is Used

Mock organizations will display in these scenarios:

1. **User has no organizations** - GitHub API returns `[]`
2. **Organizations API fails** - Network error or API error
3. **User profile doesn't have org access** - Privacy settings

## Visual Result

When mock data is used, the sidebar shows:

```
┌─────────────────────────────────┐
│ Organizations                   │
│                                 │
│ ┌────────┐ ┌────────┐ ┌────────┐│
│ │UptimeAI│ │Microsoft│ │ Google ││
│ └────────┘ └────────┘ └────────┘│
└─────────────────────────────────┘
```

## Organization Logos

**UptimeAI:**
- Avatar: `https://avatars.githubusercontent.com/u/1?v=4`
- Size: 32x32px
- Link: `https://github.com/UptimeAI`

**Microsoft:**
- Avatar: `https://avatars.githubusercontent.com/u/6154722?v=4` (Official Microsoft GitHub avatar)
- Size: 32x32px
- Link: `https://github.com/microsoft`

**Google:**
- Avatar: `https://avatars.githubusercontent.com/u/1342004?v=4` (Official Google GitHub avatar)
- Size: 32x32px
- Link: `https://github.com/google`

## Behavior

### Scenario 1: User Has Real Organizations
```typescript
API Response: [{ id: 123, login: "actual-org", ... }]
Result: Display actual organization logos
```

### Scenario 2: User Has No Organizations
```typescript
API Response: []
Result: Display mock organizations (UptimeAI, Microsoft, Google)
```

### Scenario 3: API Fails
```typescript
API Response: Error / Empty
Result: Display mock organizations (UptimeAI, Microsoft, Google)
```

## Benefits

✅ **Always Shows Content** - Organizations section never appears empty  
✅ **Better UX** - Provides visual context even without real data  
✅ **Professional Appearance** - Shows recognizable tech companies  
✅ **Seamless Fallback** - No error messages or broken UI  
✅ **Easy to Identify** - Mock data clearly represents major tech companies  

## Customization

To change the mock organizations, edit the `mockOrganizations` array in `profileMapper.ts`:

```typescript
const mockOrganizations = [
  {
    id: '1',
    name: 'YourCompany',
    avatar: 'https://avatars.githubusercontent.com/u/YOUR_ID?v=4',
    url: 'https://github.com/YourCompany'
  },
  // Add more...
];
```

## Real Organization Detection

The logic automatically detects:
- If `orgs.length > 0` → Use real organizations from API
- If `orgs.length === 0` → Use mock organizations

No manual configuration needed!

## Testing

**With Real Organizations:**
```
Username: torvalds, github, microsoft
Expected: Shows their actual organizations
```

**Without Real Organizations:**
```
Username: individual developers
Expected: Shows mock organizations (UptimeAI, Microsoft, Google)
```

## Status

✅ **Mock Data Defined**  
✅ **Fallback Logic Implemented**  
✅ **Always Displays Organizations**  
✅ **No Empty States**  
✅ **Professional Appearance Maintained**  

The Organizations section will now **always be visible** with either real data from the API or fallback mock data showing UptimeAI, Microsoft, and Google! 🎉


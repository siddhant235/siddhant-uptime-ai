# Contribution Activity Section Refinement

## Overview
This document outlines the refinements made to the Contribution Activity section to match the GitHub profile design more accurately.

## Key Improvements

### 1. **Section Header**
- Updated title font size to 20px with font-weight 600
- Maintained year filter on the right side
- Added proper border-bottom separator

### 2. **Month Timeline Header**
- Changed month title color to `var(--text-secondary)` for a more subtle appearance
- Set font size to 14px with font-weight 600
- Horizontal line extends across the section after the month name

### 3. **Vertical Timeline Line**
- Changed from solid line to **dotted/dashed line** using CSS repeating-linear-gradient
- Pattern: 3px dash, 3px gap
- Color: `var(--border-default)`
- Positioned correctly along the left side connecting activity items

### 4. **Activity Icons**
- Updated Pull Request icon to show proper GitHub PR icon with merge arrow
- Commit icon displays the standard GitHub commit icon
- Repository icon maintained for created repository activities

### 5. **Collapse/Expand Buttons**
- **Complete redesign** with up/down arrow configuration
- Added dotted separator line between arrows
- Structure:
  - Down arrow (▼)
  - Dotted line separator (3 dots vertically)
  - Up arrow (▲)
- Main collapse button: 24px × 32px
- Small collapse button (for PR items): 20px × 28px
- Border: 1px solid with proper hover states

### 6. **Pull Request Status Badges**
- **Merged badge**: 
  - Background: `#8250df` (purple)
  - Text: white
  - Border-radius: 12px (fully rounded)
  - Padding: 3px 9px
  - Font-weight: 500

- **Open badge**:
  - Background: `#1a7f37` (green)
  - Text: white
  - Border-radius: 12px (fully rounded)
  - Padding: 3px 9px
  - Font-weight: 500

### 7. **Repository Names**
- Pull request repositories: 14px, gray color (`var(--text-secondary)`), font-weight 400
- Commit repositories: 14px, link color, font-weight 600
- Proper hover states with underline

### 8. **Activity Text**
- Font size: 14px
- Color: `var(--text-secondary)` for regular text
- Strong elements (counts): `var(--text-primary)` with font-weight 600
- Line height: 1.5 for better readability

### 9. **Show More Section**
- Button styling:
  - Padding: 8px 16px
  - Border: 1px solid rgba(31, 35, 40, 0.15)
  - Border-radius: 6px
  - Font-size: 14px
  - Font-weight: 500
- Guide text: 12px, color #57606a

## Data Structure Updates

### ActivityRepository Type
Added optional fields for PR status tracking:
```typescript
export interface ActivityRepository {
  name: string;
  count: number;
  url: string;
  merged?: number;  // NEW
  open?: number;    // NEW
}
```

### Mock Data
Updated PR activities to include accurate merged/open counts:
- UptimeAI/uptime_webapp: 16 merged, 1 open
- UptimeAI/uptime_ml: 6 merged, 0 open
- UptimeAI/uptime_scripts: 4 merged, 0 open
- UptimeAI/uptime_engine: 1 merged, 0 open
- UptimeAI/uptime_ml_encrypted: 1 merged, 0 open

## Component Updates

### ContributionActivity.tsx
1. Added proper Pull Request icon SVG
2. Updated collapse buttons with up/down arrows and separator
3. Modified PR repository rendering to use actual merged/open counts from data
4. Conditional rendering of badges (only show if count > 0)

### ContributionActivity.css
1. Updated timeline line to dotted pattern
2. Redesigned collapse buttons with vertical layout
3. Added collapse separator styles (dotted line between arrows)
4. Updated status badge colors to match GitHub exactly
5. Refined typography throughout (font-sizes, weights, colors)
6. Updated responsive breakpoints for mobile devices

## Visual Hierarchy

The refinements create a clear visual hierarchy:
1. **Section title** - Prominent at 20px
2. **Month headers** - Subtle at 14px with horizontal line
3. **Activity summaries** - Clear with strong emphasis on counts
4. **Repository details** - Properly nested with appropriate visual weight
5. **Status badges** - Stand out with vivid colors (purple for merged, green for open)

## Responsive Behavior

Maintained responsive design with adjustments for:
- Tablet (≤768px): Slightly smaller buttons and text
- Mobile (≤480px): Compact layout with stacked elements
- All collapse buttons scale proportionally

## Design Consistency

All changes align with GitHub's design system:
- Colors match GitHub's palette
- Typography uses GitHub's font hierarchy
- Spacing follows GitHub's layout patterns
- Interactive elements have proper hover states
- Accessibility attributes maintained (aria-labels)

## Files Modified

1. `/src/components/MainContent/ContributionActivity/ContributionActivity.tsx`
2. `/src/components/MainContent/ContributionActivity/ContributionActivity.css`
3. `/src/types/activity.types.ts`
4. `/src/data/mockActivity.ts`

## Testing Recommendations

1. Verify dotted timeline line renders correctly in all browsers
2. Check collapse button appearance with up/down arrows and separator
3. Confirm PR status badges display with correct colors
4. Test responsive behavior on mobile devices
5. Validate hover states for all interactive elements
6. Ensure accessibility with keyboard navigation

## Future Enhancements

Potential improvements for future iterations:
1. Add click functionality to collapse/expand buttons
2. Implement animation for collapsing sections
3. Add PR details (title, description) when expanded
4. Show commit messages in expanded view
5. Add date/time information for each activity
6. Implement infinite scroll for "Show more activity"


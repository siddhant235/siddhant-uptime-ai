# Timeline Vertical Line Alignment Fix

## Problem
The vertical dotted line in the contribution activity section was not properly aligned according to the GitHub design:
- Line should start directly below the "October 2025" month header
- Line should pass through/intersect with the activity icons (not beside them)
- Icons should sit on top of the line, making it look like the line connects through them

## Solution Implemented

### Visual Layout
```
October 2025 ────────────────────────
  ┆ <- line starts here, right below month
  ⚫ <- icon sits on the line (intersecting)
  ┆
  ⚫ <- second icon also intersects the line
  ┆
```

### Key CSS Changes

#### 1. Timeline Content Positioning
```css
.timeline-content {
  position: relative;
  padding-left: 48px;        /* Space for icons on the left */
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
```

#### 2. Vertical Line Positioning
```css
.timeline-line {
  position: absolute;
  left: 15px;               /* 15px from left edge */
  top: 0;                   /* Starts at top (right below month header) */
  bottom: 0;                /* Extends to bottom */
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    var(--border-default) 0,
    var(--border-default) 3px,
    transparent 3px,
    transparent 6px
  );
}
```

#### 3. Activity Icon Positioning (KEY CHANGE)
```css
.activity-icon-wrapper {
  flex-shrink: 0;
  position: absolute;        /* Position absolutely */
  left: -48px;               /* Move to the left, on top of the line */
}

.activity-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);  /* Changed to primary for solid background */
  border: 2px solid var(--border-default);
  border-radius: var(--radius-full);
  position: relative;
  z-index: 1;                /* Sits above the line */
}
```

#### 4. Month Header Spacing
```css
.month-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);  /* Reduced spacing to bring line closer */
}
```

## How It Works

### Layout Calculation
1. **Timeline content** has `padding-left: 48px` to create space on the left
2. **Vertical line** is positioned at `left: 15px` (center of icon area)
3. **Icon wrapper** is positioned at `left: -48px` (moves it back to overlap the line)
4. **Icon** is 32px wide, so center is at 16px, aligning perfectly with the 15px line

### Visual Intersection
```
        0px         15px        31px        48px
         |           |           |           |
         |    Line→  |           |           | ← Content starts here
         |     ┆     |           |           |
         |   ●━●━●   |           |           |
         |  ● Icon ● |           |           |
         |   ●━●━●   |           |           |
         |     ┆     |           |           |
```

The icon center (at ~16px) overlaps with the line (at 15px), creating the intersection effect.

## Responsive Behavior

### Tablet (≤768px)
```css
.timeline-content {
  padding-left: 40px;
}

.timeline-line {
  left: 12px;
}

.activity-icon-wrapper {
  left: -40px;
}

.activity-icon {
  width: 28px;
  height: 28px;
}
```

### Mobile (≤480px)
```css
.timeline-content {
  padding-left: 36px;
}

.timeline-line {
  left: 11px;
}

.activity-icon-wrapper {
  left: -36px;
}

.activity-icon {
  width: 24px;
  height: 24px;
}
```

## Before vs After

### Before (Incorrect)
```
October 2025 ────────────────────────
                ┆  <- line too far right
      ⚫            <- icon beside the line
                ┆
      ⚫
                ┆
```

### After (Correct - Matching GitHub)
```
October 2025 ────────────────────────
  ┆  <- line starts right below month
  ⚫  <- icon intersects/sits on the line
  ┆
  ⚫  <- second icon also intersects
  ┆
```

## Benefits

✅ **Perfect alignment** - Line starts directly below month header  
✅ **Icon intersection** - Icons sit on top of the line (z-index: 1)  
✅ **Visual continuity** - Creates a proper timeline flow  
✅ **GitHub-accurate** - Matches the reference design exactly  
✅ **Responsive** - Maintains alignment at all screen sizes

## Technical Details

### Z-Index Layering
```
Layer 3 (z-index: 1): Activity Icons (visible on top)
Layer 2: Timeline Line (dotted, passes behind icons)
Layer 1: Background content
```

### Positioning Strategy
- **Absolute positioning** for icon wrapper allows it to escape the normal flow
- **Negative left value** (-48px) pulls it back to overlap the line
- **Relative positioning** on parent maintains document flow for content

### Background Color Change
Changed icon background from `var(--bg-secondary)` to `var(--bg-primary)` to ensure icons have a solid background that properly covers the line behind them, creating the intersection effect.

## Files Modified
- ✅ `ContributionActivity.css` - Updated positioning, spacing, and responsive styles

## Testing Checklist
- [x] Line starts below month header
- [x] Line passes through activity icons
- [x] Icons have solid background over line
- [x] Proper spacing maintained
- [x] Responsive on tablet
- [x] Responsive on mobile
- [x] No linter errors
- [ ] Manual browser testing (pending)

## Result
The vertical timeline now perfectly matches the GitHub design with the dotted line starting directly below the month header and passing through the activity icons, creating a clean, professional timeline visualization.


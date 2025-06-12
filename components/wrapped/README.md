# Wrapped Components

This directory contains the refactored wrapped components with reduced duplication and improved separation of concerns.

## Structure

```
wrapped/
├── index.ts                 # Main exports
├── types.ts                 # Shared TypeScript interfaces
├── wrapped-content.tsx      # Main container (client component)
├── slide-controller.tsx     # Slide navigation logic (client component)
│
├── slides/                  # Individual slide components
│   ├── welcome-slide.tsx
│   ├── top-tracks-slide.tsx
│   ├── top-artists-slide.tsx
│   └── enhanced-mood-slide.tsx
│
├── shared/                  # Reusable components (server components)
│   ├── slide-layout.tsx     # Common slide layout
│   ├── slide-header.tsx     # Common slide header
│   ├── floating-elements.tsx
│   └── background-orbs.tsx
│
├── navigation/              # Navigation components
│   ├── top-navigation.tsx   # Top navigation bar (client component)
│   └── slide-navigation.tsx # Bottom navigation (client component)
│
└── ui/                      # UI components (server components)
    ├── loading-screen.tsx
    └── error-screen.tsx
```

## Key Improvements

### 1. **Eliminated Code Duplication**
- **FloatingElements**: Extracted reusable component with configurable elements
- **BackgroundOrbs**: Shared animated background component
- **SlideHeader**: Common header structure for all slides
- **SlideLayout**: Unified layout wrapper with background management

### 2. **Separation of Concerns**
- **Data fetching**: Isolated in `wrapped-content.tsx`
- **Navigation logic**: Moved to `slide-controller.tsx`
- **UI components**: Separated into dedicated components
- **Types**: Centralized in `types.ts`

### 3. **Server Components Priority**
- Most components are server components by default
- Only interactive components use `'use client'`:
  - `wrapped-content.tsx` (data fetching)
  - `slide-controller.tsx` (state management)
  - `navigation/` components (user interactions)
  - `enhanced-mood-slide.tsx` (data fetching)

### 4. **Cleaner Component APIs**
```tsx
// Before: Each slide had duplicate interfaces
interface TopTracksSlideProps {
  data: WrappedData
}

// After: Shared interface
interface SlideProps {
  data: WrappedData
}
```

### 5. **Configurable Shared Components**
```tsx
// FloatingElements now accepts configuration
<FloatingElements elements={floatingElements} />

// BackgroundOrbs accepts orb configurations
<BackgroundOrbs orbs={backgroundOrbs} />

// SlideHeader accepts badge and title configuration
<SlideHeader
  badge={{ icon: Trophy, text: "Your Greatest Hits", iconColor: "text-emerald-400" }}
  title="Your Top Tracks"
  subtitle="The songs that defined your year"
  titleGradient="bg-gradient-to-r from-emerald-200 to-cyan-200"
/>
```

## Usage

```tsx
import { WrappedContent } from '@/components/wrapped'

// Use the main component
<WrappedContent accessToken={accessToken} />

// Or import specific components
import { SlideLayout, SlideHeader } from '@/components/wrapped'
```

## Benefits

1. **Maintainability**: Changes to shared components update all slides
2. **Consistency**: Unified animation patterns and design system
3. **Performance**: Server components where possible
4. **Reusability**: Components can be easily reused in other contexts
5. **Type Safety**: Centralized type definitions
6. **Clean Imports**: Barrel exports in `index.ts`
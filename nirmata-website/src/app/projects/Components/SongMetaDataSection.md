# SongMetaDataSection Component

A unified component that combines Samply iframe player, credits, and release details into a single, cohesive sidebar or standalone section.

## Features

- **Samply Player Integration**: Embedded music player with loading states
- **Collapsible Sections**: Credits and Release Details can be expanded/collapsed
- **Responsive Design**: Works as sidebar on desktop, full-width on mobile
- **Compact Mode**: Tighter spacing for sidebar usage
- **Max Height Control**: Scrollable content when space is limited
- **Smooth Animations**: Elegant transitions and hover effects

## Props

```tsx
interface SongMetaDataSectionProps {
  embedUrl: string;           // Samply embed URL
  credits: CreditItem[];      // Array of credit items
  releaseDetails: ReleaseDetail[]; // Array of release details
  className?: string;         // Additional CSS classes
  compact?: boolean;          // Enable compact mode (default: false)
  maxHeight?: string;         // Max height with scrolling (default: "none")
}
```

## Usage Examples

### Desktop Sidebar
```tsx
<div className="flex gap-8">
  <div className="flex-1">
    <AboutSection {...aboutProps} />
  </div>
  <div className="lg:w-96">
    <SongMetaDataSection 
      embedUrl="https://samply.app/embed/YOUR_EMBED_ID"
      credits={credits}
      releaseDetails={releaseDetails}
      compact={true}
      maxHeight="calc(100vh - 200px)"
    />
  </div>
</div>
```

### Mobile Full-Width
```tsx
<div className="container mx-auto px-4 max-w-2xl">
  <SongMetaDataSection 
    embedUrl="https://samply.app/embed/YOUR_EMBED_ID"
    credits={credits}
    releaseDetails={releaseDetails}
    className="w-full"
  />
</div>
```

### Standalone Section
```tsx
<SongMetaDataSection 
  embedUrl="https://samply.app/embed/YOUR_EMBED_ID"
  credits={credits}
  releaseDetails={releaseDetails}
  className="max-w-4xl mx-auto"
/>
```

## Data Structure

### Credits
```tsx
const credits = [
  {
    title: "Authors",
    content: "Artist Name, Co-writer Name"
  },
  {
    title: "Production",
    content: [
      "Producer: Producer Name",
      "Mix & Master: Engineer Name",
      "Cover Art: Artist Name"
    ]
  }
];
```

### Release Details
```tsx
const releaseDetails = [
  {
    title: "Timeline",
    items: [
      "Written & Recorded: 2024",
      "Release Date: June 6, 2025"
    ]
  },
  {
    title: "Publishing",
    items: [
      "Label: LABEL NAME",
      "Publisher: PUBLISHER NAME",
      "ISRC: XX-XXX-XX-XXXXX"
    ]
  }
];
```

## Styling

The component uses the existing EPK theme:
- `card-epk` for the main container
- `text-epk-cyan` for headers and accents
- `text-epk-gold` for hover states
- Smooth transitions and hover effects
- Responsive spacing and typography

## Accessibility

- Keyboard navigation support
- ARIA labels for interactive elements
- Proper heading hierarchy
- Screen reader friendly content structure

# Flex Living Reviews Dashboard

A comprehensive reviews management system for Flex Living properties, built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

### 1. Manager Dashboard
- **Overview Statistics**: Total reviews, average rating, total properties, and pending approvals
- **Reviews Management Table**: Advanced data table with sorting, filtering, and pagination
- **Real-time Sync**: Sync reviews from Hostaway API with loading states
- **Toast Notifications**: User feedback for all actions (success, error, info, warning)

### 2. Property Performance Cards
- Individual property performance metrics
- Rating breakdowns by category (cleanliness, communication, location, value, amenities)
- Trend indicators (improving, stable, declining)
- Approval and featured review statistics
- Responsive grid layout with hover effects

### 3. Reviews Table Component
- **Sortable Columns**: Property name, guest name, rating, date, channel
- **Star Rating Display**: Visual 5-star rating system
- **Channel Badges**: Color-coded badges for Airbnb (red), Booking.com (blue), VRBO (purple)
- **Approval Toggle**: Quick approve/unapprove reviews
- **Featured Star Button**: Mark reviews as featured
- **Pagination**: 10/25/50 items per page
- **Actions Menu**: View details, delete reviews

### 4. Advanced Filtering
- **Property Filter**: Multi-select dropdown for properties
- **Channel Filter**: Filter by booking platform
- **Rating Range**: Slider to filter by rating (0-10)
- **Status Filters**: Show approved only, featured only, pending only
- **Search**: Search by guest name or review text
- **Sort Options**: Newest, oldest, highest rated, lowest rated, property name A-Z
- **Active Filter Count**: Badge showing number of active filters

### 5. Review Detail Modal
- Full review text with scrollable content
- Guest information with avatar
- Category ratings breakdown
- Channel and submission date
- Manager actions (approve, feature)
- Smooth animations and backdrop blur

### 6. Public Review Display
- Airbnb/Booking.com style review cards
- Guest avatars with initials
- Star ratings and category breakdowns
- Featured review badges
- "Read more" for long reviews
- Filter by rating (All, 5 stars, 4+ stars)
- Sort by recent or highest rated
- Load more functionality

### 7. Property Details Page
- Hero section with property image
- Property overview and amenities
- Location map placeholder
- Integrated reviews section
- Sticky booking card sidebar
- Responsive layout

### 8. Analytics Dashboard
- **Bar Chart**: Average ratings by category
- **Line Chart**: Rating trends over time by property
- **Pie Chart**: Reviews distribution by channel
- **Area Chart**: Review volume over time (approved vs pending)
- Responsive 2x2 grid layout
- Built with Recharts

### 9. Empty States
- No reviews yet
- No matching filters
- No approved reviews
- Loading state with spinner

### 10. Filter Sidebar
- Comprehensive filtering options
- Collapsible sections
- Active filter count badge
- Apply and reset buttons
- Smooth animations

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: lucide-react
- **Charts**: Recharts
- **Notifications**: Radix UI Toast

## Project Structure

\`\`\`
app/
├── page.tsx                    # Main dashboard
├── properties/page.tsx         # Property performance page
├── analytics/page.tsx          # Analytics dashboard
├── property-details/page.tsx   # Public property view
├── demos/page.tsx              # Component demos
├── layout.tsx                  # Root layout with Toaster
└── globals.css                 # Global styles and design tokens

components/
├── dashboard/
│   ├── dashboard-header.tsx    # Header with navigation
│   ├── stats-card.tsx          # Individual stat card
│   └── stats-overview.tsx      # Stats grid
├── reviews/
│   ├── reviews-section.tsx     # Reviews container with filters
│   ├── reviews-table.tsx       # Advanced data table
│   ├── reviews-filters.tsx     # Filter controls
│   ├── star-rating.tsx         # Star rating display
│   └── channel-badge.tsx       # Channel badge component
├── property/
│   ├── property-performance-card.tsx      # Performance card
│   ├── property-performance-grid.tsx      # Performance grid
│   └── property-details-page.tsx          # Property details layout
├── public/
│   ├── public-review-card.tsx             # Public review card
│   └── public-reviews-section.tsx         # Public reviews container
├── charts/
│   └── rating-charts-dashboard.tsx        # Analytics charts
├── modals/
│   └── review-detail-modal.tsx            # Review detail modal
├── filters/
│   └── filter-sidebar.tsx                 # Comprehensive filter sidebar
├── empty-states/
│   └── empty-state.tsx                    # Empty state variants
└── ui/                                    # shadcn/ui components

types/
├── review.ts                   # Review type definitions
└── property.ts                 # Property type definitions

lib/
├── mock-reviews.ts             # Mock review data
└── mock-property-data.ts       # Mock property data
\`\`\`

## Design System

### Colors
- **Primary**: `#284E4C` (Dark Teal/Green)
- **Beige**: `#FFF9E8` (Light Beige)
- **Cream**: `#FFFDF6` (Off-white)
- **Success**: Green (`bg-green-500`)
- **Warning**: Yellow (`bg-yellow-500`)
- **Danger**: Red (`bg-red-500`)

### Typography
- **Headings**: `font-semibold` or `font-bold`
- **Body**: `font-normal`
- **Small text**: `text-sm text-gray-500`

### Spacing
- **Cards**: `p-6 rounded-lg`
- **Gaps**: `gap-4` or `gap-6`
- **Margins**: `mb-4`, `mt-8`

### Effects
- **Shadows**: `shadow-md hover:shadow-lg`
- **Transitions**: `transition-all duration-300`
- **Hover**: `hover:scale-105` or `hover:bg-gray-50`

## Getting Started

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Available Routes

- `/` - Main dashboard with reviews table
- `/properties` - Property performance cards
- `/analytics` - Analytics charts dashboard
- `/property-details` - Public property details page
- `/demos` - Component demos (toasts, empty states, filters)

## API Integration

### Hostaway API

The dashboard is designed to integrate with the Hostaway Reviews API. The API route should be implemented at `/api/reviews/hostaway`.

**Expected Response Format:**
\`\`\`typescript
{
  status: "success",
  result: [
    {
      id: number,
      type: string,
      status: string,
      rating: number | null,
      publicReview: string,
      reviewCategory: Array<{
        category: string,
        rating: number
      }>,
      submittedAt: string,
      guestName: string,
      listingName: string
    }
  ]
}
\`\`\`

### Data Normalization

Reviews should be normalized to match the `Review` type:

\`\`\`typescript
interface Review {
  id: string
  listing_name: string
  guest_name: string
  average_rating: number
  submitted_at: string
  channel: string
  is_approved: boolean
  is_featured: boolean
  public_review: string
}
\`\`\`

## Features to Implement

### Backend Integration
1. Create `/api/reviews/hostaway` endpoint
2. Implement review sync functionality
3. Add database persistence (Supabase/Neon recommended)
4. Implement approval/featured status updates
5. Add authentication for manager dashboard

### Google Reviews Integration
- Explore Google Places API integration
- Fetch and normalize Google reviews
- Display alongside Hostaway reviews

### Additional Features
- Email notifications for new reviews
- Automated response templates
- Review sentiment analysis
- Export reviews to CSV/PDF
- Multi-language support

## Component Usage Examples

### Using the Reviews Table

\`\`\`tsx
import { ReviewsSection } from "@/components/reviews/reviews-section"
import { mockReviews } from "@/lib/mock-reviews"

export default function Page() {
  return (
    <ReviewsSection 
      initialReviews={mockReviews}
      onViewReview={(review) => console.log(review)}
    />
  )
}
\`\`\`

### Using Toast Notifications

\`\`\`tsx
import { useToast } from "@/hooks/use-toast"

export default function Component() {
  const { toast } = useToast()

  const showSuccess = () => {
    toast({
      title: "Success!",
      description: "Review approved successfully",
      variant: "success",
    })
  }

  return <button onClick={showSuccess}>Approve</button>
}
\`\`\`

### Using Property Performance Cards

\`\`\`tsx
import { PropertyPerformanceGrid } from "@/components/property/property-performance-grid"
import { mockProperties } from "@/lib/mock-property-data"

export default function Page() {
  return <PropertyPerformanceGrid properties={mockProperties} />
}
\`\`\`

## Customization

### Changing Colors

Edit `app/globals.css` to customize the color scheme:

\`\`\`css
@theme inline {
  --color-primary: #284E4C;
  --color-background: #FFFDF6;
  --color-foreground: #1a1a1a;
  /* Add more custom colors */
}
\`\`\`

### Adding New Filters

Extend the `ReviewsFilters` component in `components/reviews/reviews-filters.tsx` to add new filter options.

### Custom Charts

Add new charts to `components/charts/rating-charts-dashboard.tsx` using Recharts components.

## Performance Considerations

- Reviews table uses pagination to handle large datasets
- Filters use `useMemo` for efficient re-rendering
- Images use Next.js Image component for optimization
- Components are code-split by route

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - Flex Living

## Support

For questions or issues, contact the development team.

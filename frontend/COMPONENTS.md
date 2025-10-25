# Component Documentation

Detailed documentation for all components in the Flex Living Reviews Dashboard.

## Dashboard Components

### DashboardHeader

Navigation header with sync button and route navigation.

**Props:**
- `onSync?: () => void` - Callback for sync button click

**Features:**
- Active route highlighting
- Sync button with loading state
- Responsive navigation menu

**Usage:**
\`\`\`tsx
<DashboardHeader onSync={handleSync} />
\`\`\`

---

### StatsCard

Individual statistic card with icon and value.

**Props:**
- `title: string` - Card title
- `value: string | number` - Main value to display
- `icon: React.ReactNode` - Icon component
- `trend?: { value: number; isPositive: boolean }` - Optional trend indicator

**Usage:**
\`\`\`tsx
<StatsCard
  title="Total Reviews"
  value={156}
  icon={<MessageSquare />}
/>
\`\`\`

---

### StatsOverview

Grid of statistics cards.

**Props:**
- `stats: { totalReviews: number; averageRating: number; totalProperties: number; pendingApprovals: number }`

**Usage:**
\`\`\`tsx
<StatsOverview stats={stats} />
\`\`\`

---

## Review Components

### ReviewsSection

Complete reviews management section with filters and table.

**Props:**
- `initialReviews: Review[]` - Array of reviews
- `onViewReview?: (review: Review) => void` - Callback for viewing review details

**Features:**
- Integrated filtering
- Search functionality
- State management for reviews

**Usage:**
\`\`\`tsx
<ReviewsSection
  initialReviews={mockReviews}
  onViewReview={handleViewReview}
/>
\`\`\`

---

### ReviewsTable

Advanced data table with sorting and pagination.

**Props:**
- `reviews: Review[]` - Filtered reviews to display
- `onApprovalToggle: (id: string, approved: boolean) => void`
- `onFeaturedToggle: (id: string, featured: boolean) => void`
- `onDelete: (id: string) => void`
- `onViewReview?: (review: Review) => void`

**Features:**
- Column sorting with indicators
- Pagination (10/25/50 per page)
- Approval and featured toggles
- Actions dropdown menu
- Empty state

**Usage:**
\`\`\`tsx
<ReviewsTable
  reviews={filteredReviews}
  onApprovalToggle={handleApproval}
  onFeaturedToggle={handleFeatured}
  onDelete={handleDelete}
  onViewReview={handleView}
/>
\`\`\`

---

### ReviewsFilters

Filter controls for reviews.

**Props:**
- `searchQuery: string`
- `onSearchChange: (query: string) => void`
- `selectedProperty: string`
- `onPropertyChange: (property: string) => void`
- `selectedChannel: string`
- `onChannelChange: (channel: string) => void`
- `minRating: number`
- `onMinRatingChange: (rating: number) => void`
- `showApprovedOnly: boolean`
- `onShowApprovedOnlyChange: (show: boolean) => void`
- `properties: string[]`
- `channels: string[]`
- `onReset: () => void`

**Usage:**
\`\`\`tsx
<ReviewsFilters
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  selectedProperty={selectedProperty}
  onPropertyChange={setSelectedProperty}
  // ... other props
/>
\`\`\`

---

### StarRating

Visual star rating display.

**Props:**
- `rating: number` - Rating value (0-10)
- `maxStars?: number` - Maximum stars (default: 5)

**Usage:**
\`\`\`tsx
<StarRating rating={9.5} />
\`\`\`

---

### ChannelBadge

Colored badge for booking channels.

**Props:**
- `channel: string` - Channel name (airbnb, booking, vrbo, direct)

**Colors:**
- Airbnb: Red (#FF5A5F)
- Booking.com: Blue (#003580)
- VRBO: Purple (#7B68EE)
- Direct: Green (#284E4C)

**Usage:**
\`\`\`tsx
<ChannelBadge channel="airbnb" />
\`\`\`

---

## Property Components

### PropertyPerformanceCard

Individual property performance card.

**Props:**
- `property: PropertyPerformance` - Property data
- `gradientClass: string` - Tailwind gradient class

**Features:**
- Average rating with stars
- Trend indicator
- Category ratings bars
- Approval statistics
- View details button

**Usage:**
\`\`\`tsx
<PropertyPerformanceCard
  property={propertyData}
  gradientClass="bg-gradient-to-br from-blue-100 to-blue-200"
/>
\`\`\`

---

### PropertyPerformanceGrid

Grid of property performance cards.

**Props:**
- `properties: PropertyPerformance[]` - Array of properties

**Features:**
- Responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- Auto-assigned gradient backgrounds
- Hover effects

**Usage:**
\`\`\`tsx
<PropertyPerformanceGrid properties={mockProperties} />
\`\`\`

---

### PropertyDetailsPage

Complete property details page layout.

**Features:**
- Hero section with property info
- Quick stats (bedrooms, bathrooms, guests)
- Amenities list
- Location map placeholder
- Integrated reviews section
- Sticky booking card

**Usage:**
\`\`\`tsx
<PropertyDetailsPage />
\`\`\`

---

## Public Components

### PublicReviewCard

Public-facing review card.

**Props:**
- `review: PublicReview` - Review data

**Features:**
- Guest avatar with initials
- Star rating
- Channel badge
- Featured badge
- Read more/less for long reviews
- Category ratings dots

**Usage:**
\`\`\`tsx
<PublicReviewCard review={reviewData} />
\`\`\`

---

### PublicReviewsSection

Complete public reviews section.

**Props:**
- `reviews: PublicReview[]` - Array of reviews
- `overallRating: number` - Overall property rating
- `totalReviews: number` - Total review count

**Features:**
- Overall rating display
- Filter by rating (All, 5 stars, 4+ stars)
- Sort by recent or highest rated
- Load more functionality
- Responsive grid

**Usage:**
\`\`\`tsx
<PublicReviewsSection
  reviews={publicReviews}
  overallRating={9.5}
  totalReviews={30}
/>
\`\`\`

---

## Chart Components

### RatingChartsDashboard

Analytics dashboard with multiple charts.

**Features:**
- Bar chart: Category ratings
- Line chart: Rating trends over time
- Pie chart: Reviews by channel
- Area chart: Review volume over time

**Usage:**
\`\`\`tsx
<RatingChartsDashboard />
\`\`\`

---

## Modal Components

### ReviewDetailModal

Full review details modal.

**Props:**
- `review: Review | null` - Review to display
- `isOpen: boolean` - Modal open state
- `onClose: () => void` - Close callback
- `onSave?: (reviewId: string, isApproved: boolean, isFeatured: boolean) => void`

**Features:**
- Guest information with avatar
- Full review text (scrollable)
- Category ratings table
- Manager actions (approve, feature)
- Backdrop blur effect
- Smooth animations

**Usage:**
\`\`\`tsx
<ReviewDetailModal
  review={selectedReview}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSave={handleSave}
/>
\`\`\`

---

## Filter Components

### FilterSidebar

Comprehensive filter sidebar.

**Props:**
- `onApplyFilters?: (filters: any) => void`
- `onResetFilters?: () => void`

**Features:**
- Property multi-select
- Channel checkboxes
- Rating range slider
- Status toggles
- Sort dropdown
- Active filter count badge
- Collapsible sections

**Usage:**
\`\`\`tsx
<FilterSidebar
  onApplyFilters={handleApply}
  onResetFilters={handleReset}
/>
\`\`\`

---

## Empty State Components

### EmptyState

Empty state variants for different scenarios.

**Props:**
- `type: "no-reviews" | "no-matches" | "no-approved" | "loading"`
- `onAction?: () => void` - Action button callback

**Variants:**
- `no-reviews`: No reviews yet
- `no-matches`: No matching filters
- `no-approved`: No approved reviews
- `loading`: Loading state with spinner

**Usage:**
\`\`\`tsx
<EmptyState
  type="no-reviews"
  onAction={handleSync}
/>
\`\`\`

---

## Toast Notifications

### useToast Hook

Hook for displaying toast notifications.

**Variants:**
- `success`: Green with checkmark
- `info`: Blue with info icon
- `warning`: Yellow with warning icon
- `destructive`: Red with error icon

**Usage:**
\`\`\`tsx
const { toast } = useToast()

toast({
  title: "Success!",
  description: "Review approved successfully",
  variant: "success",
})
\`\`\`

---

## Type Definitions

### Review
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

### PropertyPerformance
\`\`\`typescript
interface PropertyPerformance {
  property_id: string
  listing_name: string
  average_rating: number
  total_reviews: number
  recent_trend: "improving" | "stable" | "declining"
  ratings_breakdown: {
    cleanliness: number
    communication: number
    location: number
    value: number
    amenities: number
  }
  approved_count: number
  featured_count: number
}
\`\`\`

### PublicReview
\`\`\`typescript
interface PublicReview {
  id: string
  guest_name: string
  submitted_at: string
  rating: number
  public_review: string
  review_categories: ReviewCategory[]
  channel: string
  is_featured: boolean
}

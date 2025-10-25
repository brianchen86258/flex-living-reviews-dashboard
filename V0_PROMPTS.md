# v0.dev Prompts for UI Components

Use these prompts on [v0.dev](https://v0.dev) to generate beautiful UI components, then integrate them with Claude Code.

## How to Use This Document

1. Copy a prompt from below
2. Go to https://v0.dev
3. Paste the prompt
4. Review and customize the generated component
5. Copy the code
6. Ask Claude Code to integrate it into your project

---

## 1. Manager Dashboard - Main Layout

```
Create a modern, professional reviews management dashboard for property managers.

Requirements:
- Top navigation bar with "Flex Living Reviews Dashboard" title and sync button
- Summary statistics cards showing:
  * Total Reviews (number + icon)
  * Average Rating (stars + number)
  * Total Properties (number + icon)
  * Pending Approvals (number + badge)
- Use gradient backgrounds for cards (blue/indigo theme)
- Include hover effects and animations
- Responsive grid layout (4 columns on desktop, 2 on tablet, 1 on mobile)
- Use Tailwind CSS
- Include lucide-react icons (Star, Home, MessageSquare, Clock)
- Add subtle shadows and rounded corners
- Modern, clean design similar to Vercel or Linear

Example stats to display:
- Total Reviews: 156
- Average Rating: 4.7/5.0
- Total Properties: 12
- Pending Approvals: 8
```

---

## 2. Reviews Table Component

```
Create an advanced data table for displaying and managing property reviews.

Features needed:
- Columns: Property Name, Guest Name, Rating (stars), Date, Channel, Status, Actions
- Star rating display (filled/empty stars based on rating)
- Channel badges (Airbnb in red, Booking.com in blue, custom styling)
- Approval toggle switch or checkbox for each review
- Featured star button (outline/filled based on status)
- Sort by any column (with sort indicators)
- Filter controls above table:
  * Property dropdown
  * Channel dropdown
  * Rating range slider (1-10)
  * Approval status toggle
  * Search bar for guest name/review text
- Pagination (10/25/50 per page)
- Hover effects on rows
- Responsive (stack on mobile)
- Use Tailwind CSS and shadcn/ui components
- Empty state when no reviews match filters

Use this data structure:
{
  id: string,
  listing_name: string,
  guest_name: string,
  average_rating: number,
  submitted_at: string,
  channel: string,
  is_approved: boolean,
  is_featured: boolean,
  public_review: string
}
```

---

## 3. Property Performance Cards

```
Create property performance cards for the dashboard overview.

Each card should show:
- Property name (prominent header)
- Average rating (large number with stars)
- Total reviews count
- Trend indicator with emoji (📈 improving, ➡️ stable, 📉 declining)
- Category ratings mini-bars:
  * Cleanliness
  * Communication
  * Location
  * Value
  * Amenities
- Approval stats: "24/30 approved, 3 featured"
- "View Details" button
- Gradient background (different colors per card)
- Hover effect that lifts the card with shadow
- Responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- Use Tailwind CSS

Example card data:
{
  property_id: "2B-N1-A",
  listing_name: "29 Shoreditch Heights",
  average_rating: 9.2,
  total_reviews: 30,
  recent_trend: "improving",
  ratings_breakdown: {
    cleanliness: 9.5,
    communication: 10.0,
    location: 9.8,
    value: 8.5,
    amenities: 9.0
  },
  approved_count: 24,
  featured_count: 3
}
```

---

## 4. Public Review Display Component

```
Create a public-facing review display component matching Airbnb/Booking.com style.

Requirements:
- Header showing overall rating and total reviews
- Grid of individual review cards (2 columns desktop, 1 mobile)
- Each review card includes:
  * Guest name and profile picture placeholder (colored circle with initials)
  * Date of stay (e.g., "January 2024")
  * Star rating (filled stars)
  * Review text (with "Read more" if long)
  * Category ratings as small progress bars or dots
  * Channel badge (Airbnb/Booking.com logo or text badge)
- "Featured Review" badge for featured reviews
- Smooth animations on scroll
- Load more button or infinite scroll
- Filter by rating (All, 5 stars, 4+ stars, etc.)
- Sort by (Most recent, Highest rated, Most helpful)
- Use Tailwind CSS with modern, clean design
- Light color scheme

Example review:
{
  guest_name: "Sarah Johnson",
  submitted_at: "2024-01-15",
  rating: 10,
  public_review: "Amazing property in the heart of Shoreditch! Clean, modern, and perfectly located...",
  review_categories: [
    {category: "cleanliness", rating: 10},
    {category: "communication", rating: 10},
    {category: "location", rating: 10}
  ],
  channel: "airbnb",
  is_featured: true
}
```

---

## 5. Rating Charts Dashboard

```
Create a charts dashboard showing review analytics using Recharts.

Include these charts:
1. Bar Chart - Average ratings by category
   - Categories: Cleanliness, Communication, Location, Value, Amenities
   - Y-axis: Rating (0-10)
   - Gradient blue bars
   - Tooltip showing exact values

2. Line Chart - Rating trends over time
   - X-axis: Months
   - Y-axis: Average rating
   - Smooth curve line
   - Dots on data points
   - Different colored lines for each property

3. Pie/Donut Chart - Reviews by channel
   - Airbnb (red)
   - Booking.com (blue)
   - Direct (green)
   - Show percentage labels

4. Area Chart - Review volume over time
   - Stacked areas for approved/pending reviews
   - Gradient fill

- Responsive grid layout (2x2 on desktop, stack on mobile)
- Card containers for each chart with title and description
- Use Tailwind CSS for styling
- Modern color scheme (blues/purples)
- Include chart legends and axis labels
```

---

## 6. Review Detail Modal

```
Create a modal/dialog for viewing full review details.

Contents:
- Large header with property name
- Guest information:
  * Name
  * Profile picture placeholder
  * Member since date (can be mock)
- Review metadata:
  * Submission date
  * Channel badge
  * Overall rating (large stars)
- Full review text (scrollable if long)
- Category ratings table:
  * Category name | Rating bar | Number
- Manager actions section:
  * Toggle: "Approve for public display"
  * Toggle: "Feature this review"
  * Save button
- Close button (X in top right)
- Backdrop blur effect
- Smooth open/close animation
- Responsive (full screen on mobile)
- Use Tailwind CSS and shadcn/ui Dialog component

The modal should feel premium and easy to use.
```

---

## 7. Property Details Page Layout

```
Create a property details page matching Flex Living/Airbnb style.

Structure:
1. Hero section:
   - Large property image gallery (placeholder images ok)
   - Property name and location
   - Quick stats (bedrooms, bathrooms, guests)

2. Property overview section:
   - Description
   - Amenities list with icons
   - Location map placeholder

3. Reviews section (this is where approved reviews go):
   - Overall rating summary
   - Rating breakdown bars
   - Individual reviews grid
   - "Show all reviews" button

4. Booking card (sticky sidebar on desktop):
   - Price per night
   - Dates selector (mock)
   - Book button

- Clean, modern design
- Responsive layout
- Use Tailwind CSS
- Include smooth scroll to reviews section
- Professional photography placeholder (use gradient backgrounds)

Focus on making the reviews section prominent and well-designed.
```

---

## 8. Filter Sidebar Component

```
Create a comprehensive filter sidebar for the manager dashboard.

Filters needed:
- Property multi-select dropdown
  * "All Properties" option
  * Individual properties with checkboxes
  * Search within properties

- Rating range slider
  * Min and max handles
  * Display selected range (e.g., "7.0 - 10.0")

- Channel checkboxes
  * Airbnb
  * Booking.com
  * Direct
  * Other
  * "Select all" option

- Date range picker
  * From and To date inputs
  * Quick presets (Last 7 days, Last month, Last 3 months, All time)

- Status toggles
  * Show approved only
  * Show featured only
  * Show pending only

- Sort dropdown
  * Newest first
  * Oldest first
  * Highest rated
  * Lowest rated
  * Property name A-Z

- Apply and Reset buttons at bottom
- Active filter count badge at top
- Collapsible sections for mobile
- Smooth animations
- Use Tailwind CSS and shadcn/ui components
```

---

## 9. Empty States Components

```
Create beautiful empty state components for different scenarios.

1. No reviews yet:
   - Large icon (inbox or message)
   - Heading: "No reviews yet"
   - Description: "Reviews will appear here once guests leave feedback"
   - "Sync Reviews" button

2. No matching filters:
   - Magnifying glass icon
   - Heading: "No reviews match your filters"
   - Description: "Try adjusting your filters or search terms"
   - "Clear filters" button

3. No approved reviews:
   - Checkmark icon
   - Heading: "No approved reviews"
   - Description: "Approve reviews from the manager dashboard to display them here"
   - "Go to dashboard" button

4. Loading state:
   - Animated spinner or skeleton cards
   - "Loading reviews..." text

- Center-aligned content
- Subtle colors (grays)
- Generous padding
- Use lucide-react icons
- Tailwind CSS styling
- Friendly, helpful tone
```

---

## 10. Sync Status Toast/Notification

```
Create toast notifications for various actions.

Types needed:
1. Success - Review approved
   - Green checkmark icon
   - "Review approved successfully"
   - Auto-dismiss after 3s

2. Success - Reviews synced
   - Blue sync icon
   - "Synced 5 new reviews from Hostaway"
   - Auto-dismiss after 4s

3. Error - Sync failed
   - Red X icon
   - "Failed to sync reviews. Please try again."
   - Manual dismiss

4. Info - No new reviews
   - Blue info icon
   - "No new reviews to sync"
   - Auto-dismiss after 3s

5. Warning - Unsaved changes
   - Yellow warning icon
   - "You have unsaved changes"
   - Action buttons: "Save" and "Discard"

- Position: Top-right corner
- Slide-in animation
- Progress bar for auto-dismiss
- Stack multiple toasts
- Use Tailwind CSS and shadcn/ui Toast component
- Include close button (X)
```

---

## Integration Tips

After generating components with v0.dev:

1. **Copy the component code** from v0.dev

2. **Ask Claude Code**:
   ```
   I have a component from v0.dev for the reviews table.
   Please:
   - Save it to frontend/components/ReviewsTable.tsx
   - Connect it to our API at /api/reviews
   - Use React Query for data fetching
   - Add proper TypeScript types from lib/types.ts
   - Handle loading and error states
   - Add the route in app/dashboard/page.tsx
   ```

3. **Test the integration**:
   - Start both servers
   - Navigate to the page
   - Verify API calls in Network tab
   - Test all interactions

4. **Iterate**:
   - Ask Claude Code to fix any issues
   - Adjust styling or behavior
   - Add additional features

---

## Design System Consistency

When generating multiple components, maintain consistency:

**Colors:**
- Primary: Blue/Indigo (bg-blue-500, bg-indigo-600)
- Success: Green (bg-green-500)
- Warning: Yellow (bg-yellow-500)
- Danger: Red (bg-red-500)
- Neutral: Gray (bg-gray-100, text-gray-600)

**Typography:**
- Headings: font-semibold or font-bold
- Body: font-normal
- Small text: text-sm text-gray-500

**Spacing:**
- Cards: p-6 rounded-lg
- Gaps: gap-4 or gap-6
- Margins: mb-4, mt-8

**Effects:**
- Shadows: shadow-md hover:shadow-lg
- Transitions: transition-all duration-300
- Hover: hover:scale-105 or hover:bg-gray-50

**Icons:**
- Use lucide-react for all icons
- Size: w-5 h-5 for inline, w-8 h-8 for large

This ensures all components look like they belong together!

---

Good luck building! 🚀

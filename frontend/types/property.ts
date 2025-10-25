export interface PropertyPerformance {
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

export interface ReviewCategory {
  category: string
  rating: number
}

export interface PublicReview {
  id: string
  guest_name: string
  submitted_at: string
  rating: number
  public_review: string
  review_categories: ReviewCategory[]
  channel: string
  is_featured: boolean
}

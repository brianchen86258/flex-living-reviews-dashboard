export interface ReviewCategory {
  category: string
  rating: number
}

export interface Review {
  id: string
  listing_name: string
  guest_name: string
  average_rating: number
  rating?: number  // Overall rating from backend
  submitted_at: string
  channel: string
  is_approved: boolean
  is_featured: boolean
  public_review: string
  review_categories?: ReviewCategory[]  // Category breakdown from backend
}

export interface ReviewResponse {
  data: Review[]
  total: number
}

export interface DashboardStats {
  total_reviews: number
  average_rating: number
  total_properties: number
  pending_approvals: number
  properties: any[]
}

export type SortField = "listing_name" | "guest_name" | "average_rating" | "submitted_at" | "channel"
export type SortDirection = "asc" | "desc"

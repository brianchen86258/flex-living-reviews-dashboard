"use client"

import { useState, useMemo, useEffect } from "react"
import type { Review } from "@/types/review"
import { ReviewsFilters } from "./reviews-filters"
import { ReviewsTable } from "./reviews-table"
import { useUpdateReview } from "@/hooks/use-reviews"
import { toast } from "sonner"

interface ReviewsSectionProps {
  initialReviews: Review[]
  onViewReview?: (review: Review) => void
}

export function ReviewsSection({ initialReviews, onViewReview }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const updateReviewMutation = useUpdateReview()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProperty, setSelectedProperty] = useState("all")
  const [selectedChannel, setSelectedChannel] = useState("all")
  const [minRating, setMinRating] = useState(0)
  const [showApprovedOnly, setShowApprovedOnly] = useState(false)

  // Extract unique properties and channels
  const properties = useMemo(() => Array.from(new Set(reviews.map((r) => r.listing_name))).sort(), [reviews])
  const channels = useMemo(() => Array.from(new Set(reviews.map((r) => r.channel))).sort(), [reviews])

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          review.guest_name.toLowerCase().includes(query) || review.public_review.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Property filter
      if (selectedProperty !== "all" && review.listing_name !== selectedProperty) {
        return false
      }

      // Channel filter
      if (selectedChannel !== "all" && review.channel !== selectedChannel) {
        return false
      }

      // Rating filter
      if (minRating > 0 && review.average_rating < minRating) {
        return false
      }

      // Approval filter
      if (showApprovedOnly && !review.is_approved) {
        return false
      }

      return true
    })
  }, [reviews, searchQuery, selectedProperty, selectedChannel, minRating, showApprovedOnly])

  // Sync local state when initialReviews changes
  useEffect(() => {
    setReviews(initialReviews)
  }, [initialReviews])

  const handleApprovalToggle = async (id: string, approved: boolean) => {
    // Optimistically update UI
    setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, is_approved: approved } : review)))

    try {
      // Call API to persist change
      await updateReviewMutation.mutateAsync({
        reviewId: id,
        data: { is_approved: approved },
      })
      toast.success(`Review ${approved ? 'approved' : 'unapproved'} successfully`)
    } catch (error) {
      // Revert on error
      setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, is_approved: !approved } : review)))
      toast.error('Failed to update review')
    }
  }

  const handleFeaturedToggle = async (id: string, featured: boolean) => {
    // Optimistically update UI
    setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, is_featured: featured } : review)))

    try {
      // Call API to persist change
      await updateReviewMutation.mutateAsync({
        reviewId: id,
        data: { is_featured: featured },
      })
      toast.success(`Review ${featured ? 'featured' : 'unfeatured'} successfully`)
    } catch (error) {
      // Revert on error
      setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, is_featured: !featured } : review)))
      toast.error('Failed to update review')
    }
  }

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id))
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedProperty("all")
    setSelectedChannel("all")
    setMinRating(0)
    setShowApprovedOnly(false)
  }

  return (
    <div className="space-y-6">
      <ReviewsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedProperty={selectedProperty}
        onPropertyChange={setSelectedProperty}
        selectedChannel={selectedChannel}
        onChannelChange={setSelectedChannel}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        showApprovedOnly={showApprovedOnly}
        onShowApprovedOnlyChange={setShowApprovedOnly}
        properties={properties}
        channels={channels}
        onReset={handleReset}
      />

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Reviews ({filteredReviews.length})</h3>
      </div>

      <ReviewsTable
        reviews={filteredReviews}
        onApprovalToggle={handleApprovalToggle}
        onFeaturedToggle={handleFeaturedToggle}
        onDelete={handleDelete}
        onViewReview={onViewReview}
      />
    </div>
  )
}

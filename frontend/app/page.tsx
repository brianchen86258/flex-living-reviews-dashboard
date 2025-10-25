"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { ReviewsSection } from "@/components/reviews/reviews-section"
import { useState } from "react"
import { ReviewDetailModal } from "@/components/modals/review-detail-modal"
import type { Review } from "@/types/review"
import { useReviews, useDashboardStats, useUpdateReview, useSyncReviews } from "@/hooks/use-reviews"
import { toast as sonnerToast } from "sonner"

export default function DashboardPage() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch data from backend
  const { data: reviewsData, isLoading: reviewsLoading, refetch: refetchReviews } = useReviews()
  const { data: statsData, isLoading: statsLoading } = useDashboardStats()

  // Mutations
  const updateReviewMutation = useUpdateReview()
  const syncReviewsMutation = useSyncReviews()

  // Calculate stats from backend data
  const stats = {
    totalReviews: reviewsData?.total || 0,
    averageRating: statsData?.average_rating || 0,
    totalProperties: statsData?.total_properties || 0,
    pendingApprovals: reviewsData?.data?.filter((r: Review) => !r.is_approved).length || 0,
  }

  const handleSync = async () => {
    sonnerToast.info("Syncing reviews...", {
      description: "Fetching latest reviews from Hostaway"
    })

    try {
      const result = await syncReviewsMutation.mutateAsync()
      sonnerToast.success("Reviews synced successfully", {
        description: result.message || `Synced ${result.total_synced || 0} new reviews`
      })
      refetchReviews()
    } catch (error) {
      sonnerToast.error("Failed to sync reviews", {
        description: "Please try again later"
      })
    }
  }

  const handleViewReview = (review: Review) => {
    setSelectedReview(review)
    setIsModalOpen(true)
  }

  const handleSaveReview = async (reviewId: string, isApproved: boolean, isFeatured: boolean) => {
    try {
      await updateReviewMutation.mutateAsync({
        reviewId,
        data: { is_approved: isApproved, is_featured: isFeatured }
      })

      sonnerToast.success("Review updated", {
        description: "Review settings have been saved successfully"
      })

      setIsModalOpen(false)
    } catch (error) {
      sonnerToast.error("Failed to update review", {
        description: "Please try again"
      })
    }
  }

  const isLoading = reviewsLoading || statsLoading

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onSync={handleSync} />
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-6">Overview</h2>
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <StatsOverview stats={stats} />
            )}
          </div>

          <div>
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-12 w-64 rounded-lg bg-muted animate-pulse" />
                <div className="h-96 rounded-lg bg-muted animate-pulse" />
              </div>
            ) : reviewsData?.data && reviewsData.data.length > 0 ? (
              <ReviewsSection
                initialReviews={reviewsData.data}
                onViewReview={handleViewReview}
              />
            ) : (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <div className="mx-auto max-w-md space-y-4">
                  <h3 className="text-xl font-semibold">No reviews found</h3>
                  <p className="text-muted-foreground">
                    Click "Sync Reviews" to fetch reviews from Hostaway
                  </p>
                  <button
                    onClick={handleSync}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Sync Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <ReviewDetailModal
        review={selectedReview}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReview}
      />
    </div>
  )
}

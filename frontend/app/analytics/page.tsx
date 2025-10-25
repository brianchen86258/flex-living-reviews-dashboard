"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RatingChartsDashboard } from "@/components/charts/rating-charts-dashboard"
import { useReviews, useDashboardStats, useSyncReviews } from "@/hooks/use-reviews"
import { toast } from "sonner"

export default function AnalyticsPage() {
  const { data: reviewsData, isLoading: reviewsLoading } = useReviews()
  const { data: statsData, isLoading: statsLoading } = useDashboardStats()
  const syncReviewsMutation = useSyncReviews()

  const handleSync = async () => {
    toast.info("Syncing reviews...", {
      description: "Fetching latest reviews from Hostaway"
    })

    try {
      const result = await syncReviewsMutation.mutateAsync()
      toast.success("Reviews synced successfully", {
        description: result.message || `Synced ${result.total_synced || 0} new reviews`
      })
    } catch (error) {
      toast.error("Failed to sync reviews", {
        description: "Please try again later"
      })
    }
  }

  const isLoading = reviewsLoading || statsLoading

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onSync={handleSync} />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Visualize review trends and performance metrics</p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <RatingChartsDashboard
            reviews={reviewsData?.data || []}
            properties={statsData?.properties || []}
          />
        )}
      </main>
    </div>
  )
}

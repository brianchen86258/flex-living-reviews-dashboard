"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PropertyPerformanceGrid } from "@/components/property/property-performance-grid"
import { useDashboardStats, useSyncReviews } from "@/hooks/use-reviews"
import { toast } from "sonner"
import type { PropertyPerformance } from "@/types/property"

export default function PropertiesPage() {
  const { data: statsData, isLoading } = useDashboardStats()
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

  // Convert backend stats to component format
  const properties: PropertyPerformance[] = statsData?.properties || []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onSync={handleSync} />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Performance</h1>
          <p className="text-gray-600">Monitor how each property is performing based on guest reviews</p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <PropertyPerformanceGrid properties={properties} />
        ) : (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <div className="mx-auto max-w-md space-y-4">
              <h3 className="text-xl font-semibold">No property data found</h3>
              <p className="text-muted-foreground">
                Sync reviews to see property performance metrics
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
      </main>
    </div>
  )
}

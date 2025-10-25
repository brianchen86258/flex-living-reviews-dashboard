"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { EmptyState } from "@/components/empty-states/empty-state"
import { FilterSidebar } from "@/components/filters/filter-sidebar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, RefreshCw, Info, AlertCircle } from "lucide-react"

export default function DemosPage() {
  const { toast } = useToast()

  const handleSync = async () => {
    console.log("Syncing reviews...")
  }

  const showSuccessToast = () => {
    toast({
      title: "Review approved successfully",
      description: "The review is now visible on the public website",
      variant: "success",
    })
  }

  const showSyncToast = () => {
    toast({
      title: "Synced 5 new reviews from Hostaway",
      description: "Your reviews are now up to date",
      variant: "info",
    })
  }

  const showErrorToast = () => {
    toast({
      title: "Failed to sync reviews",
      description: "Please try again or check your connection",
      variant: "destructive",
    })
  }

  const showWarningToast = () => {
    toast({
      title: "You have unsaved changes",
      description: "Please save or discard your changes before leaving",
      variant: "warning",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onSync={handleSync} />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Component Demos</h1>
          <p className="text-gray-600">Preview all the components and features</p>
        </div>

        <div className="space-y-12">
          {/* Toast Notifications Demo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Toast Notifications</h2>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex flex-wrap gap-3">
                <Button onClick={showSuccessToast} className="bg-green-500 hover:bg-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Success Toast
                </Button>
                <Button onClick={showSyncToast} className="bg-blue-500 hover:bg-blue-600">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Toast
                </Button>
                <Button onClick={showErrorToast} className="bg-red-500 hover:bg-red-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Error Toast
                </Button>
                <Button onClick={showWarningToast} className="bg-yellow-500 hover:bg-yellow-600">
                  <Info className="w-4 h-4 mr-2" />
                  Warning Toast
                </Button>
              </div>
            </div>
          </section>

          {/* Empty States Demo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Empty States</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md">
                <EmptyState type="no-reviews" onAction={() => console.log("Sync clicked")} />
              </div>
              <div className="bg-white rounded-lg shadow-md">
                <EmptyState type="no-matches" onAction={() => console.log("Clear filters")} />
              </div>
              <div className="bg-white rounded-lg shadow-md">
                <EmptyState type="no-approved" onAction={() => console.log("Go to dashboard")} />
              </div>
              <div className="bg-white rounded-lg shadow-md">
                <EmptyState type="loading" />
              </div>
            </div>
          </section>

          {/* Filter Sidebar Demo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Filter Sidebar</h2>
            <div className="max-w-md">
              <FilterSidebar
                onApplyFilters={(filters) => console.log("Filters applied:", filters)}
                onResetFilters={() => console.log("Filters reset")}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Inbox, Search, CheckCircle, Loader2 } from "lucide-react"

type EmptyStateType = "no-reviews" | "no-matches" | "no-approved" | "loading"

interface EmptyStateProps {
  type: EmptyStateType
  onAction?: () => void
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const configs = {
    "no-reviews": {
      icon: Inbox,
      title: "No reviews yet",
      description: "Reviews will appear here once guests leave feedback",
      actionLabel: "Sync Reviews",
    },
    "no-matches": {
      icon: Search,
      title: "No reviews match your filters",
      description: "Try adjusting your filters or search terms",
      actionLabel: "Clear filters",
    },
    "no-approved": {
      icon: CheckCircle,
      title: "No approved reviews",
      description: "Approve reviews from the manager dashboard to display them here",
      actionLabel: "Go to dashboard",
    },
    loading: {
      icon: Loader2,
      title: "Loading reviews...",
      description: "Please wait while we fetch your reviews",
      actionLabel: null,
    },
  }

  const config = configs[type]
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="bg-gray-100 rounded-full p-6 mb-6">
        <Icon className={`w-12 h-12 text-gray-400 ${type === "loading" ? "animate-spin" : ""}`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{config.title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{config.description}</p>
      {config.actionLabel && (
        <Button onClick={onAction} className="bg-[#284E4C] hover:bg-[#1f3d3b] text-white">
          {config.actionLabel}
        </Button>
      )}
    </div>
  )
}

"use client"

import { Star, Home, MessageSquare, Clock } from "lucide-react"
import { StatsCard } from "./stats-card"

interface StatsOverviewProps {
  stats: {
    totalReviews: number
    averageRating: number
    totalProperties: number
    pendingApprovals: number
  }
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Reviews"
        value={stats.totalReviews}
        icon={MessageSquare}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Average Rating"
        value={stats.averageRating.toFixed(1)}
        subtitle="/ 10.0"
        icon={Star}
        trend={{ value: 3, isPositive: true }}
      />
      <StatsCard title="Total Properties" value={stats.totalProperties} icon={Home} />
      <StatsCard title="Pending Approvals" value={stats.pendingApprovals} icon={Clock} />
    </div>
  )
}

"use client"

import type { PublicReview } from "@/types/property"
import { PublicReviewCard } from "./public-review-card"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface PublicReviewsSectionProps {
  reviews: PublicReview[]
  overallRating: number
  totalReviews: number
}

export function PublicReviewsSection({ reviews, overallRating, totalReviews }: PublicReviewsSectionProps) {
  const [filter, setFilter] = useState<"all" | "5" | "4+">("all")
  const [sortBy, setSortBy] = useState<"recent" | "highest">("recent")
  const [displayCount, setDisplayCount] = useState(6)

  const filteredReviews = reviews
    .filter((review) => {
      if (filter === "5") return review.rating >= 9
      if (filter === "4+") return review.rating >= 8
      return true
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
      }
      return b.rating - a.rating
    })

  const displayedReviews = filteredReviews.slice(0, displayCount)

  return (
    <div className="py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            <span className="text-4xl font-bold text-gray-900">{overallRating.toFixed(1)}</span>
            <span className="text-xl text-gray-600">/ 10</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{totalReviews} reviews</p>
            <div className="flex items-center gap-0.5">
              {[...Array(10)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.round(overallRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-[#284E4C] hover:bg-[#1f3d3b]" : ""}
            >
              All
            </Button>
            <Button
              variant={filter === "5" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("5")}
              className={filter === "5" ? "bg-[#284E4C] hover:bg-[#1f3d3b]" : ""}
            >
              9+ rating
            </Button>
            <Button
              variant={filter === "4+" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("4+")}
              className={filter === "4+" ? "bg-[#284E4C] hover:bg-[#1f3d3b]" : ""}
            >
              8+ rating
            </Button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "highest")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#284E4C]"
          >
            <option value="recent">Most recent</option>
            <option value="highest">Highest rated</option>
          </select>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {displayedReviews.map((review) => (
          <PublicReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Load More */}
      {displayCount < filteredReviews.length && (
        <div className="text-center">
          <Button
            onClick={() => setDisplayCount((prev) => prev + 6)}
            variant="outline"
            className="border-[#284E4C] text-[#284E4C] hover:bg-[#284E4C] hover:text-white"
          >
            Load more reviews
          </Button>
        </div>
      )}
    </div>
  )
}

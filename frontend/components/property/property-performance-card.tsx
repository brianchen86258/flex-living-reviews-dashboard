"use client"

import { useState } from "react"
import type { PropertyPerformance } from "@/types/property"
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyDetailsModal } from "@/components/modals/property-details-modal"

interface PropertyPerformanceCardProps {
  property: PropertyPerformance
  gradientClass: string
}

export function PropertyPerformanceCard({ property, gradientClass }: PropertyPerformanceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const getTrendIcon = () => {
    switch (property.recent_trend) {
      case "improving":
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "declining":
        return <TrendingDown className="w-5 h-5 text-red-600" />
      default:
        return <Minus className="w-5 h-5 text-gray-600" />
    }
  }

  const getTrendText = () => {
    switch (property.recent_trend) {
      case "improving":
        return "Improving"
      case "declining":
        return "Declining"
      default:
        return "Stable"
    }
  }

  return (
    <div
      className={`${gradientClass} rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{property.listing_name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-gray-900">{property.average_rating.toFixed(1)}</span>
          <span className="text-sm text-gray-600">/ 10</span>
          <div className="flex items-center gap-0.5">
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(property.average_rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{property.total_reviews} reviews</p>
      </div>

      {/* Trend Indicator */}
      <div className="flex items-center gap-2 mb-4 bg-white/50 rounded-md p-2">
        {getTrendIcon()}
        <span className="text-sm font-medium text-gray-700">{getTrendText()}</span>
      </div>

      {/* Category Ratings */}
      <div className="space-y-3 mb-4">
        {Object.entries(property.ratings_breakdown).map(([category, rating]) => (
          <div key={category}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700 capitalize">{category}</span>
              <span className="font-medium text-gray-900">{rating.toFixed(1)}</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2">
              <div
                className="bg-[#284E4C] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(rating / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Approval Stats */}
      <div className="bg-white/50 rounded-md p-3 mb-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">{property.approved_count}</span> / {property.total_reviews}{" "}
          approved, <span className="font-semibold text-gray-900">{property.featured_count}</span> featured
        </p>
      </div>

      {/* View Details Button */}
      <Button
        className="w-full bg-[#284E4C] hover:bg-[#1f3d3b] text-white transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        View Details
      </Button>

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={property}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

"use client"

import type { PublicReview } from "@/types/property"
import { Star } from "lucide-react"
import { ChannelBadge } from "@/components/reviews/channel-badge"
import { useState } from "react"

interface PublicReviewCardProps {
  review: PublicReview
}

export function PublicReviewCard({ review }: PublicReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const maxLength = 200
  const shouldTruncate = review.public_review.length > maxLength

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const getAvatarColor = (name: string) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-teal-500"]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      {/* Featured Badge */}
      {review.is_featured && (
        <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          Featured Review
        </div>
      )}

      {/* Guest Info */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`${getAvatarColor(review.guest_name)} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
        >
          {getInitials(review.guest_name)}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{review.guest_name}</h4>
          <p className="text-sm text-gray-500">{formatDate(review.submitted_at)}</p>
        </div>
        <ChannelBadge channel={review.channel} />
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(10)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < Math.round(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm font-medium text-gray-700 ml-1">{review.rating.toFixed(1)} / 10</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 leading-relaxed mb-4">
        {shouldTruncate && !isExpanded ? `${review.public_review.slice(0, maxLength)}...` : review.public_review}
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#284E4C] font-medium ml-2 hover:underline"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      {/* Category Ratings */}
      {review.review_categories.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
          {review.review_categories.map((cat) => (
            <div key={cat.category} className="flex items-center gap-2">
              <span className="text-xs text-gray-600 capitalize">{cat.category}</span>
              <div className="flex gap-0.5">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i < Math.round(cat.rating) ? "bg-[#284E4C]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">{cat.rating.toFixed(1)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

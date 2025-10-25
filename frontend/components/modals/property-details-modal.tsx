"use client"

import { PropertyPerformance } from "@/types/property"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, TrendingDown, Minus, ThumbsUp, Award, MessageSquare } from "lucide-react"
import { useReviews } from "@/hooks/use-reviews"
import { ChannelBadge } from "@/components/reviews/channel-badge"

interface PropertyDetailsModalProps {
  property: PropertyPerformance | null
  isOpen: boolean
  onClose: () => void
}

export function PropertyDetailsModal({
  property,
  isOpen,
  onClose,
}: PropertyDetailsModalProps) {
  const { data: reviewsData, isLoading: reviewsLoading } = useReviews(
    property ? { property_id: property.property_id } : undefined
  )

  if (!property) return null

  const getTrendIcon = () => {
    switch (property.recent_trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
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

  const getTrendColor = () => {
    switch (property.recent_trend) {
      case "improving":
        return "bg-green-100 text-green-800"
      case "declining":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const ratingCategories = [
    { name: "Cleanliness", value: property.ratings_breakdown.cleanliness },
    { name: "Communication", value: property.ratings_breakdown.communication },
    { name: "Location", value: property.ratings_breakdown.location },
    { name: "Value", value: property.ratings_breakdown.value },
    { name: "Amenities", value: property.ratings_breakdown.amenities },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#284E4C]">
            {property.listing_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Rating Section */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#284E4C]/10 to-[#284E4C]/5 rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span className="text-3xl font-bold text-[#284E4C]">
                  {property.average_rating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Based on {property.total_reviews} review{property.total_reviews !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {getTrendIcon()}
              <Badge className={getTrendColor()}>
                {getTrendText()}
              </Badge>
            </div>
          </div>

          {/* Property ID */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
              Property ID
            </h3>
            <p className="text-gray-900 font-mono">{property.property_id}</p>
          </div>

          {/* Rating Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-[#284E4C] mb-4">
              Rating Breakdown
            </h3>
            <div className="space-y-3">
              {ratingCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {category.name}
                    </span>
                    <span className="text-sm font-semibold text-[#284E4C]">
                      {category.value.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#284E4C] h-2 rounded-full transition-all"
                      style={{ width: `${(category.value / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <ThumbsUp className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Approved Reviews</h4>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {property.approved_count}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                {property.total_reviews > 0
                  ? `${((property.approved_count / property.total_reviews) * 100).toFixed(0)}% of total`
                  : 'No reviews yet'}
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-amber-600" />
                <h4 className="font-semibold text-amber-900">Featured Reviews</h4>
              </div>
              <p className="text-3xl font-bold text-amber-600">
                {property.featured_count}
              </p>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-[#284E4C] mb-2">
              Performance Summary
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Overall Performance:</span>{" "}
                {property.average_rating >= 9
                  ? "Excellent - This property is performing exceptionally well"
                  : property.average_rating >= 8
                  ? "Very Good - This property is performing well"
                  : property.average_rating >= 7
                  ? "Good - This property has room for improvement"
                  : "Needs Attention - Consider reviewing guest feedback"}
              </p>
              <p>
                <span className="font-medium">Recent Trend:</span>{" "}
                {property.recent_trend === "improving"
                  ? "Ratings are improving over time. Keep up the good work!"
                  : property.recent_trend === "declining"
                  ? "Ratings are declining. Review recent feedback to identify issues."
                  : "Ratings are consistent. Monitor for any changes."}
              </p>
              {property.ratings_breakdown.cleanliness < 8 && (
                <p className="text-amber-700">
                  <span className="font-medium">Note:</span> Cleanliness rating is below 8.
                  Consider enhancing cleaning procedures.
                </p>
              )}
              {property.ratings_breakdown.communication < 8 && (
                <p className="text-amber-700">
                  <span className="font-medium">Note:</span> Communication rating is below 8.
                  Consider improving response times and clarity.
                </p>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-[#284E4C]" />
              <h3 className="text-lg font-semibold text-[#284E4C]">
                Guest Reviews
              </h3>
              {reviewsData && (
                <Badge variant="secondary" className="ml-auto">
                  {reviewsData.total} total
                </Badge>
              )}
            </div>

            {reviewsLoading && (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#284E4C] border-r-transparent"></div>
                <p className="mt-2 text-sm text-gray-600">Loading reviews...</p>
              </div>
            )}

            {!reviewsLoading && reviewsData && reviewsData.data.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600">No reviews available for this property yet.</p>
              </div>
            )}

            {!reviewsLoading && reviewsData && reviewsData.data.length > 0 && (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {reviewsData.data.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">
                            {review.guest_name}
                          </span>
                          <ChannelBadge channel={review.channel} />
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(review.submitted_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-gray-900">
                          {review.average_rating?.toFixed(1) || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Review Text */}
                    {review.public_review && (
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                        {review.public_review}
                      </p>
                    )}

                    {/* Status Badges */}
                    <div className="flex items-center gap-2">
                      {review.is_approved && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Approved
                        </Badge>
                      )}
                      {review.is_featured && (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          <Award className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {!review.is_approved && (
                        <Badge variant="outline" className="text-gray-600">
                          Pending Approval
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

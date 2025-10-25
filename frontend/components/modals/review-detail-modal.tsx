"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Review } from "@/types/review"
import { Star } from "lucide-react"
import { ChannelBadge } from "@/components/reviews/channel-badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"

interface ReviewDetailModalProps {
  review: Review | null
  isOpen: boolean
  onClose: () => void
  onSave?: (reviewId: string, isApproved: boolean, isFeatured: boolean) => void
}

export function ReviewDetailModal({ review, isOpen, onClose, onSave }: ReviewDetailModalProps) {
  const [isApproved, setIsApproved] = useState(review?.is_approved ?? false)
  const [isFeatured, setIsFeatured] = useState(review?.is_featured ?? false)

  // Sync state when review changes
  useEffect(() => {
    if (review) {
      setIsApproved(review.is_approved)
      setIsFeatured(review.is_featured)
    }
  }, [review])

  if (!review) return null

  const handleSave = () => {
    if (onSave) {
      onSave(review.id, isApproved, isFeatured)
    }
    onClose()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Mock category ratings
  const categoryRatings = [
    { category: "Cleanliness", rating: review.average_rating },
    { category: "Communication", rating: review.average_rating },
    { category: "Location", rating: review.average_rating - 0.5 },
    { category: "Value", rating: review.average_rating - 1 },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">{review.listing_name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Guest Information */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-xl">
              {getInitials(review.guest_name)}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{review.guest_name}</h3>
              <p className="text-sm text-gray-500">Member since 2020</p>
            </div>
          </div>

          {/* Review Metadata */}
          <div className="flex flex-wrap gap-4 items-center pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Submitted</p>
              <p className="font-medium text-gray-900">{formatDate(review.submitted_at)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Channel</p>
              <ChannelBadge channel={review.channel} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Overall Rating</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(10)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(review.average_rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">{review.average_rating.toFixed(1)} / 10</span>
              </div>
            </div>
          </div>

          {/* Full Review Text */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Review</h4>
            <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
              <p className="text-gray-700 leading-relaxed">{review.public_review}</p>
            </div>
          </div>

          {/* Category Ratings Table */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Category Ratings</h4>
            <div className="space-y-3">
              {categoryRatings.map((cat) => (
                <div key={cat.category} className="flex items-center gap-4">
                  <span className="text-sm text-gray-700 w-32">{cat.category}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#284E4C] h-2 rounded-full transition-all"
                      style={{ width: `${(cat.rating / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{cat.rating.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Manager Actions */}
          <div className="bg-[#FFF9E8] rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Manager Actions</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Approve for public display</p>
                <p className="text-sm text-gray-600">Show this review on the property page</p>
              </div>
              <Switch checked={isApproved} onCheckedChange={setIsApproved} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Feature this review</p>
                <p className="text-sm text-gray-600">Highlight as a featured review</p>
              </div>
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button onClick={handleSave} className="flex-1 bg-[#284E4C] hover:bg-[#1f3d3b] text-white">
              Save Changes
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

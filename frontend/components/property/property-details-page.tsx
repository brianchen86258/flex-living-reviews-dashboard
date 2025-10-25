"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PublicReviewsSection } from "@/components/public/public-reviews-section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Users, Wifi, Tv, Coffee, Wind, MapPin, Loader2, Eye, ArrowLeft } from "lucide-react"
import { useDashboardStats, useReviews } from "@/hooks/use-reviews"
import type { PropertyPerformance, PublicReview } from "@/types/property"
import type { Review } from "@/types/review"

// Convert Review to PublicReview format
function convertToPublicReview(review: Review): PublicReview {
  return {
    id: review.id,
    guest_name: review.guest_name,
    submitted_at: review.submitted_at,
    rating: review.rating || review.average_rating,
    public_review: review.public_review,
    review_categories: review.review_categories || [],
    channel: review.channel,
    is_featured: review.is_featured,
  }
}

export function PropertyDetailsPage() {
  const router = useRouter()
  const { data: statsData, isLoading: statsLoading } = useDashboardStats()
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("")
  const [selectedProperty, setSelectedProperty] = useState<PropertyPerformance | null>(null)

  const { data: reviewsData, isLoading: reviewsLoading } = useReviews(
    selectedPropertyId ? { property_id: selectedPropertyId, is_approved: true } : undefined
  )

  const properties = statsData?.properties || []

  const handleExitPublicView = () => {
    router.push("/")
  }

  // Set initial property when data loads
  useEffect(() => {
    if (properties.length > 0 && !selectedPropertyId) {
      const firstProperty = properties[0]
      setSelectedPropertyId(firstProperty.property_id)
      setSelectedProperty(firstProperty)
    }
  }, [properties, selectedPropertyId])

  // Update selected property when property changes
  useEffect(() => {
    if (selectedPropertyId) {
      const property = properties.find((p) => p.property_id === selectedPropertyId)
      setSelectedProperty(property || null)
    }
  }, [selectedPropertyId, properties])

  const handlePropertyChange = (propertyId: string) => {
    setSelectedPropertyId(propertyId)
  }

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-[#FFFDF6] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#284E4C] mx-auto mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF6] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Properties Available</h2>
          <p className="text-gray-600">Please sync reviews from the dashboard to see property data.</p>
        </div>
      </div>
    )
  }

  const reviews: PublicReview[] = (reviewsData?.data || []).map(convertToPublicReview)
  const totalReviews = reviewsData?.total || 0

  return (
    <div className="min-h-screen bg-[#FFFDF6]">
      {/* Public View Mode Banner */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 border-b-2 border-orange-200 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-200/60 p-2 rounded-lg">
                <Eye className="h-5 w-5 text-orange-700" />
              </div>
              <div>
                <p className="font-semibold text-sm text-orange-900">Public View Mode</p>
                <p className="text-xs text-orange-700">This is what guests see on your property page</p>
              </div>
            </div>
            <Button
              onClick={handleExitPublicView}
              className="bg-white text-orange-700 hover:bg-orange-700 hover:text-white border border-orange-300 font-semibold transition-colors shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Public View
            </Button>
          </div>
        </div>
      </div>

      {/* Property Selector Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Select Property:
            </label>
            <Select value={selectedPropertyId} onValueChange={handlePropertyChange}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Choose a property" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property.property_id} value={property.property_id}>
                    {property.listing_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedProperty && (
              <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
                <span className="font-semibold">{selectedProperty.average_rating.toFixed(1)}</span>
                <span>★</span>
                <span>({selectedProperty.approved_count} reviews)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-[#284E4C] to-[#1f3d3b]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-6 h-full flex items-end pb-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">
              {selectedProperty?.listing_name || "Loading..."}
            </h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-5 h-5" />
              <span>London, UK</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Quick Stats */}
            <div className="flex gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-[#284E4C]" />
                <span>2 Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-[#284E4C]" />
                <span>2 Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#284E4C]" />
                <span>4 Guests</span>
              </div>
            </div>

            {/* Rating Overview */}
            {selectedProperty && (
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Rating</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold text-[#284E4C]">
                      {selectedProperty.average_rating.toFixed(1)}
                    </div>
                    <div>
                      <div className="text-yellow-400 text-2xl">★★★★★</div>
                      <p className="text-sm text-gray-600 mt-1">
                        Based on {selectedProperty.total_reviews} review{selectedProperty.total_reviews !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(selectedProperty.ratings_breakdown).map(([category, rating]) => (
                      <div key={category} className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 w-32 capitalize">{category}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#284E4C] h-2 rounded-full transition-all"
                            style={{ width: `${(rating / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 w-8">
                          {rating.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to our stunning property in the heart of London. This modern space features
                contemporary design, high-end amenities, and is perfectly located for exploring the city.
                The apartment has been thoughtfully designed to provide a comfortable and stylish home away from
                home.
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Wifi, label: "High-speed WiFi" },
                  { icon: Tv, label: "Smart TV" },
                  { icon: Coffee, label: "Coffee maker" },
                  { icon: Wind, label: "Air conditioning" },
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <amenity.icon className="w-5 h-5 text-[#284E4C]" />
                    <span>{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div id="reviews">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
              {reviewsLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#284E4C] mx-auto mb-4" />
                  <p className="text-gray-600">Loading reviews...</p>
                </div>
              ) : (
                <PublicReviewsSection
                  reviews={reviews}
                  overallRating={selectedProperty?.average_rating || 0}
                  totalReviews={totalReviews}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

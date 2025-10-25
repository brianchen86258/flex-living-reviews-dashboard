"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"

interface FilterSidebarProps {
  onApplyFilters?: (filters: any) => void
  onResetFilters?: () => void
}

export function FilterSidebar({ onApplyFilters, onResetFilters }: FilterSidebarProps) {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [ratingRange, setRatingRange] = useState([7, 10])
  const [showApprovedOnly, setShowApprovedOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [showPendingOnly, setShowPendingOnly] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [expandedSections, setExpandedSections] = useState({
    properties: true,
    channels: true,
    rating: true,
    status: true,
  })

  const properties = ["29 Shoreditch Heights", "Camden Loft", "Notting Hill Suite", "Covent Garden Flat"]

  const channels = ["Airbnb", "Booking.com", "Direct", "VRBO"]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleApply = () => {
    const filters = {
      properties: selectedProperties,
      channels: selectedChannels,
      ratingRange,
      showApprovedOnly,
      showFeaturedOnly,
      showPendingOnly,
      sortBy,
    }
    onApplyFilters?.(filters)
  }

  const handleReset = () => {
    setSelectedProperties([])
    setSelectedChannels([])
    setRatingRange([7, 10])
    setShowApprovedOnly(false)
    setShowFeaturedOnly(false)
    setShowPendingOnly(false)
    setSortBy("newest")
    onResetFilters?.()
  }

  const activeFilterCount =
    selectedProperties.length +
    selectedChannels.length +
    (showApprovedOnly ? 1 : 0) +
    (showFeaturedOnly ? 1 : 0) +
    (showPendingOnly ? 1 : 0)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#284E4C]" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-[#284E4C] text-white text-xs font-semibold px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
      </div>

      {/* Properties */}
      <div>
        <button onClick={() => toggleSection("properties")} className="flex items-center justify-between w-full mb-3">
          <span className="font-medium text-gray-900">Properties</span>
          {expandedSections.properties ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {expandedSections.properties && (
          <div className="space-y-2">
            {properties.map((property) => (
              <div key={property} className="flex items-center gap-2">
                <Checkbox
                  id={property}
                  checked={selectedProperties.includes(property)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedProperties([...selectedProperties, property])
                    } else {
                      setSelectedProperties(selectedProperties.filter((p) => p !== property))
                    }
                  }}
                />
                <label htmlFor={property} className="text-sm text-gray-700 cursor-pointer">
                  {property}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Channels */}
      <div className="pt-4 border-t border-gray-200">
        <button onClick={() => toggleSection("channels")} className="flex items-center justify-between w-full mb-3">
          <span className="font-medium text-gray-900">Channels</span>
          {expandedSections.channels ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {expandedSections.channels && (
          <div className="space-y-2">
            {channels.map((channel) => (
              <div key={channel} className="flex items-center gap-2">
                <Checkbox
                  id={channel}
                  checked={selectedChannels.includes(channel)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedChannels([...selectedChannels, channel])
                    } else {
                      setSelectedChannels(selectedChannels.filter((c) => c !== channel))
                    }
                  }}
                />
                <label htmlFor={channel} className="text-sm text-gray-700 cursor-pointer">
                  {channel}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating Range */}
      <div className="pt-4 border-t border-gray-200">
        <button onClick={() => toggleSection("rating")} className="flex items-center justify-between w-full mb-3">
          <span className="font-medium text-gray-900">Rating Range</span>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {expandedSections.rating && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{ratingRange[0].toFixed(1)}</span>
              <span>{ratingRange[1].toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={ratingRange[0]}
              onChange={(e) => setRatingRange([Number.parseFloat(e.target.value), ratingRange[1]])}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Status */}
      <div className="pt-4 border-t border-gray-200">
        <button onClick={() => toggleSection("status")} className="flex items-center justify-between w-full mb-3">
          <span className="font-medium text-gray-900">Status</span>
          {expandedSections.status ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {expandedSections.status && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="approved"
                checked={showApprovedOnly}
                onCheckedChange={(checked) => setShowApprovedOnly(checked as boolean)}
              />
              <label htmlFor="approved" className="text-sm text-gray-700 cursor-pointer">
                Show approved only
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="featured"
                checked={showFeaturedOnly}
                onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
              />
              <label htmlFor="featured" className="text-sm text-gray-700 cursor-pointer">
                Show featured only
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="pending"
                checked={showPendingOnly}
                onCheckedChange={(checked) => setShowPendingOnly(checked as boolean)}
              />
              <label htmlFor="pending" className="text-sm text-gray-700 cursor-pointer">
                Show pending only
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Sort */}
      <div className="pt-4 border-t border-gray-200">
        <label className="block font-medium text-gray-900 mb-3">Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#284E4C]"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="highest">Highest rated</option>
          <option value="lowest">Lowest rated</option>
          <option value="property">Property name A-Z</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-gray-200 space-y-3">
        <Button onClick={handleApply} className="w-full bg-[#284E4C] hover:bg-[#1f3d3b] text-white">
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
          Reset All
        </Button>
      </div>
    </div>
  )
}

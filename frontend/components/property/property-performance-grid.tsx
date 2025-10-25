"use client"

import type { PropertyPerformance } from "@/types/property"
import { PropertyPerformanceCard } from "./property-performance-card"

interface PropertyPerformanceGridProps {
  properties: PropertyPerformance[]
}

const gradients = [
  "bg-gradient-to-br from-blue-100 to-blue-200",
  "bg-gradient-to-br from-green-100 to-green-200",
  "bg-gradient-to-br from-purple-100 to-purple-200",
  "bg-gradient-to-br from-orange-100 to-orange-200",
  "bg-gradient-to-br from-pink-100 to-pink-200",
  "bg-gradient-to-br from-teal-100 to-teal-200",
]

export function PropertyPerformanceGrid({ properties }: PropertyPerformanceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <PropertyPerformanceCard
          key={property.property_id}
          property={property}
          gradientClass={gradients[index % gradients.length]}
        />
      ))}
    </div>
  )
}

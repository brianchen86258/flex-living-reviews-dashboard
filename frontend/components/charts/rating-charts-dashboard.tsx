"use client"

import { useMemo } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface Review {
  id: string
  listing_name: string
  average_rating: number
  submitted_at: string
  channel: string
  is_approved: boolean
  review_categories?: Array<{ category: string; rating: number }>
}

interface PropertyStats {
  property_id: string
  listing_name: string
  average_rating: number
  ratings_breakdown: Record<string, number>
  total_reviews: number
}

interface RatingChartsDashboardProps {
  reviews: Review[]
  properties: PropertyStats[]
}

const CHANNEL_COLORS: Record<string, string> = {
  Airbnb: "#FF5A5F",
  "Booking.com": "#003580",
  Direct: "#284E4C",
  VRBO: "#0071c2",
  Expedia: "#ffb700",
}

export function RatingChartsDashboard({ reviews, properties }: RatingChartsDashboardProps) {
  const categoryData = useMemo(() => {
    const categoryTotals: Record<string, { sum: number; count: number }> = {}

    reviews.forEach((review) => {
      if (review.review_categories) {
        review.review_categories.forEach((cat) => {
          if (!categoryTotals[cat.category]) {
            categoryTotals[cat.category] = { sum: 0, count: 0 }
          }
          categoryTotals[cat.category].sum += cat.rating
          categoryTotals[cat.category].count += 1
        })
      }
    })

    return Object.entries(categoryTotals).map(([category, data]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      rating: data.count > 0 ? Number((data.sum / data.count).toFixed(1)) : 0,
    }))
  }, [reviews])

  const trendData = useMemo(() => {
    const monthlyData: Record<string, Record<string, { sum: number; count: number }>> = {}
    const propertyNames = properties.slice(0, 3).map((p) => p.listing_name)

    reviews.forEach((review) => {
      const date = new Date(review.submitted_at)
      const monthKey = date.toLocaleString("en", { month: "short" })

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {}
      }

      const propertyIdx = propertyNames.indexOf(review.listing_name)
      if (propertyIdx >= 0) {
        const propKey = "property" + (propertyIdx + 1)
        if (!monthlyData[monthKey][propKey]) {
          monthlyData[monthKey][propKey] = { sum: 0, count: 0 }
        }
        monthlyData[monthKey][propKey].sum += review.average_rating
        monthlyData[monthKey][propKey].count += 1
      }
    })

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months
      .map((month) => {
        const data: any = { month }
        if (monthlyData[month]) {
          Object.entries(monthlyData[month]).forEach(([key, value]) => {
            data[key] = value.count > 0 ? Number((value.sum / value.count).toFixed(1)) : 0
          })
        }
        return data
      })
      .filter((item) => Object.keys(item).length > 1)
  }, [reviews, properties])

  const channelData = useMemo(() => {
    const channelCounts: Record<string, number> = {}

    reviews.forEach((review) => {
      const channel = review.channel || "Direct"
      channelCounts[channel] = (channelCounts[channel] || 0) + 1
    })

    return Object.entries(channelCounts).map(([name, value]) => ({
      name,
      value,
      color: CHANNEL_COLORS[name] || "#666666",
    }))
  }, [reviews])

  const volumeData = useMemo(() => {
    const monthlyVolume: Record<string, { approved: number; pending: number }> = {}

    reviews.forEach((review) => {
      const date = new Date(review.submitted_at)
      const monthKey = date.toLocaleString("en", { month: "short" })

      if (!monthlyVolume[monthKey]) {
        monthlyVolume[monthKey] = { approved: 0, pending: 0 }
      }

      if (review.is_approved) {
        monthlyVolume[monthKey].approved += 1
      } else {
        monthlyVolume[monthKey].pending += 1
      }
    })

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months
      .map((month) => ({
        month,
        approved: monthlyVolume[month]?.approved || 0,
        pending: monthlyVolume[month]?.pending || 0,
      }))
      .filter((item) => item.approved > 0 || item.pending > 0)
  }, [reviews])

  const propertyNames = properties.slice(0, 3).map((p) => p.listing_name)

  if (reviews.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-md">
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Ratings by Category</h3>
        <p className="text-sm text-gray-600 mb-4">Performance across different review categories</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#284E4C" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#284E4C" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <Bar dataKey="rating" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Rating Trends Over Time</h3>
        <p className="text-sm text-gray-600 mb-4">Monthly average ratings by property</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis domain={[8, 10]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            {propertyNames.length > 0 && (
              <Line
                type="monotone"
                dataKey="property1"
                stroke="#284E4C"
                strokeWidth={2}
                dot={{ r: 4 }}
                name={propertyNames[0] || "Property 1"}
              />
            )}
            {propertyNames.length > 1 && (
              <Line
                type="monotone"
                dataKey="property2"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 4 }}
                name={propertyNames[1] || "Property 2"}
              />
            )}
            {propertyNames.length > 2 && (
              <Line
                type="monotone"
                dataKey="property3"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4 }}
                name={propertyNames[2] || "Property 3"}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews by Channel</h3>
        <p className="text-sm text-gray-600 mb-4">Distribution across booking platforms</p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={channelData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {channelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Volume Over Time</h3>
        <p className="text-sm text-gray-600 mb-4">Approved vs pending reviews by month</p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={volumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <defs>
              <linearGradient id="approvedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#284E4C" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#284E4C" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="approved"
              stackId="1"
              stroke="#284E4C"
              fill="url(#approvedGradient)"
              name="Approved"
            />
            <Area
              type="monotone"
              dataKey="pending"
              stackId="1"
              stroke="#f59e0b"
              fill="url(#pendingGradient)"
              name="Pending"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface ReviewsFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedProperty: string
  onPropertyChange: (value: string) => void
  selectedChannel: string
  onChannelChange: (value: string) => void
  minRating: number
  onMinRatingChange: (value: number) => void
  showApprovedOnly: boolean
  onShowApprovedOnlyChange: (value: boolean) => void
  properties: string[]
  channels: string[]
  onReset: () => void
}

export function ReviewsFilters({
  searchQuery,
  onSearchChange,
  selectedProperty,
  onPropertyChange,
  selectedChannel,
  onChannelChange,
  minRating,
  onMinRatingChange,
  showApprovedOnly,
  onShowApprovedOnlyChange,
  properties,
  channels,
  onReset,
}: ReviewsFiltersProps) {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Filters</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Guest name or review..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Property Filter */}
        <div className="space-y-2">
          <Label htmlFor="property">Property</Label>
          <Select value={selectedProperty} onValueChange={onPropertyChange}>
            <SelectTrigger id="property">
              <SelectValue placeholder="All properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All properties</SelectItem>
              {properties.map((property) => (
                <SelectItem key={property} value={property}>
                  {property}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Channel Filter */}
        <div className="space-y-2">
          <Label htmlFor="channel">Channel</Label>
          <Select value={selectedChannel} onValueChange={onChannelChange}>
            <SelectTrigger id="channel">
              <SelectValue placeholder="All channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All channels</SelectItem>
              {channels.map((channel) => (
                <SelectItem key={channel} value={channel}>
                  {channel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <Label htmlFor="rating">Min Rating</Label>
          <Select value={minRating.toString()} onValueChange={(v) => onMinRatingChange(Number(v))}>
            <SelectTrigger id="rating">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All ratings</SelectItem>
              <SelectItem value="6">6+ rating</SelectItem>
              <SelectItem value="7">7+ rating</SelectItem>
              <SelectItem value="8">8+ rating</SelectItem>
              <SelectItem value="9">9+ rating</SelectItem>
              <SelectItem value="10">10 rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Approval Filter */}
        <div className="space-y-2">
          <Label htmlFor="approved">Approved Only</Label>
          <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
            <Switch id="approved" checked={showApprovedOnly} onCheckedChange={onShowApprovedOnlyChange} />
            <span className="ml-2 text-sm text-muted-foreground">{showApprovedOnly ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

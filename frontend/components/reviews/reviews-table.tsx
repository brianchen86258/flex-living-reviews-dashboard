"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpDown, Star, MoreVertical, Trash2, Eye } from "lucide-react"
import type { Review, SortField, SortDirection } from "@/types/review"
import { StarRating } from "./star-rating"
import { ChannelBadge } from "./channel-badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReviewsTableProps {
  reviews: Review[]
  onApprovalToggle: (id: string, approved: boolean) => void
  onFeaturedToggle: (id: string, featured: boolean) => void
  onDelete: (id: string) => void
  onViewReview?: (review: Review) => void
}

export function ReviewsTable({
  reviews,
  onApprovalToggle,
  onFeaturedToggle,
  onDelete,
  onViewReview,
}: ReviewsTableProps) {
  const [sortField, setSortField] = useState<SortField>("submitted_at")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === "submitted_at") {
      aValue = new Date(aValue as string).getTime()
      bValue = new Date(bValue as string).getTime()
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const totalPages = Math.ceil(sortedReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + itemsPerPage)

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => handleSort(field)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )

  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <div className="mx-auto max-w-md space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Star className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">No reviews found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or sync reviews from Hostaway</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[200px]">
                <SortButton field="listing_name">Property</SortButton>
              </TableHead>
              <TableHead className="w-[150px]">
                <SortButton field="guest_name">Guest</SortButton>
              </TableHead>
              <TableHead className="w-[120px]">
                <SortButton field="average_rating">Rating</SortButton>
              </TableHead>
              <TableHead className="w-[120px]">
                <SortButton field="submitted_at">Date</SortButton>
              </TableHead>
              <TableHead className="w-[120px]">
                <SortButton field="channel">Channel</SortButton>
              </TableHead>
              <TableHead className="w-[100px]">Approved</TableHead>
              <TableHead className="w-[80px]">Featured</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReviews.map((review) => (
              <TableRow key={review.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{review.listing_name}</TableCell>
                <TableCell>{review.guest_name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.average_rating} />
                    <span className="text-sm text-muted-foreground">{review.average_rating.toFixed(1)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(review.submitted_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <ChannelBadge channel={review.channel} />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={review.is_approved}
                    onCheckedChange={(checked) => onApprovalToggle(review.id, checked)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFeaturedToggle(review.id, !review.is_featured)}
                    className="h-8 w-8 p-0"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        review.is_featured ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onViewReview && (
                        <DropdownMenuItem onClick={() => onViewReview(review)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onDelete(review.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value))
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

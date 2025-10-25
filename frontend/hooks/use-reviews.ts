import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsApi } from "@/lib/api";
import type { ReviewResponse, DashboardStats } from "@/types/review";

// Fetch reviews from Hostaway (main endpoint)
export function useHostawayReviews() {
  return useQuery<ReviewResponse>({
    queryKey: ["reviews", "hostaway"],
    queryFn: () => reviewsApi.getHostawayReviews(),
  });
}

// Fetch reviews from database with filters
export function useReviews(params?: {
  property_id?: string;
  channel?: string;
  min_rating?: number;
  is_approved?: boolean;
}) {
  return useQuery<ReviewResponse>({
    queryKey: ["reviews", params],
    queryFn: () => reviewsApi.getReviews(params),
  });
}

// Fetch dashboard statistics
export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard", "stats"],
    queryFn: () => reviewsApi.getDashboardStats(),
  });
}

// Update review approval/featured status
export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      data,
    }: {
      reviewId: string;
      data: { is_approved?: boolean; is_featured?: boolean };
    }) => reviewsApi.updateReview(reviewId, data),
    onSuccess: () => {
      // Invalidate and refetch reviews
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

// Sync reviews from Hostaway to database
export function useSyncReviews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => reviewsApi.syncReviews(),
    onSuccess: () => {
      // Invalidate and refetch all reviews
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

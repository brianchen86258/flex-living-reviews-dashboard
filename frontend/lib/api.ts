import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API functions
export const reviewsApi = {
  // Fetch reviews from Hostaway (required endpoint)
  getHostawayReviews: async () => {
    const response = await api.get("/api/reviews/hostaway");
    return response.data;
  },

  // Get reviews from database with filters
  getReviews: async (params?: {
    property_id?: string;
    channel?: string;
    min_rating?: number;
    is_approved?: boolean;
    limit?: number;
    offset?: number;
  }) => {
    const response = await api.get("/api/reviews", { params });
    return response.data;
  },

  // Update review approval status
  updateReview: async (
    reviewId: string,
    data: { is_approved?: boolean; is_featured?: boolean }
  ) => {
    const response = await api.patch(`/api/reviews/${reviewId}`, data);
    return response.data;
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get("/api/reviews/stats/dashboard");
    return response.data;
  },

  // Sync reviews from Hostaway to database
  syncReviews: async () => {
    const response = await api.post("/api/reviews/sync");
    return response.data;
  },
};

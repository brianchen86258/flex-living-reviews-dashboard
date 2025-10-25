from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class ReviewCategory(BaseModel):
    """Review category rating"""

    category: str
    rating: float


class ReviewBase(BaseModel):
    """Base review schema"""

    listing_name: str
    guest_name: str
    public_review: str
    rating: Optional[float] = None
    review_categories: List[ReviewCategory] = []


class ReviewNormalized(BaseModel):
    """Normalized review response for frontend"""

    id: str
    listing_id: str
    listing_name: str
    property_id: str
    review_type: str
    status: str
    rating: Optional[float] = None
    average_rating: Optional[float] = None  # Calculated from categories
    public_review: str
    review_categories: List[ReviewCategory]
    guest_name: str
    channel: Optional[str] = None
    submitted_at: datetime
    is_approved: bool = False
    is_featured: bool = False

    class Config:
        from_attributes = True


class ReviewCreate(BaseModel):
    """Schema for creating a review"""

    external_id: str
    listing_id: str
    listing_name: str
    property_id: str
    review_type: str
    status: str
    rating: Optional[float] = None
    public_review: str
    review_categories: List[dict]
    guest_name: str
    channel: Optional[str] = None
    submitted_at: datetime


class ReviewUpdate(BaseModel):
    """Schema for updating review approval status"""

    is_approved: Optional[bool] = None
    is_featured: Optional[bool] = None


class ReviewResponse(BaseModel):
    """API response for reviews"""

    status: str = "success"
    total: int
    data: List[ReviewNormalized]


class PropertyStats(BaseModel):
    """Property performance statistics"""

    property_id: str
    listing_name: str
    total_reviews: int
    average_rating: float
    ratings_breakdown: dict  # {"cleanliness": 9.5, "communication": 10.0}
    recent_trend: str  # "improving", "stable", "declining"
    approved_count: int
    featured_count: int


class DashboardStats(BaseModel):
    """Overall dashboard statistics"""

    total_reviews: int
    total_properties: int
    average_rating: float
    properties: List[PropertyStats]

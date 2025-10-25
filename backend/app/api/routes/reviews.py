from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from typing import List, Optional
from datetime import datetime, timedelta

from app.db import get_db
from app.schemas.review import (
    ReviewResponse,
    ReviewNormalized,
    ReviewUpdate,
    DashboardStats,
    PropertyStats,
)
from app.services.hostaway import HostawayService
from app.models.review import Review

router = APIRouter(prefix="/api/reviews", tags=["reviews"])


@router.get("/hostaway", response_model=ReviewResponse)
async def get_hostaway_reviews():
    """
    Fetch and normalize reviews from Hostaway API.
    This endpoint is required for the assessment and returns structured, usable data.
    """
    service = HostawayService()
    reviews = await service.fetch_and_normalize_reviews()

    return ReviewResponse(status="success", total=len(reviews), data=reviews)


@router.get("/", response_model=ReviewResponse)
async def get_reviews(
    db: AsyncSession = Depends(get_db),
    property_id: Optional[str] = Query(None, description="Filter by property ID"),
    channel: Optional[str] = Query(None, description="Filter by channel"),
    min_rating: Optional[float] = Query(None, description="Minimum rating"),
    is_approved: Optional[bool] = Query(None, description="Filter by approval status"),
    limit: int = Query(100, le=500),
    offset: int = Query(0),
):
    """
    Get reviews from database with filtering and pagination
    """
    query = select(Review)

    # Apply filters
    filters = []
    if property_id:
        filters.append(Review.property_id == property_id)
    if channel:
        filters.append(Review.channel == channel)
    if min_rating is not None:
        filters.append(Review.rating >= min_rating)
    if is_approved is not None:
        filters.append(Review.is_approved == is_approved)

    if filters:
        query = query.where(and_(*filters))

    # Apply pagination
    query = query.offset(offset).limit(limit).order_by(Review.submitted_at.desc())

    result = await db.execute(query)
    reviews = result.scalars().all()

    # Convert to response format
    normalized_reviews = []
    for review in reviews:
        categories = review.review_categories or []
        avg_rating = review.rating
        if avg_rating is None and categories:
            avg_rating = sum(cat["rating"] for cat in categories) / len(categories)

        normalized_reviews.append(
            ReviewNormalized(
                id=str(review.external_id),
                listing_id=review.listing_id,
                listing_name=review.listing_name,
                property_id=review.property_id,
                review_type=review.review_type,
                status=review.status,
                rating=review.rating,
                average_rating=avg_rating,
                public_review=review.public_review,
                review_categories=[
                    {"category": cat["category"], "rating": cat["rating"]}
                    for cat in categories
                ],
                guest_name=review.guest_name,
                channel=review.channel,
                submitted_at=review.submitted_at,
                is_approved=review.is_approved,
                is_featured=review.is_featured,
            )
        )

    return ReviewResponse(
        status="success", total=len(normalized_reviews), data=normalized_reviews
    )


@router.patch("/{review_id}", response_model=dict)
async def update_review(
    review_id: str, update_data: ReviewUpdate, db: AsyncSession = Depends(get_db)
):
    """
    Update review approval/featured status
    """
    query = select(Review).where(Review.external_id == review_id)
    result = await db.execute(query)
    review = result.scalar_one_or_none()

    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # Update fields
    if update_data.is_approved is not None:
        review.is_approved = update_data.is_approved
    if update_data.is_featured is not None:
        review.is_featured = update_data.is_featured

    await db.commit()

    return {"status": "success", "message": "Review updated successfully"}


@router.get("/stats/dashboard", response_model=DashboardStats)
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    """
    Get overall dashboard statistics
    """
    # Get total reviews
    total_query = select(func.count(Review.id))
    total_result = await db.execute(total_query)
    total_reviews = total_result.scalar() or 0

    # Get unique properties
    properties_query = select(Review.property_id, Review.listing_name).distinct()
    properties_result = await db.execute(properties_query)
    unique_properties = properties_result.all()

    # Get average rating
    avg_query = select(func.avg(Review.rating)).where(Review.rating.isnot(None))
    avg_result = await db.execute(avg_query)
    average_rating = avg_result.scalar() or 0.0

    # Get stats per property
    property_stats_list = []
    for prop_id, listing_name in unique_properties:
        prop_query = select(Review).where(Review.property_id == prop_id)
        prop_result = await db.execute(prop_query)
        prop_reviews = prop_result.scalars().all()

        if not prop_reviews:
            continue

        # Calculate average rating for property
        ratings = [r.rating for r in prop_reviews if r.rating is not None]
        prop_avg_rating = sum(ratings) / len(ratings) if ratings else 0.0

        # Calculate category breakdown
        category_totals = {}
        category_counts = {}
        for review in prop_reviews:
            for cat in review.review_categories or []:
                cat_name = cat["category"]
                cat_rating = cat["rating"]
                category_totals[cat_name] = category_totals.get(cat_name, 0) + cat_rating
                category_counts[cat_name] = category_counts.get(cat_name, 0) + 1

        ratings_breakdown = {
            cat: category_totals[cat] / category_counts[cat]
            for cat in category_totals
        }

        # Determine trend (simple: last 3 vs previous 3)
        recent_trend = "stable"
        if len(prop_reviews) >= 6:
            recent_reviews = sorted(
                prop_reviews, key=lambda x: x.submitted_at, reverse=True
            )
            recent_ratings = [
                r.rating for r in recent_reviews[:3] if r.rating is not None
            ]
            older_ratings = [
                r.rating for r in recent_reviews[3:6] if r.rating is not None
            ]

            if recent_ratings and older_ratings:
                recent_avg = sum(recent_ratings) / len(recent_ratings)
                older_avg = sum(older_ratings) / len(older_ratings)

                if recent_avg > older_avg + 0.5:
                    recent_trend = "improving"
                elif recent_avg < older_avg - 0.5:
                    recent_trend = "declining"

        property_stats_list.append(
            PropertyStats(
                property_id=prop_id,
                listing_name=listing_name or prop_id,
                total_reviews=len(prop_reviews),
                average_rating=round(prop_avg_rating, 2),
                ratings_breakdown=ratings_breakdown,
                recent_trend=recent_trend,
                approved_count=sum(1 for r in prop_reviews if r.is_approved),
                featured_count=sum(1 for r in prop_reviews if r.is_featured),
            )
        )

    return DashboardStats(
        total_reviews=total_reviews,
        total_properties=len(unique_properties),
        average_rating=round(average_rating, 2),
        properties=property_stats_list,
    )


@router.post("/sync")
async def sync_reviews_from_hostaway(db: AsyncSession = Depends(get_db)):
    """
    Sync reviews from Hostaway API to database
    """
    service = HostawayService()
    reviews = await service.fetch_and_normalize_reviews()

    synced_count = 0
    for review_data in reviews:
        # Check if review already exists
        query = select(Review).where(Review.external_id == review_data.id)
        result = await db.execute(query)
        existing_review = result.scalar_one_or_none()

        if not existing_review:
            # Create new review
            new_review = Review(
                external_id=review_data.id,
                listing_id=review_data.listing_id,
                listing_name=review_data.listing_name,
                property_id=review_data.property_id,
                review_type=review_data.review_type,
                status=review_data.status,
                rating=review_data.rating,
                public_review=review_data.public_review,
                review_categories=[cat.dict() for cat in review_data.review_categories],
                guest_name=review_data.guest_name,
                channel=review_data.channel,
                submitted_at=review_data.submitted_at,
                is_approved=False,
                is_featured=False,
            )
            db.add(new_review)
            synced_count += 1

    await db.commit()

    return {
        "status": "success",
        "message": f"Synced {synced_count} new reviews from Hostaway",
        "total_synced": synced_count,
    }

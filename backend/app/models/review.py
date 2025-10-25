from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, JSON, Text
from sqlalchemy.sql import func
from app.models import Base


class Review(Base):
    """Review model for storing guest reviews"""

    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String, unique=True, index=True)  # ID from Hostaway
    listing_id = Column(String, index=True)
    listing_name = Column(String)
    property_id = Column(String, index=True)  # Normalized property identifier

    # Review details
    review_type = Column(String)  # host-to-guest, guest-to-host
    status = Column(String)  # published, pending
    rating = Column(Float, nullable=True)  # Overall rating
    public_review = Column(Text)

    # Categories (stored as JSON)
    review_categories = Column(JSON)  # [{"category": "cleanliness", "rating": 10}]

    # Metadata
    guest_name = Column(String)
    channel = Column(String, nullable=True)  # airbnb, booking.com, etc.
    submitted_at = Column(DateTime)

    # Manager actions
    is_approved = Column(Boolean, default=False)  # For public display
    is_featured = Column(Boolean, default=False)  # Highlight on property page

    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<Review {self.external_id} - {self.listing_name}>"

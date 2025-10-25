import httpx
from typing import List, Dict, Any, Optional
from datetime import datetime
from app.core.config import settings
from app.schemas.review import ReviewNormalized, ReviewCategory


class HostawayService:
    """Service for interacting with Hostaway API"""

    def __init__(self):
        self.base_url = settings.HOSTAWAY_BASE_URL
        self.api_key = settings.HOSTAWAY_API_KEY
        self.account_id = settings.HOSTAWAY_ACCOUNT_ID

    def _get_headers(self) -> Dict[str, str]:
        """Get API headers"""
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    async def fetch_reviews(self) -> Dict[str, Any]:
        """Fetch reviews from Hostaway API"""
        url = f"{self.base_url}/reviews"

        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    url,
                    headers=self._get_headers(),
                    timeout=30.0,
                )
                response.raise_for_status()
                return response.json()
            except httpx.HTTPError as e:
                print(f"Error fetching reviews from Hostaway: {e}")
                # Return mock data if API fails (sandbox has no data)
                return self._get_mock_data()

    def _get_mock_data(self) -> Dict[str, Any]:
        """Return mock review data for development - expanded dataset"""
        return {
            "status": "success",
            "result": [
                # January 2024 - Shoreditch Heights
                {
                    "id": 7453,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": None,
                    "publicReview": "Amazing property in the heart of Shoreditch! Clean, modern, and perfectly located.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-01-15 14:30:00",
                    "guestName": "Sarah Johnson",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "Airbnb",
                },
                {
                    "id": 7454,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.5,
                    "publicReview": "Great apartment with stunning views. Very responsive host.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-01-20 09:15:00",
                    "guestName": "Michael Chen",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "Booking.com",
                },
                {
                    "id": 7455,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 8.5,
                    "publicReview": "Lovely apartment, great location for exploring London.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 8},
                        {"category": "location", "rating": 9},
                        {"category": "value", "rating": 8},
                        {"category": "amenities", "rating": 8},
                    ],
                    "submittedAt": "2024-01-25 16:45:00",
                    "guestName": "Emma Williams",
                    "listingName": "Studio S1 B - 15 Camden Lock",
                    "channel": "Airbnb",
                },
                # February 2024
                {
                    "id": 7456,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 10.0,
                    "publicReview": "Absolutely perfect! Everything was exactly as described.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 10},
                        {"category": "amenities", "rating": 10},
                    ],
                    "submittedAt": "2024-02-05 11:20:00",
                    "guestName": "David Martinez",
                    "listingName": "Studio S1 B - 15 Camden Lock",
                    "channel": "Airbnb",
                },
                {
                    "id": 7457,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.2,
                    "publicReview": "Beautiful property in Westminster. Walking distance to many attractions.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-02-12 13:00:00",
                    "guestName": "Lisa Anderson",
                    "listingName": "1B W1 C - 42 Westminster Gardens",
                    "channel": "Booking.com",
                },
                {
                    "id": 7458,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.0,
                    "publicReview": "Excellent stay, would definitely return!",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 8},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-02-18 10:30:00",
                    "guestName": "James Wilson",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "VRBO",
                },
                {
                    "id": 7459,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.5,
                    "publicReview": "Fantastic property! Highly recommend.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-02-22 15:45:00",
                    "guestName": "Sophie Taylor",
                    "listingName": "1B W1 C - 42 Westminster Gardens",
                    "channel": "Booking.com",
                },
                # March 2024
                {
                    "id": 7460,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 8.8,
                    "publicReview": "Great location in Camden, very trendy area.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 9},
                        {"category": "value", "rating": 8},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-03-05 09:20:00",
                    "guestName": "Robert Brown",
                    "listingName": "Studio S1 B - 15 Camden Lock",
                    "channel": "Airbnb",
                },
                {
                    "id": 7461,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.7,
                    "publicReview": "Stunning apartment with amazing amenities. Host went above and beyond!",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 9},
                        {"category": "value", "rating": 10},
                        {"category": "amenities", "rating": 10},
                    ],
                    "submittedAt": "2024-03-12 14:15:00",
                    "guestName": "Jessica Lee",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "Airbnb",
                },
                {
                    "id": 7462,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 8.5,
                    "publicReview": "Nice place, good value for the location.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 8},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 9},
                        {"category": "value", "rating": 8},
                        {"category": "amenities", "rating": 8},
                    ],
                    "submittedAt": "2024-03-18 11:30:00",
                    "guestName": "Thomas Garcia",
                    "listingName": "1B W1 C - 42 Westminster Gardens",
                    "channel": "Expedia",
                },
                {
                    "id": 7463,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.3,
                    "publicReview": "Perfect for our London trip. Clean and comfortable.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 9},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-03-25 16:00:00",
                    "guestName": "Maria Rodriguez",
                    "listingName": "3B E1 D - 88 Notting Hill Mansion",
                    "channel": "Booking.com",
                },
                # April 2024
                {
                    "id": 7464,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.8,
                    "publicReview": "Exceptional property! Loved every minute of our stay.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 10},
                    ],
                    "submittedAt": "2024-04-03 10:45:00",
                    "guestName": "Christopher White",
                    "listingName": "3B E1 D - 88 Notting Hill Mansion",
                    "channel": "Airbnb",
                },
                {
                    "id": 7465,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 8.7,
                    "publicReview": "Great apartment, very spacious and clean.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 8},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-04-10 13:20:00",
                    "guestName": "Amanda Harris",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "Booking.com",
                },
                {
                    "id": 7466,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.1,
                    "publicReview": "Wonderful Camden location, close to everything.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-04-15 09:00:00",
                    "guestName": "Daniel Kim",
                    "listingName": "Studio S1 B - 15 Camden Lock",
                    "channel": "Airbnb",
                },
                {
                    "id": 7467,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.4,
                    "publicReview": "Luxurious property in the heart of Westminster.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-04-22 14:30:00",
                    "guestName": "Rachel Thompson",
                    "listingName": "1B W1 C - 42 Westminster Gardens",
                    "channel": "VRBO",
                },
                # May 2024
                {
                    "id": 7468,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 10.0,
                    "publicReview": "Perfect in every way! Best Airbnb we've ever stayed in.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 10},
                        {"category": "amenities", "rating": 10},
                    ],
                    "submittedAt": "2024-05-05 11:15:00",
                    "guestName": "Steven Miller",
                    "listingName": "3B E1 D - 88 Notting Hill Mansion",
                    "channel": "Airbnb",
                },
                {
                    "id": 7469,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.2,
                    "publicReview": "Beautiful Shoreditch apartment, trendy neighborhood.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-05-12 15:40:00",
                    "guestName": "Laura Davis",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "Booking.com",
                },
                {
                    "id": 7470,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 8.9,
                    "publicReview": "Cozy studio perfect for a solo traveler or couple.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 9},
                        {"category": "value", "rating": 8},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-05-18 10:20:00",
                    "guestName": "Kevin Martinez",
                    "listingName": "Studio S1 B - 15 Camden Lock",
                    "channel": "Expedia",
                },
                {
                    "id": 7471,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.6,
                    "publicReview": "Amazing Westminster location with top-notch amenities.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-05-25 12:50:00",
                    "guestName": "Jennifer Clark",
                    "listingName": "1B W1 C - 42 Westminster Gardens",
                    "channel": "Booking.com",
                },
                # June 2024
                {
                    "id": 7472,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.9,
                    "publicReview": "Outstanding property! The Notting Hill location is unbeatable.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 10},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-06-03 09:30:00",
                    "guestName": "Matthew Wilson",
                    "listingName": "3B E1 D - 88 Notting Hill Mansion",
                    "channel": "Airbnb",
                },
                {
                    "id": 7473,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.3,
                    "publicReview": "Lovely apartment in Shoreditch. Great coffee shops nearby!",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-06-10 14:15:00",
                    "guestName": "Nicole Lopez",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "Airbnb",
                },
                {
                    "id": 7474,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 8.6,
                    "publicReview": "Good Camden location, vibrant neighborhood.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 8},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 9},
                        {"category": "value", "rating": 8},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-06-17 11:45:00",
                    "guestName": "Brandon Hall",
                    "listingName": "Studio S1 B - 15 Camden Lock",
                    "channel": "Booking.com",
                },
                {
                    "id": 7475,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.5,
                    "publicReview": "Westminster gem! Walking distance to all major attractions.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-06-24 16:20:00",
                    "guestName": "Ashley Young",
                    "listingName": "1B W1 C - 42 Westminster Gardens",
                    "channel": "VRBO",
                },
                # July 2024
                {
                    "id": 7476,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 10.0,
                    "publicReview": "Absolutely perfect! The mansion exceeded all expectations.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 10},
                        {"category": "amenities", "rating": 10},
                    ],
                    "submittedAt": "2024-07-05 10:00:00",
                    "guestName": "Ryan Allen",
                    "listingName": "3B E1 D - 88 Notting Hill Mansion",
                    "channel": "Airbnb",
                },
                {
                    "id": 7477,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.4,
                    "publicReview": "Fantastic Shoreditch stay! Modern and stylish.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-07-12 13:30:00",
                    "guestName": "Michelle King",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "Booking.com",
                },
                {
                    "id": 7478,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.0,
                    "publicReview": "Great Camden studio, loved the local markets.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 9},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-07-19 09:45:00",
                    "guestName": "Eric Wright",
                    "listingName": "Studio S1 B - 15 Camden Lock",
                    "channel": "Airbnb",
                },
                {
                    "id": 7479,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.7,
                    "publicReview": "Stunning Westminster property, perfect central location.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 10},
                    ],
                    "submittedAt": "2024-07-26 15:10:00",
                    "guestName": "Stephanie Scott",
                    "listingName": "1B W1 C - 42 Westminster Gardens",
                    "channel": "Expedia",
                },
                # August 2024
                {
                    "id": 7480,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.8,
                    "publicReview": "Incredible Notting Hill experience! Highly recommended.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 10},
                    ],
                    "submittedAt": "2024-08-04 11:20:00",
                    "guestName": "Andrew Green",
                    "listingName": "3B E1 D - 88 Notting Hill Mansion",
                    "channel": "Booking.com",
                },
                {
                    "id": 7481,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.2,
                    "publicReview": "Excellent Shoreditch base for exploring East London.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-08-11 14:00:00",
                    "guestName": "Samantha Baker",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "Airbnb",
                },
                {
                    "id": 7482,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 8.8,
                    "publicReview": "Nice Camden spot, good for music lovers.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 9},
                        {"category": "value", "rating": 8},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-08-18 10:30:00",
                    "guestName": "Justin Adams",
                    "listingName": "Studio S1 B - 15 Camden Lock",
                    "channel": "VRBO",
                },
                {
                    "id": 7483,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.6,
                    "publicReview": "Beautiful Westminster apartment, immaculate and comfortable.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-08-25 16:45:00",
                    "guestName": "Melissa Turner",
                    "listingName": "1B W1 C - 42 Westminster Gardens",
                    "channel": "Booking.com",
                },
                # September 2024
                {
                    "id": 7484,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 10.0,
                    "publicReview": "Five stars all the way! Notting Hill mansion is spectacular.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 10},
                        {"category": "amenities", "rating": 10},
                    ],
                    "submittedAt": "2024-09-03 09:15:00",
                    "guestName": "Jonathan Phillips",
                    "listingName": "3B E1 D - 88 Notting Hill Mansion",
                    "channel": "Airbnb",
                },
                {
                    "id": 7485,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.5,
                    "publicReview": "Amazing Shoreditch apartment! Perfect for our group.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 10},
                    ],
                    "submittedAt": "2024-09-10 13:40:00",
                    "guestName": "Rebecca Campbell",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "Expedia",
                },
                {
                    "id": 7486,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.1,
                    "publicReview": "Wonderful Camden stay, great neighborhood vibes.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-09-17 11:00:00",
                    "guestName": "Timothy Evans",
                    "listingName": "Studio S1 B - 15 Camden Lock",
                    "channel": "Booking.com",
                },
                {
                    "id": 7487,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.8,
                    "publicReview": "Exceptional Westminster property! Loved everything about it.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 10},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-09-24 15:20:00",
                    "guestName": "Christina Morris",
                    "listingName": "1B W1 C - 42 Westminster Gardens",
                    "channel": "Airbnb",
                },
                # October 2024
                {
                    "id": 7488,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.9,
                    "publicReview": "Dream property in Notting Hill! Can't say enough good things.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 10},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-10-05 10:30:00",
                    "guestName": "Nicholas Rogers",
                    "listingName": "3B E1 D - 88 Notting Hill Mansion",
                    "channel": "Booking.com",
                },
                {
                    "id": 7489,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.3,
                    "publicReview": "Fantastic Shoreditch location! Modern and comfortable.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-10-12 14:50:00",
                    "guestName": "Brittany Reed",
                    "listingName": "2B N1 A - 29 Shoreditch Heights",
                    "channel": "Airbnb",
                },
                {
                    "id": 7490,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 8.9,
                    "publicReview": "Great Camden studio, perfect for a short stay.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 9},
                        {"category": "communication", "rating": 9},
                        {"category": "location", "rating": 9},
                        {"category": "value", "rating": 8},
                        {"category": "amenities", "rating": 9},
                    ],
                    "submittedAt": "2024-10-19 09:25:00",
                    "guestName": "Gregory Cook",
                    "listingName": "Studio S1 B - 15 Camden Lock",
                    "channel": "VRBO",
                },
                {
                    "id": 7491,
                    "type": "guest-to-host",
                    "status": "published",
                    "rating": 9.7,
                    "publicReview": "Outstanding Westminster apartment! Perfect location and service.",
                    "reviewCategory": [
                        {"category": "cleanliness", "rating": 10},
                        {"category": "communication", "rating": 10},
                        {"category": "location", "rating": 10},
                        {"category": "value", "rating": 9},
                        {"category": "amenities", "rating": 10},
                    ],
                    "submittedAt": "2024-10-22 16:00:00",
                    "guestName": "Heather Morgan",
                    "listingName": "1B W1 C - 42 Westminster Gardens",
                    "channel": "Expedia",
                },
            ],
        }

    def _normalize_review(self, review_data: Dict[str, Any]) -> ReviewNormalized:
        """Normalize Hostaway review data to internal format"""

        # Parse categories
        categories = [
            ReviewCategory(category=cat["category"], rating=float(cat["rating"]))
            for cat in review_data.get("reviewCategory", [])
        ]

        # Calculate average rating from categories if overall rating not provided
        average_rating = review_data.get("rating")
        if average_rating is None and categories:
            average_rating = sum(cat.rating for cat in categories) / len(categories)

        # Extract property ID from listing name (simplified)
        listing_name = review_data.get("listingName", "")
        property_id = listing_name.split(" - ")[0] if " - " in listing_name else listing_name

        # Parse submitted date
        submitted_at = datetime.strptime(
            review_data.get("submittedAt", ""), "%Y-%m-%d %H:%M:%S"
        )

        return ReviewNormalized(
            id=str(review_data.get("id")),
            listing_id=str(review_data.get("id")),  # Using review ID as listing ID for mock
            listing_name=listing_name,
            property_id=property_id,
            review_type=review_data.get("type", "guest-to-host"),
            status=review_data.get("status", "published"),
            rating=review_data.get("rating"),
            average_rating=average_rating,
            public_review=review_data.get("publicReview", ""),
            review_categories=categories,
            guest_name=review_data.get("guestName", "Anonymous"),
            channel=review_data.get("channel"),
            submitted_at=submitted_at,
            is_approved=False,
            is_featured=False,
        )

    async def fetch_and_normalize_reviews(self) -> List[ReviewNormalized]:
        """Fetch and normalize reviews from Hostaway API"""
        data = await self.fetch_reviews()

        if data.get("status") == "success":
            reviews = data.get("result", [])
            return [self._normalize_review(review) for review in reviews]

        return []

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""

    # API Settings
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Flex Living Reviews API"

    # CORS
    FRONTEND_URL: str = "http://localhost:3000"
    CORS_ORIGINS: str = ""  # Comma-separated list of allowed origins

    @property
    def BACKEND_CORS_ORIGINS(self) -> List[str]:
        """Get list of allowed CORS origins"""
        origins = [
            "http://localhost:3000",
            "http://localhost:3001",
        ]

        # Add FRONTEND_URL
        if self.FRONTEND_URL:
            origins.append(self.FRONTEND_URL)

        # Add CORS_ORIGINS from environment (comma-separated)
        if self.CORS_ORIGINS:
            additional_origins = [
                origin.strip()
                for origin in self.CORS_ORIGINS.split(",")
                if origin.strip()
            ]
            origins.extend(additional_origins)

        # Remove duplicates and return
        return list(set(origins))

    # Hostaway API
    HOSTAWAY_API_KEY: str
    HOSTAWAY_ACCOUNT_ID: str
    HOSTAWAY_BASE_URL: str = "https://api.hostaway.com/v1"

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./flexliving.db"

    @property
    def ASYNC_DATABASE_URL(self) -> str:
        """Convert DATABASE_URL to async driver format"""
        url = self.DATABASE_URL

        # If it's already using an async driver, return as-is
        if "aiosqlite" in url or "asyncpg" in url:
            return url

        # Convert PostgreSQL URLs to use asyncpg
        if url.startswith("postgresql://") or url.startswith("postgres://"):
            # Replace postgres:// or postgresql:// with postgresql+asyncpg://
            url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
            url = url.replace("postgres://", "postgresql+asyncpg://", 1)

        return url

    # Environment
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

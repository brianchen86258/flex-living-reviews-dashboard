from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""

    # API Settings
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Flex Living Reviews API"

    # CORS
    FRONTEND_URL: str = "http://localhost:3000"

    @property
    def BACKEND_CORS_ORIGINS(self) -> List[str]:
        return [
            "http://localhost:3000",
            "http://localhost:3001",
            self.FRONTEND_URL,
        ]

    # Hostaway API
    HOSTAWAY_API_KEY: str
    HOSTAWAY_ACCOUNT_ID: str
    HOSTAWAY_BASE_URL: str = "https://api.hostaway.com/v1"

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./flexliving.db"

    # Environment
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

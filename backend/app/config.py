from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "portfolio_db"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 43200  # 30 days
    
    # Admin Credentials
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "admin"
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:5173"
    
    # Hidden Admin Route
    ADMIN_SECRET_PATH: str = "admin-secret"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

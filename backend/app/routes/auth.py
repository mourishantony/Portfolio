from fastapi import APIRouter, HTTPException, status
from datetime import timedelta
from app.models import Token, LoginRequest
from app.auth import verify_admin_credentials, create_access_token
from app.config import settings

router = APIRouter()

@router.post(f"/{settings.ADMIN_SECRET_PATH}/login", response_model=Token)
async def login(login_data: LoginRequest):
    """
    Hidden admin login endpoint.
    URL path is defined in .env as ADMIN_SECRET_PATH
    """
    if not verify_admin_credentials(login_data.username, login_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": login_data.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get(f"/{settings.ADMIN_SECRET_PATH}/verify")
async def verify_token():
    """
    Endpoint to verify if the hidden admin path is accessible
    """
    return {"message": "Admin route is accessible", "path": settings.ADMIN_SECRET_PATH}

from fastapi import APIRouter, HTTPException, Depends, status
from bson import ObjectId
from datetime import datetime

from app.database import get_database
from app.models import Profile, ProfileUpdate
from app.auth import require_admin

router = APIRouter()

@router.get("/", response_model=Profile)
async def get_profile():
    """Get profile information (public endpoint)"""
    db = get_database()
    profile = await db.profile.find_one()
    
    if not profile:
        # Return default profile if none exists
        return {
            "name": "Mourish Antony C",
            "title": "Backend Developer",
            "bio": "Add your bio here",
            "email": "mourishantonyc@gmail.com",
            "whatsapp": "+916381032833",
            "updated_at": datetime.utcnow()
        }
    
    return Profile(**profile)

@router.put("/", response_model=Profile)
async def update_profile(profile: ProfileUpdate, _=Depends(require_admin)):
    """Update profile information (admin only)"""
    db = get_database()
    
    update_data = {k: v for k, v in profile.model_dump(exclude_unset=True).items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    update_data["updated_at"] = datetime.utcnow()
    
    existing_profile = await db.profile.find_one()
    
    if existing_profile:
        # Update existing profile
        await db.profile.update_one(
            {"_id": existing_profile["_id"]},
            {"$set": update_data}
        )
        updated_profile = await db.profile.find_one({"_id": existing_profile["_id"]})
    else:
        # Create new profile
        result = await db.profile.insert_one(update_data)
        updated_profile = await db.profile.find_one({"_id": result.inserted_id})
    
    # Convert _id to string for response
    if updated_profile:
        updated_profile["_id"] = str(updated_profile["_id"])
    
    return updated_profile

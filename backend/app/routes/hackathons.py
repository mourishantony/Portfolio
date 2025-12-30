from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from bson import ObjectId
from datetime import datetime

from app.database import get_database
from app.models import Hackathon, HackathonCreate, HackathonUpdate
from app.auth import require_admin

router = APIRouter()

@router.get("/", response_model=List[Hackathon])
async def get_all_hackathons():
    """Get all hackathons (public endpoint)"""
    db = get_database()
    hackathons = await db.hackathons.find().sort("order", 1).to_list(100)
    return [Hackathon(**hackathon) for hackathon in hackathons]

@router.get("/{hackathon_id}", response_model=Hackathon)
async def get_hackathon(hackathon_id: str):
    """Get a single hackathon by ID (public endpoint)"""
    db = get_database()
    if not ObjectId.is_valid(hackathon_id):
        raise HTTPException(status_code=400, detail="Invalid hackathon ID")
    
    hackathon = await db.hackathons.find_one({"_id": ObjectId(hackathon_id)})
    if not hackathon:
        raise HTTPException(status_code=404, detail="Hackathon not found")
    
    return Hackathon(**hackathon)

@router.post("/", response_model=Hackathon, status_code=status.HTTP_201_CREATED)
async def create_hackathon(hackathon: HackathonCreate, _=Depends(require_admin)):
    """Create a new hackathon (admin only)"""
    db = get_database()
    hackathon_dict = hackathon.model_dump()
    hackathon_dict["created_at"] = datetime.utcnow()
    hackathon_dict["updated_at"] = datetime.utcnow()
    
    result = await db.hackathons.insert_one(hackathon_dict)
    created_hackathon = await db.hackathons.find_one({"_id": result.inserted_id})
    
    return Hackathon(**created_hackathon)

@router.put("/{hackathon_id}", response_model=Hackathon)
async def update_hackathon(hackathon_id: str, hackathon: HackathonUpdate, _=Depends(require_admin)):
    """Update a hackathon (admin only)"""
    db = get_database()
    if not ObjectId.is_valid(hackathon_id):
        raise HTTPException(status_code=400, detail="Invalid hackathon ID")
    
    update_data = {k: v for k, v in hackathon.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.hackathons.update_one(
        {"_id": ObjectId(hackathon_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Hackathon not found")
    
    updated_hackathon = await db.hackathons.find_one({"_id": ObjectId(hackathon_id)})
    return Hackathon(**updated_hackathon)

@router.delete("/{hackathon_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_hackathon(hackathon_id: str, _=Depends(require_admin)):
    """Delete a hackathon (admin only)"""
    db = get_database()
    if not ObjectId.is_valid(hackathon_id):
        raise HTTPException(status_code=400, detail="Invalid hackathon ID")
    
    result = await db.hackathons.delete_one({"_id": ObjectId(hackathon_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Hackathon not found")
    
    return None

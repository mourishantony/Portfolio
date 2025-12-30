from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from bson import ObjectId
from datetime import datetime

from app.database import get_database
from app.models import Skill, SkillCreate, SkillUpdate
from app.auth import require_admin

router = APIRouter()

@router.get("/", response_model=List[Skill])
async def get_all_skills():
    """Get all skills (public endpoint)"""
    db = get_database()
    skills = await db.skills.find().sort("order", 1).to_list(100)
    return [Skill(**skill) for skill in skills]

@router.get("/{skill_id}", response_model=Skill)
async def get_skill(skill_id: str):
    """Get a single skill by ID (public endpoint)"""
    db = get_database()
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill ID")
    
    skill = await db.skills.find_one({"_id": ObjectId(skill_id)})
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    return Skill(**skill)

@router.post("/", response_model=Skill, status_code=status.HTTP_201_CREATED)
async def create_skill(skill: SkillCreate, _=Depends(require_admin)):
    """Create a new skill (admin only)"""
    db = get_database()
    skill_dict = skill.model_dump()
    skill_dict["created_at"] = datetime.utcnow()
    
    result = await db.skills.insert_one(skill_dict)
    created_skill = await db.skills.find_one({"_id": result.inserted_id})
    
    return Skill(**created_skill)

@router.put("/{skill_id}", response_model=Skill)
async def update_skill(skill_id: str, skill: SkillUpdate, _=Depends(require_admin)):
    """Update a skill (admin only)"""
    db = get_database()
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill ID")
    
    update_data = {k: v for k, v in skill.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await db.skills.update_one(
        {"_id": ObjectId(skill_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    updated_skill = await db.skills.find_one({"_id": ObjectId(skill_id)})
    return Skill(**updated_skill)

@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(skill_id: str, _=Depends(require_admin)):
    """Delete a skill (admin only)"""
    db = get_database()
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill ID")
    
    result = await db.skills.delete_one({"_id": ObjectId(skill_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    return None

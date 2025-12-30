from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from bson import ObjectId
from datetime import datetime

from app.database import get_database
from app.models import Project, ProjectCreate, ProjectUpdate
from app.auth import require_admin

router = APIRouter()

@router.get("/", response_model=List[Project])
async def get_all_projects():
    """Get all projects (public endpoint)"""
    db = get_database()
    projects = await db.projects.find().sort("order", 1).to_list(100)
    return [Project(**project) for project in projects]

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a single project by ID (public endpoint)"""
    db = get_database()
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    project = await db.projects.find_one({"_id": ObjectId(project_id)})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return Project(**project)

@router.post("/", response_model=Project, status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectCreate, _=Depends(require_admin)):
    """Create a new project (admin only)"""
    db = get_database()
    project_dict = project.model_dump()
    project_dict["created_at"] = datetime.utcnow()
    project_dict["updated_at"] = datetime.utcnow()
    
    result = await db.projects.insert_one(project_dict)
    created_project = await db.projects.find_one({"_id": result.inserted_id})
    
    return Project(**created_project)

@router.put("/{project_id}", response_model=Project)
async def update_project(project_id: str, project: ProjectUpdate, _=Depends(require_admin)):
    """Update a project (admin only)"""
    db = get_database()
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    update_data = {k: v for k, v in project.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    updated_project = await db.projects.find_one({"_id": ObjectId(project_id)})
    return Project(**updated_project)

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: str, _=Depends(require_admin)):
    """Delete a project (admin only)"""
    db = get_database()
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    result = await db.projects.delete_one({"_id": ObjectId(project_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return None

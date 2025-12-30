from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from bson import ObjectId
from datetime import datetime

from app.database import get_database
from app.models import ContactMessage, ContactMessageCreate
from app.auth import require_admin

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
async def send_contact_message(message: ContactMessageCreate):
    """Send a contact message (public endpoint)"""
    db = get_database()
    message_dict = message.model_dump()
    message_dict["created_at"] = datetime.utcnow()
    message_dict["read"] = False
    
    result = await db.contact_messages.insert_one(message_dict)
    
    return {"message": "Message sent successfully", "id": str(result.inserted_id)}

@router.get("/", response_model=List[ContactMessage])
async def get_all_messages(_=Depends(require_admin)):
    """Get all contact messages (admin only)"""
    db = get_database()
    messages = await db.contact_messages.find().sort("created_at", -1).to_list(100)
    return [ContactMessage(**message) for message in messages]

@router.patch("/{message_id}/read")
async def mark_message_read(message_id: str, _=Depends(require_admin)):
    """Mark a message as read (admin only)"""
    db = get_database()
    if not ObjectId.is_valid(message_id):
        raise HTTPException(status_code=400, detail="Invalid message ID")
    
    result = await db.contact_messages.update_one(
        {"_id": ObjectId(message_id)},
        {"$set": {"read": True}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"message": "Message marked as read"}

@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_message(message_id: str, _=Depends(require_admin)):
    """Delete a contact message (admin only)"""
    db = get_database()
    if not ObjectId.is_valid(message_id):
        raise HTTPException(status_code=400, detail="Invalid message ID")
    
    result = await db.contact_messages.delete_one({"_id": ObjectId(message_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return None

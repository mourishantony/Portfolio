from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from bson import ObjectId
from datetime import datetime

from app.database import get_database
from app.models import Certificate, CertificateCreate, CertificateUpdate
from app.auth import require_admin

router = APIRouter()

@router.get("/", response_model=List[Certificate])
async def get_all_certificates():
    """Get all certificates (public endpoint)"""
    db = get_database()
    certificates = await db.certificates.find().sort("order", 1).to_list(100)
    return [Certificate(**certificate) for certificate in certificates]

@router.get("/{certificate_id}", response_model=Certificate)
async def get_certificate(certificate_id: str):
    """Get a single certificate by ID (public endpoint)"""
    db = get_database()
    if not ObjectId.is_valid(certificate_id):
        raise HTTPException(status_code=400, detail="Invalid certificate ID")
    
    certificate = await db.certificates.find_one({"_id": ObjectId(certificate_id)})
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    return Certificate(**certificate)

@router.post("/", response_model=Certificate, status_code=status.HTTP_201_CREATED)
async def create_certificate(certificate: CertificateCreate, _=Depends(require_admin)):
    """Create a new certificate (admin only)"""
    db = get_database()
    certificate_dict = certificate.model_dump()
    certificate_dict["created_at"] = datetime.utcnow()
    
    result = await db.certificates.insert_one(certificate_dict)
    created_certificate = await db.certificates.find_one({"_id": result.inserted_id})
    
    return Certificate(**created_certificate)

@router.put("/{certificate_id}", response_model=Certificate)
async def update_certificate(certificate_id: str, certificate: CertificateUpdate, _=Depends(require_admin)):
    """Update a certificate (admin only)"""
    db = get_database()
    if not ObjectId.is_valid(certificate_id):
        raise HTTPException(status_code=400, detail="Invalid certificate ID")
    
    update_data = {k: v for k, v in certificate.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await db.certificates.update_one(
        {"_id": ObjectId(certificate_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    updated_certificate = await db.certificates.find_one({"_id": ObjectId(certificate_id)})
    return Certificate(**updated_certificate)

@router.delete("/{certificate_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_certificate(certificate_id: str, _=Depends(require_admin)):
    """Delete a certificate (admin only)"""
    db = get_database()
    if not ObjectId.is_valid(certificate_id):
        raise HTTPException(status_code=400, detail="Invalid certificate ID")
    
    result = await db.certificates.delete_one({"_id": ObjectId(certificate_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    return None

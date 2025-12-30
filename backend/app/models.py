from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        from pydantic_core import core_schema
        return core_schema.union_schema([
            core_schema.is_instance_schema(ObjectId),
            core_schema.no_info_plain_validator_function(cls.validate),
        ])

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        if isinstance(v, str) and ObjectId.is_valid(v):
            return ObjectId(v)
        raise ValueError("Invalid ObjectId")

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema, handler):
        field_schema.update(type="string")
        return field_schema

# Profile Model
class Profile(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str
    title: str
    bio: str
    email: str
    phone: Optional[str] = None
    whatsapp: str
    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    resume_link: Optional[str] = None
    profile_image: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    whatsapp: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    resume_link: Optional[str] = None
    profile_image: Optional[str] = None

# Project Model
class Project(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    description: str
    technologies: List[str]
    github_link: str
    demo_video_link: str  # Google Drive link
    live_link: Optional[str] = None
    thumbnail: Optional[str] = None
    order: int = 0
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github_link: str
    demo_video_link: str
    live_link: Optional[str] = None
    thumbnail: Optional[str] = None
    order: int = 0
    featured: bool = False

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    github_link: Optional[str] = None
    demo_video_link: Optional[str] = None
    live_link: Optional[str] = None
    thumbnail: Optional[str] = None
    order: Optional[int] = None
    featured: Optional[bool] = None

# Hackathon Model
class Hackathon(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str
    description: str
    position: str  # e.g., "Winner", "1st Place", "Runner Up"
    date: str
    technologies: List[str]
    project_title: str
    achievement_details: str
    certificate_link: Optional[str] = None  # Google Drive link
    thumbnail: Optional[str] = None
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class HackathonCreate(BaseModel):
    name: str
    description: str
    position: str
    date: str
    technologies: List[str]
    project_title: str
    achievement_details: str
    certificate_link: Optional[str] = None
    thumbnail: Optional[str] = None
    order: int = 0

class HackathonUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    position: Optional[str] = None
    date: Optional[str] = None
    technologies: Optional[List[str]] = None
    project_title: Optional[str] = None
    achievement_details: Optional[str] = None
    certificate_link: Optional[str] = None
    thumbnail: Optional[str] = None
    order: Optional[int] = None

# Skill Model
class Skill(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    category: str  # e.g., "Backend", "Frontend", "Database", "DevOps", "Tools"
    name: str
    proficiency: int = Field(ge=0, le=100)  # 0-100
    icon: Optional[str] = None
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class SkillCreate(BaseModel):
    category: str
    name: str
    proficiency: int = Field(ge=0, le=100)
    icon: Optional[str] = None
    order: int = 0

class SkillUpdate(BaseModel):
    category: Optional[str] = None
    name: Optional[str] = None
    proficiency: Optional[int] = Field(None, ge=0, le=100)
    icon: Optional[str] = None
    order: Optional[int] = None

# Certificate Model
class Certificate(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    issuer: str
    date: str
    description: Optional[str] = None
    certificate_link: str  # Google Drive link
    credential_id: Optional[str] = None
    thumbnail: Optional[str] = None
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class CertificateCreate(BaseModel):
    title: str
    issuer: str
    date: str
    description: Optional[str] = None
    certificate_link: str
    credential_id: Optional[str] = None
    thumbnail: Optional[str] = None
    order: int = 0

class CertificateUpdate(BaseModel):
    title: Optional[str] = None
    issuer: Optional[str] = None
    date: Optional[str] = None
    description: Optional[str] = None
    certificate_link: Optional[str] = None
    credential_id: Optional[str] = None
    thumbnail: Optional[str] = None
    order: Optional[int] = None

# Contact Message Model
class ContactMessage(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# Authentication Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str

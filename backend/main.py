from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.database import connect_to_mongo, close_mongo_connection
from app.routes import auth, projects, hackathons, skills, certificates, contact, profile

load_dotenv()

app = FastAPI(
    title="Portfolio Backend API",
    description="Backend API for Backend Developer Portfolio",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Events
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Routes
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(hackathons.router, prefix="/api/hackathons", tags=["Hackathons"])
app.include_router(skills.router, prefix="/api/skills", tags=["Skills"])
app.include_router(certificates.router, prefix="/api/certificates", tags=["Certificates"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])

@app.get("/")
async def root():
    return {"message": "Portfolio Backend API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

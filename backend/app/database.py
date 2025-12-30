from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, IndexModel
import os
from dotenv import load_dotenv

load_dotenv()

client: AsyncIOMotorClient = None
database = None

async def connect_to_mongo():
    global client, database
    try:
        mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        client = AsyncIOMotorClient(mongodb_url)
        database = client[os.getenv("DATABASE_NAME", "portfolio_db")]
        
        # Create indexes for better performance
        await database.projects.create_indexes([
            IndexModel([("order", ASCENDING)]),
            IndexModel([("created_at", ASCENDING)])
        ])
        
        print("✅ Connected to MongoDB successfully!")
    except Exception as e:
        print(f"❌ Error connecting to MongoDB: {e}")
        raise

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("✅ MongoDB connection closed")

def get_database():
    return database

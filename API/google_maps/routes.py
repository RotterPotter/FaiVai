from fastapi import APIRouter 
from config import settings


router = APIRouter(prefix="/google_maps", tags=["google_maps"])

@router.get("/API_KEY")
async def get_api_key():
    return {"API_KEY": settings.GOOGLE_MAPS_API_KEY}
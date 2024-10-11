from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OfferCreate(BaseModel):
    owner_id: int
    owner_name: str
    owner_rating: float
    reviews_count: int
    title: str
    category: str
    location: str
    datetime: datetime
    description: Optional[str] = None
    price: float

    class Config:
        orm_mode = True

class Offer(BaseModel):
    id: int
    owner_id: int
    owner_name: str
    owner_rating: float
    reviews_count: int
    title: str
    category: str
    location: str
    datetime: datetime
    description: Optional[str] = None
    price: float
    created_at: datetime

    class Config:
        orm_mode = True
from pydantic import BaseModel
from datetime import datetime

class Offer(BaseModel):
  owner_id: int
  owner_name: str
  owner_rating: int
  reviews_count: int
  title: str
  category: str
  location: str
  datetime: datetime
  description: str
  price: int
  class Config:
    orm_mode = True
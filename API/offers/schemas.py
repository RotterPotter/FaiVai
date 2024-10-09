from pydantic import BaseModel
from datetime import datetime

class Offer(BaseModel):
  owner_id: int
  title: str
  category: str
  location: str
  datetime: datetime
  description: str
  price: int
  class Config:
    orm_mode = True
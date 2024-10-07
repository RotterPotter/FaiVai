from pydantic import BaseModel

class Offer(BaseModel):
  title: str
  category: str
  location: str
  datetime: str
  description: str
  reward: int
  class Config:
    orm_mode = True
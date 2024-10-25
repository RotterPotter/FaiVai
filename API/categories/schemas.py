from pydantic import BaseModel
from service_types.models import ServiceType
from typing import Optional, List

class CategoryCreate(BaseModel):
    name: str
    service_types: Optional[List] = []

class Category(BaseModel):
    id: int
    name: str
    service_types: List = []

    class Config:
        orm_mode = True
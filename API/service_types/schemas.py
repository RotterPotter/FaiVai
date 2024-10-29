from pydantic import BaseModel
from typing import List

class ServiceTypeCreate(BaseModel):
  category_id: int
  available_units: List[str]
  name: str

class ServiceTypeReturn(BaseModel):
  id: int
  category_id: int
  available_units: List[str]
  name: str


  



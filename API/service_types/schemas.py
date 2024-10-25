from pydantic import BaseModel
from typing import List, Optional

class ServiceTypeCreate(BaseModel):
  category_id: int
  units: List[str]
  name: str
  description: Optional[str] = None
  
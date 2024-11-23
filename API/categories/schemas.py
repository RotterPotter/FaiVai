from pydantic import BaseModel
from service_types.models import ServiceType
from typing import Optional, List, Dict

class CategoryCreate(BaseModel):
  name: str
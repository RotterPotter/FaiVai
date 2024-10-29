from pydantic import BaseModel
from service_types.models import ServiceType
from typing import Optional, List

class CategoryCreate(BaseModel):
  name: str
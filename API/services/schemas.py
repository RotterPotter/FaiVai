from pydantic import BaseModel
from typing import List, Union
from datetime import datetime

class ServiceCreate(BaseModel):
    owner_id: int
    category: str
    service_type_id: int
    unit: str
    price_per_unit: float
    duration_in_minutes: int
    location_or_zone: Union[List[float], None]
    available_datetimes: List[datetime]
from pydantic import BaseModel, conlist
from typing import List, Union, Dict
from datetime import datetime

class ServiceCreate(BaseModel):
    owner_id: int
    category: str
    service_type_id: int
    unit: str
    price_per_unit: str
    speed_per_unit: int
    location_or_zone: Union[List[float], None]
    available_datetimes: Dict[str, List[List[str]]]  

class ServiceReturn(BaseModel):
    owner_id: int
    service_type_id: int
    unit: str
    price_per_unit: float
    speed_per_unit: float
    location_or_zone: str
    disabled: bool
    available_datetimes: List[List[datetime]]
    
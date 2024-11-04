from pydantic import BaseModel, conlist
from typing import List, Union, Dict, Optional
from datetime import datetime

class ServiceCreate(BaseModel):
    owner_id: int
    category: str
    service_type_id: int
    unit: str
    price_per_unit: str
    speed_per_unit: Optional[str]
    location_or_zone: Union[List[float], None]
    available_datetimes: Dict[str, List[List[str]]]  

class ServiceReturn(BaseModel):
    owner_id: int
    service_type_id: int
    unit: str
    price_per_unit: float
    speed_per_unit: Optional[float]
    location_or_zone: str
    disabled: bool
    available_datetimes: List[List[datetime]]

class ServiceSpecifiedReturn(BaseModel): 
    id: int
    owner_firstname: str
    owner_lastname: str
    owner_rating: float
    owner_reviews_count: int
    category_name: str
    service_type_name: str
    unit: str
    price_per_unit: float
    speed_per_unit: Optional[float]
    location_or_zone: str
    available_datetimes: List[List[datetime]]
    created_at: datetime

class ServiceByOwner(BaseModel):
    owner_id: str


class ServicesFilter(BaseModel):
    service_type_id: Optional[int]
    location_or_zone: Optional[str]
    unit: Optional[str]
    work_quantity: Optional[int]

    date: Optional[datetime]
    time_from: Optional[str]


    

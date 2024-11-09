from pydantic import BaseModel, conlist, Field
from typing import List, Union, Dict, Optional
from datetime import datetime


class ServiceCreate(BaseModel):
    owner_id: int
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
    service_type_id: Optional[int] = Field(
        None, description="ID of the service type")
    location_or_zone: Optional[List[str]] = Field(
        None, description="Location or zone of the service")
    unit: Optional[str] = Field(None, description="Unit of the service")
    work_quantity: Optional[int] = Field(None, description="Quantity of work")
    date: Optional[datetime] = Field(None, description="Date of the service")
    time_from: Optional[str] = Field(
        None, description="Start time of the service in HH:MM format")


class FindServices(BaseModel):
    service_type_id: int
    location_type: str
    location_or_zone: str
    unit: str
    work_quantity: int
    # [year, month, day, hours, minutes] - datetime from
    year_month_day_hours_minutes: List[int]


class FindServicesReturn(BaseModel):
    owner_id: int
    owner_firstname: str
    owner_lastname: str
    owner_rating: float
    owner_reviews_count: int
    price: int
    job_duration: int
    location_or_zone: str

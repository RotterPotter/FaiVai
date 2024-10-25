from __future__ import annotations
import sqlalchemy.orm as orm
from datetime import datetime
from database import Base
from sqlalchemy import ARRAY, Float, DateTime
from typing import Union

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from auth.models import User  # Import User for type checking only
    from service_types.models import ServiceType  # Import ServiceType for type checking only
    from categories.models import Category


class Service(Base):
  __tablename__ = "services"

  id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
  owner: orm.Mapped[User] = orm.relationship("User", back_populates="service")
  

  category: orm.Mapped[Category] = orm.relationship("Category")
  service_type: orm.Mapped[ServiceType] = orm.relationship("ServiceType")
  price_per_unit: orm.Mapped[float] # price in euros
  unit: orm.Mapped[str]
  duration_in_minutes: orm.Mapped[int]
  location_or_zone: orm.Mapped[Union[list[float], None]] = orm.mapped_column(ARRAY(Float), default=None)
  available_datetimes: orm.Mapped[list[datetime]] = orm.mapped_column(ARRAY(DateTime))
  disabled: orm.Mapped[bool] = orm.mapped_column(default=False)
  
  

  


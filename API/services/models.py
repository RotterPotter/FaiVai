from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import  ForeignKey,  DateTime, ARRAY, JSON
import sqlalchemy.orm as orm
from database import Base
from datetime import datetime

if TYPE_CHECKING:
    from auth.models import User  # Import User for type checking only
    from service_types.models import ServiceType  # Import ServiceType for type checking only
    

class Service(Base):
    __tablename__ = "services"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    owner_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))
    service_type_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("service_types.id"))

    unit: orm.Mapped[str]
    price_per_unit: orm.Mapped[float]
    speed_per_unit: orm.Mapped[Optional[float]] = orm.mapped_column(default=None) # in minutes
    location_or_zone: orm.Mapped[str]
    disabled: orm.Mapped[bool] = orm.mapped_column(default=False)
    available_datetimes: orm.Mapped[List[List[datetime]]] = orm.mapped_column(ARRAY(DateTime))
    created_at: orm.Mapped[datetime] = orm.mapped_column(DateTime, default=datetime.now)

    owner: orm.Mapped["User"] =  orm.relationship("User", back_populates="services")
    service_type: orm.Mapped["ServiceType"] = orm.relationship("ServiceType", back_populates="services")
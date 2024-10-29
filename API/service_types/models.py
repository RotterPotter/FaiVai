import sqlalchemy.orm as orm
from database import Base
from typing import TYPE_CHECKING, List
from sqlalchemy import ARRAY, ForeignKey, String

if TYPE_CHECKING:
  from categories.models import Category
  from services.models import Service

class ServiceType(Base):
  __tablename__ = "service_types"

  id:orm.Mapped[int] = orm.mapped_column(primary_key=True)
  category_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("categories.id"))

  name: orm.Mapped[str]
  available_units: orm.Mapped[List[str]] = orm.mapped_column(ARRAY(String))

  category: orm.Mapped["Category"] =  orm.relationship("Category", back_populates="service_types")
  services: orm.Mapped[List["Service"]] = orm.relationship("Service", back_populates="service_type", cascade="all, delete-orphan")


  

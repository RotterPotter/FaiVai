import sqlalchemy.orm as orm
from datetime import datetime
from database import Base
from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
  from service_types.models import ServiceType



class Category(Base):
  __tablename__ = "categories"

  id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
  name: orm.Mapped[str]
  
  service_types: orm.Mapped[List["ServiceType"]] = orm.relationship("ServiceType", back_populates="category", cascade="all, delete-orphan")
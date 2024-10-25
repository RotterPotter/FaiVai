import sqlalchemy.orm as orm
from datetime import datetime
from database import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
  from service_types.models import ServiceType



class Category(Base):
  __tablename__ = "categories"

  id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
  service_types: orm.Mapped[list["ServiceType"]] = orm.relationship("ServiceType", back_populates="category", cascade="all, delete-orphan")
  
  name: orm.Mapped[str]
  
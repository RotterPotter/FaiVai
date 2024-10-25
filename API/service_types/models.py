import sqlalchemy.orm as orm
from datetime import datetime
from database import Base
from auth.models import User
from typing import TYPE_CHECKING
from typing import Union
from sqlalchemy import ARRAY, String

if TYPE_CHECKING:
  from categories.models import Category

class ServiceType(Base):
  __tablename__ = "service_types"

  id:orm.Mapped[int] = orm.mapped_column(primary_key=True)
  category:orm.Mapped["Category"] = orm.relationship("Category", back_populates="service_type")
  units:orm.Mapped[list[str]] = orm.mapped_column(ARRAY(String))
  name: orm.Mapped[str]

  description: orm.Mapped[Union[str, None]] = orm.mapped_column(default=None)

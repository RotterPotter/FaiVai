import sqlalchemy.orm as orm
from database import Base
from datetime import datetime


class Offer(Base):
  __tablename__ = "offers"

  
  id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
  owner_id: orm.Mapped[int]
  title: orm.Mapped[str]
  category: orm.Mapped[str]
  location: orm.Mapped[str]
  datetime: orm.Mapped[datetime]
  description: orm.Mapped[str]
  price: orm.Mapped[int]

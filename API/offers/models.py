import sqlalchemy.orm as orm
from datetime import datetime
from database import Base

class Offer(Base):
    __tablename__ = "offers"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    owner_id: orm.Mapped[int]
    owner_name: orm.Mapped[str]
    owner_rating: orm.Mapped[float]
    reviews_count: orm.Mapped[int]
    title: orm.Mapped[str]
    category: orm.Mapped[str]
    location: orm.Mapped[str]
    datetime: orm.Mapped[datetime]
    description: orm.Mapped[str]
    price: orm.Mapped[float]
    created_at: orm.Mapped[datetime] = orm.mapped_column(default=datetime.utcnow)
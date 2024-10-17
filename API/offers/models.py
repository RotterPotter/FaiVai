import sqlalchemy.orm as orm
from datetime import datetime
from database import Base
import pytz

# Define your local timezone
LOCAL_TIMEZONE = pytz.timezone('Europe/Rome')  # Replace with your local timezone

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
    currency: orm.Mapped[str]
    created_at: orm.Mapped[datetime] = orm.mapped_column(default=lambda: datetime.now(LOCAL_TIMEZONE))
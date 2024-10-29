from database import Base
import sqlalchemy.orm as orm  
from sqlalchemy import ForeignKey
from datetime import datetime

class Review(Base):
  __tablename__ = "reviews"

  id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
  author_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))
  reciever_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))

  comment: orm.Mapped[str]
  rating: orm.Mapped[float]
  created_at: orm.Mapped[datetime] = orm.mapped_column(default=datetime.utcnow)

  author = orm.relationship("User", back_populates="created_reviews", foreign_keys=[author_id])
  reciever = orm.relationship("User", back_populates="received_reviews", foreign_keys=[reciever_id])
  
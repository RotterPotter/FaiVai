import sqlalchemy.orm as orm
from datetime import datetime
from database import Base
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from services.models import Service
    from reviews.models import Review

class User(Base):
    __tablename__ = "users"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    firstname: orm.Mapped[str]
    lastname: orm.Mapped[str]
    email: orm.Mapped[str]
    hashed_password: orm.Mapped[str]
    rating: orm.Mapped[float] = orm.mapped_column(default=0)
    email_verified: orm.Mapped[bool] = orm.mapped_column(default=False)
    disabled: orm.Mapped[bool] = orm.mapped_column(default=False)
    avatar: orm.Mapped[Optional[str]] = orm.mapped_column(default=None)

    
    services: orm.Mapped[list["Service"]] = orm.relationship("Service", back_populates="owner", cascade="all, delete-orphan")
    
class TokenBlacklist(Base):
    __tablename__ = 'token_blacklist'
    token: orm.Mapped[str] = orm.mapped_column(primary_key=True, index=True)
    blacklisted_on: orm.Mapped[datetime] = orm.mapped_column(default=datetime.utcnow)
    expires_at: orm.Mapped[datetime]

class EmailCode(Base):
    __tablename__ = 'email_codes'

    email: orm.Mapped[str] = orm.mapped_column(primary_key=True)
    code: orm.Mapped[str]

# Ensure that the Review class is defined after the User class
from reviews.models import Review

User.created_reviews = orm.relationship("Review", back_populates="author", cascade="all, delete-orphan", foreign_keys=[Review.author_id])
User.received_reviews = orm.relationship("Review", back_populates="reciever", cascade="all, delete-orphan", foreign_keys=[Review.reciever_id])

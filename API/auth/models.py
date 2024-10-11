import sqlalchemy.orm as orm
from datetime import datetime
from database import Base
from typing import Optional

class User(Base):
  __tablename__ = "users"

  id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
  firstname: orm.Mapped[Optional[str]] = orm.mapped_column(nullable=True, default=None)
  lastname: orm.Mapped[Optional[str]] = orm.mapped_column(nullable=True, default=None)
  email: orm.Mapped[str]
  hashed_password: orm.Mapped[str]
  disabled: orm.Mapped[bool] = orm.mapped_column(default=True)
  email_verified: orm.Mapped[bool] = orm.mapped_column(default=False)
  rating: orm.Mapped[float] = orm.mapped_column(default=0.0)
  reviews_count: orm.Mapped[int] = orm.mapped_column(default=0)

class TokenBlacklist(Base):
  __tablename__ = 'token_blacklist'
  token: orm.Mapped[str] = orm.mapped_column(primary_key=True, index=True)
  blacklisted_on: orm.Mapped[datetime] = orm.mapped_column(default=datetime.utcnow)
  expires_at: orm.Mapped[datetime]

class EmailCode(Base):
  __tablename__ = 'email_codes'

  email: orm.Mapped[str] = orm.mapped_column(primary_key=True)
  code: orm.Mapped[str]
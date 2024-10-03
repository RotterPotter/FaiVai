import sqlalchemy.orm as orm
from datetime import datetime
from database import Base
from typing import Optional

class User(Base):
  __tablename__ = "users"

  id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
  firstname: orm.Mapped[Optional[str]] = orm.mapped_column(nullable=True)
  lastname: orm.Mapped[Optional[str]] = orm.mapped_column(nullable=True)
  email: orm.Mapped[str]
  hashed_password: orm.Mapped[str]
  disabled: orm.Mapped[bool] = orm.mapped_column(default=True)
  email_verified: orm.Mapped[bool] = orm.mapped_column(default=False)

class TokenBlacklist(Base):
  __tablename__ = 'token_blacklist'
  token: orm.Mapped[str] = orm.mapped_column(primary_key=True, index=True)
  blacklisted_on: orm.Mapped[datetime] = orm.mapped_column(default=datetime.utcnow)
  expires_at: orm.Mapped[datetime]
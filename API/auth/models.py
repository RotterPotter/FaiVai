import sqlalchemy.orm as orm
from database import Base

class User(Base):
  __tablename__ = "users"

  id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
  name: orm.Mapped[str]
  email: orm.Mapped[str]
  hashed_password: orm.Mapped[str]
  disabled: orm.Mapped[bool] = orm.mapped_column(default=True)

from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy import create_engine
from config import settings

# Base for models
class Base(DeclarativeBase):
  pass

db_engine = None
DBSession = None

def connect():
  global db_engine
  global DBSession

  # Engine
  db_engine = create_engine(settings.DATABASE_URL, echo=True)

  # Create all tables stored in base metadata 
  Base.metadata.drop_all(bind=db_engine)
  Base.metadata.create_all(bind=db_engine)

  # Bind engine to the class of sessions
  DBSession = sessionmaker(bind=db_engine)

  #  Create admin user
  from auth.models import User
  from auth.service import hash_password 
  from datetime import datetime
  db_session = DBSession()
  admin = User( email='admin@gmail.com', hashed_password=hash_password('admin'), email_verified=True, firstname='Admin', lastname='Admin', rating=5.0, reviews_count=0)
  db_session.add(admin)
  db_session.commit()


def get_db():
  if DBSession is None:
    connect()

  # Create an instance of Session
  db_session = DBSession()

  # Yields current db_session. In the end of the process closes connection.
  try:
    yield db_session
  finally:
    db_session.close()


  



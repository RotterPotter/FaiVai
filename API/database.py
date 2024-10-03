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


  



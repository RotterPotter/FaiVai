import json
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
    db_engine = create_engine(f"postgresql+psycopg2://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.HOST}:{settings.PORT}/{settings.POSTGRES_DB}", echo=True)

    # Create all tables stored in base metadata 
    Base.metadata.drop_all(bind=db_engine)
    Base.metadata.create_all(bind=db_engine)

    # Bind engine to the class of sessions
    DBSession = sessionmaker(bind=db_engine)

    # Load initial data from JSON file
    with open('initial_data.json') as f:
        initial_data = json.load(f)

    # Create admin user
    from auth.models import User
    from auth.service import hash_password 
    db_session = DBSession()
    admin_data = initial_data['admin']
    admin = User(
        email=admin_data['email'],
        hashed_password=hash_password(admin_data['password']),
        email_verified=admin_data['email_verified'],
        firstname=admin_data['firstname'],
        lastname=admin_data['lastname']
    )
    db_session.add(admin)

    # Create default categories
    from categories.models import Category
    for category in initial_data['categories']:
        db_session.add(Category(name=category))

    # Create default service types
    from service_types.models import ServiceType
    for service_type in initial_data['service_types']:
        db_session.add(ServiceType(
            name=service_type['name'],
            category_id=service_type['category_id'],
            available_units=service_type['available_units']
        ))

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
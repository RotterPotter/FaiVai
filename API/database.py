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

    # Create admin user
    from auth.models import User
    from auth.service import hash_password 
    from datetime import datetime
    db_session = DBSession()
    admin = User(email='admin@gmail.com', hashed_password=hash_password('admin'), email_verified=True, firstname='Admin', lastname='Admin')
    db_session.add(admin)

    # Create default categories
    from categories.models import Category
    categories = ['Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Gardening', 'Painting', 'Moving', 'Delivery', 'Handyman']
    for category in categories:
        db_session.add(Category(name=category))

    # Create default service types
    from service_types.models import ServiceType
    service_types = [
        {'name': 'House Cleaning', 'category_id': 1, 'available_units': ['Hour', 'Room']},
        {'name': 'Drain Cleaning', 'category_id': 2, 'available_units': ['Hour']},
        {'name': 'Electrical Installation', 'category_id': 3, 'available_units': ['Hour']},
        {'name': 'Furniture Assembly', 'category_id': 4, 'available_units': ['Hour']},
        {'name': 'Lawn Mowing', 'category_id': 5, 'available_units': ['Hour']},
        {'name': 'Interior Painting', 'category_id': 6, 'available_units': ['Hour']},
        {'name': 'Moving', 'category_id': 7, 'available_units': ['Hour']},
        {'name': 'Delivery', 'category_id': 8, 'available_units': ['Hour']},
        {'name': 'Handyman', 'category_id': 9, 'available_units': ['Hour']}
    ]
    for service_type in service_types:
        db_session.add(ServiceType(name=service_type['name'], category_id=service_type['category_id'], available_units=service_type['available_units']))

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
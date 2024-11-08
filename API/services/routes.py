from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
import services.schemas
import services.models
import auth.models
import categories.models
import service_types.models
import database
import datetime
from typing import List
from sqlalchemy import or_

router = APIRouter(prefix='/services', tags=['services'])

@router.get('/all', status_code=status.HTTP_200_OK)
def get_all_services(db_session: Session = Depends(database.get_db)):
  return db_session.query(services.models.Service).all()
  
@router.post('/get_by_owner', status_code=status.HTTP_200_OK)
async def get_services_by_owner(schema: services.schemas.ServiceByOwner, db_session: Session = Depends(database.get_db)):
  owner_id = int(schema.owner_id)
  services_in_db = db_session.query(services.models.Service).filter_by(owner_id=owner_id).all()
  specified_services = []
  

  for service in services_in_db:
    specified_service = services.schemas.ServiceSpecifiedReturn(
      id=service.id,
      owner_firstname=service.owner.firstname,
      owner_lastname=service.owner.lastname,
      owner_rating=service.owner.rating,
      owner_reviews_count=len(service.owner.received_reviews),
      category_name=service.service_type.category.name,
      service_type_name=service.service_type.name,
      unit=service.unit,
      price_per_unit=service.price_per_unit,
      speed_per_unit=service.speed_per_unit,
      location_or_zone=service.location_or_zone,
      available_datetimes=service.available_datetimes,
      created_at=service.created_at
    )
    specified_services.append(specified_service)

  return specified_services

@router.post('/create_test_data', status_code=status.HTTP_201_CREATED)
async def create_test_data(quantity:int, db_session: Session = Depends(database.get_db)):
  for _ in range(quantity):
    owner = db_session.query(auth.models.User).first()
    service_type = db_session.query(service_types.models.ServiceType).first()
    service = services.models.Service(
      owner=owner,
      service_type=service_type,
      price_per_unit=10.0,
      unit='GB',
      speed_per_unit=1,
      location_or_zone='Nairobi',
      available_datetimes=create_schedule(data={'monday': [['08:00', '09:00'], ['10:00', '11:00']]}, quantity=7)
    )
    db_session.add(service)
    db_session.commit()
  return {"detail": "Test data created"}

@router.post('/create', status_code=status.HTTP_201_CREATED)
async def create_service(
  service_schema: services.schemas.ServiceCreate,
  db_session: Session = Depends(database.get_db),
):
  owner = db_session.query(auth.models.User).filter_by(id=service_schema.owner_id).first()
  category = db_session.query(categories.models.Category).filter_by(name=service_schema.category).first()
  service_type = db_session.query(service_types.models.ServiceType).filter_by(id=service_schema.service_type_id).first()

        
  if not owner:
    raise HTTPException(status_code=404, detail="Owner not found")
  if not category:
    raise HTTPException(status_code=404, detail="Category not found")
  if not service_type:
    raise HTTPException(status_code=404, detail="ServiceType not found")

  service = services.models.Service(
    owner=owner,
    service_type=service_type,
    price_per_unit=float(service_schema.price_per_unit),
    unit=service_schema.unit,
    speed_per_unit=service_schema.speed_per_unit,
    location_or_zone=service_schema.location_or_zone,
    available_datetimes=create_schedule(data=service_schema.available_datetimes, quantity=7)
  )

  db_session.add(service)
  db_session.commit()
  db_session.refresh(service)
  return service

@router.get('/{service_id}', response_model=services.schemas.ServiceSpecifiedReturn)
async def get_service(service_id: int, db_session: Session = Depends(database.get_db)):
  service = db_session.query(services.models.Service).filter_by(id=service_id).first()

  if not service:
    raise HTTPException(status_code=404, detail="Service not found")
  
  specified_service = services.schemas.ServiceSpecifiedReturn(
      id=service.id,
      owner_firstname=service.owner.firstname,
      owner_lastname=service.owner.lastname,
      owner_rating=service.owner.rating,
      owner_reviews_count=len(service.owner.received_reviews),
      category_name=service.service_type.category.name,
      service_type_name=service.service_type.name,
      unit=service.unit,
      price_per_unit=service.price_per_unit,
      speed_per_unit=service.speed_per_unit,
      location_or_zone=service.location_or_zone,
      available_datetimes=service.available_datetimes,
      created_at=service.created_at
    )

  return specified_service

 

@router.delete('/{service_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_service(service_id: int, db_session: Session = Depends(database.get_db)):
  service = db_session.query(services.models.Service).filter_by(id=service_id).first()

  if not service:
    raise HTTPException(status_code=404, detail="Service not found")

  db_session.delete(service)
  db_session.commit()
  return {"detail": "Service deleted"}

@router.put('/{service_id}', response_model=services.schemas.ServiceCreate)
async def update_service(
  service_id: int,
  service_schema: services.schemas.ServiceCreate,
  db_session: Session = Depends(database.get_db),
):
  service = db_session.query(services.models.Service).filter_by(id=service_id).first()

  if not service:
    raise HTTPException(status_code=404, detail="Service not found")

  owner = db_session.query(auth.models.User).filter_by(id=service_schema.owner_id).first()
  category = db_session.query(categories.models.Category).filter_by(name=service_schema.category).first()
  service_type = db_session.query(service_types.models.ServiceType).filter_by(id=service_schema.service_type_id).first()

  if not owner:
    raise HTTPException(status_code=404, detail="Owner not found")
  if not category:
    raise HTTPException(status_code=404, detail="Category not found")
  if not service_type:
    raise HTTPException(status_code=404, detail="ServiceType not found")

  service.owner = owner
  service.category = category
  service.service_type = service_type
  service.price_per_unit = service_schema.price_per_unit
  service.unit = service_schema.unit
  service.duration_in_minutes = service_schema.duration_in_minutes
  service.location_or_zone = service_schema.location_or_zone
  # service.available_datetimes = create_schedule(data=service_schema.available_datetimes, quantity=4)

  db_session.commit()
  db_session.refresh(service)
  return service


def create_schedule(data: dict, quantity:int) -> list: # list of lists from two values (list of ranges [from datetime, to datetime])
  datetimes = []
  for day, time_list in data.items():
    for time_range in time_list: 
      ranges = create_datetime_ranges(day, quantity, time_range[0], time_range[1])
      datetimes.extend(ranges)
  return datetimes



def create_datetime_ranges(day_of_a_week: str, quantity: int, from_time: str, to_time: str) -> List[List[datetime.datetime]]:
    # Map day names to weekday numbers
    days_map = {
        'monday': 0,
        'tuesday': 1,
        'wednesday': 2,
        'thursday': 3,
        'friday': 4,
        'saturday': 5,
        'sunday': 6
    }

    # Parse from_time and to_time strings into datetime.time objects
    from_time_obj = datetime.datetime.strptime(from_time, '%H:%M').time()
    to_time_obj = datetime.datetime.strptime(to_time, '%H:%M').time()

    # Get the current datetime
    date_now = datetime.datetime.now()

    # Find the nearest datetime with the specified day_of_a_week
    target_weekday = days_map[day_of_a_week.lower()]
    days_ahead = target_weekday - date_now.weekday()
    if days_ahead <= 0:
        days_ahead += 7

    # Create the first datetime with the specified day_of_a_week and from_time
    first_from_datetime = datetime.datetime.combine(date_now + datetime.timedelta(days=days_ahead), from_time_obj)
    first_to_datetime = datetime.datetime.combine(date_now + datetime.timedelta(days=days_ahead), to_time_obj)

    # Create the list of datetime ranges
    datetime_ranges = [[first_from_datetime, first_to_datetime]]
    for _ in range(1, quantity):
        next_from_datetime = first_from_datetime + datetime.timedelta(weeks=_)
        next_to_datetime = first_to_datetime + datetime.timedelta(weeks=_)
        datetime_ranges.append([next_from_datetime, next_to_datetime])

    return datetime_ranges


@router.post('/find', status_code=status.HTTP_200_OK) 
async def find_services(schema: services.schemas.FindServices, db_session: Session = Depends(database.get_db)):
  services_to_return = []
  services_by_service_type_id = db_session.query(services.models.Service).filter_by(service_type_id=schema.service_type_id).all()
  location = ''

  if schema.location_type == 'online':
    location = 'online'
  elif schema.location_type == 'onsite':
    location = 'Your location'
  elif schema.location_type == 'zone' or 'location':
    location = schema.location_or_zone

  for service in services_by_service_type_id:
    # check location
    if service.location_or_zone != schema.location_or_zone:
      continue
    date_from = datetime.datetime(*schema.year_month_day_hours_minutes)
    # check date
    job_duration = int(service.speed_per_unit * schema.work_quantity) # in minutes
    if not check_worker_availability(service.available_datetimes, date_from, job_duration):
      continue

    services_to_return.append(services.schemas.FindServicesReturn(
      owner_id=service.owner_id,
      owner_firstname=service.owner.firstname,
      owner_lastname=service.owner.lastname,
      owner_rating=service.owner.rating,
      owner_reviews_count=len(service.owner.received_reviews),
      price=service.price_per_unit * schema.work_quantity,
      job_duration=job_duration,
      location_or_zone=location
    ))

  return services_to_return
    

  

def check_worker_availability(available_datetimes: List[datetime.datetime], date_from: datetime.datetime, job_duration: int) -> bool:
  date_now = datetime.datetime.now()
  for date in available_datetimes:
    if (date[0] - date_now) >= 0:
      if (date_from - date[0]) >= 0:
        if (date[1] - date_from) >= job_duration:
          return True
  return False

  



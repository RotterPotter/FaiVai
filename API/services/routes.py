from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
import services.schemas
import services.models
import auth.models
import categories.models
import service_types.models
import database

router = APIRouter(prefix='/services', tags=['services'])

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
    category=category,
    service_type=service_type,
    price_per_unit=service_schema.price_per_unit,
    unit=service_schema.unit,
    duration_in_minutes=service_schema.duration_in_minutes,
    location_or_zone=service_schema.location_or_zone,
    available_datetimes=service_schema.available_datetimes
  )

  db_session.add(service)
  db_session.commit()
  db_session.refresh(service)
  return service

@router.get('/{service_id}', response_model=services.schemas.ServiceCreate)
async def get_service(service_id: int, db_session: Session = Depends(database.get_db)):
  service = db_session.query(services.models.Service).filter_by(id=service_id).first()

  if not service:
    raise HTTPException(status_code=404, detail="Service not found")

  return service

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
  service.available_datetimes = service_schema.available_datetimes

  db_session.commit()
  db_session.refresh(service)
  return service
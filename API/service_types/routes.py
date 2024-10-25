from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
import service_types.schemas
import categories.models
import service_types.models
import database

router = APIRouter(prefix='/service_type', tags=['service_types'])

@router.post('/create', status_code=status.HTTP_201_CREATED)
async def create_service_type(
  service_type_schema: service_types.schemas.ServiceTypeCreate,
  db_session: Session = Depends(database.get_db),
):
  category = db_session.query(categories.models.Category).filter_by(id=service_type_schema.category_id).first()

  if not category:
    raise HTTPException(status_code=404, detail="Category not found")

  service_type = service_types.models.ServiceType(
    name=service_type_schema.name,
    category=category,
    units=service_type_schema.units,
    description=service_type_schema.description
  )

  db_session.add(service_type)
  db_session.commit()
  db_session.refresh(service_type)
  return service_type

@router.get('/{service_type_id}', response_model=service_types.schemas.ServiceTypeCreate)
async def get_service_type(service_type_id: int, db_session: Session = Depends(database.get_db)):
  service_type = db_session.query(service_types.models.ServiceType).filter_by(id=service_type_id).first()

  if not service_type:
    raise HTTPException(status_code=404, detail="ServiceType not found")

  return service_type

@router.delete('/{service_type_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_service_type(service_type_id: int, db_session: Session = Depends(database.get_db)):
  service_type = db_session.query(service_types.models.ServiceType).filter_by(id=service_type_id).first()

  if not service_type:
    raise HTTPException(status_code=404, detail="ServiceType not found")

  db_session.delete(service_type)
  db_session.commit()
  return {"detail": "ServiceType deleted"}

@router.put('/{service_type_id}', response_model=service_types.schemas.ServiceTypeCreate)
async def update_service_type(
  service_type_id: int,
  service_type_schema: service_types.schemas.ServiceTypeCreate,
  db_session: Session = Depends(database.get_db),
):
  service_type = db_session.query(service_types.models.ServiceType).filter_by(id=service_type_id).first()

  if not service_type:
    raise HTTPException(status_code=404, detail="ServiceType not found")

  category = db_session.query(categories.models.Category).filter_by(id=service_type_schema.category_id).first()

  if not category:
    raise HTTPException(status_code=404, detail="Category not found")

  service_type.name = service_type_schema.name
  service_type.category = category
  service_type.units = service_type_schema.units
  service_type.description = service_type_schema.description

  db_session.commit()
  db_session.refresh(service_type)
  return service_type
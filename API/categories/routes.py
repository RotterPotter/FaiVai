from fastapi import APIRouter, status, Depends, HTTPException
import database
from sqlalchemy.orm import Session
import categories.schemas
import categories.models
import service_types.models

router = APIRouter(prefix='/category', tags=['categories'])

@router.post('/create', status_code=status.HTTP_201_CREATED)
def create_category(
  category_schema: categories.schemas.CategoryCreate,
  db_session: Session = Depends(database.get_db)
):
  new_category = categories.models.Category(
    name=category_schema.name
  )

  db_session.add(new_category)
  db_session.commit()
  db_session.refresh(new_category)
  return new_category

@router.get('/{category_id}', response_model=categories.schemas.Category)
def get_category(category_id: int, db_session: Session = Depends(database.get_db)):
  category = db_session.query(categories.models.Category).filter(categories.models.Category.id == category_id).first()

  if not category:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

  return category

@router.delete('/{category_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: int, db_session: Session = Depends(database.get_db)):
  category = db_session.query(categories.models.Category).filter(categories.models.Category.id == category_id).first()

  if not category:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

  db_session.delete(category)
  db_session.commit()
  return {"detail": "Category deleted"}

@router.put('/{category_id}', response_model=categories.schemas.Category)
def update_category(
  category_id: int,
  category_schema: categories.schemas.CategoryCreate,
  db_session: Session = Depends(database.get_db)
):
  category = db_session.query(categories.models.Category).filter(categories.models.Category.id == category_id).first()

  if not category:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

  category.name = category_schema.name
  category.service_types = [db_session.query(service_types.models.ServiceType).filter(service_types.models.ServiceType.id == st.id).first() for st in category_schema.service_types]

  db_session.commit()
  db_session.refresh(category)
  return category

@router.put('/update/{category_id}', status_code=status.HTTP_200_OK)  
def add_service_type_to_category(
  category_id: int,
  service_type_id: int,
  db_session: Session = Depends(database.get_db)
):
  category = db_session.query(categories.models.Category).filter(categories.models.Category.id == category_id).first()
  service_type = db_session.query(service_types.models.ServiceType).filter(service_types.models.ServiceType.id == service_type_id).first()

  if not category or not service_type:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category or Service Type not found")

  category.service_types.append(service_type)
  db_session.commit()
  db_session.refresh(category)
  return category
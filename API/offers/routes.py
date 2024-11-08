from fastapi import APIRouter, status, Depends, HTTPException
import offers.schemas
import offers.models
import database
from sqlalchemy.orm import Session
from sqlalchemy import  or_
from typing import Union
from datetime import datetime
from faker import Faker
import auth.models 
import auth.service 

router = APIRouter(prefix='/offers', tags=['offers'])
fake = Faker()

@router.post('/create', status_code=status.HTTP_201_CREATED)
async def create_offer(
  offer_schema: offers.schemas.OfferCreate,
  db_session: Session = Depends(database.get_db)
):
  offer = offers.models.Offer(
    owner_id=offer_schema.owner_id,
    owner_name=offer_schema.owner_name,
    owner_rating=offer_schema.owner_rating,
    reviews_count=offer_schema.reviews_count,
    title=offer_schema.title,
    category=offer_schema.category,
    location=offer_schema.location,
    datetime=offer_schema.datetime,
    description=offer_schema.description,
    price=int(offer_schema.price),
    currency=offer_schema.currency,
    created_at=datetime.now()
  )
  db_session.add(offer)
  db_session.commit()
  return {'msg': 'Offer created successfully'}

@router.get('/all{sort}', status_code=status.HTTP_200_OK)
async def get_all_offers(sort:str, db_session: Session = Depends(database.get_db)):
  if sort == 'created_at_desc':
    offers_all = db_session.query(offers.models.Offer).order_by(offers.models.Offer.created_at.desc()).all()
  elif sort == 'created_at_asc':
    offers_all = db_session.query(offers.models.Offer).order_by(offers.models.Offer.created_at).all()
  elif sort == 'price_h':
    offers_all = db_session.query(offers.models.Offer).order_by(offers.models.Offer.price.desc()).all()
  elif sort == 'price_l':
    offers_all = db_session.query(offers.models.Offer).order_by(offers.models.Offer.price).all()
  elif sort == 'rating_h':
    offers_all = db_session.query(offers.models.Offer).order_by(offers.models.Offer.owner_rating.desc()).all()
  elif sort == 'rating_l':
    offers_all = db_session.query(offers.models.Offer).order_by(offers.models.Offer.owner_rating).all()
  else:
    offers_all = db_session.query(offers.models.Offer).all()

  return offers_all

@router.get('/search/all', status_code=status.HTTP_200_OK)
async def search_offers(query: str, db_session: Session = Depends(database.get_db)):
    offers_all = db_session.query(offers.models.Offer).filter(
        or_(
            offers.models.Offer.title.ilike(f'%{query}%'),
            offers.models.Offer.description.ilike(f'%{query}%'),
            offers.models.Offer.price.ilike(f'%{query}%'),
            offers.models.Offer.category.ilike(f'%{query}%'),
            offers.models.Offer.datetime.ilike(f'%{query}%')
        )
    ).all()
    return offers_all

@router.get('/search/column', status_code=status.HTTP_200_OK)
async def search_offers(query: str, column: str, limit: int = 10, offset: int = 0, db_session: Session = Depends(database.get_db)):
    # Validate the column name to prevent SQL injection
    valid_columns = ['title', 'description', 'price', 'category', 'datetime']
    if column not in valid_columns:
        raise HTTPException(status_code=400, detail="Invalid column name")

    # Dynamically build the filter condition
    filter_condition = getattr(offers.models.Offer, column).ilike(f'%{query}%')
    
    # Query the database with pagination
    offers_all = db_session.query(offers.models.Offer).filter(
        filter_condition
    ).limit(limit).offset(offset).all()
    
    return offers_all

@router.get('/{offer_id}', status_code=status.HTTP_200_OK)
async def get_offer(offer_id: int, db_session: Session = Depends(database.get_db)):
  offer = db_session.query(offers.models.Offer).filter_by(id=offer_id).first()
  return offer

@router.put('/{offer_id}', status_code=status.HTTP_200_OK)
async def update_offer(offer_id: int, offer_schema: offers.schemas.Offer, db_session: Session = Depends(database.get_db)):
  offer = db_session.query(offers.models.Offer).filter_by(id=offer_id).first()
  for key, value in offer_schema.dict().items():
    setattr(offer, key, value)
  db_session.commit()
  return {'msg': 'Offer updated successfully'}

@router.delete('/{offer_id}', status_code=status.HTTP_200_OK)
async def delete_offer(offer_id: int, db_session: Session = Depends(database.get_db)):
  offer = db_session.query(offers.models.Offer).filter_by(id=offer_id).first()
  db_session.delete(offer)
  db_session.commit()
  return {'msg': 'Offer deleted successfully'}



# DEBUG ROUTES
@router.put('/debug/create/fake/data')
async def create_fake_data(quantity:int, owner_id:int, db_session: Session = Depends(database.get_db)):
  for _ in range(quantity):
    offer = offers.models.Offer(
      owner_name=fake.name(),
      owner_rating=fake.random_int(min=0, max=5),
      reviews_count=fake.random_int(min=0, max=100),
      title=fake.sentence(),
      description=fake.text(),
      location=fake.city(),
      price=fake.random_int(min=1, max=1000),
      category=fake.random_element(elements=('Cleaning', 'Dog walking', 'Babysitter', 'Garden work', 'Handyman')),
      datetime=datetime.now(),
      owner_id=owner_id,
      currency=fake.random_element(elements=('USD', 'EUR', 'GBP'))
    )
    db_session.add(offer)
  db_session.commit()
  return {'msg': 'Fake data created successfully'}

@router.delete('/debug/delete/fake/data')
async def delete_all_fake_data(db_session: Session = Depends(database.get_db)):
  db_session.query(offers.models.Offer).delete()
  db_session.commit()
  return {'msg': 'All fake data deleted successfully'}
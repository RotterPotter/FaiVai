from fastapi import APIRouter, status, Depends, HTTPException
import offers.schemas
import offers.models
import database
from sqlalchemy.orm import Session
from sqlalchemy import  or_

router = APIRouter('/offers', tags=['offers'])

@router.post('/create', status_code=status.HTTP_201_CREATED)
async def create_offer(offer_schema: offers.schemas.OfferCreate, db_session: Session = Depends(database.get_db)):
  offer = offers.models.Offer(**offer_schema.dict())
  db_session.add(offer)
  db_session.commit()
  return {'msg': 'Offer created successfully'}

@router.get('/all', status_code=status.HTTP_200_OK)
async def get_all_offers(db_session: Session = Depends(database.get_db)):
  offers = db_session.query(offers.models.Offer).all()
  return offers

@router.get('/{offer_id}', status_code=status.HTTP_200_OK)
async def get_offer(offer_id: int, db_session: Session = Depends(database.get_db)):
  offer = db_session.query(offers.models.Offer).filter_by(id=offer_id).first()
  return offer

@router.put('/{offer_id}', status_code=status.HTTP_200_OK)
async def update_offer(offer_id: int, offer_schema: offers.schemas.OfferUpdate, db_session: Session = Depends(database.get_db)):
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

from sqlalchemy import or_

@router.get('/search', status_code=status.HTTP_200_OK)
async def search_offers(query: str, db_session: Session = Depends(database.get_db)):
    offers = db_session.query(offers.models.Offer).filter(
        or_(
            offers.models.Offer.title.ilike(f'%{query}%'),
            offers.models.Offer.description.ilike(f'%{query}%'),
            offers.models.Offer.price.ilike(f'%{query}%'),
            offers.models.Offer.category.ilike(f'%{query}%'),
            offers.models.Offer.datetime.ilike(f'%{query}%')
        )
    ).all()
    return offers
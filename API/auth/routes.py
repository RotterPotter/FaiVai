from fastapi import APIRouter, status, Depends
import auth.schemas
import database
import auth.models
from auth.service import Service

router = APIRouter(prefix='/auth')
service = Service()

@router.get("/")
async def get_users(
  db_session = Depends(database.get_db)
):
  return [user for user in db_session.query(auth.models.User).all()]

@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_user(
  user_schema: auth.schemas.User,
  db_session=Depends(database.get_db)
):
  hashed_password = await service.hash_password(user_schema.password)
  user_model = auth.models.User(
    email=user_schema.email,
    hashed_password=hashed_password
  )
  
  db_session.add(user_model)
  db_session.commit()

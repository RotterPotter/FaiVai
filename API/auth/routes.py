from fastapi import APIRouter, status, Depends, HTTPException
import auth.schemas
import database
import auth.models
from sqlalchemy.orm import Session
import auth.service as service
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

router = APIRouter(prefix='/auth')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

# REGISTER
@router.post(
  '/register',
  status_code=status.HTTP_201_CREATED,
  response_model=auth.schemas.Token
)
async def register_user(
  user_schema: auth.schemas.UserCreate,
  db_session: Session = Depends(database.get_db),
):
  # Check if user already exists
  existing_user = db_session.query(auth.models.User).filter_by(email=user_schema.email).first()
  if existing_user:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

  # Hash the password
  hashed_password = service.hash_password(user_schema.password)

  # Create a new user instance

  user_model = auth.models.User(
    name=user_schema.name,
    email=user_schema.email,
    hashed_password=hashed_password, 
    disabled=False
  )

  # Add the user to the database
  db_session.add(user_model)
  db_session.commit()

  # Create an access token for the new user

  return service.create_access_token(
    data={"sub": user_model.email}
  )

# LOGIN
@router.post(
  '/login',
  status_code=status.HTTP_200_OK,
  response_model=auth.schemas.Token
)
async def login(
  form_data:  OAuth2PasswordRequestForm = Depends(),
  db_session: Session = Depends(database.get_db)
):
  user = service.authenticate_user(db_session, form_data.username, form_data.password)
  if not user:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Incorrect username or password",
      headers={"WWW-Authenticate": "Bearer"},
    )
  return service.create_access_token(data={"sub":user.email})

@router.post(
  '/logout',
  status_code=status.HTTP_200_OK
)
async def logout(
  token:str = Depends(oauth2_scheme), # ??? what is it and why str
  db_session: Session = Depends(database.get_db)
):
  payload = service.decode_access_token(token)
  expires_at = payload.get("exp")
  if not expires_at:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Invalid token"
    )
  
  service.blacklist_token(db_session, token, expires_at)
  return {"msg": "Successfully logged out"}

"""
def refresh_token()
def read_users_me()
def update_user_me()
def reset_password()
def reset_password_confirm()
def validate_token()
""" 
from fastapi import APIRouter, status, Depends, HTTPException
import auth.schemas
import database
import auth.models
from sqlalchemy.orm import Session
import auth.service as service
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

router = APIRouter(prefix='', tags=['auth'])


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')


# REGISTER
@router.post(
  '/register',
  status_code=status.HTTP_201_CREATED,
)
async def register_user(
  user_schema: auth.schemas.UserCreate,
  db_session: Session = Depends(database.get_db),
):
  
  # Check if password and confirm password match
  if user_schema.password != user_schema.confirm_password:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")

  # Check if user already exists
  existing_user = db_session.query(auth.models.User).filter_by(email=user_schema.email).first()
  if existing_user:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

  # Hash the password
  hashed_password = service.hash_password(user_schema.password)

  # Create a new user instance

  user_model = auth.models.User(
    firstname=user_schema.firstname,
    lastname=user_schema.lastname,
    email=user_schema.email,
    hashed_password=hashed_password, 
    disabled=False
  )

  # Add the user to the database
  db_session.add(user_model)
  db_session.commit()

  await service.send_verification_email(user_schema.email)

  return {'msg': "User registered successfully"}


# LOGIN
@router.post(
  '/token',
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
  if not user.email_verified:
    raise HTTPException(
      status_code=status.HTTP_423_LOCKED,
      detail="Email not verified",
      headers={"WWW-Authenticate": "Bearer"},
    )
  return service.create_access_token(data={"sub":user.email})


@router.post(
  '/logout',
  status_code=status.HTTP_200_OK
)
async def logout(
  token:str = Depends(oauth2_scheme),
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


@router.get(
  '/users/me',
  response_model=auth.schemas.User
)
async def read_users_me(
  current_user: auth.models.User = Depends(service.get_current_user)
):
  return current_user


@router.post('/verify/email/get', status_code=status.HTTP_200_OK)
async def send_verification_email(
  email_schema:auth.schemas.UserEmail,
  db_session: Session = Depends(database.get_db)
):
  user = db_session.query(auth.models.User).filter_by(email=email_schema.email).first()
  if not user:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Email not found"
    )
  await service.send_verification_email(user.email)
  return {"msg": "Verification email sent"}

@router.get(
  '/verify/email/confirm',
  status_code=status.HTTP_200_OK
)
async def verify_email(
  token:str, db_session: Session = Depends(database.get_db)
):
  if await service.validate_email_token(token, db_session=db_session):
    return {"msg": "Email verified"}
  else:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Invalid token"
    )


"""
def refresh_token()
def read_users_me()
def update_user_me()
def reset_password()
def reset_password_confirm()
def validate_token()
""" 
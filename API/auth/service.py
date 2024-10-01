from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta, datetime
from typing import Optional
from auth.schemas import Token
import auth.models
from sqlalchemy.orm import Session
from typing import Union
from fastapi import HTTPException, status

SECRET_KEY = 'SECRET'
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl='token')

def hash_password(password:str) -> str:
  return pwd_context.hash(password)

def verify_password(plain_password:str, hashed_password:str) -> bool:
  return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data:dict,
  expires_delta:Optional[timedelta] = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
) -> Token:
  to_encode = data.copy()
  expire = datetime.utcnow() + expires_delta
  to_encode.update({"exp":expire})
  encoded_jwt = jwt.encode(to_encode, key=SECRET_KEY, algorithm=ALGORITHM)
  return Token(access_token=encoded_jwt, token_type='bearer')

def authenticate_user(
  db_session: Session,
  username:str,
  password:str
) -> Union[auth.models.User, bool]:
  user = db_session.query(auth.models.User).filter_by(email=username).first()
  if not user:
    return False
  if not verify_password(password, user.hashed_password):
    return False
  return user

def decode_access_token(token:str) -> dict:
  try:
    payload = jwt.decode(token, key=SECRET_KEY, algorithms=[ALGORITHM])
    return payload
  except JWTError:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Could not validate credentials",
      headers={"WWW-Authenticate": "Bearer"}
    )
  
def blacklist_token(db_session: Session, token:str, expires_at:int):
  expires_at_datetime = datetime.utcfromtimestamp(expires_at)
  blacklisted_token = auth.models.TokenBlacklist(
    token=token, 
    expires_at=expires_at_datetime
  )
  db_session.add(blacklisted_token)
  db_session.commit()

 
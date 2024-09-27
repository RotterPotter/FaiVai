from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import auth.models
from fastapi import Depends, HTTPException, status
from datetime import timedelta, datetime
from typing import Optional
import auth.schemas

class Service:
  SECRET_KEY = 'SECRET'
  ALGORITHM = 'HS256'
  ACCESS_TOKEN_EXPIRE_MINUTES = 30
  pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
  oauth_2_scheme = OAuth2PasswordBearer(tokenUrl='token')
  
  def __init__(self, db_session) -> None:
    self.db_session = db_session

  async def verify_password(self, plain_pwd:str, hashed_pwd:str) -> bool:
    return self.pwd_context.verify(plain_pwd, hashed_pwd)

  async def hash_password(self, password:str) -> str:
    return self.pwd_context.hash(password)
  
  async def get_user(self, email:str):
    user = self.db_session.query(auth.models.User).filter_by(email=email).first()
    return user
  
  async def authenticate_user(self, email:str, password:str):
    user = await self.get_user(email)
    if not user:
      return False
    if not await self.verify_password(password, user.hashed_password):
      return False
    
    return user

  async def create_access_token(self, data:dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()

    if expires_delta:
      expire = datetime.now(datetime.timezone.utc) + timedelta(minutes=15)

    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, self.SECRET_KEY, self.ALGORITHM)

    return encoded_jwt
  
  async def get_current_user(self,token:str = Depends(oauth_2_scheme)):
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})

    try:
      payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
      email: str = payload.get("sub")
      if email is None:
        raise credential_exception
      
      token_data = auth.schemas.TokenData(email=email)
    except JWTError:
      raise credential_exception
    
    user = await self.get_user(email)
    if user is None:
      raise credential_exception
    
    return user
  
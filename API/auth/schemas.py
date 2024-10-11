from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
  firstname:Optional[str] = None
  lastname:Optional[str] = None
  email:str

class UserCreate(User):
  password:str
  confirm_password:str

class UserEmail(BaseModel):
  email:str

class UserInfo(User):
  id:int
  rating:float
  reviews_count:int

class EmailPassword(UserEmail):
  password: str
  
class EmailCode(UserEmail):
  code: str

class Token(BaseModel):
  access_token:str
  token_type:str


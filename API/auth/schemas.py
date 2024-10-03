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


class Token(BaseModel):
  access_token:str
  token_type:str


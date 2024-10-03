from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta, datetime
from typing import Optional
from auth.schemas import Token
import auth.models
from sqlalchemy.orm import Session
from typing import Union
from fastapi import HTTPException, status, Depends
import database
from config import settings
from jinja2 import Template
from email.mime.text import MIMEText
import smtplib


SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
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

async def get_current_user(
            token: str = Depends(oauth_2_scheme),
            db_session: Session = Depends(database.get_db)
        ):
        
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        
        user = db_session.query(auth.models.User).filter_by(email=username).first()

        return user

def create_email_token(data:dict,
  expires_delta:Optional[timedelta] = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
) -> Token:
  to_encode = data.copy()
  expire = datetime.utcnow() + expires_delta
  to_encode.update({"exp":expire})
  encoded_jwt = jwt.encode(to_encode, key=SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

VERIFICATION_EMAIL_TEMPLATE_PATH = 'auth/templates/verification_email.html'
async def send_verification_email(email: str):
        email_token = create_email_token({'sub': email, 'type': 'email_verification'}, expires_delta=timedelta(days=1))

        sender_email = settings.EMAIL_SENDER
        sender_password = settings.EMAIL_PASSWORD
        recipient_email = email
        with open(VERIFICATION_EMAIL_TEMPLATE_PATH, 'r') as f:
            template = Template(f.read())
        context = {
            'subject': 'Fai&Vai: Email Verification',
            'body': 'This is an email sent from Python using an HTML template and the Gmail SMTP server.'
        }
        html = template.render(context, url=f'http://localhost:8000/verify/email/confirm?token={email_token}')
        html_message = MIMEText(html, 'html')
        html_message['Subject'] = context['subject']
        html_message['From'] = sender_email
        html_message['To'] = recipient_email

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, html_message.as_string())

async def validate_email_token(token:str, db_session: Session = Depends(database.get_db)) -> bool:
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    if payload.get('type') == 'email_verification':
      email = payload.get('sub')
      user = db_session.query(auth.models.User).filter_by(email=email).first()
      if user:
        user.email_verified = True
        db_session.commit()
        return True
    return False
  except JWTError:
    return False
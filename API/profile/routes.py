from fastapi import APIRouter, status, Depends, HTTPException
import database
from sqlalchemy.orm import Session


router = APIRouter(prefix='/profile', tags=['profile'])

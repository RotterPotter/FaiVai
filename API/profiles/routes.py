from fastapi import APIRouter

router = APIRouter(prefix='/profiles', tags=['Profiles'])

@router.get('/client')
def get_client():
    return {'client': 'client'}

@router.get('/worker')
def get_worker():
    return {'worker': 'worker'}
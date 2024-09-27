import uvicorn 
import fastapi
from auth.routes import router as auth_router

app = fastapi.FastAPI() 

app.include_router(auth_router)

if __name__ == '__main__':
    uvicorn.run(
        'main:app', host='0.0.0.0', port=8000, reload=True)
import uvicorn
import fastapi
from fastapi.middleware.cors import CORSMiddleware
from auth.routes import router as auth_router

from services.routes import router as services_router
from service_types.routes import router as service_types_router
from categories.routes import router as categories_router
from google_maps.routes import router as google_maps_router

from fastapi import Depends

app = fastapi.FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow specific origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(auth_router)
app.include_router(services_router)
app.include_router(service_types_router)
app.include_router(categories_router)
app.include_router(google_maps_router)



if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)
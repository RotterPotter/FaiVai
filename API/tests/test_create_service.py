from services.routes import create_schedule
from main import app
import sys
import os
from fastapi.testclient import TestClient
import datetime

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


client = TestClient(app)


def test_create_services():
    created_at = datetime.datetime.now()

    response = client.post(
        "/services/create",
        json={
            "owner_id": 1,
            "service_type_id": 1,
            "unit": "m2",
            "price_per_unit": "2",
            "speed_per_unit": "5",
            "location_or_zone": "Test Zone",
            "available_datetimes": {"Monday": ["10:00", "12:00"], "Tuesday": ["10:00", "12:00"]},
        }
    )
    assert response.status_code == 201
    assert response.json() == {
        "id": 0,
        "owner_id": 1,
        "service_type_id": 1,
        "unit": "m2",
        "price_per_unit": 2.0,
        "speed_per_unit": 5.0,
        "location_or_zone": "Test Zone",
        "disabled": False,
        "available_datetimes": create_schedule({"Monday": ["10:00", "12:00"], "Tuesday": ["10:00", "12:00"]}, 4),
        "created_at": created_at.isoformat()
    }

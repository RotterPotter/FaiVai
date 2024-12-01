#!/bin/bash

# Navigate to the API directory
cd API/

# Execute docker-compose down
docker-compose down

# Navigate to the Front directory
cd ../Front

# Execute docker-compose down
docker-compose down

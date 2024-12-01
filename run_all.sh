#!/bin/bash

# Navigate to the API directory
cd API/

# Execute docker-compose up -d
docker-compose up -d

# Navigate to the Front directory
cd ../Front

# Execute docker-compose up -d
docker-compose up -d

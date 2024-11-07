@echo off

REM Navigate to the FaiVai directory
cd FaiVai

REM Navigate to the Front directory and stop the Docker containers
cd Front
docker-compose down

REM Navigate to the API directory and stop the Docker containers
cd ..\API
docker-compose down

REM Navigate back to the root directory
cd ..

REM Pull the latest changes from the remote repository
git pull

REM Navigate to the Front directory and start the Docker containers
cd Front
docker-compose up -d

REM Navigate to the API directory and start the Docker containers
cd ..\API
docker-compose up -d

REM Open the default web browser and navigate to localhost:5137
start http://localhost:5137/
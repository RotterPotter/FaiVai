@echo off

REM Clone the repository
git clone https://github.com/RotterPotter/FaiVai.git

REM Navigate to the API directory
cd FaiVai\API

REM Create the .env file with the specified parameters
echo SECRET_KEY=SECRET > .env
echo ALGORITHM=HS256 >> .env
echo ACCESS_TOKEN_EXPIRE_MINUTES=30 >> .env
echo POSTGRES_USER=user >> .env
echo POSTGRES_PASSWORD=user123 >> .env
echo POSTGRES_DB=mydatabase >> .env
echo PORT=5432 >> .env
echo HOST=db >> .env
echo EMAIL_SENDER=kivilele@gmail.com >> .env
echo EMAIL_PASSWORD=dxzm ugad nzgj jbri >> .env

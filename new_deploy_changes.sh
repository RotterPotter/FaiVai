#!/bin/bash

# Define your server's SSH details
SERVER_USER="oleksandr"
SERVER_IP="34.44.123.21"
API_PATH="/home/oleksandr/FaiVai/API"
FRONT_PATH="/home/oleksandr/FaiVai/Front"
PROJECT_PATH="/home/oleksandr/FaiVai"
GIT_REPO_URL="https://RotterPotter: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@github.com/RotterPotter/FaiVai.git"
PASSPHRASE=cfif1yfpfhtdbx
SUDO_PASSWORD="cfif1yfpfhtdbx"

# Connect to the server and run commands
sshpass -p "cfif1yfpfhtdbx" ssh oleksandr@34.44.123.21 '
  set -x  
  cd /home/oleksandr/FaiVai/API
  echo "cfif1yfpfhtdbx" | sudo -S docker-compose down

  cd /home/oleksandr/FaiVai/Front
  echo "cfif1yfpfhtdbx" | sudo -S docker-compose down

  cd /home/oleksandr/FaiVai
  git remote set-url origin https://RotterPotter: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@github.com/RotterPotter/FaiVai.git
  git pull origin main
  
  cd /home/oleksandr/FaiVai/API
  echo "${SUDO_PASSWORD}" | sudo -S docker-compose up -d

  cd /home/oleksandr/FaiVai/Front
  echo "cfif1yfpfhtdbx" | sudo -S docker-compose up -d
  set +x  '

echo "Deployment script completed."
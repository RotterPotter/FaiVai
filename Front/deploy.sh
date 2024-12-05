#!/bin/bash

# Define your variables
APP_DIR=$(pwd)
DIST_DIR="$APP_DIR/dist"
NGINX_SITE_DIR="/var/www/faivai"

# Print current working directory for reference
echo "Current directory: $APP_DIR"

# Step 1: Rebuild the app (you may want to use npm or yarn based on your app)
echo "Rebuilding the app..."
npm install
npm run build

# Step 2: Copy the dist folder to the Nginx site directory
if [ ! -d "$DIST_DIR" ]; then
    echo "Error: dist folder not found!"
    exit 1
fi

echo "Deleting Nginx Site Dir"
sudo rm -r -f "$NGINX_SITE_DIR"

echo "Copying the dist folder to Nginx site directory..."
sudo cp -r "$DIST_DIR" "$NGINX_SITE_DIR"

# Step 3: Reload Nginx to apply the changes
echo "Reloading Nginx..."
sudo systemctl reload nginx

echo "Deployment completed successfully!"


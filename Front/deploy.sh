echo "Building app..."
npm run build

echo "Deploying files to server"
scp -r build/* oleksandr@34.44.123.21:/var/www/faivai.com/

echo "Done!"

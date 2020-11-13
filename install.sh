#!/bin/sh

# Install of nginx and gunicorn application server for production use

# Remove default nginx site if it exists, assuming fresh install of nginx
# Not a problem unless user has created nginx conf directly in folder
# To reset to default nginx site, type:
# sudo ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled
sudo rm /etc/nginx/sites-enabled/default

# Copy nginx config to nginx/sites-available
sudo cp nginx/nginx_server.conf /etc/nginx/sites-available/opencarbon.conf

# Create symlink in nginx/sites-enabled to opencarbon.conf
sudo ln -s /etc/nginx/sites-available/opencarbon.conf /etc/nginx/sites-enabled/opencarbon

# Restart nginx to load new opencarbon.conf
sudo systemctl restart nginx

# Copy gunicorn service file to system
sudo cp gunicorn/gunicorn.service /etc/systemd/system/gunicorn_opencarbon.service

# Change owner of main 'opencarbon' folder so gunicorn can create Unix socket inside
cd ..
sudo chown www-data:www-data opencarbon
cd opencarbon

# Start and enable gunicorn application server
sudo systemctl start gunicorn_opencarbon
sudo systemctl enable gunicorn_opencarbon



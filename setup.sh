
# Script for setting up Open Carbon application
# Code snippets taken from internet and credited where relevant
# 2020

# Workaround for problem with bash on OSX not supporting -i flag on read
# https://stackoverflow.com/questions/22634065/bash-read-command-does-not-accept-i-parameter-on-mac-any-alternatives

function readinput() {
  local CLEAN_ARGS=""
  default=''
  prompt=''
  while [[ $# -gt 0 ]]; do
    local i="$1"
    case "$i" in
      "-i")
		default="$2"
        shift
        shift
        ;;
      "-p")
		prompt="$2"
        shift
        shift
        ;;
      *)
        input=$1
        shift
        ;;
    esac
  done
  read -p "$prompt [$default]: " tempinput
  eval $input="${tempinput:-$default}" 
}

readinput -e -p "Domain name to be used" -i "localhost" domain
echo "Website will be run on ${domain}"

echo "Creating Nginx config file"
echo "# Open Carbon Nginx conf file
# v1.0.0
# 11th November, 2020

upstream opencarbon {
    server unix://${PWD}/opencarbon.sock;
}

server {

    listen 80;
    server_name ${domain};

    location / {
        proxy_pass http://opencarbon;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header Host \$host;
        proxy_redirect off;
    }

    location /static/ {
        alias ${PWD}/app/static/;
    }
}
" > nginx/nginx_server.conf

echo "Creating gunicorn config file"

mkdir gunicorn
echo "[Unit]
Description=gunicorn daemon for Open Carbon
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=${PWD}/app
Environment="PATH=${PWD}/venv/bin"
ExecStart=${PWD}/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:${PWD}/opencarbon.sock opencarbon.wsgi:application

[Install]
WantedBy=multi-user.target
" > gunicorn/gunicorn.service

echo "Google reCAPTCHA - set up reCAPTCHA for your domain at https://www.google.com/recaptcha/"

readinput -e -p "Enter Google reCAPTCHA SITE key" -i "" google_recaptcha_site_key
readinput -e -p "Enter Google reCAPTCHA SECRET key" -i "" google_recaptcha_secret_key

echo "Database setup"

readinput -e -p "Name of new Postgres database to be used for Open Carbon system" -i "opencarbon" postgres_dbname
readinput -e -p "Name of new Postgres database user to be used for Open Carbon application" -i "opencarbonuser" postgres_username
read -p "Password for new Postgres database user (Note: password will be hidden): " -s postgres_password; echo

echo "Creating RECAPTCHA site key file"

echo "// Enter your Google recaptcha site key below

const key = '${google_recaptcha_site_key}';
export default key;
" > app/frontend/src/constants/recaptcha.js

echo "Creating Django dev environment file"

echo "GOOGLE_RECAPTCHA_SECRET_KEY=${google_recaptcha_secret_key}
DJANGO_ALLOWED_HOSTS=${domain} 127.0.0.1 [::1] 
PUBLICDOMAIN=http://${domain}:8000/
SECURE_SSL_REDIRECT=0
DEBUG=1
DATABASE=postgres
SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=${postgres_dbname}
SQL_USER=${postgres_username}
SQL_PASSWORD=${postgres_password}
SQL_HOST=localhost
SQL_PORT=5432
POSTGRES_USER=\${SQL_USER}
POSTGRES_PASSWORD=\${SQL_PASSWORD}
POSTGRES_DB=\${SQL_DATABASE}" > app/.env.dev

echo "Creating Django prod environment file"

echo "GOOGLE_RECAPTCHA_SECRET_KEY=${google_recaptcha_secret_key}
DJANGO_ALLOWED_HOSTS=${domain} 127.0.0.1 [::1] 
PUBLICDOMAIN=https://${domain}/
SECURE_SSL_REDIRECT=0
DEBUG=0
DATABASE=postgres
SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=${postgres_dbname}
SQL_USER=${postgres_username}
SQL_PASSWORD=${postgres_password}
SQL_HOST=localhost
SQL_PORT=5432
POSTGRES_USER=\${SQL_USER}
POSTGRES_PASSWORD=\${SQL_PASSWORD}
POSTGRES_DB=\${SQL_DATABASE}" > app/.env.prod

echo "Adding SECRET_KEY to environment files"
python3 addsecretkey.py

ln -s .env.dev app/.env

echo "Installing node modules"

cd app/frontend/
npm install

echo "Compiling frontend app"

npm run build

cd ../../

echo "Core application set up complete, ready for server init or Docker to be run"

#!/bin/sh

# If using postgres, then wait for it to start
if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# Once postgres (or non-postgres) db is ready, run a once-only series of tasks
CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
    touch $CONTAINER_ALREADY_STARTED
    echo "-- First container startup --"

    # Apply database migrations
    echo "Apply database migrations"
    python3 manage.py makemigrations backend --noinput
    python3 manage.py migrate --noinput

    # Collect static files
    echo "Collecting static files"
    python3 manage.py collectstatic --no-input --clear
else
    echo "-- Not first container startup --"
fi

exec "$@"
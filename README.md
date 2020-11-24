# Open Carbon
[**Open Carbon**](https://opencarbon.uk) aims to promote the open and public sharing of carbon dioxide emissions data, in the belief *you can't manage what you can't measure*. It consists of an open data standard available at https://opencarbon.uk/standards and a basic software toolkit for creating **open carbon repositories**, public data stores containing an organisation's carbon dioxide emissions data.

## Data standard
The data standard consists of an easy-to-use JSON format for reporting an organisation's carbon dioxide emissions:

[Open Carbon Standard](https://opencarbon.uk/standards)

The format is designed to be simple and intuitive, rather than overly technical or comprehensive, in order to cover the widest possible range of organisations and to make it quick and easy to publish data to a common standard. 

The range of data currently accounted for includes **Scope 1**, **Scope 2 (Location- or Market-Based)**, and **Scope 3** emissions and has been heavily influenced by UK Government's guidelines on greenhouse gas (GHG) reporting, as required by the **Streamlined Energy and Carbon Reporting** regulations:

[Streamined Energy and Carbon Reporting](https://www.gov.uk/government/publications/environmental-reporting-guidelines-including-mandatory-greenhouse-gas-emissions-reporting-guidance)

The standard will be developed based on the increasing availability of carbon emissions data from a diverse range of organisations. We welcome all collaborators wishing to develop the standard further.

## Software toolkit
The software toolkit consists of a web application for submitting carbon emissions data, validating submissions, and publishing this data via a JSON endpoint. Data can be submitted via a public webform not requiring registration or can be added via a password-protected administration interface. 

The primary web frontend is written in [React](https://reactjs.org/) with a [Django](https://www.djangoproject.com/) backend application receiving data from the frontend via a REST interface. The Django backend application provides a web administration interface for editing submissions, creating new submissions, and publishing submissions. 

The main [Open Carbon](https://www.opencarbon.uk) website has been built using this software toolkit. 

We welcome organisations who set up Open Carbon data repositories to submit details of their repositories to the central Open Carbon database via the [Open Carbon **add data** page](https://www.opencarbon.uk/adddata).

### Installing software toolkit
The software toolkit can be installed directly on a server or as a [Docker](https://www.docker.com/) container. In both cases the following software environment is used:

- Python 3.6+
- Postgres database
- Node.js and recent version of Node Package Manager (npm)

An Nginx webserver and Gunicorn application server is used for production deployment though other webservers, such as Apache, can be used.

### Installation - Before you begin
A setup script `setup.sh` creates the necessary configuration files needed to run the application. Before running this script, it is recommended you gather the following information:

- *Domain name of website*: The domain name of your Open Carbon website, ie. where your application will be accessible from. We recommend you use an `opencarbon` subdomain where possible, eg. `opencarbon.yourorganisation.com`

- *Google reCAPTCHA SITE key and SECRET key*: The Open Carbon toolkit uses **Google reCAPTCHA** to prevent spam form submissions. To set up **Google reCAPTCHA** for your Open Carbon website, go to https://www.google.com/recaptcha/ and enter the domain name of your intended website. Generate a `reCAPTCHA Site Key` and `reCAPTCHA Secret Key` for your domain and copy both text strings into a temporary text file.

- *Name of Postgres database to be used for Open Carbon system*: For example `opencarbon`. If you are installing the toolkit directly on a server, generate a new Postgres database with this name (assuming Postgres is already installed). If you are creating a Docker container, the relevant Postgres database will be created when the container is built.

- *Name/password of new Postgres database user to be used for Open Carbon system*: For example `opencarbonuser`. If you are installing the toolkit directly on a server, generate a new Postgres database user with this name/password and give the user permission to access the database above (assuming Postgres is already installed). If you are creating a Docker container, the relevant Postgres user will be created when the container is built.

The `setup.sh` script compiles the frontend application using Node Package Manager (`npm`) and you should therefore have the latest version of `Node.js` and `npm` installed on the machine where you intend to run `setup.sh` - this will be the target server if you are installing direct on the server, or a local development machine if you are creating a Docker container.

To install an up-to-date version of `Node.js`, go to [Node.js](https://nodejs.org/). 

With `Node.js` and `npm` installed and the relevant setup information to hand, run the setup script:

```
./setup.sh
```

This will generate the configuration files for the next stage of installation.

### Installation - Direct on server
This installation assumes `Git` has been installed on the target server and you have cloned the current Git repo at:

```
https://github.com/opencarbon/opencarbon.git 
```

If you have not yet run `setup.sh`, install the latest version of `Node.js` and `npm` using the instructions at [Node.js](https://nodejs.org). Then run `setup.sh` and enter the relevant setup information above. The setup process will compile the frontend application using Node Package Manager (`npm`).

Once `setup.sh` has completed, install `Python3`, `Pip`, `Postgres`, `virtualenv`, `ssl-cert`, and `Nginx` on the target server if they are not already installed:
```
sudo apt update
sudo apt install python3 python3-dev python-pip postgresql virtualenv ssl-cert nginx 
```

Connect to Postgres and create a new Postgres database and user, consistent with the details you entered during `setup.sh`:

```
sudo su postgres
psql
create database [database_name];
create user [database_user] with encrypted password '[database_password]';
grant all privileges on database [database_name] to [database_user];
```

Create and activate a virtual environment for Python3 by typing:

```
which python3
virtualenv -p [insert_path_from_previous_prompt] venv
source venv/bin/activate
```

Change directory to the main Django application folder:
```
cd app
```

With the virtual environment activated, install the necessary Python modules for the application by typing:
```
pip install -r requirements.txt
```

Initialize the Postgres database for Django and collect together Django's static files (required for production) by typing:

```
./manage.py makemigrations backend
./manage.py migrate
./manage.py collectstatic --noinput
```

To load the Open Carbon sample data (optional), type:

```
python3 backend/tools.py importdata
```

To create a superuser for accessing the Django administration system, type:
```
./manage.py createsuperuser
```

To check the application is working, type:
```
./manage.py runserver
```
Open a web browser and load the application (development not production environment) at:
```
http://127.0.0.1:8000
```

To load the Django administration system, go to:
```
http://127.0.0.1:8000/admin
```

To install the application in production mode with Nginx as the webserver and gunicorn as the application server, return to the main folder where `README.md` is located:
```
cd ..
```

Change the `app/.env` link to point to `.env.prod` rather than `.env.dev` so the application uses production environment variables:

```
rm app/.env
ln -s .env.prod app/.env
```

Finally, run `install.sh`:

```
./install.sh
```

This will install the Nginx and gunicorn configuration files, restart Nginx and register a gunicorn service called `gunicorn_opencarbon`. It will also change the owner of the main `opencarbon` folder to `www-data:www-data` so gunicorn can create a Unix socket for communicating with Nginx. 

Once install has completed, you should be able to access the application by entering `localhost` (or equivalent domain name) into a browser address bar.


### Installation - As Docker container
Ensure you have run `./setup.sh` first. Also ensure you have **Docker** and **Docker Compose** installed on your machine. If you have neither, install [**Docker Desktop**](https://docker.com) which includes both applications. 

Due to the use of environment variables in the Docker Compose configuration file, the version of Docker Compose must be `> 1.25.4`. To check your version of Docker Compose, type:
```
docker-compose --version
``` 

To run the development Docker container, switch to the directory where this `README.md` is located and type:

```
docker-compose up --build
```

This will build the necessary Docker images, including a Postgres database and Python 3 environment, and run them as a container. You should then be able to load the Open Carbon application by opening a browser and entering `localhost:8000` (or domain name on port 8000 if mapped) into the address bar.

To run the production Docker container, load the production **Docker Compose** file `docker-compose.prod.yml` by typing:

```
docker-compose -f docker-compose.prod.yml up --build
```

This will build an additional Nginx reverse proxy server as part of a production-ready container.

To run either container detached (in the background), press `CTRL-C`, remove `--build` and add `-d`. For example:

```
docker-compose up -d

docker-compose -f docker-compose.prod.yml up -d
```

To access the Django administration interface, you will need to create an administrative **superuser**. With the Docker container still running (either in a window or in the background), open a terminal window, navigate to the directory where `README.md` is located and type:

```
docker exec -it opencarbon_web python manage.py createsuperuser
```

After entering details for the superuser, use the entered credentials to login at:
```
http://yourdomain:8000/admin/ [If development]
http://yourdomain/admin/ [If production]
```

To import the default list of organisations with carbon data into the database, enter:
```
docker exec -it opencarbon_web python backend/tools.py importdata
```

## Compatibility
The system has been tested on recent versions of Chrome, Firefox, Safari, Opera and Microsoft Edge internet browsers. However, the administration interface does not currently work correctly on Internet Explorer due to incompatibilities in the Django Material UI theme. We therefore recommend use of a non-IE browser to access the administration interface.

## Thanks
Many thanks to Chris Pointon and the Cambridge Carbon Map team for developing the principles behind the Open Carbon project. 

## Contact
Tackling the climate challenge requires effective collaboration and we are keen to collaborate with any organisations who share our passion for sharing carbon emissions data in an open and public way. To get in contact, email us at:

info@opencarbon.uk

## Copyright

Open Carbon Toolkit  
Copyright (c) Open Carbon, 2020 
Developed by Stefan Haselwimmer  
Released under MIT License
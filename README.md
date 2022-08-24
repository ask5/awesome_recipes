# awesome_recipes

Recipe web app developed using React/Redux for frontend and Django rest framework for backend api.

![screenshot1](/screenshots/screen1.png?raw=true)
![screenshot2](/screenshots/screen2.png?raw=true)
![screenshot3](/screenshots/screen3.png?raw=true)
![screenshot4](/screenshots/screen4.png?raw=true)

## Requirements

* Python 3.10
* virtualenv
* Node ^v16.16.0

## Install project dependencies

### create virtualenv 

    virtualenv recipe
    source recipe/bin/activate
    pip install -r awesome_recipes/requirements.txt

## Install node modules

    cd awesome_recipes
    npm install 

## Database

I have used SQLite database which is included in the root. If you want to use a 
different database then update the settings.py and execute the following command to create tables.

    python manage.py migrate


## Running locally

    cd awesome_recipes
    python manage.py runserver


If everything goes smooth the site will be up at http://127.0.0.1:8000/

## Local frontend development

The app uses compiled 'app/index.js' file. If you want to make any React code change you need to 
run the below command to see the changes in the app. 

    npm install --global yarn
    yarn serve

yarn serve command will build the react code. Files are watched and it will recompile automatically after any code change 

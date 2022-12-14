# YogaClassroom

A Django React Application 

# This application is made in such a way that you dont need to compile react files in `frontend`, because django directly looking for the main `templates/frontend/index.html` HTML file, and all the neccesary compiled javascript is pointing to this file.
So just directly run `python manage.py runserver` after installing neccesary modules.

## All the neccesary validations is happening in the backend of the application i.e `./YogaForm`.

## Entity-Relationship Diagram For YogaClasses
![E-R UCL](https://user-images.githubusercontent.com/41137189/142236305-6f978ae1-c0ca-49d4-8568-bcf8b1570de6.jpg)

## DATABASE

![DB-1](https://user-images.githubusercontent.com/41137189/142240056-b8439d2e-7e35-4c7b-99eb-8fce169e7ae3.png)
![DB-2](https://user-images.githubusercontent.com/41137189/142240059-7e8eabf1-470c-4880-9256-e8478832bb17.png)
![DB-3](https://user-images.githubusercontent.com/41137189/142240049-faf96510-4340-4552-abc1-baaa4867319b.png)


# Try It

https://flexmoney-yoga-form.herokuapp.com/

## Setup Instructions

### Clone this repo

`https://github.com/avigupta10/YogaClassroom.git`

### Create Virtual Environment and Install Required Python Modules
`cd YogaClassroom`

Install venv
`pip install virtualenv`

For Creating a venv run this 
`virtualenv -p python3 venv`

Activate virtualenv 
`venv\Scripts\activate`

Install requirements
```bash
pip install -r requirements.txt
```
### Start Web Server

To start the web server you need to run the following sequence of commands.

Run the django web server.
```bash
python manage.py runserver
```

## [Install Node.js](https://nodejs.org/en/)

## Install Node Modules

First cd into the ```frontend``` folder.
```bash
cd frontend
```
Next install all dependicies.
```bash
npm i
```

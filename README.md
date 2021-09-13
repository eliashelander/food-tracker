# food-tracker

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Track your ingredients at home and know what and when you need to go shopping.

## Live Demo
https://food-tracker.eliashelander.com/
API Hosted on Heroku
Please allow time for the heroku server to wake up if you don't see any ingredients available. Wait 10 seconds and refresh the page.
	
## Technologies
Project is created with:
* Node.js
* Express.js
* React
	
## Setup

Install dependencies and run API

In terminal
```
$ npm install
$ npm start
```

Create .env in client folder
Use a new terminal
```
$ cd client/
$ touch .env
```
Inside "../client/.env", add the following and insert your own values:
```
REACT_APP_API_URL=http://localhost:5000
```

Install dependencies and run Client

In terminal "../client/"
```
$ npm install
$ npm start
```

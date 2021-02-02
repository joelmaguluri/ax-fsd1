# Contact Manager

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](http://axer.s3-website.us-east-2.amazonaws.com/)

## Features!!

  - Add Users 
  - Update user details 
  - search users 


### Installation

requires [Node.js](https://nodejs.org/)  to be installed on target system

clone the app 
```sh
$ git clone https://github.com/joelmaguluri/ax-fsd1
```
Install the dependencies and devDependencies and start the server.

```sh
$ npm install && npm start
```

Steps for using local server 

```sh
$ cd serverless 
```
Installing dependencies
```sh
npm install
```
 comment out this line module.exports=app
add this line app.listen(5000,()=>console.log(`server started at port 5000`)
you may also run the server in your desired port
now run this code 
```sh
# this should start your local server
$ node app

```
now search for file called constants.js and replace value of SERVER variable with LOCALSERVER
you are good to go !!!!


### API Endpoints

| Endpoint| Description |
| ------ | ------ |
| /authenticate (POST) | Authenticates user |
|/save  (POST) | saves new user to the database|
|/users  (GET) | returns all the users stored in the database|
|/id/:id  (GET) | Retrieve user with specific ID|
|/id/id:  (PUT) | Update user with specific ID|
|/id/id:  (DELETE) | DELETE user with specific ID|


### S3 DEPLOYMENT

Deployment of build file to s3
```sh
# run the following commands
# go to root folder of app and run following command
    npm run deploy
```


### SERVERLESS DEPLOYMENT

Deployment to stage development 
[Endpoint](https://uviz4022j1.execute-api.us-east-1.amazonaws.com)
```sh
# run the following commands
    cd serverless/
    npm run deploydev
```
Deployment to stage production
[Endpoint](https://npoeootl24.execute-api.us-east-1.amazonaws.com/)
```sh
# run the following commands
    cd serverless/
    npm run deployprod
```

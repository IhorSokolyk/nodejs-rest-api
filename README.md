#NodeJS API Project
This project is a simple REST API written in NodeJS + Express + MongoDB for user's CRUD operation.
Also there is login/logout functionality using web tokens provided.

##Pre Requirements
Before running this project several components should be installed:

* NodeJS
* MongoDB

##Running the project
Clone this project to your PC using next command

`git clone https://ihor_sokolyk@bitbucket.org/Oril-Inc/portfolio-nodejs.git`

Go to project root folder and in the command line execute the following commands:

`npm install` (for installing all dependencies specified in package.json file)

`npm i -g mocha` (this module should be installed globally to make it possible to run tests)

Before running the project, make sure that your mongodb server is running. If not then run command

`mongod.exe` in the installation folder of MongoDB (for Windows) or

`service mongod start` (for Ubuntu)

Now the project is ready to run with command

`npm start`

If  everything is okay, the server will be running on port 8080

##Running tests
This project uses the next modules for testing Express application:

* mocha
* chai
* chai-http

To run tests you need to execute command

`npm test`

and after that in the command line the results of tests (passed or failed) will be displayed.
# Issue Tracker built with MERN STACK

## Demo App

[Frontend deployed on Netlify & Backend on Vercel](https://bb-issuetracker.netlify.app/issues/619341b53b3f510016b773cc)

## Built using

#### Front-end Tech

- [ReactJS](https://reactjs.org/) - Frontend framework
- [Redux w/ hooks](https://redux.js.org/) - State management library
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Middleware which allows action creators to return a function
- [React Router](https://reactrouter.com/) - Library for general routing & navigation
- [Bootstrap](https://getbootstrap.com/) - Bootstrap UI & Icons library
- [date-fns](https://date-fns.org/) - Library for manipulating/formatting of timestamps

#### Back-end Tech

- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework
- [MongoDB](https://www.mongodb.com/) - MongoDB for database
- [Mongoose](https://mongoosejs.com/docs/) - ODM for MongoDB
- [JSON Web Token](https://jwt.io/) - A standard to secure/authenticate HTTP requests
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables from a .env file

## Features

-	Frontend built with ReactJS, Redux, React-router, React hooks, ES6,7,8
-	Backend built with NodeJS, ExpressJS, RESTful APIs, MongoDB, Mongoose ODM
-	Authentication built with bcrypt and jsonwebtoken
-	CRUD projects with the ability to add multiple members
-	CRUD issues with title, description, status, 
-	CRUD notes for issues, for guiding other members
-	Error management on front end for guiding users and custom errors on backend for guiding developers
-	Responsive UI for desktop and mobile
-	Loading spinners for backend processes
-	Ability to filter issues by their status

## Usage


#### Env variable:

Create a .env file in server directory and add the following:

```
PORT = 3001
SECRET_KEY = "secret key"
MONGODB_URI = "your mongodb URI key
```

#### Client:
open client/src/services/api and change url to localhost or external server

Run client:

```
cd client
npm install
npm start
```

#### Server:

Run backend server:
```
cd server
nodemon server.js or node server.js
```

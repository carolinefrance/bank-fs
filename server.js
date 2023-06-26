/* How to Connect to MongoDB in VS Code: 
View / Command Palette / MongoDB: Connect with Connection String / 
mongodb+srv://Caroline:Th30br0m1n3@cluster0.jwmfoqf.mongodb.net/bank-fs
*/
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config.js');
const routes = require('./routes.js');
const path = require('path');
require('dotenv').config();

connectDB();

//app.use(express.static('public')); //<-- DEV MODE, npm run dev
app.use(express.static(path.join(__dirname, 'client/build'))); // <-- PRODUCTION MODE, npm start 
app.use(cors());

// REPLACE THE ORIGIN URL WITH DEPLOYED FRONTEND URL
/*
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
*/

app.use(express.json());
app.use("/api", routes); // handles all requests (POST, GET) to /api
/* comment out next 3 lines for DEV MODE, use for PRODUCTION */

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

// Added middleware for error handling
// Handle unfound page error 404 
app.use(function (req, res, next) {
    res.status(404).send('404: Page not found');
  });
  
// Handle internal server error 500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('500: Internal Server Error');
  });

/* To run server locally, node server.js
    To test, http://localhost:8080/api/create/peter/peter@mit/secret
    Browser output is the JSON object
    {"name":"peter","email":"peter@mit","password":"secret"}
*/
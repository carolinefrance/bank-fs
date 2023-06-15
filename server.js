/* How to Connect to MongoDB in VS Code: 
View / Command Palette / MongoDB: Connect with Connection String / 
mongodb+srv://Caroline:<password>@cluster0.jwmfoqf.mongodb.net/bank-fs
*/
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config.js');
const routes = require('./routes.js');
require('dotenv').config();

connectDB();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use("/api", routes); // handles all requests (POST, GET) to /api

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
/* Connect to MongoDB in VS Code: 
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
app.use("/api", routes);

/* Postman collection "bank-fs" */
/* Postman test successful: POST http://localhost:8080/api/create */
app.post('/create', function (req, res) {
  console.log('Create user request received.');
  res.send({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
});

/* Postman test failed: GET http://localhost:8080/api/create */
/* below is starter code, changed "params" to "body" */
app.get('/create/:name/:email/:password', function (req, res) {
  console.log('Get user request received.');
  res.send({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
});

app.get('/login/:email/:password', function (req, res) {
  console.log('Get login request received.');
  res.send({
    email: req.body.email,
    password: req.body.password
  });
});

app.get('/all', function (req, res) {
  console.log('Get all request received.');
  res.send({
    name: 'peter',
    email: 'peter@mit.edu',
    password: 'secret'
  });
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
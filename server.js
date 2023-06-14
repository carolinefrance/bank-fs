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

/* below is starter code */
app.get('/account/create/:name/:email/:password', function (req, res) {
  res.send({
    name: req.params.name,
    email: req.params.email,
    password: req.params.password
  });
});

app.get('/account/login/:email/:password', function (req, res) {
  res.send({
    email: req.params.email,
    password: req.params.password
  });
});

app.get('/account/all', function (req, res) {
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
// Handle 404 errors
app.use(function (req, res, next) {
    res.status(404).send('404: Page not found');
  });
  
  // Handle other errors
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('500: Internal Server Error');
  });  

/* To run server, node index.js
    To test, http://localhost:3000/account/create/peter/peter@mit/secret
    Browser output is the JSON object
    {"name":"peter","email":"peter@mit","password":"secret"}
*/
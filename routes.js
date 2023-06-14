const {createUser} = require('./controllers');
const express = require('express');
const router = express.Router();

router.post('/create', createUser);
module.exports = router;
// RESTful API routes for the app
const {createUser, login, getAllUsers, deleteUser, transaction, transfer} = require('./controllers');
const express = require('express');
const router = express.Router();

router.post('/create', createUser);
router.post('/login', login);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', transaction);
router.put('/users/:senderId/:recipientId', transfer);

module.exports = router;
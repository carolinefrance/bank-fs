const User = require('./models');

// These are functions that are called by routes.js
// Create user - Postman test works
async function createUser (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
    const userExists = await User.findOne({
        email: email
    });
    if (userExists) {
        res.status(400).json({message: 'User already exists, please log in'});
        return;
    }

    const newUser = await User.create(
        req.body
    );
    console.log(newUser);
    res.json(newUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('500: Internal Server Error');
    }
};
// login - Postman test works
async function login (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const userExists = await User.findOne({
            email: email
        });
        console.log("Log in user", userExists);
        if (!userExists) {
            res.status(400).json({message: 'User e-mail does not exist, please create an account.'});
            return;
        };
        if (userExists.password !== password) {
            res.status(400).json({message: 'Incorrect password, please try again.'});
            return;
        };
    res.json(userExists);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('500: Internal Server Error');
    }
};

// getAllUsers
async function getAllUsers (req, res) {
    try {
    const allUsers = await User.find({});
    console.log(allUsers);
    res.json(allUsers);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('500: Internal Server Error');
    }
};

// deleteUser
async function deleteUser (req, res) {

    try {
    await User.findByIdAndDelete(req.params.id);
    console.log("User deleted");
    res.json({message: "User deleted"});
    }
    catch (err) {
        console.log(err);
        res.status(500).send('500: Internal Server Error');
    }
};
// transaction
async function transaction (req, res) {
    try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        balance: req.body.balance
    });
    console.log(updatedUser);
    res.json(updatedUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('500: Internal Server Error');
    }
};

// transfer
async function transfer (req, res) {
    const transferAmount = req.body.transferAmount;
    const senderBalance = req.body.senderBalance;
    const recipientBalance = req.body.recipientBalance;

    try {
    const updatedSender = await User.findByIdAndUpdate(req.params.senderId, {
        balance: senderBalance - transferAmount
    });
    const updatedRecipient = await User.findByIdAndUpdate(req.params.recipientId, {
        balance: recipientBalance + transferAmount
    });
    res.json({message: "Transfer was successful."});
    }
    catch (err) {
        console.log(err);
        res.status(500).send('500: Internal Server Error');
    }
};

module.exports = {createUser, login, getAllUsers, deleteUser, transaction, transfer};

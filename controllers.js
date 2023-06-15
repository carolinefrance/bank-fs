const User = require('./models');

// Create a new user

async function createUser (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = await User.create({
        name: name, 
        email: email, 
        password: password
    });
    console.log(newUser);
    res.json(newUser);
};

module.exports = {createUser};

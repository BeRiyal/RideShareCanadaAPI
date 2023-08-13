const express = require('express');

// routes for making http requests
const router = express.Router();
const User = require('../Models/UsersModel');

router.get('/', (req, res) => {
    User.find()
        .then((data) => res.send(data))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    });
    newUser.save()
        .then(() => res.json('User added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/login', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ token: 'User not found' });
            }
            if (user.password !== password) {
                return res.status(401).json({ token: 'Incorrect password' });
            }
            // At this point, user is authenticated
            res.json({ token: user._id });
        })
        .catch(err => res.status(500).json({ token: 'Error: ' + err }));
});




module.exports = router;
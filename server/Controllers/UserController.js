const express = require('express');

// routes for making http requests
const router = express.Router();
const User = require('../Models/UsersModel');
const ApiResponse = require('../Models/ApiResponse');   

// router.get('/', (req, res) => {
//     User.find()
//         .then((data) => res.send(data))
//         .catch((err) => res.status(400).json('Error: ' + err));
// });

router.get('/', (req, res) => {
    User.find()
        .then(data => {
            const response = new ApiResponse(true, data, 'Data retrieved successfully');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });
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
                const response = new ApiResponse(false, null, 'User not found');
                return res.status(404).json(response);
            }
            if (user.password !== password) {
                const response = new ApiResponse(false, null, 'Incorrect password');
                return res.status(401).json(response);
            }
            // At this point, user is authenticated
            const response = new ApiResponse(true, { token: user._id }, 'Login successful');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });
});



router.put('/update/:id', (req, res) => {
    const userId = req.params.id;
    const updateData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    };

    User.findByIdAndUpdate(userId, updateData, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ token: 'User not found' });
            }
            res.json({ token: updatedUser._id });
        })
        .catch(err => res.status(500).json({ token: 'Error: ' + err }));
});

// Delete user by ID
router.delete('/delete/:id', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ token: 'User not found' });
            }
            res.json({ token: deletedUser._id });
        })
        .catch(err => res.status(500).json({ token: 'Error: ' + err }));
});


module.exports = router;
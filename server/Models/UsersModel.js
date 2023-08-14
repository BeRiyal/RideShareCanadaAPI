const mongoose = require('mongoose');
module.exports = mongoose.model('User', {
    // username, password, email, phone, address, city, state, zip
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type:String, required: true},
    phone: {type: String, required: false},
    address: {type: String, required: false},
    city: {type:String, required: false},
    state: {type: String, required: false},
    zip: {type: String, required: false}
});
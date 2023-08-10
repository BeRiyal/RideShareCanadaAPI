const mongoose = require('mongoose');
module.exports = mongoose.model('User', {
    // username, password, email, phone, address, city, state, zip
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type:String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    city: {type:String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true}
});
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Assuming 'User' is your User model
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

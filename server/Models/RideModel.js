const mongoose = require('mongoose');
// Ride Model
const rideSchema = new mongoose.Schema({
    from: String,
    to: String,
    startTime: Date,
    endTime: Date,
    availableSeats: Number,
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Ride = mongoose.model('Ride', rideSchema);


module.exports = {
    Ride
};





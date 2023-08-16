const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    from: String,
    to: String,
    startTime: String,
    date: String,
    availableSeats: String,
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;






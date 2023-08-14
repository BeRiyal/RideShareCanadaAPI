const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // References to the User model
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },       // Reference to the Car model
    ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },     // Reference to the Ride model
    bookingDate: { type: Date, default: Date.now } // Date when the booking was made
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

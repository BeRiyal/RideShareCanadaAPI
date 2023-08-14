const express = require('express');
const router = express.Router();
const Book = require('../Models/BookModel'); // Make sure the path is correct
const ApiResponse = require('../Models/ApiResponse');

// Create a new booking
router.post('/add', async (req, res) => {
    try {
        const bookingData = req.body;
        const newBooking = await Book.create(bookingData);
        res.status(201).json(new ApiResponse(true,newBooking, 'Booking created successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(false,  null, error.message));
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Book.find();
        res.json(new ApiResponse(true,bookings, 'Bookings retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(false,  null, error.message));
    }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Book.findById(req.params.id);
        if (!booking) {
            return res.status(404).json(new ApiResponse(false, null,'Booking not found'));
        }
        res.json(new ApiResponse(true,booking, 'Booking retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(false,  null, error.message));
    }
});

// Update booking by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBooking = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json(new ApiResponse(false,null, 'Booking not found'));
        }
        res.json(new ApiResponse(true,updatedBooking, 'Booking updated successfully' ));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message));
    }
});

// Delete booking by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBooking = await Book.findByIdAndRemove(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json(new ApiResponse(false,null, 'Booking not found'));
        }
        res.json(new ApiResponse(true,deletedBooking, 'Booking deleted successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message));
    }
});

module.exports = router;

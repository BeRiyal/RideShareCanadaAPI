const express = require('express');
const router = express.Router();
const Ride = require('../Models/RideModel'); // Make sure the path is correct
const ApiResponse = require('../Models/ApiResponse');

// Create a new ride
router.post('/add', async (req, res) => {
    try {
        const rideData = req.body;
        const newRide = await Ride.create(rideData);
        res.status(201).json(new ApiResponse(true, 'Ride created successfully', newRide));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, 'Error creating ride', null, error.message));
    }
});

// Get all rides
router.get('/', async (req, res) => {
    try {
        const rides = await Ride.find();
        res.json(new ApiResponse(true, 'Rides retrieved successfully', rides));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, 'Error retrieving rides', null, error.message));
    }
});

// Get ride by ID
router.get('/:id', async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            return res.status(404).json(new ApiResponse(false, 'Ride not found', null));
        }
        res.json(new ApiResponse(true, 'Ride retrieved successfully', ride));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, 'Error retrieving ride', null, error.message));
    }
});

// Update ride by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedRide = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRide) {
            return res.status(404).json(new ApiResponse(false, 'Ride not found', null));
        }
        res.json(new ApiResponse(true, 'Ride updated successfully', updatedRide));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, 'Error updating ride', null, error.message));
    }
});

// Delete ride by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedRide = await Ride.findByIdAndRemove(req.params.id);
        if (!deletedRide) {
            return res.status(404).json(new ApiResponse(false, 'Ride not found', null));
        }
        res.json(new ApiResponse(true, 'Ride deleted successfully', deletedRide));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, 'Error deleting ride', null, error.message));
    }
});

module.exports = router;

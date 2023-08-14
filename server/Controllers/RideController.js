const express = require('express');
const router = express.Router();
const Ride = require('../Models/RideModel'); // Make sure the path is correct
const ApiResponse = require('../Models/ApiResponse');

// Create a new ride
router.post('/add', async (req, res) => {
    try {
        const rideData = req.body;
        const newRide = await Ride.create(rideData);
        res.status(201).json(new ApiResponse(true, newRide,'Ride created successfully',));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message));
    }
});

// Get all rides
router.get('/getall', async (req, res) => {
    try {
        const rides = await Ride.find();
        res.json(new ApiResponse(true,  rides,'Rides retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(false,  null, error.message));
    }
});


// Get all rides that are available (i.e. rides that have not started yet)
router.get('/available', async (req, res) => {
    try {
        const currentTime = new Date(); // Get the current time

        const availableRides = await Ride.find({ startTime: { $gt: currentTime } });

        if (availableRides.length === 0) {
            return res.json(new ApiResponse(true, [], 'No available rides at the moment.'));
        }

        res.json(new ApiResponse(true, availableRides, 'Available rides retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message));
    }
});


// Get ride by ID
router.get('/getbyId/:id', async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            return res.status(404).json(new ApiResponse(false,  null,'Ride not found'));
        }
        res.json(new ApiResponse(true,  ride,'Ride retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message));
    }
});

// Update ride by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedRide = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRide) {
            return res.status(404).json(new ApiResponse(false,null, 'Ride not found'));
        }
        res.json(new ApiResponse(true,updatedRide, 'Ride updated successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(false,  null, error.message));
    }
});

// Delete ride by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedRide = await Ride.findByIdAndRemove(req.params.id);
        if (!deletedRide) {
            return res.status(404).json(new ApiResponse(false,null, 'Ride not found'));
        }
        res.json(new ApiResponse(true,deletedRide, 'Ride deleted successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(false,  null, error.message));
    }
});

// Search for rides based on 'from' and 'to' locations
router.get('/search', async (req, res) => {
    try {
        console.log(req.query);
        const { from, to } = req.body;

        if (!from || !to) {
            return res.status(400).json(new ApiResponse(false, null, 'Both "from" and "to" locations are required.'));
        }

        const rides = await Ride.find({ from: from, to: to });

        if (rides.length === 0) {
            return res.json(new ApiResponse(true, [], 'No rides found for the given locations.'));
        }

        res.json(new ApiResponse(true, rides, 'Rides retrieved successfully'));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message));
    }
});





module.exports = router;

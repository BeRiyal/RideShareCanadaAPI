// routes for making http requests
const express = require('express');
const router = express.Router();
const Car = require('../Models/CarModel');
const ApiResponse = require('../Models/ApiResponse');

// Create a new car
router.post('/add', async (req, res) => {
    try {
        const carData = req.body;
        console.log('Received car data:', carData); // Log the received data for debugging

        const newCar = await Car.create(carData);
        console.log('New car created:', newCar); // Log the newly created car for debugging

        res.status(201).json(new ApiResponse(true, 'Car created successfully', newCar));
    } catch (error) {
        console.error('Error creating car:', error); // Log the error for debugging
        res.status(500).json(new ApiResponse(false, 'Error creating car', null, error.message));
    }
});



// Get all cars
router.get('/', (req, res) => {
    Car.find()
        .then(data => {
            const response = new ApiResponse(true, data, 'Data retrieved successfully');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });
});

// Get car by ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json(new ApiResponse(false, 'Car not found', null));
        }
        res.json(new ApiResponse(true, 'Car retrieved successfully', car));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, 'Error retrieving car', null, error.message));
    }
});

// Update car by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCar) {
            return res.status(404).json(new ApiResponse(false, 'Car not found', null));
        }
        res.json(new ApiResponse(true, 'Car updated successfully', updatedCar));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, 'Error updating car', null, error.message));
    }
});

// Delete car by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndRemove(req.params.id);
        if (!deletedCar) {
            return res.status(404).json(new ApiResponse(false, 'Car not found', null));
        }
        res.json(new ApiResponse(true, 'Car deleted successfully', deletedCar));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, 'Error deleting car', null, error.message));
    }
});

module.exports = router;



module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');

//local imports
const connectDB = require('./db.js');
const userRoutes = require('./Controllers/UserController.js');
const carRoutes = require('./Controllers/CarController.js');
const rideRoutes = require('./Controllers/RideController.js');
const bookingRoutes = require('./Controllers/BookingController.js');
//initialize express
const app = express();

//middleware
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/booking", bookingRoutes);
//connect to database
const port = process.env.PORT || 5085;
connectDB()
    .then(() => {
        console.log('MongoDB connected')
     //   app.listen(process.env.PORT, () => console.log(process.env.PORT));
        app.listen(port, () => console.log('Server running on port 3000'));
    })
    .catch((err) => console.log(err));

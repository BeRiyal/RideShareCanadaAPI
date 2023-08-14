const express = require('express');
const bodyParser = require('body-parser');

//local imports
const connectDB = require('./db.js');
const userRoutes = require('./Controllers/UserController.js');
const carRoutes = require('./Controllers/CarController.js');
//initialize express
const app = express();

//middleware
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);

//connect to database
const port = process.env.PORT || 3000;
connectDB()
    .then(() => {
        console.log('MongoDB connected')
        app.listen(process.env.PORT, () => console.log('Server running on port 3000'));
    })
    .catch((err) => console.log(err));

const express = require('express');
const bodyParser = require('body-parser');

//local imports
const connectDB = require('./db.js');
const userRoutes = require('./Controllers/UserController.js');

//initialize express
const app = express();

//middleware
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

connectDB()
    .then(() => {
        console.log('MongoDB connected')
        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch((err) => console.log(err));
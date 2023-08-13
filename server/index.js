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


const port = process.env.PORT || 3000;
connectDB()
    .then(() => {
        console.log('MongoDB connected')
        app.listen(port, () => console.log('Server running on port 3000'));
    })
    .catch((err) => console.log(err));

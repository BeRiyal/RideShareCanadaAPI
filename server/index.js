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

const os = require('os');

const networkInterfaces = os.networkInterfaces();
const ipv4Addresses = [];

for (const interfaceName in networkInterfaces) {
  const interfaces = networkInterfaces[interfaceName];
  for (const iface of interfaces) {
    if (iface.family === 'IPv4' && !iface.internal) {
      ipv4Addresses.push(iface.address);
    }
  }
}

console.log('IP Addresses:', ipv4Addresses);

connectDB()
    .then(() => {
        console.log('MongoDB connected')
        console.log(process.env.PORT);
        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch((err) => console.log(err));
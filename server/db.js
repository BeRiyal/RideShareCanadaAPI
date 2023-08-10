const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://Riyal:Jinal%401967@cluster0.nzx0afp.mongodb.net/RideData?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

module.exports = () => {
    return mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true})
};
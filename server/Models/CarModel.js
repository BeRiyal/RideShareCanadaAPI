// Car Model
const carSchema = new mongoose.Schema({
    model: String,
    make: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Car = mongoose.model('Car', carSchema);

module.exports = {
    Car
};
const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        unique: true
    },
    created_at:{
        type: Date,
        default: Date.now()
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const { MONGO_URI} = process.env;
const connection = mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});

module.exports = connection;
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// Route
const restaurant = require('./src/routes/restaurant');
//mongoURI
require('./src/database/connection');

const app = express();
const PORT = process.env.PORT || 5000;
// config dotenv
dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// restaurant route configurations
app.use(restaurant);

app.listen(PORT,()=>{
  console.log(`Server is listening on PORT ${PORT}`);
});
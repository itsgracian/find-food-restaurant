const express = require('express');
const App = express.Router();

const message = (res,status, message, data,success) =>{
    return res.status(status).json({success, message, data});
}
// model
const Restaurant = require('../models/restaurant');

/**
 * POST
 * allow user to get available restaurant and return them on slack channel
 * 
 */
App.post('/restaurant', (req,res)=>{
    console.log(req.body);
});

/**
 * create restaurant
 */
App.post('/restaurant/create', async(req,res)=>{
  const { name, description } = req.body;
  try {
    const data = await new Restaurant({
        name,
        description
    }).save();
    const successMessage = 'restaurant submitted successfully.';
    return message(res, 201, successMessage, data, true);
  } catch (error) {
      console.log(error);
      const errorMessage =  'Error occured while submitting restaurant';
      return message(res, 500, errorMessage, null, false);
  }
});



module.exports = App;
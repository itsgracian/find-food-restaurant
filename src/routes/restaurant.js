const express = require('express');
const {config} = require('dotenv');
const {restaurantResponse, errorResponse, allRestaurantResponse } = require('../helpers/slackResponse');
const App = express.Router();

//config dotenv
config();

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
App.post('/restaurant', async (req,res)=>{
    try {
        const { text } = req.body;
        const find = await Restaurant.findOne({ name: text.toLowerCase() });
        if(!find){
            const errorMessage = 'sorry requested restaurant could not be found';
            const responseError = errorResponse(errorMessage);
            return res.status(200).json(responseError);
        }
        const response = restaurantResponse('gratien', find);
        return res.status(201).json(response);
    } catch (error) {
        const errorMessage =  'Error occured while fetching restaurants';
        const response = errorResponse(errorMessage);
       return res.status(500).json(response);
    }
});

/**
 * create restaurant
 */
App.post('/restaurant/create', async(req,res)=>{
  const { name, description } = req.body;
  try {
    const data = await new Restaurant({
        name: name.toLowerCase(),
        description
    }).save();
 
    const successMessage = 'restaurant submitted successfully.';
    return message(res, 201, successMessage, data, true);
  } catch (error) {
      const errorMessage =  'Error occured while submitting restaurant';
      return message(res, 500, errorMessage, null, false);
  }
});

/**
 * fetch all restaurant
 */
App.post('/restaurant/all', async(req,res)=>{
    try {
        const find = await Restaurant.find({});
        if(find.length<0){
            const errorMessage = 'sorry no restaurant available this moment';
            const response = errorResponse(errorMessage);
            return res.status(200).json(response);
        }
       const responseInfo = allRestaurantResponse('gratien', find);
        return res.status(200).json(responseInfo);
    } catch (error) {
        const errorMessage =  'Error occured while fetching restaurants';
        const response = errorResponse(errorMessage);
       return res.status(500).json(response);
    }
})


module.exports = App;
const express = require('express');
const { createMessageAdapter } = require('@slack/interactive-messages');
const { WebClient } = require('@slack/web-api');
const {config} = require('dotenv');
const {allRestaurantResponse, errorResponse } = require('../helpers/slackResponse');
const App = express.Router();

//config dotenv
config();

const { SLACK_OAUTH_TOKEN } = process.env;

const web = new WebClient(SLACK_OAUTH_TOKEN);

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
        const response = allRestaurantResponse('gratien', find);
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



module.exports = App;
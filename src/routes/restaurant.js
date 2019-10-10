const express = require('express');
const {config} = require('dotenv');
const qs = require('querystring');
const axios = require('axios');
const {restaurantResponse, errorResponse, allRestaurantResponse, 
 createDialog } = require('../helpers/slackResponse');

const App = express.Router();

//config dotenv
config();
const apiUrl = 'https://slack.com/api';
const respondURL = 'https://slack.com/api/chat.postMessage';
const {SLACK_OAUTH_TOKEN, SLACK_SIGNING_SECRET} = process.env;
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
});
/**
 * create restaurant
 */
App.post('/restaurant/create', async (req,res)=>{
    try {
        const {trigger_id } = req.body;
        const callbackId ='create new restaurant';
        const dialog = createDialog(SLACK_OAUTH_TOKEN, trigger_id, callbackId);
        await axios.post(`${apiUrl}/dialog.open`, qs.stringify(dialog));
        res.send('');
    } catch (error) {
        const errorMessage =  'Error occured while bringing restaurant modals';
        const response = errorResponse(errorMessage);
       return res.status(500).json(response);
    }
});
/**
 * save restaurant
 */
App.post('/restaurant/store', async(req,res)=>{
    try {
      const body = JSON.parse(req.body.payload);
      const userId = body.user.id;
      const { name, description } = body.submission;
      const data = await new Restaurant({
          name: name.toLowerCase(),
          description
      }).save();
      res.send('');
    } catch (error) {
        const errorMessage =  'Error occured while submitting a new restaurant';
        const response = errorResponse(errorMessage);
       return res.status(500).json(response);
    }
});

module.exports = App;
const restaurantResponse = (name, response) =>{
const responseInformation = {
    attachments: [
        {
            color: "#36a64f",
            auth_name:`${name}`,
            title: `${response.name}`,
            fields: [
                {
                value: response.description
                }
            ]
        }
    ]
}
 return responseInformation;
};

const errorResponse = (errorMessage) =>{
   const response = {
       attachments:[
           {
               color:"#f90613",
               title:`${errorMessage}`,
           }
       ]
   }
   return response;
}

const allRestaurantResponse = (name, response) =>{
  const returnBody = {
      attachments:[
          {
              title: "List of available restaurant",
              auth_name: `${name}`,
              color: "#36a64f",
              fields: response.map(item=>({
                  title: item.name,
                  value: item.description
              }))
          }
      ]
  };
  return returnBody;
};

const createRestaurantResponse = () =>{
    const bodys ={
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "information have been saved successfully.",
                    "emoji": true
                }
            }
        ]
    };
    return bodys;
}

const createDialog = (SLACK_OAUTH_TOKEN, trigger_id, callback_id) =>{
const dialog = {
    token: SLACK_OAUTH_TOKEN,
    trigger_id,
    dialog: JSON.stringify({
        title: 'Submit new Restaurant',
        callback_id,
        submit_label: 'Submit',
        elements: [
            {
                label: 'Name of restaurant',
                type: 'text',
                name: 'name',
                value: ''
            },{
                label: 'Description',
                type: 'textarea',
                name:'description'
            }
        ]

    })
};
return dialog;
}
// 
module.exports = {
    restaurantResponse,
    errorResponse,
    allRestaurantResponse,
    createRestaurantResponse,
    createDialog
};
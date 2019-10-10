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
module.exports = {
    restaurantResponse,
    errorResponse,
    allRestaurantResponse
};
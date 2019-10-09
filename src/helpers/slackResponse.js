const allRestaurantResponse = (name, response) =>{
const responseInformation = {
    attachments: [
        {
            color: "#36a64f",
            auth_name:`${name}`,
            title: "List of available restaurant",
            fields: [
                {
                title: response.name,
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

module.exports = {
    allRestaurantResponse,
    errorResponse
};
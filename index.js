'use strict';
const axios = require('axios');     
exports.handler = (event, context, callback) => {
    var orderNumber=event.currentIntent.slots.orderNumber;
    var reason=event.currentIntent.slots.reason;   
    var cred = process.env.credentials;
    var url = process.env.url;

    /* Construct request payload */

    var reqdata='{	"orderNumber": "'+orderNumber+'",	"cancelReason": "'+reason+'"}';


    let res = axios.post(url, reqdata,{headers : { Authorization:cred}}).then((res) => {
              callback(null,{
	                            "dialogAction": {
		                                            "type": "Close",
		                                            "fulfillmentState": "Fulfilled",
		                                            "message": {
			                                                      "contentType": "PlainText",
			                                                      "content": "Thanks for contacting us, Your incedent is created with #"+res.data.CaseNumber+"." 
                                                                }
	                                             }
                             });
      });
};

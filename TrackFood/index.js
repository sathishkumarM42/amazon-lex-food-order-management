'use strict';
const axios = require('axios');     
exports.handler = (event, context, callback) => {
    var orderNumber=event.currentIntent.slots.orderNumber;
    var cred = process.env.credentials;
    var url = process.env.url;

    /* Construct request payload */

     axios.get(url, {headers : { Authorization:cred}}).then((res) => {
              callback(null,{
	                            "dialogAction": {
		                                            "type": "Close",
		                                            "fulfillmentState": "Fulfilled",
		                                            "message": {
			                                                      "contentType": "PlainText",
			                                                      "content": "your order is "+res.data.orderStatus
	                                      	                  }
	                                             }
                             });
      });
};
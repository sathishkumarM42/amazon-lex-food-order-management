'use strict';
const axios = require('axios');     
exports.handler = (event, context, callback) => {
    var name=event.currentIntent.slots.name;
    var foodItem=event.currentIntent.slots.food;
    var quantity=event.currentIntent.slots.quantity;
    var restaurant=event.currentIntent.slots.restaurant;
    var mobile=event.currentIntent.slots.mobile;
    var location=event.currentIntent.slots.location;
    var cred = process.env.credentials;
    var url = process.env.url;

    /* Construct request payload */

    var reqdata='{	"name": "'+name+'",	"food": "'+foodItem+'",	"quantity": "'+quantity+'",	"restaurant": "'+restaurant+'",	"mobile":"'+mobile+'",	"deliveryLocation": "'+location+'"}';


    let res = axios.post(url, reqdata,{headers : { Authorization:cred}}).then((res) => {
        if(res.data.status=='success'){
            callback(null,{
                "dialogAction": {
                                    "type": "Close",
                                    "fulfillmentState": "Fulfilled",
                                    "message": {
                                                  "contentType": "PlainText",
                                                  "content": "Thank you "+name+" for placing an order with us, your "+quantity+" "+foodItem+" is Confirmed with order number "+res.data.orderNumber  
                                                }
                                 }
             });

        }
        else{
            callback(null,{
                "dialogAction": {
                                    "type": "Close",
                                    "fulfillmentState": "Fulfilled",
                                    "message": {
                                                  "contentType": "PlainText",
                                                  "content": "Please try again later..." 
                                                }
                                 }
             });
        }     

      });
};
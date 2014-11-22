// Documentation
// https://www.twilio.com/blog/2013/03/introducing-the-twilio-module-for-node-js.html
// http://www.twilio.com/docs/node/install
// http://www.twilio.com/docs/api/rest/sending-messages

// Load the twilio module
var twilio = require('twilio');
var config = require('app-config');

var twilioAccountSid = config.smsConfig.twilioAccountSid;
var twilioAuthToken = config.smsConfig.twilioAuthToken;
var twilioProvidedFromNumber = config.smsConfig.twilioProvidedFromNumber;

// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient(twilioAccountSid, twilioAuthToken);

var smsIntegration = {
sendSms: function(toMobileNumber, cachedObjWithProvidedInformation) {

    var stringifiedInputInformation = JSON.stringify(cachedObjWithProvidedInformation);

    // logging the scenario
    var logMessage = 'About to send to this number ' + toMobileNumber + ' the information collected ' + stringifiedInputInformation;
    console.log(logMessage);

    var smsContent = 'You made it! :) ' + stringifiedInputInformation;

    // Pass in parameters to the REST API using an object literal notation. The
    // REST client will handle authentication and response serialzation for you.
    client.sms.messages.create({
        to: toMobileNumber,
        from: twilioProvidedFromNumber,
        body: smsContent
    }, this.dealWithTwilioResponse);
},

dealWithTwilioResponse: function(error, message) {
   // The HTTP request to Twilio will run asynchronously. This callback
   // function will be called when a response is received from Twilio
   // The "error" variable will contain error information, if any.
   // If the request was successful, this value will be "falsy"
   if (!error) {
       // The second argument to the callback will contain the information
       // sent back by Twilio for the request. In this case, it is the
       // information about the text messsage you just sent:
       console.log('Success! The SID for this SMS message is:');
       console.log(message.sid);
       console.log('Message sent on:');
       console.log(message.dateCreated);
   } else {
       console.log('Oops! There was an error.');
   }
}
};

module.exports = smsIntegration;
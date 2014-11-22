//var express = require('express');
//var router = express.Router();
var config = require('app-config');
var smsIntegration = require('../methods/SmsIntegration');

// the hardcoded mobile number to send to the sms text
var sendSmsToThisNumber = config.smsConfig.receiverMsisdn;

function sendSms(dataObj, res) {
  console.log('About to send an sms with this data: ', dataObj);
  smsIntegration.sendSms(sendSmsToThisNumber, dataObj);
  res.send(
    { statement: dataObj }
  );
}

//router.post('/send_sms', httpSms);
//function httpSms(req, res) {
exports.httpSms = function(req, res) {
  console.log(req);
  var reqBody = req.body;
  console.log('The body of the request: ' + JSON.stringify(reqBody));
  sendSms(reqBody, res);
}

//module.exports = router;

/* jshint node:true */

/**
 * Module dependencies.
 */
var express = require('express'),
  routes = require('./routes'),
  cache = require('./routes/cache'),
  smsService = require('./routes/smsService'),
  http = require('http'),
  path = require('path');
var app = express();

// all environments
// https://developer.ibm.com/answers/questions/22585/pushing-nodejs-app.html
app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('host',process.env.VCAP_APP_HOST || 'localhost');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get("/cache/:key", cache.getCache);
app.put("/cache", cache.putCache);
app.delete("/cache/:key", cache.removeCache);

// Twilio SMS stuff
app.post('/twilio/send_sms', smsService.httpSms);

//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});

module.exports = app;

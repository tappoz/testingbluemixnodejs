/* jshint node:true */

/**
 * Module dependencies.
 */
var express = require('express'),
  routes = require('./routes'),
  cache = require('./routes/cache'),
  sms = require('./routes/sms'),
  http = require('http'),
  path = require('path');
var app = express();

// all environments
app.set('port', process.env.VCAP_APP_PORT || 3000); // Bluemix needs to set its own port at runtime
app.set('host', process.env.VCAP_APP_HOST || 'localhost');
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
app.post('/twilio/send_sms', sms.httpSms);

module.exports = app;

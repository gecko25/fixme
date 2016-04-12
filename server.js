var tracer = require('tracer');
var logger = require('./server/config/logger');
var express = require('express');
var https = require('https');
var http = require('http');
var config = require('./server/config/config');

var app = express();

logger.log('configuring express');
require('./server/config/express')(app);

/*logger.log('configuring mongoose');
 require('./server/config/mongoose')();*/

logger.log('configuring routes');
require('./server/config/routes')(app);

logger.log('configuring listener for http on port: ' + config.http.port);
app.listen(config.http.port);

logger.log("Listening on port " + config.http.port);

module.exports = app;

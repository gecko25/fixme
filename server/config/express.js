var express = require('express'); // Express web server framework
var cookieSession = require('cookie-session');
var config = require('./config')
var credentials = require('./credentials')

module.exports = function (app){
  var sess = {
    key: 'session',
    secret: credentials.cookie_secret,
    cookie: {}
  }
//TODO: need to see the cookie.secure value to true (https only) for production -- https://github.com/expressjs/session

  app.use(express.static( config.rootPath + '/public'))
     .use(cookieSession(sess))

     //TODO: body-parser configuration, template engine configuration
}

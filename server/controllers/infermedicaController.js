var config = require('../config/config');
var credentials = require('../config/credentials');
var request = require('request');
var colors = require('colors');

var headers = {
        'app_id': credentials.infermedica.app_id,
        'app_key': credentials.infermedica.app_key
    };

exports.generateSymptoms = function(req, res) {
    var authOptions = {
        url: 'https://api.infermedica.com/v2/symptoms',
        headers: headers,
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (error)
            console.log(error);
        if (body)
            console.log(body)
    });

};



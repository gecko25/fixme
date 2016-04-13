var config = require('../config/config');
var credentials = require('../config/credentials');
var request = require('request');
var colors = require('colors');
var querystring = require('query-string');

var headers = {
        'app_id': credentials.infermedica.app_id,
        'app_key': credentials.infermedica.app_key
    };

exports.generateSymptoms = function(req, res) {
    var options = {
        url: 'https://api.infermedica.com/v2/symptoms',
        headers: headers,
        json: true
    };

    request.get(options, function(error, response, body) {
        if (error)
            console.log('Error!' + error);
        if (body)
            res.json(body);

    });
};

exports.searchText = function(req, res) {
    var options = {
        url: 'https://api.infermedica.com/v2/search?' + querystring.stringify(req.params),
        headers: headers,
        json: true
    };

    request.get(options, function(error, response, body) {
        if (error)
            console.log('Error!' + error);
        if (response)
            res.send(response.body)
    });

};


exports.diagnose = function(req, res) {
    var options = {
        url: 'https://api.infermedica.com/v2/symptoms',
        headers: headers,
        json: true
    };

    request.get(options, function(error, response, body) {
        if (error)
            console.log('Error! ${error}');
        if (body)
            res.json(body);

    });

};


/**
 * Template taken from : https://github.com/pblair12/mosaic-groups/blob/master/server/config/config.js
 */
var logger = require('./logger');
var path = require('path');
var fs = require('fs');

//globals
var rootPath = path.normalize(__dirname + '/../../');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'local';
var localport = 4000;

// we need to default to the hosted dev DB is there is a username and password vars configured
/*var devDBConnection;
if (typeof (process.env.MOSAICGROUPS_USERNAME) != "undefined" && typeof (process.env.MOSAICGROUPS_PASSWORD) != "undefined") {
    devDBConnection = 'mongodb://' + process.env.MOSAICGROUPS_USERNAME + ':' + process.env.MOSAICGROUPS_PASSWORD + '@ds061288.mongolab.com:61288/mosaicgroups-dev';
} else {
    if (typeof (process.env.DEV_HOST) != "undefined") {
        devDBConnection = 'mongodb://' + process.env.DEV_HOST + ':27017/mosaicgroups';
    }
    else {
        devDBConnection = 'mongodb://localhost:27017/mosaicgroups';
    }
}
logger.log("Using the following as a monogo connection string for dev: ", devDBConnection);*/
var envs = {
    local: {
        env: env,
        domain: 'localhost',
        db: {
            url: 'tbd',
            debugMode: true
        },
        rootPath: rootPath,
        http: {
            port: process.env.PORT || localport
        },
        redirect_uri: 'http://localhost:' + localport + '/showme',
        /*https: {
            port: process.env.SSLPORT || 3031,
            options: {
                key: fs.readFileSync('server/certs/server.key'),
                cert: fs.readFileSync('server/certs/server.crt')
            }
        },*/
    },

    development: {
        env: env,
        domain: 'fixme-lathe.herokuapp.com',
        redirect_uri: 'tbd',
        db: {
            url: 'tbd',
            debugMode: true
        },
        rootPath: rootPath,
        http: {
            port: process.env.PORT || 80
        }
        /*https: {
            port: process.env.SSLPORT || 3031,
            options: {
                key: fs.readFileSync('server/certs/server.key'),
                cert: fs.readFileSync('server/certs/server.crt')
            }
        },*/
    },

    production: {
        env: env,
        domain: 'fixme-lathe.herokuapp.com',

        /*db: {
            url: 'mongodb://' + process.env.MOSAICGROUPS_USERNAME + ':' + process.env.MOSAICGROUPS_PASSWORD + '@ds027489.mongolab.com:27489/mosaicgroups',
            debugMode: false
        },*/
        rootPath: rootPath,
        http: {
            port: process.env.PORT || 80
        },
        /*https: {
            port: process.env.SSLPORT || 443,
            options: {
                key: fs.readFileSync('server/certs/server.key'),
                cert: fs.readFileSync('server/certs/server.crt')
            }
        }*/
    }
}
envs.test = envs.development;

module.exports = envs[env];

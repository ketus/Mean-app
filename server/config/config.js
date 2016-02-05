var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        dbString: 'mongodb://ketus:meanapp@ds041693.mongolab.com:41693/meanappdb',
        port: process.env.PORT || 1337
    },
    production: {
        rootPath: rootPath,
        // TODO dbString: 'connection string for production mongoDB',
        port: process.env.PORT || 80
    }
};
var mongoose = require('mongoose'),
    userModel = require('../models/User');


module.exports = function (config) {

    mongoose.connect(config.dbString);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function () {
        console.log('db connection is open');
    });

    userModel.createDefaultUsers();

};

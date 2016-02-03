var mongoose = require('mongoose');

module.exports = function (config) {

    var db = mongoose.createConnection(config.dbString);
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function () {
        console.log('db connection is open');
    });
};
var mongoose = require('mongoose');

function dbController() {
    mongoose.connect('mongodb://ketus:meanapp@ds041693.mongolab.com:41693/meanappdb');
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));

    db.once('open', function () {
        console.log('db connection is open');
    });

    var testSchema = mongoose.Schema({
        message: String
    });

    var testMessage = mongoose.model('testMessage', testSchema);
    var mongoMessage ='';

    testMessage.findOne().exec(function (err, messageC) {
        if (err) console.error(err);
        else mongoMessage = messageC.message;
    });
    return mongoMessage;
}




module.exports = {
    mongoMessage: dbController
};
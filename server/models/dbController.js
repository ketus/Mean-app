var mongoose = require('mongoose');

if (process.env.NODE_ENV === 'development') {
    mongoose.createConnection('mongodb://localhost/MEANapp');
    console.log('In development mode.');
} else {
    var db = mongoose.createConnection('mongodb://ketus:meanapp@ds041693.mongolab.com:41693/meanappdb');
    console.log('In production mode.');
}



db.on('error', console.error.bind(console, 'connection error...'));

db.once('open', function () {
    console.log('db connection is open');
});

var messageSchema = mongoose.Schema({message: String});
var Message = db.model('Message', messageSchema);


module.exports = Message;


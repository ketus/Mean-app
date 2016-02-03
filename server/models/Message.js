var mongoose = require('mongoose');
var config = require('../../server/config/config').development;



var messageSchema = mongoose.Schema({message: String});
var Message = db.model('Message', messageSchema);


module.exports = Message;


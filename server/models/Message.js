var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({message: String});
var Message = db.model('Message', messageSchema);


module.exports = Message;


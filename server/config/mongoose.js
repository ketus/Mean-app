var mongoose = require('mongoose');

module.exports = function (config) {

    var db = mongoose.createConnection(config.dbString);
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function () {
        console.log('db connection is open');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        joined: {type: Date, default: Date.now}
    });

    var User = db.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log(err);
        }
        if (collection.length === 0) {
            User.create({firstName: 'Maciej', lastName: 'Ketusiątko', username: 'Ketus'});
            User.create({firstName: 'Marcin', lastName: 'Tob', username: 'Aldaron'});
            User.create({firstName: 'Aneta', lastName: 'Gru', username: 'Antenka'});
        }
    });
};


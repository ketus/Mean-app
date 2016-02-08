var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {

    mongoose.connect(config.dbString);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function () {
        console.log('db connection is open');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        joined: {type: Date, default: Date.now},
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return hashPassword(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };
    //Create example accounts for testing authentication
    var User = db.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log(err);
        }
        if (collection.length === 0) {
            var salt,
                hash;

            salt = createSalt();
            hash = hashPassword(salt, 'Ketus');
            User.create({
                firstName: 'Maciej',
                lastName: 'Ketusiątko',
                username: 'Ketus',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });
            salt = createSalt();
            hash = hashPassword(salt, 'Aldaron');
            User.create({
                firstName: 'Marcin',
                lastName: 'Tob',
                username: 'Aldaron',
                salt: salt,
                hashed_pwd: hash,
                roles: ['standard']});
            salt = createSalt();
            hash = hashPassword(salt, 'Antenka');
            User.create({
                firstName: 'Aneta',
                lastName: 'Gru',
                username: 'Antenka',
                salt: salt,
                hashed_pwd: hash});
        }
    });

    var createSalt = function () {
        return crypto.randomBytes(128).toString('base64');
    };

    var hashPassword = function (salt, pwd) {
        var hmac = crypto.createHmac('sha1', pwd);
        return hmac.update(pwd).digest('hex');
    };
};

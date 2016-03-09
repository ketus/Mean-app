var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');


var userSchema = mongoose.Schema({
    firstName: {type: String, required:'{PATH} is required!'},
    lastName: {type: String, required:'{PATH} is required!'},
    username: {
        type: String,
        required:'{PATH} is required!',
        unique: true
    },
    salt: {type: String, required:'{PATH} is required!'},
    hashed_pwd: {type: String, required:'{PATH} is required!'},
    joined: {type: Date, default: Date.now},
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
};

//Create example accounts for testing authentication
var User = mongoose.model('User', userSchema);

exports.createDefaultUsers = function () {
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log(err);
        }
        if (collection.length === 0) {
            var salt,
                hash;

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'ketus');
            User.create({
                firstName: 'Maciej',
                lastName: 'Ketusiątko',
                username: 'ketus',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'aldaron');
            User.create({
                firstName: 'Marcin',
                lastName: 'Tob',
                username: 'aldaron',
                salt: salt,
                hashed_pwd: hash,
                roles: ['standard']
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'antenka');
            User.create({
                firstName: 'Aneta',
                lastName: 'Gru',
                username: 'antenka',
                salt: salt,
                hashed_pwd: hash
            });
        }
    });
};

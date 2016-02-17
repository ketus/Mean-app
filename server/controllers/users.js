var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

module.exports.getUsers = function (req, res) {
    User.find({}, function (err, collection) {
        res.send(JSON.stringify(collection, null, 4));
    });
};

module.exports.createUser = function (req, res, next) {
    var userData = req.body;
    userdata.username = userData.username.toLocaleLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPassword(userData.salt, userData.password);
    User.create(userData, function (err, user) {
       if(err){
           if(err.toString().indexOf('E11000') > -1){
               err = new Error('Duplicate Username');
           }
           res.status(400);
           return res.send({reason:err.toString()});
       }

        req.login(user, function (err) {
            if(err) return next(err);
            res.send(user);
        })
    });

};
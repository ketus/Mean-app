var passport = require('passport');

module.exports.authenticate = function (req, res, next) {
    req.body.username = req.body.username.toLocaleLowerCase();
    var auth = passport.authenticate('local', function (err, user) {
        if(err) { return next(err); }
        if(!user) {
            res.send( { success: false } );
        }

        req.login(user, function (err) {
            if(err) { return next(err); }
            res.send({ success: true, user: user });
        });
    });
    auth(req, res, next);
};

module.exports.stripUser = stripUser = function (user) {
    if(!!user) {
        return {
            //Return only useful data, no salt nor hash
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }
    }
};

module.exports.requiresApiLogin = function (req, res, next) {
    if(req.isUnauthenticated()){
        res.status(403);
        res.end();
    } else next();
};

module.exports.requiresRole = function (role) {
    return function (req, res, next) {
        if(req.isUnauthenticated() || req.user.roles.indexOf(role) === -1) {
            res.status(403);
            res.end('Unauthorized');
        } else {
            next();
        }
    }
};
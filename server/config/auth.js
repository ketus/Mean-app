var passport = require('passport') || 0;

module.exports.authenticate = function (req, res, next) {

    var auth = passport.authenticate('local', function (err, user) {
        if(err) { return next(err); }
        if(!user) {
            res.send( { success: false } );
        }

        req.login(user, function (err) {
            if(err) { return next(err); }
            res.send({ success: true, user: stripUser(user) });
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
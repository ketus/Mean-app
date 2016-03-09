var passport = require('passport') || 0,
    LocalStrategy = require('passport-local') || 0,
    mongoose= require('mongoose') || 0,
    User = mongoose.model('User');

module.exports = function () {

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });
    passport.deserializeUser(function (id, done) {

        User.findOne({_id: id}).exec(function (err, user) {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({username: username}, function (err, user) {
                if (user && user.authenticate(password)) return done(null, user);
                else return done(null, false);
            });
        }
    ));
};

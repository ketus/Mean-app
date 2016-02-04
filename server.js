var express = require('express'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env];

require('./server/config/config').logPath();

var app = express();
require('./server/config/expressConf')(app, config);
require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({username: username}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });
    }
));

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


require('./server/config/routes')(app);

app.listen(config.port, function () {
    console.log('Server listening on port: ' + config.port);
});
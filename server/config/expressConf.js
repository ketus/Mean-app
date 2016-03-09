var logger = require('morgan'),
    bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    stylus = require('stylus') || 0,
    passport = require('passport') || 0;

module.exports = function(app, config) {

    function compile(str, compilePath) {
        return stylus(str).set('filename', compilePath);
    }

    app.set('views', path.join(config.rootPath, 'server', 'views'));
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        secret: 'not really a secret ketus',
        resave: true,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));
    app.use(express.static(path.join(config.rootPath, 'public')));
};
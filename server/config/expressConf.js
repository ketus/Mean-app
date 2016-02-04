var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var stylus = require('stylus');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app, config) {

    function compile(str, compilePath) {
        return stylus(str).set('filename', compilePath);
    }


    app.set('views', path.join(config.rootPath, 'server', 'views'));
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({
        secret: 'not really a secret ketus',
        saveUninitialized: true,
        resave: true
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
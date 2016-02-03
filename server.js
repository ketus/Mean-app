var express = require('express');
var path = require('path');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var db = require('./server/models/dbController');


process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var app = express();
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'jade');

function compile(str, path){
    return stylus(str).set('filename', path);
}

app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/partials/*', function (req, res) {
    res.render('../../public/app/' + req.params['0']);
});

app.get('*', function (req, res) {
    db.findOne(function (err, data) {
        if (err) console.log(err);
        res.render('index', {
            mongoMessage: data.message
        });
    });
});



var port = process.env.PORT || 1337;

app.listen(port, function () {
    console.log('Server listening on port: ' + port);
});
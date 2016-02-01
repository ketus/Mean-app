var express = require('express');
var path = require('path');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');

var dbController = require('./server/models/dbController');
dbController = dbController.mongoMessage();
var env  = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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


app.get('/partials/:partial', function (req, res) {
    res.render('partials/' + req.params.partial);
});

app.get('*', function (req, res) {
    res.render('index', {
        data: dbController
    });
});



var port = process.env.PORT || 1337;

app.listen(port, function () {
    console.log('Server listening on port: ' + port);
});
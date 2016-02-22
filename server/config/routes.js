var auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses');
    User = require('mongoose').model('User');

module.exports = function (app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers );
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/courses', courses.getCourses);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params['0']);
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    //    DEFAULT ROUTES

    app.all('/api/*', function ( req, res ) {
       res.send(404);
    });

    app.get('*', function (req, res) {
        res.render('index', {
             /* TODO
             call   auth.stripUser(req.user)   to send
             user data to client without password etc.*/
            bootstrappedUser: req.user
        });
    });
};

var auth = require('./auth'),
    users = require('../controllers/users'),
    User = require('mongoose').model('User');

module.exports = function (app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers );
    app.post('/api/users', users.createUser);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params['0']);
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
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

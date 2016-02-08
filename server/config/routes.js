var auth = require('./auth');

module.exports = function (app) {

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params['0']);
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function (req, res) {
        console.log(req.user);
        res.render('index', {
            // TODO use auth.stripUser(req.user) to send
            // user data to client without password etc.
            bootstrappedUser: req.user
        });
    });
};

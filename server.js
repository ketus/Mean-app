var express = require('express'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env];

require('./server/config/config').logPath();

var app = express();
require('./server/config/expressConf')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);

app.listen(config.port, function () {
    console.log('Server listening on port: ' + config.port);
});
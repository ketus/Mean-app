var express = require('express'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env];

var app = express();
require('./server/config/expressConf')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);

app.listen(config.port, config.address);

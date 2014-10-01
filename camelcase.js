var express = require('express');
var morgan = require('morgan');
var credentials = require('./credentials.js');
var app = express();
var bodyParser = require('body-parser');
var env = app.get('env');

// ----------------- mongodb --------------------------------
var mongoose = require('mongoose');

var opts = {
            server: {
                    socketOptions: { keepAlive: 1 }
            }
};

switch(app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}
// ------------------ end mongodb ---------------------------


// ------------------- set up express application ----------------
app.set('port', (process.env.PORT || 8080));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');

// -------------- routes -----------------------
require('./routes.js')(app);

// -------------- launch --------------------------------

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});


var express = require('express');
var morgan = require('morgan');
var credentials = require('./credentials.js');
var app = express();
var bodyParser = require('body-parser');
var env = app.get('env');

// ----------------- https --------------------------------
var https = require('https');
var fs = require('fs');
var sslOptions = {
  key: fs.readFileSync(__dirname + '/certificates/ssl/camel_ssl_key.pem'),
  cert: fs.readFileSync(__dirname + '/certificates/ssl/camel_ssl_cert.crt')
};
// ----------------- end https --------------------------------

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
app.set('port', (process.env.PORT || 8088));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');

// -------------- routes -----------------------
require('./routes.js')(app);

// -------------- launch --------------------------------
/*
https.createServer(sslOptions, app).listen(app.get('port'), function(){
    console.log('Express started in ' + app.get('env') +
    ' mode on port ' + app.get('port') + '.');
});
*/


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

// -------------- end launch ----------------------------
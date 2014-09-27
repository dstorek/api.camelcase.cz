var mongoose =  require('mongoose');

// define the schema for Apple Passkit service logs
var logSchema = mongoose.Schema({

    logs: { type : Array, default : [] }

},{ collection : 'logs' });

// methods ======================

// create the model for logs and expose it to our app
module.exports = mongoose.model('Log', logSchema);
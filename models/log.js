var mongoose =  require('mongoose');

// define the schema for Apple Passkit service logs
var logSchema = mongoose.Schema({

    // logs: { type : Array, default : [] }

    lastUpdated: {type: String, default : "today"},         // used only for convenience as a human readable format
    lastUpdatedTimestamp: {type: String, default : 0 },
    logs: {type: Array }

},{ collection : 'logs' });

// methods ======================

// create the model for logs and expose it to our app
module.exports = mongoose.model('Log', logSchema);
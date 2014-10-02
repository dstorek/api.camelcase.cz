// logPasskitErrors.js
'use strict';

var Log    = require('../models/log');

var logPasskitErrors = function(req, res){
    var logs = req.body.logs;

    if (logs) {
        console.log(logs);
    }

    var lastUpdated         = new Date().toJSON();      // ISO8601 formatted timestamp
    var lastUpdatedTimestamp  = Date.now();             //  timestamp in ms from 1970

    // creates and saves a new LOg record in the database
    var newLog                      = new Log;
    newLog.lastUpdated              = lastUpdated;
    newLog.lastUpdatedTimestamp     = lastUpdatedTimestamp;
    newLog.logs                     = logs;

    // save the Passbook
    newLog.save(function(err) {
        if (err) {
            // res.send(404);
            throw err;
        }
    });

    res.send(200);
    /*
    Log.find({ 'pass.passTypeIdentifier' : passTypeIdentifier, devices : { $elemMatch: { deviceLibraryIdentifier: deviceLibraryIdentifier } } },
        function(err, doc){
            if (err)
                throw err;
            if (!doc)
                res.end(204);
            else {
                var i;
                var jsonDictionary          = {};
                var serialNumbers           = [];                  // Array of strings with serial numbers
                var lastUpdatedTimestamp;                          //  tag for future use
                for (i = 0; i < doc.length; i++ ) {
                    serialNumbers.push(doc[i].pass.serialNumber);
                }
                jsonDictionary.serialNumbers    = serialNumbers;
                jsonDictionary.lastUpdated      = "now";
                res.send(200, jsonDictionary);
                console.log(jsonDictionary);
            }
        });
     */
};

module.exports = { logPasskitErrors : logPasskitErrors };
// logPasskitErrors.js
'use strict';

var Log    = require('../models/log');

var logPasskitErrors = function(req, res){
    var logs = req.body.logs;

    if (logs) {
        console.log(logs);
    }

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
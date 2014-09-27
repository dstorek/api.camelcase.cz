// registerDevice.js
'use strict';

var
    Passbook    = require('../models/passbook')
    ;

var getSerialNumbers = function(req, res){
    var deviceLibraryIdentifier, passTypeIdentifier, tag; // tag is optional

    deviceLibraryIdentifier = req.params.deviceLibraryIdentifier;
    passTypeIdentifier      = req.params.passTypeIdentifier;

    if (req.query.passesUpdatedSince) {
        tag = parseInt(req.query.passesUpdatedSince);
    }
    /*
    console.log("*****************************");
    console.log("deviceLibraryIdentifier is:");
    console.log(deviceLibraryIdentifier);
    console.log("passTypeIdentifier is:");
    console.log(passTypeIdentifier);
    if (tag) {
        console.log("passesUpdatedSince is:");
        console.log(tag);
    }
    else console.log("passesUpdatedSince is not present");
    console.log("*********************************");
    */

    Passbook.find({ 'pass.passTypeIdentifier' : passTypeIdentifier, devices : { $elemMatch: { deviceLibraryIdentifier: deviceLibraryIdentifier } } },
        function(err, doc){

            if (err) {
                res.send(404);
                throw err;
            }
            else if (!doc || doc.length === 0 )
                res.send(404);
            else {
                var i;
                var jsonDictionary          = {};               // potential response payload
                var serialNumbers           = [];               // Array of strings with serial numbers
                var lastUpdatedTimestamp    = Date.now();       // current timestamp to send in response as the future tag
                for (i = 0; i < doc.length; i++ ) {
                    if (tag && doc[i].lastUpdatedTimestamp > tag ) {
                        serialNumbers.push(doc[i].pass.serialNumber);
                    }
                    else if ( !tag )
                        serialNumbers.push(doc[i].pass.serialNumber);
                }

                if (serialNumbers.length === 0) {
                    res.send(204);
                }
                else {
                    jsonDictionary.serialNumbers    = serialNumbers;
                    jsonDictionary.lastUpdated      = lastUpdatedTimestamp;
                    res.send(200, jsonDictionary);
                }
            }
    });
};

module.exports = { getSerialNumbers : getSerialNumbers};
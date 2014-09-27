// unregisterDevice.js

'use strict';

var
    Passbook    = require('../models/passbook')
    ;

var unregisterDevice = function(req, res){
    var deviceLibraryIdentifier, passTypeIdentifier, serialNumber, authorizationString, authorization;

    deviceLibraryIdentifier = req.params.deviceLibraryIdentifier;
    passTypeIdentifier      = req.params.passTypeIdentifier;
    serialNumber            = req.params.serialNumber;
    authorizationString     = req.headers.authorization;     // ApplePass <THE PASS AUTH TOKEN>, note: nodejs converts headers to lowercase!

    if (!authorizationString || (authorizationString.length < 11)) {
        res.send(404);
        return;
    }

    authorization           = authorizationString.substring(10); // remove first 10 characters.

    Passbook.findOne({ 'pass.passTypeIdentifier' : passTypeIdentifier, 'pass.serialNumber' : serialNumber,
        'pass.authenticationToken' : authorization }, function(err, doc){

            if (err )
                throw err;

            if (!doc)
                res.send(401);

            if (doc && !err) {
               var length = doc.devices.length;
               var i = 0;
               var a = 0;
               for (i; i<length; i++) {
                   if (doc.devices[i].deviceLibraryIdentifier == deviceLibraryIdentifier) {
                       doc.devices.splice(i, 1);
                       doc.save();
                       a++;
                       res.send(200);
                       break;
                   }
               }

               if (a === 0) {
                   res.send(200);
               }
            }
    });
};

module.exports = { unregisterDevice : unregisterDevice };
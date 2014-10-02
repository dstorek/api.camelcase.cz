// registerDevice.js
'use strict';

var Passbook    = require('../models/passbook');

var registerDevice2 = function(req, res){
    var deviceLibraryIdentifier, passTypeIdentifier, serialNumber, authorizationString, authorization,
        pushToken;

    deviceLibraryIdentifier = req.params.deviceLibraryIdentifier;
    passTypeIdentifier      = req.params.passTypeIdentifier;
    serialNumber            = req.params.serialNumber;
    authorizationString     = req.headers.authorization;    // ApplePass <THE PASS AUTH TOKEN>, note: nodejs converts headers to lowercase!
    pushToken               = req.body.pushToken;

    if (!pushToken || !authorizationString || (authorizationString.length < 11)) {
        res.send(404);
        return;
    }

    authorization       = authorizationString.substring(10); // remove first 10 characters.

    Passbook.findOne({ 'pass.passTypeIdentifier' : passTypeIdentifier, 'pass.serialNumber' : serialNumber,
        'pass.authenticationToken' : authorization }, function(err, doc){

            if (err )
                throw err;
            if (!doc) {
                res.send(401);
                return;
            }
            if (doc && !err) {
               var length = doc.devices.length;
               var i = 0;
               var a = 0;
               for (i; i<length; i++) {
                   if (doc.devices[i].deviceLibraryIdentifier == deviceLibraryIdentifier) {
                       a++;

                       if (doc.devices[i].pushToken != pushToken) {
                           doc.devices[i].pushToken = pushToken;
                           doc.save();
                       }
                       res.send(200);
                       break;
                   }
               }
               if (a === 0) {
                   var pushTokenObject = { 'pushToken': pushToken, 'deviceLibraryIdentifier': deviceLibraryIdentifier};
                   doc.devices.push(pushTokenObject);
                   doc.save();
                   res.send(201);
               }
            }
    });
};

module.exports = { registerDevice2 : registerDevice2 };
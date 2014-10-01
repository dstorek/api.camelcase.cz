var registerDevice =    require('./passkit/registerDevice');
var unregisterDevice =  require('./passkit/unregisterDevice');
var getLatestPass =     require('./passkit/getLatestPass');
var getSerialNumbers  = require('./passkit/getSerialNumbers');
var logPasskitErrors =  require('./passkit/logPasskitErrors');

module.exports = function(app) {
    // =====================================
    // APPLE PASSKIT WEB SERVICE API =======
    // =====================================

    // default route
    app.get('/', function(req, res){
        res.send(200);
    });


    // Registering a Device to Receive Push Notifications for a Pass
    app.post('/api/ws/:validVersion/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber',
        function (req,res){

            if (req.params.validVersion != 'v1')
                res.send(404);
            else {
                registerDevice.registerDevice(req, res);
            }
        });

    // Unregistering a Device
    app.delete('/api/ws/:validVersion/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber',
        function (req,res){

            if (req.params.validVersion != 'v1')
                res.send(404);
            else {
                unregisterDevice.unregisterDevice(req, res);
            }
        });

    // Getting the Latest Version of a Pass
    app.get('/api/ws/:validVersion/passes/:passTypeIdentifier/:serialNumber',
        function (req, res){
            if (req.params.validVersion != 'v1')
                res.send(404);
            else {
                getLatestPass.getLatestPass(req, res);
            }
        });

    // Getting the Serial Numbers for Passes Associated with a Device
    app.get('/api/ws/:validVersion/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier',
        function (req,res){
            if (req.params.validVersion != 'v1')
                res.send(404);
            else {
                getSerialNumbers.getSerialNumbers(req, res);
            }
        });

    // Logging Errors
    app.post('/api/ws/:validVersion/log', function (req,res) {
        if (req.params.validVersion != 'v1')
            res.send(404);
        else {
            logPasskitErrors.logPasskitErrors(req, res);
        }
    });
};
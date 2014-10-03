var mongoose =  require('mongoose');

// define the schema for our user model
var passbookSchema = mongoose.Schema({

    email: {type: String, default : "empty@email.com"},
    lastUpdated: {type: String, default : "today"},         // used only for convenience as a human readable format
    lastUpdatedTimestamp: {type: String, default : 0 },
    devices: {type: Array, default: [
        {
            pushToken: "pushToken",
            deviceLibraryIdentifier: "deviceLibraryIdentifier"
        }
    ]},
    pass : {
        "formatVersion" : { type: Number, default: 1 },
        "passTypeIdentifier" : { type: String, default: "pass.cz.camelcase.loyalty" },
        "serialNumber" : { type: String, default: "p69f2J" },
        "teamIdentifier" :{ type: String, default: "JAHRC5GQ4D" },
        "webServiceURL" : { type: String, default: "http://api.camelcase.cz/api/ws/" },
        "authenticationToken" : { type: String, default: "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc" },
        locations: {type: Array, 'default': [
            {
                longitude: 14.3418737,
                latitude: 50.0894173
            }
        ]},
        "barcode" : {
            "message" : { type: String, default: "12345678" },
            "format" :  { type: String, default: "PKBarcodeFormatQR" },
            "messageEncoding" :  { type: String, default: "iso-8859-1" }
        },
        "organizationName" : { type: String, default: "Daniel Storek" },
        "description" : { type: String, default: "Velbloudova vernostni karta" },
        "logoText" : { type: String, default: "Velbloudova karta" },
        "foregroundColor" : { type: String, default: "rgb(255, 255, 255)" },
        "backgroundColor" : { type: String, default: "rgb(55, 117, 50)" },
        "storeCard" : {
            "primaryFields" : { type: Array, default: [
                {
                    "key" : "balance",
                    "label" : "zustatek",
                    "value" : 1.00,
                    "currencyCode" : "CZK"
                }
            ],
                "auxiliaryFields" : [
                    {
                        "key" : "deal!",
                        "label" : "Akce dne",
                        "value" : "Drink zdarma"
                    }
                ]}
        }
    }
},{ collection : 'passbooks'});

// create the model for passes and expose it to our app
module.exports = mongoose.model('Passbook', passbookSchema);
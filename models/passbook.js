var mongoose =  require('mongoose');

// define the schema for our user model
var passbookSchema = mongoose.Schema({

    updates: {type: Array, 'default': [
        {
            "token":"tokenhere",
            "barcode":"111111111111",
            "update": {
                "username":"jmeno",
                "action":"pridal kerdit ve vysi x CZK",
                "time":"4.10.2014 13:09",
                "location":"Praha 6"
            }
        }
    ]},
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
            "altText" : { type: String, default: "Kredit za kazdy drink!" },
            "message" : { type: String, default: "12345678" },
            "format" :  { type: String, default: "PKBarcodeFormatQR" },
            "messageEncoding" :  { type: String, default: "iso-8859-1" }
        },
        "organizationName" : { type: String, default: "www.camelcase.cz" },
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
                    "currencyCode" : "CZK",
                    "changeMessage" : "Zustatek zmenen na %@"
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
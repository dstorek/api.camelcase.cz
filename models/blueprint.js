var mongoose =  require('mongoose');

// define the schema for our user model
var blueprintSchema = mongoose.Schema({

    passTypeIdentifier: { type: String, default: "pass.cz.camelcase.loyalty" },
    manifest: {
        "icon": { type: String, default: "0296b01347b3173e98438a003b0e88986340b2d8" },
        "icon2x": { type: String, default: "5afd9585b08c65fdf105a90c8bd643407cba2787" },
        "logo": { type: String, default: "25de09e2d3b01ce1fe00c2ca9a90a2be1aaa05cf" },
        "pass": { type: String, default: "2ea459c9cfe9dab5fd4f5f109d773c818f1a3925" },
        "strip": { type: String, default: "736d01f84cb73d06e8a9932e43076d68f19461ff" },
        "strip2x": { type: String, default: "468fa7bc93e6b55342b56fda09bdce7c829d7d46" }
    },
    "icon": Buffer,
    "icon2x": Buffer,
    "logo": Buffer,
    "strip": Buffer,
    "strip2x": Buffer,
    "pass" : {
        "formatVersion" : { type: Number, default: 1 },
        "passTypeIdentifier" : { type: String, default: "pass.cz.camelcase.loyalty" },
        "serialNumber" : { type: String, default: "p69f2J" },
        "teamIdentifier" :{ type: String, default: "JAHRC5GQ4D" },
        "webServiceURL" : { type: String, default: "https://api.camelcase.cz/api/ws/" },
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
},{ collection : 'blueprints'});

// create the model for passes and expose it to our app
module.exports = mongoose.model('Blueprint', blueprintSchema);
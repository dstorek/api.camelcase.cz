var mongoose =  require('mongoose');

// define the schema for our user model
var blueprintSchema = mongoose.Schema({

    passTypeIdentifier: { type: String, default: "pass.cz.camelcase.node" },
    contentType: { type: String, default: "image/png" },
    manifest: {
        "icon": { type: String, default: "8eaa0896db93f2165fa417df3d002ce9c61fcd92" },
        "icon2x": { type: String, default: "555ce7f70f2f44fb7ac9d9f46df5738ec6250f37" },
        "logo": { type: String, default: "e8c4edfbcae41d9d88fad7137d8ed30ae5f73e67" },
        "logo2x": { type: String, default: "1f9b1cc4c75b380ade07e9f2b7f37f988d9d14c3" },
        "pass": { type: String, default: "cda1fadc795756e63c8a2957348d8917cb8beb50" },
        "strip": { type: String, default: "25b4c9ff2bafe056f3e28379db0ef3fb460c718b" },
        "strip2x": { type: String, default: "dee775ed6fb3c7278b84c65853401e760caabc92" }
    },
    "icon": Buffer,
    "icon2x": Buffer,
    "logo": Buffer,
    "strip": Buffer,
    "strip2x": Buffer,
    "pass" : {
        formatVersion: { type: Number, default: 1 },
        passTypeIdentifier: { type: String, default: "pass.cz.camelcase.node" },
        serialNumber: { type: String, default: "p69f2J" },
        teamIdentifier: { type: String, default: "JAHRC5GQ4D" },
        webServiceURL: { type: String, default: "http://www.camelcase.cz/api/ws/" },
        authenticationToken: { type: String, default: "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc" },
        locations: {type: Array, 'default': [
            {
                longitude: -122.37488890,
                latitude: 37.6189722
            }
        ]},
        barcode: {
            message: { type: String, default: "12345678" },
            format: { type: String, default: "PKBarcodeFormatQR" },
            messageEncoding: { type: String, default: "iso-8859-1" }
        },
        organizationName: { type: String, default: "Daniel Storek" },
        description: { type: String, default: "Camelcase Loyalty Card" },
        logoText: { type: String, default: "Camelcase.cz" },
        foregroundColor: { type: String, default: "rgb(255, 255, 255)" },
        backgroundColor: { type: String, default: "rgb(55, 117, 50)" },
        storeCard: {
            primaryFields: { type: Array, default: [
                {
                    key: "balance",
                    label: "remaining balance",
                    value: 0,
                    currencyCode: "CZK"
                }
            ]},
            auxiliaryFields: { type: Array, default: [
                {
                    key: "deal",
                    label: "Deal of the day",
                    value: "Lemons"
                }
            ]}
        }
    }
},{ collection : 'blueprints'});

// create the model for passes and expose it to our app
module.exports = mongoose.model('Blueprint', blueprintSchema);
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
},{ collection : 'passbooks'});

// create the model for passes and expose it to our app
module.exports = mongoose.model('Passbook', passbookSchema);
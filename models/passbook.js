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
        "appLaunchURL" : String,
        "associatedStoreIdentifiers" : String,
        "userInfo" : {
            "active": { type: String, default: "0" },
            "token": { type: String, default: "12345678" },
            "offer": { type: String, default: "neni aktivni" },
            "detail": { type: String, default: "detail specialni nabidky" },
            "gpsLatitude": { type: String, default: "50.0894173" },
            "gpsLongitude": { type: String, default: "14.3418737" }
        },
        "expirationDate" : String,
        "voided" :  { type: Boolean, default: false },
        "relevantDate" : String,
        "webServiceURL" : { type: String, default: "https://api.camelcase.cz/api/ws/" },
        "authenticationToken" : { type: String, default: "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc" },
        "locations": {type: Array, 'default': [
            {
                longitude: 14.3418737,
                latitude: 50.0894173,
                relevantText: "Vchod je z ulice Na Okraji"
            }
        ]},
        "barcode" : {
            "altText" : { type: String, default: "Kredit za kazdy drink!" },
            "message" : { type: String, default: "12345678" },
            "format" :  { type: String, default: "PKBarcodeFormatQR" },
            "messageEncoding" :  { type: String, default: "iso-8859-1" }
        },
        "organizationName" : { type: String, default: "camelCase s.r.o." },
        "description" : { type: String, default: "Velbloudova vernostni karta" },
        "logoText" : { type: String, default: "Velbloudova karta" },
        "foregroundColor" : { type: String, default: "rgb(255, 255, 255)" },
        "backgroundColor" : { type: String, default: "rgb(55, 117, 50)" },
        "storeCard" : {
            "primaryFields" : { type: Array, default: [
                {
                    "key" : "balance",
                    "label" : "zůstatek",
                    "value" : 1.00,
                    "currencyCode" : "CZK",
                    "changeMessage" : "Zůstatek změněn na %@"
                }
            ] },
            "auxiliaryFields" : { type: Array, default: [
                {
                    "key" : "deal!",
                    "label" : "Akce dne",
                    "value" : "Drink zdarma",
                    "changeMessage" : "Nová akce je: %@"
                }
            ] },
            "backFields" : { type: Array, default: [
                {
                    "key" : "organization-info",
                    "label" : "Vystavitel kuponu",
                    "value" : "Klub kapitána Nema s.r.o.\nIČO: 272 15 229"
                },
                {
                    "key" : "current-info",
                    "label" : "Aktuální informace:",
                    "value" : "Provozní doba naší provozovny je\npondeli az patek 16:00-22:00\nNedele 17:00-22:00\nProvozní doba naší provozovny je\npondeli az patek 16:00-22:00\nNedele 17:00-22:00"
                },
                {
                    "key" : "current-info2",
                    "label" : "dodatečné informace:",
                    "value" : "Rezervace na telefonním čísle uvedeném níže"
                },
                {
                    "key" : "phone-info",
                    "label" : "telefon:",
                    "value" : "(00420) 235 365 864"
                },
                {
                    "key" : "address-info",
                    "label" : "adresa",
                    "value" : "Na Okraji 335/42, Praha 6, 162 00"
                },
                {
                    "key" : "website-info",
                    "label" : "internetové stránky:",
                    "value" : "www.kknemo.cz"
                },
                {
                    "key" : "phone-info",
                    "label" : "telefon:",
                    "value" : "(00420) 235 365 864"
                },
                {
                    "key" : "service-provider",
                    "label" : "technický operátor:",
                    "value" : "camelCase s.r.o.\nwww.camelcase.cz\ninfo@camelcase.cz"
                }
            ]

            }
        }
    }
},{ collection : 'passbooks'});

// create the model for passes and expose it to our app
module.exports = mongoose.model('Passbook', passbookSchema);
//getLatestPass.js
'use strict';

var
    tmp     = require('temporary'),
    Passbook = require('../models/passbook'),
    fs      = require('fs'),
    wrench  = require('wrench'),
    async   = require('async'),
    util    = require('util'),
    exec    = require('child_process').exec,
    crypto  = require('crypto'),
    archiver = require('archiver')
    ;

var getLatestPass = function(req, res){
    async.waterfall([
        function (next) {                                           // check if the pass has been changed

            var flag = false;                                       // allows to exit early
            var document = {};                                      // will store pass.json
            var passTypeIdentifier  = req.params.passTypeIdentifier;
            var serialNumber        = req.params.serialNumber;
            var authorizationString = req.headers.authorization;    // ApplePass <THE PASS AUTH TOKEN>, note: nodejs converts headers to lowercase

            if ( !authorizationString || (authorizationString.length < 11) ) {
                res.send(404);
                return;
            }
            var authorization       = authorizationString.substring(10); // remove first 10 characters.

            Passbook.findOne({ 'pass.passTypeIdentifier' : passTypeIdentifier, 'pass.serialNumber' : serialNumber,
                    'pass.authenticationToken' : authorization }, function(err, doc) {

                if (err) {
                    res.send(404);
                    throw err;
                }

                if (!doc) {
                    flag = true;
                    res.send(401);
                    return;
                }

                if (doc && !err) {
                    var lastModified            = req.headers['if-modified-since'];
                    var lastUpdatedTimestamp    = doc.lastUpdatedTimestamp;

                    if ( lastModified >= lastUpdatedTimestamp ) {
                        res.send(304);
                        return;
                    }

                    else {
                        document = doc.pass; // pass.json

                        if (lastUpdatedTimestamp)
                            res.setHeader("last-modified", lastUpdatedTimestamp);
                        next(null, document);
                    }
                }
            });
        },
        function (document, next) {       // create work folder and copy source folder into it
            var workFolderObject    = new tmp.Dir();
            var workFolder          = workFolderObject.path;
            // console.log(workFolder);
            var passFolderObject    = new tmp.Dir();
            var passFolder          = passFolderObject.path;
            // console.log(passFolder);

            var sourceFolder    = './pass/pass_source_folder';

            wrench.copyDirSyncRecursive(sourceFolder, workFolder, {
                forceDelete: true, // Whether to overwrite existing directory or not
                excludeHiddenUnix: true, // Whether to copy hidden Unix files or not (preceding .)
                preserveFiles: false, // If we're overwriting something and the file already exists, keep the existing
                // preserveTimestamps: bool, // Preserve the mtime and atime when copying files
                // inflateSymlinks: bool, // Whether to follow symlinks or not when copying files
                // filter: regexpOrFunction, // A filter to match files against; if matches, do nothing (exclude).
                // whitelist: bool, // if true every file or directory which doesn't match filter will be ignored
                include: "\.(png|strings)$" // An include filter (either a regexp or a function)
                // exclude: regexpOrFunction // An exclude filter (either a regexp or a function)
            });
            next(null, document, workFolder, passFolder);
        },
        function (document, workFolder, passFolder, next) {   // update json.pass file
            var jsonFile        = workFolder + '/pass.json';
            /*
            fs.writeFile(jsonFile, JSON.stringify(document, null, 4), function (err, data){
                if (err)
                    throw err;
            });
            */

            fs.writeFileSync(jsonFile, JSON.stringify(document, null, 4));
            next(null, workFolder, passFolder);
        },
        function (workFolder, passFolder, next) {   // create manifest.json file that contains hashes
            var files = wrench.readdirSyncRecursive(workFolder);
            // console.log('files: '+files);
            var results = [];

            files.forEach(function(entry){
                computeHashes(workFolder, entry, function(result){              // function async (arg, callback)
                    results.push(result);
                    if(results.length == files.length) {
                        createJsonManifestFile(workFolder, results);            // function final
                        // console.log(results);
                        next(null, workFolder, passFolder);
                    }
                });
            });
        },
        function (workFolder, passFolder, next) { // sign manifest.json file
            var command;
            command =
              //  "openssl smime -binary -sign -certfile ./pass/cert/WWDR.pem -signer ./pass/cert/node_pass_cert.pem -inkey ./pass/cert/node_pass_key.pem -in ./pass/pass_target_folder/manifest.json -out ./pass/pass_target_folder/signature -outform DER -passin pass:123456";
                "openssl smime -binary -sign -certfile ./pass/cert/WWDR.pem -signer ./pass/cert/node_pass_cert.pem -inkey ./pass/cert/node_pass_key.pem -in "
                + workFolder + "/manifest.json -out " + workFolder + "/signature -outform DER -passin pass:123456";

            exec(command, function(error, stdout,stderr){
                console.log('stdout: '+stdout);
                console.log('stderr: '+stderr);
                if (error !== null) {
                    console.error('exec error: '+error);
                    res.send(404);
                }
                if (!error)
                    next(null, workFolder, passFolder);
            });

        },
        function (workFolder, passFolder, next) {
            var archive, files, output;
            output = fs.createWriteStream(passFolder + '/myPass.pkpass');
            archive = archiver('zip');
            files   = getDirectoryList(workFolder);

            output.on('close', function(){
                console.log(archive.pointer()+ 'total bytes');
                console.log('pkpass has been finalized and the output file descriptor has closed');
                next(null, workFolder, passFolder);
            });
            archive.on('error', function(err){
                throw err;
            });

            archive.pipe(output);

            files.forEach(function (item){
                var file = item.path + '/'+ item.name;
                archive.append(fs.createReadStream(file), {name : item.name});
            });

            archive.finalize(function(err, written){
                if (err) {
                    throw err;
                }
                // cleanUp(workFolder); // do cleanup
            });

        },
        function (workFolder, passFolder, next) { // deliver finished pass
            var filename = passFolder + '/myPass.pkpass';

            processFile(filename);

            function processFile(filename){ // dump the pass to the browser
                var stream  = fs.createReadStream(filename);
                res.setHeader('Content-disposition', 'attachment; filename=myPass.pkpass');
                res.contentType('application/vdn.apple.pkpass');
                stream.pipe(res);

                stream.on('error', function(err){
                    // had_error = true;
                });

                stream.on('close', function(){
                    next(null, workFolder, passFolder);
                });

                // next(null, workFolder, passFolder);
            }
        },
        function(workFolder, passFolder, next){ // remove temporary directory

            // Recursively delete the entire sub-tree of a directory, then kill the directory
            // wrench.rmdirSyncRecursive(workFolder, failSilently);
            wrench.rmdirSyncRecursive(workFolder);
            wrench.rmdirSyncRecursive(passFolder);
            next(null);
        }
    ]);
};

module.exports = {getLatestPass : getLatestPass};


// --------- BEGIN UTILITY METHODS -----------//
function computeHashes(workFolder, entry, callback) {
    var fd = fs.createReadStream(workFolder + '/' + entry); // the file you want to get the hash
    var hash = crypto.createHash('sha1');                   // change to 'md5' if you want an MD5 hash
    hash.setEncoding('hex');                                // change to 'binary' if you want a binary hash.

    fd.on('end', function(){
        hash.end();                                         // very important! You cannot read from the stream until you haven't called end()
        var hashedObject = {};
        hashedObject[entry] = hash.read();                  // the desired sha1sum
        callback(hashedObject);
    });

    fd.pipe(hash);
}

function createJsonManifestFile(workFolder, results){       // create JSON manifest file
    var jsonManifestFile = workFolder+'/manifest.json';

    function extend(target) {                               // merge javascript objects into a single object
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function (source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    }
    var resultsJoined = extend.apply({}, results);          // call merge objects with results array as an argument list

    fs.writeFile(jsonManifestFile, JSON.stringify(resultsJoined, null, 4), function(err){
        if (err) {
            console.log(err);
        }
        else {
            console.log('JSON saved to: ' + jsonManifestFile);
        }
    });
}

/**
 * Returns array of file names from specified directory
 *
 * @param {dir} directory of source files.
 * return {array}
 */
function getDirectoryList(dir) {
    var fileArray = [],
        files = fs.readdirSync(dir);
    files.forEach(function(file){
        var obj = {name: file, path: dir};
        fileArray.push(obj);
    });
    return fileArray;
}
// --------- END UTILITY METHODS -----------//
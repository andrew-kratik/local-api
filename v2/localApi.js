var express = require('express'),
    bodyParser = require("body-parser"),
    app = express(),
    _ = require('lodash'),
    ramlParser = require('raml-parser'),
    argv = require('minimist')(process.argv.slice(2)),
    colors = require('colors')
    ;

console.log('LocalAPI start!'.yellow);

if (!argv.r) {
    throw new Error('[error]'.red +' No raml address')
}

app.use(bodyParser.json());

var config = require('./config/config.js'),
    customUtils = require('./models/utils.js'),
    apiManager = require('./models/apiManager.js'),
    oauthManager = require('./models/oauthManager.js')(config);

var ramlAddress = argv.r,
    ramlString,
    ramlRoot,
    server;

console.log('[log] Start loading raml'.yellow)
ramlParser.loadFile(ramlAddress).then(function(data){

    ramlRoot = data;
    apiManager.setRamlRoot(data);
    console.log('[log] Raml loading finished'.yellow)

    app.use(customUtils.restLogger)

    //oauth.get('/auth', oauthManager.auth);
    //oauth.all('/signin', oauthManager.signin);
    //oauth.get('/logout', oauthManager.logout);
    //oauth.all('/token', oauthManager.token);
    app.all('*', apiManager.ramlMethods);

    server = app.listen(config.port, function () {
        var host = server.address().address
        var port = server.address().port
        console.log('[log] App listening at http://%s:%s'.yellow, host, port)
    })

}, function(error){
    console.error(error);
});

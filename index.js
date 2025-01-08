
'use strict';

const express = require('express');
const bodyParser = require('body-parser'); // Προσθήκη body-parser
var path = require('path');
var http = require('http');
var oas3Tools = require('oas3-tools');

var serverPort = 8080;

// SwaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

// Δημιουργία app μέσω oas3Tools
var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp(); // Η κλήση getApp() πρέπει να έρθει πριν από το app.use

// Προσθήκη middleware
app.use(bodyParser.json()); // Ενεργοποιεί τη διαχείριση JSON αιτημάτων
app.use(express.json());

// Middleware για διαχείριση σφαλμάτων
app.use((err, _, res, /* eslint-disable no-unused-vars */ _next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

// Δημιουργία και εκκίνηση του HTTP server
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

module.exports = app;






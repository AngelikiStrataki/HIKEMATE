'use strict';

var utils = require('../utils/writer.js');
var Searchfilters = require('../service/SearchfiltersService');



module.exports.enterSearchfilters = function enterSearchfilters(req, res, next, body) {
  console.log('Received request body:', body);

  if (!body || Object.keys(body).length === 0) {
    console.error('Invalid or missing request body');
    utils.writeJson(res, { message: 'Invalid or missing filters' }, 400);
    return;
  }

  Searchfilters.enterSearchfilters(body)
    .then(function (response) {
      console.log('Searchfilters.enterSearchfilters success response:', response);
      utils.writeJson(res, response, 201);
    })
    .catch(function (error) {
      console.error('Searchfilters.enterSearchfilters error:', error);

      const statusCode = error.message === 'No filters provided.' || error.message === 'No trails found matching the filters.'
        ? 400
        : 500;

      utils.writeJson(res, { message: error.message }, statusCode);
    });
}; 

/** 
module.exports.suggest_trails = function suggest_trails(req, res, next, body) {
  // Περνάμε τα φίλτρα από το σώμα του αιτήματος (body)
  Searchfilters.suggest_trails(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

*/
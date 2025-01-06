'use strict';

var utils = require('../utils/writer.js');
var Searchfilters = require('../service/SearchfiltersService');


module.exports.enterSearchfilters = function enterSearchfilters(_ , res, /* eslint-disable no-unused-vars */ _next, body) {

  if (!body || Object.keys(body).length === 0) {
    utils.writeJson(res, { message: 'Invalid or missing filters' }, 400);
    return;
  }

  Searchfilters.enterSearchfilters(body)
    .then(function (response) {
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

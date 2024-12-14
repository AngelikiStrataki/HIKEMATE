'use strict';

var utils = require('../utils/writer.js');
var Searchfilters = require('../service/SearchfiltersService');

module.exports.enterSearchfilters = function enterSearchfilters (req, res, next, body) {
  Searchfilters.enterSearchfilters(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.suggest trails = function suggest trails (req, res, next) {
  Searchfilters.suggest trails()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.creatEvent = function creatEvent (req, res, next, body) {
  Event.creatEvent(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.view a specific event = function view a specific event (req, res, next, event_id) {
  Event.view a specific event(event_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.view events = function view events (req, res, next) {
  Event.view events()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

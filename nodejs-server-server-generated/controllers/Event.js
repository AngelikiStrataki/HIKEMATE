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

module.exports.view_a_specific_event = function view_a_specific_event (req, res, next, event_id) {
  Event.view_a_specific_event(event_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.view_events = function view_events (req, res, next) {
  Event.view events()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

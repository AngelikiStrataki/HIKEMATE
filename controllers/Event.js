
'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

//module.exports.view_a_specific_event = function view_a_specific_event(req, res, next, event_id) {
module.exports.view_a_specific_event = function view_a_specific_event(_1, res, _2, event_id) {
  Event.view_a_specific_event(event_id)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message }, 404);
    });
};

//module.exports.view_events = function view_events (req, res, next) {
module.exports.view_events = function view_events (_1, res, _2) {
  Event.view_events()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

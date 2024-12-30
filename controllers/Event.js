
'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

/**
module.exports.view_a_specific_event = function view_a_specific_event(req, res, next, event_id) {
  Event.view_a_specific_event(event_id)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message }, 404);
    });
};

module.exports.view_events = function view_events (req, res, next) {
  Event.view_events()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
*/

module.exports.view_a_specific_event = async function view_a_specific_event(req, res, next, event_id) {
  try {
    const response = await Event.view_a_specific_event(event_id);
    utils.writeJson(res, response, 200);
  } catch (error) {
    utils.writeJson(res, { message: error.message }, 404);
  }
};

module.exports.view_events = async function view_events(req, res, next) {
  try {
    const response = await Event.view_events();
    utils.writeJson(res, response);
  } catch (error) {
    utils.writeJson(res, { message: error.message }, 500);
  }
};

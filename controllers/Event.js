/*'use strict';

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
}; */
'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

/**
 * Fetches details of a specific event by its ID.
 */
module.exports.view_a_specific_event = function view_a_specific_event(_, res, /* eslint-disable no-unused-vars */ _next, event_id) {
  Event.view_a_specific_event(event_id)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message }, 404);
    });
};

/**
 * Fetches a list of all available events.
 */
module.exports.view_events = function view_events (_, res, /* eslint-disable no-unused-vars */ _next) {
  Event.view_events()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

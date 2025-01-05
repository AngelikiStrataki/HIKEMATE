'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

/**
 * View a specific event by its ID
 *
 * @param {Object} _ - Unused placeholder for the request object
 * @param {Object} res - Response object
 * @param {string} event_id - The ID of the event
 */
module.exports.view_a_specific_event = function view_a_specific_event(_, res, /* eslint-disable no-unused-vars */ _next, event_id) {
  const parsedEventId = parseInt(event_id, 10);
  if (isNaN(parsedEventId) || parsedEventId <= 0) {
    // Respond with 404 and "not found" if the event ID is invalid
    utils.writeJson(res, { message: 'not found' }, 404);
    return;
  }

  Event.view_a_specific_event(parsedEventId)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function () {
      // Respond with 404 and "not found" if the event does not exist
      utils.writeJson(res, { message: 'not found' }, 404);
    });
};

/**
 * View all available events
 *
 * @param {Object} _ - Unused placeholder for the request object
 * @param {Object} res - Response object
 */
module.exports.view_events = function view_events(_, res, /* eslint-disable no-unused-vars */ _next) {
  Event.view_events()
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function () {
      // Respond with 500 and "No events available." if there are no events
      utils.writeJson(res, { message: 'No events available.' }, 500);
    });
};


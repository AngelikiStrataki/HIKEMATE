'use strict';

const utils = require('../utils/writer.js');
const Event = require('../service/EventService');

module.exports = {
  /**
   * View a specific event by its ID.
   *
   * @param {Object} _ - Placeholder for unused request parameter
   * @param {Object} res - Response object
   * @param {string} event_id - The ID of the event
   */
  view_a_specific_event(_, res, event_id) {
    const parsedEventId = parseInt(event_id, 10); // Ensure event_id is a number
    if (isNaN(parsedEventId) || parsedEventId <= 0) {
      utils.writeJson(res, { message: 'Invalid event ID.' }, 400);
      return;
    }

    Event.view_a_specific_event(parsedEventId)
      .then((response) => {
        utils.writeJson(res, response, 200);
      })
      .catch((error) => {
        utils.writeJson(res, { message: error.message }, 404);
      });
  },

  /**
   * View all events.
   *
   * @param {Object} _ - Placeholder for unused request parameter
   * @param {Object} res - Response object
   */
  view_events(_, res) {
    Event.view_events()
      .then((response) => {
        utils.writeJson(res, response, 200);
      })
      .catch((error) => {
        utils.writeJson(res, { message: error.message }, 500);
      });
  },
};


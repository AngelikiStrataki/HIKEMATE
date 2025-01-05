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
    const parsedEventId = parseInt(event_id, 10); // Parse event_id into an integer
    if (isNaN(parsedEventId) || parsedEventId <= 0) {
      // Invalid event ID
      utils.writeJson(res, { message: 'not found' }, 404);
      return;
    }

    Event.view_a_specific_event(parsedEventId)
      .then((response) => {
        utils.writeJson(res, response, 200);
      })
      .catch(() => {
        // Event not found
        utils.writeJson(res, { message: 'not found' }, 404);
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
      .catch(() => {
        // No events available
        utils.writeJson(res, { message: 'No events available.' }, 500);
      });
  },
};



'use strict';

let events = [
  {
    event_id: 1,
    name: "Morning Trail Run",
    location: 101,
    date: 20241210,
    hour: 6,
    min: 30,
    description: "A refreshing 5-mile run through the scenic riverside trail."
  },
  {
    event_id: 2,
    name: "Sunset Trail Walk",
    location: 102,
    date: 20241211,
    hour: 17,
    min: 45,
    description: "A relaxing evening walk along the lakeside trail to catch the sunset."
  },
  {
    event_id: 3,
    name: "Eco Trail Exploration",
    location: 103,
    date: 20241212,
    hour: 9,
    min: 0,
    description: "A guided eco-friendly walk exploring the flora and fauna of the nature reserve trail."
  }
];

/**
 * View a specific event event
 *
 * @param {number} event_id - ID of the event
 * @returns {Promise<Object>} - Returns a promise resolving to the event object
 */
export function view_a_specific_event(event_id) {
  return new Promise(function (resolve, reject) {
    if (typeof event_id !== "number" || event_id <= 0) {
      reject(new Error("Invalid event ID. It must be a positive number."));
      return;
    }

    // Find the event by ID
    const event = events.find((e) => e.event_id === event_id);

    if (!event) {
      reject(new Error(`Event with ID ${event_id} not found.`));
      return;
    }

    resolve(event);
  });
}

/**
 * View events
 *
 * @returns {Promise<Object[]>} - Returns a promise resolving to the list of events
 */
export function view_events() {
  return new Promise((resolve, reject) => {
    if (!events || events.length === 0) {
      reject(new Error('No events available.'));
      return;
    }
    resolve(events);
  });
}
const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('../index.js'); // Update with the correct path to your app

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});
test.after.always((t) => {
    t.context.server.close();
});

test('GET /event/:event_id - view_a_specific_event should return a specific event', async (t) => {
    const eventId = 1; // The event ID we want to check
  
    // Perform a GET request for the event with the event_id
    const response = await t.context.got(`event/${eventId}`);
  
    t.is(response.statusCode, 200); // Expected response status 200 (OK)
  
    t.deepEqual(response.body, {
      event_id: 1,
      name: 'Morning Trail Run',
      location: 101,
      date: 20241210,
      hour: 6,
      min: 30,
      description: 'A refreshing 5-mile run through the scenic riverside trail.',
    });
  });

// Test for handling an invalid event ID
test('GET /event/:event_id - Retrieve an invalid event', async (t) => {
    const { got } = t.context;

    const invalidEventId = 999; // An ID that doesn’t exist

     //Send request to retrieve an invalid event
     const response = await got(`event/${invalidEventId}`, { method: 'GET' });

     //Validate the response status
    t.is(response.statusCode, 404);

     //Validate the error message
    t.is(response.body.message, 'not found', 'Should return appropriate error message');
});

test('GET /event - view_events should return all available events', async (t) => {
    const response = await t.context.got('event');
  
    if (response.statusCode === 200) {
      t.is(response.statusCode, 200);
      t.deepEqual(response.body, [
        {
          event_id: 1,
          name: 'Morning Trail Run',
          location: 101,
          date: 20241210,
          hour: 6,
          min: 30,
          description: 'A refreshing 5-mile run through the scenic riverside trail.',
        },
        {
          event_id: 2,
          name: 'Sunset Trail Walk',
          location: 102,
          date: 20241211,
          hour: 17,
          min: 45,
          description: 'A relaxing evening walk along the lakeside trail to catch the sunset.',
        },
        {
          event_id: 3,
          name: 'Eco Trail Exploration',
          location: 103,
          date: 20241212,
          hour: 9,
          min: 0,
          description: 'A guided eco-friendly walk exploring the flora and fauna of the nature reserve trail.',
        },
      ]);
    } else if (response.statusCode === 500) {
      t.is(response.statusCode, 500);
      t.deepEqual(response.body, { message: 'No events available.' });
    } else {
      t.fail(`Unexpected response: ${response.statusCode}`);
    }
});

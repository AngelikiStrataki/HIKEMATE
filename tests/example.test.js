const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const app = require('../index');

var Trail = require('../service/TrailService');
var { trailPhotos } = require('../service/TrailService'); // Εάν το αρχείο είναι μέσα στον φάκελο service



test.before(async (t) => {
	t.context.server = http.createServer(app);
	t.context.prefixUrl = await listen(t.context.server);
	t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});

test.after.always((t) => {
	t.context.server.close();
});


test('GET rate - viewTrailRating should return average rating', async (t) => {
    const trailId = 1;

    // Κλήση της API για το rate του trail
    const response = await t.context.got(`trail/${trailId}/rate`);
    
    
    t.is(response.statusCode, 200);
    t.deepEqual(response.body, { 
        trail_id: trailId, 
        average_rating: 4 
    });
});

test('GET rate - viewTrailRating should return 0 if no ratings', async (t) => {
    const trailId = 2;

    // Κλήση της API για το rate του trail χωρίς αξιολογήσεις
    const response = await t.context.got(`trail/${trailId}/rate`);
    
    
    t.is(response.statusCode, 200);
    t.deepEqual(response.body, { 
        trail_id: trailId, 
        average_rating: 0 
    });
});

test('PUT /trail/{trail_id}/rate - πρέπει να ενημερώνει τη βαθμολογία του trail', async (t) => {
    const trailId = 1;
    const newRating = 5;  // Νέα βαθμολογία για το trail
    
    // Στέλνουμε το αίτημα PUT με τη νέα βαθμολογία στο σώμα του αιτήματος
    const response = await t.context.got(`trail/${trailId}/rate`, {
      method: 'PUT',
      json: { rate: newRating },  // Στέλνουμε τη νέα βαθμολογία στο σώμα
      responseType: 'json',       // Ορίζουμε ότι η απόκριση είναι σε μορφή JSON
    });

    // Επαλήθευση ότι η απόκριση είναι 200 (OK)
    t.is(response.statusCode, 200);

    // Ελέγχουμε ότι το πεδίο trail_id και το average_rating ταιριάζουν
    t.is(response.body.trail_id, trailId);
    t.is(response.body.rate, newRating);

});

test('PUT /trail/{trail_id}/rate - αποτυγχάνει με μη έγκυρη βαθμολογία (μικρότερη από το ελάχιστο)', async (t) => {
  const trailId = 1;
  const invalidRating = -1;  // Μη έγκυρη βαθμολογία

  const response = await t.context.got(`trail/${trailId}/rate`, {
      method: 'PUT',
      json: { rate: invalidRating },
      responseType: 'json',
      throwHttpErrors: false,  // Αποφυγή εξαίρεσης HTTP
  });

  // Επαλήθευση ότι επιστρέφει 400 (Bad Request)
  t.is(response.statusCode, 400);

  // Επαλήθευση του μηνύματος σφάλματος από το schema validation
  t.is(response.body.message, 'request.body.rate should be >= 1');
});

test('PUT /trail/{trail_id}/rate - αποτυγχάνει με μη έγκυρη βαθμολογία (μεγαλύτερη από 5)', async (t) => {
  const trailId = 1; // Υποθέτουμε ότι το trail με ID 1 υπάρχει
  const invalidRating = 6; // Μη έγκυρη βαθμολογία

  const response = await t.context.got(`trail/${trailId}/rate`, {
      method: 'PUT',
      json: { rate: invalidRating },
      responseType: 'json',
      throwHttpErrors: false,
  });

  t.is(response.statusCode, 400);
  t.is(response.body.message, 'request.body.rate should be <= 5');
});


test('PUT /trail/{trail_id}/rate - αποτυγχάνει όταν το πεδίο rate λείπει', async (t) => {
  const trailId = 1;

  const response = await t.context.got(`trail/${trailId}/rate`, {
      method: 'PUT',
      json: {},  // Δεν στέλνουμε βαθμολογία
      responseType: 'json',
      throwHttpErrors: false,
  });

  // Επαλήθευση ότι επιστρέφει 400 (Bad Request)
  t.is(response.statusCode, 400);

  // Επαλήθευση του μηνύματος σφάλματος από το validation schema
  t.is(response.body.message, "request.body should have required property 'rate'");
});

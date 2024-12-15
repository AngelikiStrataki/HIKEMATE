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
    const trailId = 4;
    const newRating = 3;  // Νέα βαθμολογία για το trail
    
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


test('GET photos - viewPhotos should return all photos for a specific trail', async (t) => {
    const trailId = 1;
  
    const { body, statusCode } = await t.context.got(`trail/${trailId}/photos`, {
      responseType: 'json'
    });
  
    t.is(statusCode, 200);
    t.deepEqual(body, ["mountain1.jpg", "mountain2.jpg"]);
  });



  

test('GET photos - viewPhotos should return empty array if no photos', async (t) => {
    const trailId = 3;

    // Κλήση της API για trail χωρίς φωτογραφίες
    const response = await t.context.got(`trail/${trailId}/photos`);
    
    t.is(response.statusCode, 200);
    t.deepEqual(response.body, []);
});


//////////////////////
// POST /photos
//////////////////////

test('POST /trail/{trailId}/photos - Upload Photos with Correct Request', async (t) => {
    const trailId = 2; // Το ID του μονοπατιού
    const photoData = { photo: "new_photo.jpg" }; // Το δεδομένο της φωτογραφίας που θέλουμε να ανεβάσουμε
   
    
    try {
      // Αίτημα POST για προσθήκη φωτογραφίας
      const { body, statusCode } = await t.context.got.post(`trail/${trailId}/photos`, {
        json: photoData,
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      });
  
      // Έλεγχοι του τεστ
      t.is(statusCode, 201, 'Status code should be 201 Created'); // Ελέγχει αν το status code είναι 201
      t.truthy(body, 'Response body should exist'); // Ελέγχει αν υπάρχει body στην απόκριση
      t.is(body.trail_id, trailId, `Trail ID in response should be ${trailId}`); // Ελέγχει αν το trail_id είναι σωστό
      t.true(Array.isArray(body.photos), 'Photos should be an array'); // Ελέγχει αν το photos είναι πίνακας
      t.true(body.photos.includes(photoData.photo), `Response photos should include the uploaded photo "${photoData.photo}"`); // Ελέγχει αν η φωτογραφία που προστέθηκε βρίσκεται στη λίστα
    } catch (error) {
      // Εκτύπωση λεπτομερειών για το σφάλμα
      console.error('Error during test execution:', error.response ? error.response.body : error.message);
      if (error.response) {
        console.error('Response body on error:', error.response.body);
        console.error('Status code on error:', error.response.statusCode);
      }
      t.fail(`Test failed with error: ${error.message}`); // Το τεστ αποτυγχάνει με μήνυμα σφάλματος
    }
  });
  


test('POST /trail/{trailId}/photos - Bad Request (Missing Photo Data)', async (t) => {
    const trailId = 1;
    const photoData = {}; // Missing photo key

    const { statusCode } = await t.context.got.post(`trail/${trailId}/photos`, {
        json: photoData,
        headers: {
            'Content-Type': 'application/json',
        },
        throwHttpErrors: false, // Prevent automatic error throwing
    });

    t.is(statusCode, 400); // Expected HTTP status 400
});

test('POST /trail/{trailId}/photos - Bad Request (Invalid Data Type)', async (t) => {
    const trailId = 1;
    const photoData = { photo: 12345 }; // Invalid data type for photo

    const { statusCode } = await t.context.got.post(`trail/${trailId}/photos`, {
        json: photoData,
        headers: {
            'Content-Type': 'application/json',
        },
        throwHttpErrors: false, // Prevent automatic error throwing
    });

    t.is(statusCode, 400); // Expected HTTP status 400
});

test('DELETE /trail/:trail_id - deleteTrail should successfully delete a trail', async (t) => {
  const trailId = 3; // ID του trail που θέλουμε να διαγράψουμε
  
  // Κλήση της API για τη διαγραφή
  const response = await t.context.got.delete(`trail/${trailId}`);
  
  t.is(response.statusCode, 200); // Επιτυχής διαγραφή
  t.deepEqual(response.body, { 
    message: `Trail with ID ${trailId} deleted successfully.`});

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

test('POST filters - enterSearchfilters should return filtered trails', async (t) => {
    const filters = { 
            location: 'Mountain Base',
            length: 12,
            durationHour: 4,
            durationMin: 30,
            difficultylevel: 3
    };
  
    console.log('Sending filters to endpoint:', filters);
  
    try {
      const response = await t.context.got.post('Searchfilters', {
        json: filters,
        responseType: 'json'
      });
  
      // Επαλήθευση status code
      t.is(response.statusCode, 201, `Expected statusCode 200 but got ${response.statusCode}`);
      
      // Επαλήθευση ότι τα δεδομένα είναι αυτά που αναμένονται
      t.deepEqual(response.body, { 
        code: 0,
        message: 'Filtered trails found',
        data: [
          {
            trail_id: 1,
            name: "Mountain Adventure",
            description: "A scenic mountain trail.",
            traillength: 12.5,
            durationHour: 4,
            durationMin: 30,
            rate: [5, 4, 3],
            traillocation: "Mountain Base",
            difficultylevel: 3,
            photos: ["mountain1.jpg", "mountain2.jpg"]
          }
        ]
      }, 'Response body does not match expected structure');
  
      //console.log('Test passed for filters:', filters);
  
    } catch (error) {
      // Αν αποτύχει η κλήση, εκτυπώστε το σφάλμα και αποτύχετε τη δοκιμή
      console.error('Test failed. Error:', error);
      t.fail(`Request failed: ${error.message}`);
    }
  });

  
  test('POST filters - enterSearchfilters should fail with no filters', async (t) => {
    const filters = {};
  
    const { statusCode } = await t.context.got.post(`Searchfilters`, {
        json: filters,
        responseType: 'json'
        ,
        throwHttpErrors: false, // Prevent automatic error throwing
       });

    t.is(statusCode, 400); // Expected HTTP status 400
    });
  
    

  
  test('POST filters - enterSearchfilters should fail with no matching trails', async (t) => {
    const filters = { 
      name: 'Desert',
      location: 'Sahara'
    };
  
  
    const { statusCode } = await t.context.got.post(`Searchfilters`, {
        json: filters,
        responseType: 'json'
        ,
        throwHttpErrors: false, // Prevent automatic error throwing
       });

    t.is(statusCode, 400); // Expected HTTP status 400
  });

  test('POST filters - enterSearchfilters should fail with invalid length', async (t) => {
    const filters = { 
      location: 'Mountain Base', 
      length: 15,  // Μη έγκυρο μήκος
      durationHour: 4, 
      durationMin: 30, 
      difficultylevel: 3 
    };
  
    const { statusCode } = await t.context.got.post(`Searchfilters`, {
        json: filters,
        responseType: 'json'
        ,
        throwHttpErrors: false, // Prevent automatic error throwing
       });

    t.is(statusCode, 400); // Expected HTTP status 400
  });
  





//test returns the forum for a specific trail
test('GET forum - useForum should return forum comments for a specific trail', async (t) => {
    const trailId = 1;

    // Κλήση της API για να ανακτηθούν τα σχόλια του φόρουμ για το trail
    const response = await t.context.got(`trail/${trailId}/forum`);

    // Ελέγουμε αν το status code είναι 200 (OK)
    t.is(response.statusCode, 200);


    // Ελέγουμε αν το response περιέχει το trail_id και τα σχόλια
    t.deepEqual(response.body, {
		trail_id: trailId,
		messages: [
		  { userName: "Alice", userComment: "Great experience!", timestamp: "2024-12-01T10:00:00Z" },
		  { userName: "Bob", userComment: "Loved the view!", timestamp: "2024-12-02T12:15:00Z" }
		]
	  });
});


//test that returns empty forum
test('GET forum - useForum should return "No comments available" for empty forum', async (t) => {
	const trailId = 3; // trail_id με κενό forum
  
	const response = await t.context.got(`trail/${trailId}/forum`);
  
	t.is(response.statusCode, 200);
	t.deepEqual(response.body, {
	  trail_id: trailId,
	  messages: "No comments available.",
	});
});
 
//test returns all trails
test('GET /trail - view_trails should return all available trails', async (t) => {

	  const response = await t.context.got(`trail`);

	  t.is(response.statusCode, 200);
	  t.deepEqual(response.body, [
		{
		  trail_id: 1,
		  name: "Mountain Adventure",
		  description: "A scenic mountain trail.",
		  traillength: 12.5, // σε χιλιόμετρα
		  durationHour: 4,
		  durationMin: 30,
		  rate: [5, 4, 3], // Αξιολογήσεις
		  traillocation: "Mountain Base",
		  difficultylevel: 3, // Δυσκολία: 1 (εύκολη) έως 5 (πολύ δύσκολη)
		  photos: ["mountain1.jpg", "mountain2.jpg"]
		},
		{
		  trail_id: 2,
		  name: "Forest Pathway",
		  description: "Explore the dense forest.",
		  traillength: 8.3,
		  durationHour: 2,
		  durationMin: 15,
		  rate: [],
		  traillocation: "Deep Woods",
		  difficultylevel: 2,
		  photos: ["forest1.jpg", "forest2.jpg", "forest3.jpg", "new_photo.jpg"]
		},
		{
                 trail_id: 4,
                 name: "Desert Trek",
                 description: "An adventurous journey through the arid desert.",
                 traillength: 15.0,
                 durationHour: 5,
                 durationMin: 0,
                 rate: 3,
                 traillocation: "Sahara Dunes",
                 difficultylevel: 4,
                 photos: []
                 }
	  ]);

	});



//test retunrs a specific trail
  test('GET /trail/:2 - view_a_specific_trail should return a specific trail', async (t) => {
	const trailId = 2;  // Το ID που θέλουμε να ελέγξουμε

	// Κάνουμε GET request για το trail με το trail_id
	const response = await t.context.got(`trail/${trailId}`);
  
	t.is(response.statusCode, 200);  // Αναμενόμενη απάντηση 200 (OK)
  
  
  });

// Test for handling an invalid trail ID
test('GET /trail/:trail_id - Retrieve an invalid trail', async (t) => {
  const { got } = t.context;

  const invalidTrailId = 999; // An ID that doesn’t exist

   //Send request to retrieve an invalid event
   const response = await got(`trail/${invalidTrailId}`, { method: 'GET' });

   //Validate the response status
  t.is(response.statusCode, 404);

   //Validate the error message
  t.is(response.body.message, 'not found', 'Should return appropriate error message');
});

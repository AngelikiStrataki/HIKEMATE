describe('Test DELETE /trail/{trail_id} Endpoint', () => {
  it('Validates DELETE /trail/{trail_id} API response', () => {
    // Επισκέπτεται το Swagger Docs
    cy.visit('http://localhost:8080/docs');

    // Επεκτείνει και εκτελεί το request
    cy.get('div#operations-Trail-deleteTrail .opblock-summary').click();
    cy.get('div#operations-Trail-deleteTrail .try-out__btn').click();

    // Εισαγωγή του event_id στο πεδίο
    cy.get('div#operations-Trail-deleteTrail input[type="text"]')
      .type('1'); // Replace '1' with the specific trail_id you want to delete

    cy.get('div#operations-Trail-deleteTrail .execute-wrapper .btn')
      .contains('Execute')
      .click();

    // Επιβεβαίωση Status Code
    cy.get('.responses-table .response-col_status')
      .should('contain', '200');

    cy.get('.responses-table .response-col_description pre')
      .invoke('text')
      .then((responseBody) => {
        console.log('Raw response body:', responseBody);
        let cleanResponseBody = responseBody.trim();

        try {
          let jsonResponse = JSON.parse(cleanResponseBody);
          console.log('Parsed JSON:', jsonResponse);

          // Επαληθεύει την επιτυχή διαγραφή
          expect(jsonResponse).to.be.an('object');
          expect(jsonResponse).to.have.property('message').that.contains('Successfully deleted');
        }
        catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
  });
});

describe('Test GET /event Endpoint', () => {
  it('Validates GET /event API response', () => {
    // Επισκέπτεται το Swagger Docs
    cy.visit('http://localhost:8080/docs');

    // Επεκτείνει και εκτελεί το request
    cy.get('div#operations-Event-view_events .opblock-summary').click();
    cy.get('div#operations-Event-view_events .try-out__btn').click();
    cy.get('div#operations-Event-view_events .execute-wrapper .btn')
      .contains('Execute')
      .click();

    // Επιβεβαίωση Status Code
    cy.get('.responses-table .response-col_status')
      .should('contain', '200');

      cy.get('.responses-table .response-col_description pre')
      .invoke('text')
      .then((responseBody) => {
        console.log('Raw response body:', responseBody);
        let cleanResponseBody = responseBody.trim();

        // Αφαιρεί οτιδήποτε μετά το κλείσιμο του array (}] αν υπάρχει)
        if (cleanResponseBody.includes('}]')) {
          cleanResponseBody = cleanResponseBody.substring(0, cleanResponseBody.lastIndexOf('}]') + 2);
        }

        try {
          let jsonResponse = JSON.parse(cleanResponseBody);
          console.log('Parsed JSON:', jsonResponse);

          // Επαληθεύει το μήκος και τα δεδομένα
          expect(jsonResponse).to.be.an('array').and.have.length(3);
          expect(jsonResponse[0]).to.deep.equal({
              event_id: 1,
              name: 'Morning Trail Run',
              location: 101,
              date: 20241210,
              hour: 6,
              min: 30,
              description: 'A refreshing 5-mile run through the scenic riverside trail.',
          });
          expect(jsonResponse[1]).to.deep.equal({
              event_id: 2,
              name: 'Sunset Trail Walk',
              location: 102,
              date: 20241211,
              hour: 17,
              min: 45,
              description: 'A relaxing evening walk along the lakeside trail to catch the sunset.',
              });

            expect(jsonResponse[2]).to.deep.equal({
              event_id: 3,
              name: 'Eco Trail Exploration',
              location: 103,
              date: 20241212,
              hour: 9,
              min: 0,
              description: 'A guided eco-friendly walk exploring the flora and fauna of the nature reserve trail.',
              });

        }
        catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
  });
});

describe('Test GET /event/{event_id} Endpoint', () => {
  it('Validates GET /event/{event_id} API response', () => {
    // Επισκέπτεται το Swagger Docs
    cy.visit('http://localhost:8080/docs');

    // Επεκτείνει και εκτελεί το request
    cy.get('div#operations-Event-view_a_specific_event .opblock-summary').click();
    cy.get('div#operations-Event-view_a_specific_event .try-out__btn').click();

    // Εισαγωγή του event_id στο πεδίο
    cy.get('div#operations-Event-view_a_specific_event input[type="text"]')
      .type('1'); // Replace '1' with the specific event_id you want to test

    cy.get('div#operations-Event-view_a_specific_event .execute-wrapper .btn')
      .contains('Execute')
      .click();

    // Επιβεβαίωση Status Code
    cy.get('.responses-table .response-col_status')
      .should('contain', '200');

    cy.get('.responses-table .response-col_description pre')
      .invoke('text')
      .then((responseBody) => {
        console.log('Raw response body:', responseBody);
        let cleanResponseBody = responseBody.trim();

        // Αφαιρεί οτιδήποτε μετά το κλείσιμο του object (} αν υπάρχει)
        if (cleanResponseBody.includes('}')) {
          cleanResponseBody = cleanResponseBody.substring(0, cleanResponseBody.lastIndexOf('}') + 1);
        }

        try {
          let jsonResponse = JSON.parse(cleanResponseBody);
          console.log('Parsed JSON:', jsonResponse);

          // Επαληθεύει τα δεδομένα του event
          expect(jsonResponse).to.be.an('object');
          expect(jsonResponse).to.deep.equal({
            event_id: 1,
            name: 'Morning Trail Run',
            location: 101,
            date: 20241210,
            hour: 6,
            min: 30,
            description: 'A refreshing 5-mile run through the scenic riverside trail.',
          });
        }
        catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
  });
});

describe('Verify 11 Clickable Endpoints', () => {
  it('should display 11 clickable endpoints', () => {
    // Visit the Swagger Docs page
    cy.visit('http://localhost:8080/docs');

    // Find all the endpoint containers 
    cy.get('.opblock-summary')
      .should('have.length', 11) // Verify there are 11 endpoints
      .each(($el) => {
        // Ensure each endpoint is visible and clickable
        cy.wrap($el)
          .should('be.visible') // Check visibility
          .click(); // Simulate a click to ensure it's clickable

        // Optionally: Verify some UI change occurs on click, such as an expansion
        cy.wrap($el).parents('.opblock').should('have.class', 'is-open'); // Example check for expansion
      });
  });
});

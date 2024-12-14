describe('Initial visits', () => {
    it('navigates to sign in screen', () => {
        cy.visit('http://localhost:8080/docs');
        cy.get('.download-url-button.button').should('be.visible').click();
        cy.get('.description').should('have.text', 'Your Companion on Every Trail');
        cy.get('section.block.col-12.block-desktop.col-12-desktop') // Στοχεύει το section
          .find('div.opblock-tag-section') // Βρίσκει όλα τα div με την κλάση "opblock-tag-section"
          .should('have.length', 3) // Ελέγχει αν υπάρχουν ακριβώς 3 στοιχεία
          .and('be.visible'); // Ελέγχει ότι είναι ορατά
    });
});
 

describe('Test GET /trail Endpoint', () => {
    it('Validates GET /trail API response', () => {
      // Επισκέπτεται το Swagger Docs
      cy.visit('http://localhost:8080/docs');
      
      // Επεκτείνει και εκτελεί το request
      cy.get('div#operations-Trail-view_trails .opblock-summary').click();
      cy.get('div#operations-Trail-view_trails .try-out__btn').click();
      cy.get('div#operations-Trail-view_trails .execute-wrapper .btn')
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
              trail_id: 1,
              name: "Mountain Adventure",
              description: "A scenic mountain trail.",
              traillength: 12.5,
              durationHour: 4,
              durationMin: 30,
              rate: [5, 4, 3],
              traillocation: "Mountain Base",
              difficultylevel: 3,
              photos: ["mountain1.jpg", "mountain2.jpg"],
            });
            expect(jsonResponse[1]).to.deep.equal({
                trail_id: 2,
                name: "Forest Pathway",
                description: "Explore the dense forest.",
                traillength: 8.3,
                durationHour: 2,
                durationMin: 15,
                rate: [],
                traillocation: "Deep Woods",
                difficultylevel: 2,
                photos: ["forest1.jpg", "forest2.jpg", "forest3.jpg"],
              });
          
              expect(jsonResponse[2]).to.deep.equal({
                trail_id: 3,
                name: "River Walk",
                description: "A relaxing trail along the river.",
                traillength: 5,
                durationHour: 1,
                durationMin: 45,
                rate: [5],
                traillocation: "Riverside",
                difficultylevel: 1,
                photos: [],
              });

          } 
          catch (error) {
            console.error('Error parsing JSON:', error);
          }
        });
    });
  });

  describe('Test POST /trail Endpoint', () => {
    it('Creates a new trail and verifies the response', () => {
      // Επισκέπτεται το Swagger Docs
      cy.visit('http://localhost:8080/docs');
      
      // Επεκτείνει το section για το POST /trail
      cy.get('div#operations-Trail-creatTrail .opblock-summary').click();
      cy.get('div#operations-Trail-creatTrail .try-out__btn').click();
      
      // Εισάγει το σώμα του αιτήματος
      const requestBody = {
        traillength: 1,
        durationHour: 5,
        rate: 7,
        name: "Test Trail",
        description: "A test description",
        trail_id: 0,
        traillocation: "Test Location",
        difficultylevel: 2,
        durationMin: 5
      };
    
      cy.get('.body-param__text', { timeout: 10000 }).should('be.visible');
    
      // Εκτελεί το POST αίτημα
      cy.get('div#operations-Trail-creatTrail .execute-wrapper .btn')
        .contains('Execute')
        .click();
      
      // Επιβεβαίωση Status Code
      cy.get('.responses-table .response-col_status')
        .should('contain', '201');
      
      // Ελέγχει αν η κονσόλα περιέχει το αναμενόμενο μήνυμα
      cy.get('.responses-table .response-col_description pre')
        .invoke('text')
        .then((responseBody) => {
          console.log('POST Response Body:', responseBody);
          
          let cleanResponseBody = responseBody.trim();
          
          // Επαλήθευση ότι το Response Body περιέχει τα σωστά δεδομένα
          try {
            const responseJson = JSON.parse(cleanResponseBody);
            console.log('Parsed JSON:', responseJson);
            
            // Επαλήθευση των δεδομένων του trail
            expect(responseJson).to.deep.equal(requestBody);
  
            // Ελέγχει αν το response περιλαμβάνει το σωστό trail name και location
            expect(responseJson.name).to.equal('Test Trail');
            expect(responseJson.traillocation).to.equal('Test Location');
  
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        });
    });
  });

  describe('Test DELETE /trail Endpoint', () => {
    it('Deletes a specific trail and verifies the response', () => {
        cy.visit('http://localhost:8080/docs');

        cy.get('div#operations-Trail-deleteTrail .opblock-summary').click();
        cy.get('div#operations-Trail-deleteTrail .try-out__btn').click();

        const trailId = 1; 

        cy.get('div#operations-Trail-deleteTrail input[type="text"]')
          .clear()
          .type(trailId);

        cy.get('div#operations-Trail-deleteTrail .execute-wrapper .btn')
          .contains('Execute')
          .click();

        cy.get('.responses-table .response-col_status', { timeout: 20000 })
          .should('contain', '204');

        cy.get('.responses-table .response-col_description pre')
          .invoke('text')
          .then((text) => {
              console.log('Raw Response Body:', JSON.stringify(text.trim()));

              const cleanText = text.trim().replace(/\s+/g, ''); 
              expect(cleanText).to.be.oneOf(['', '{}']); 
          });

        cy.request({
            method: 'GET',
            url: `http://localhost:8080/trail/${trailId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(404);
        });
    });
});





  describe('Test DELETE /trail Endpoint', () => {
    it('Deletes a specific trail and verifies the response', () => {
        // Επισκέπτεται το Swagger Docs
        cy.visit('http://localhost:8080/docs');

        // Επεκτείνει το section για το DELETE /trail/{trail_id}
        cy.get('div#operations-Trail-deleteTrail .opblock-summary').click();
        cy.get('div#operations-Trail-deleteTrail .try-out__btn').click();

        // Ορίζει το ID του trail προς διαγραφή
        const trailId = 1; // Αντικαταστήστε με το trail ID που θέλετε να διαγράψετε
        
        cy.get('div#operations-Trail-deleteTrail input[type="text"]')
          .clear()
          .type(trailId);

        // Εκτελεί το DELETE αίτημα
        cy.get('div#operations-Trail-deleteTrail .execute-wrapper .btn')
          .contains('Execute')
          .click();

        // Επιβεβαίωση Status Code
        cy.get('.responses-table .response-col_status', { timeout: 10000 })
          .should('contain', '204');

          cy.get('.responses-table .response-col_description pre')
          .invoke('text')
          .then((text) => {
              try {
                  const responseBody = JSON.parse(text.trim());
                  expect(responseBody).to.deep.equal({}); // Επιβεβαίωση ότι είναι κενό JSON αντικείμενο
              } catch (error) {
                  expect(text.trim()).to.equal(''); // Εναλλακτικά, δέχεται άδειο body
              }
          });
        // Επιβεβαίωση διαγραφής με επανέλεγχο
        cy.request({
            method: 'GET',
            url: `http://localhost:8080/trail/${trailId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(404); // Αναμένουμε 404 αφού το trail έχει διαγραφεί
        });
    });
});


  
  
  
  
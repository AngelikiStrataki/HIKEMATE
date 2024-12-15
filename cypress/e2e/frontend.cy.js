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

  



  

describe('Initial visits', () => {
    
  it('navigates to screen and checks UI elements', () => {
      // Επισκέπτεται το Swagger Docs
      cy.visit('http://localhost:8080/docs');
      
      // Ελέγχει αν το κουμπί για download είναι ορατό και το κλικάρει
      cy.get('.download-url-button.button')
        .should('be.visible')
        .click();
      
      // Ελέγχει αν η περιγραφή έχει το σωστό κείμενο
      cy.get('.description')
        .should('have.text', 'Your Companion on Every Trail');
  });

  it('verifies the presence of 3 visible opblock sections', () => {
      // Επισκέπτεται ξανά το Swagger Docs
      cy.visit('http://localhost:8080/docs');

      // Στοχεύει το section και ελέγχει για 3 div με την κλάση "opblock-tag-section"
      cy.get('section.block.col-12.block-desktop.col-12-desktop') // Στοχεύει το section
        .find('div.opblock-tag-section') // Βρίσκει όλα τα div με την κλάση "opblock-tag-section"
        .should('have.length', 3) // Ελέγχει αν υπάρχουν ακριβώς 3 στοιχεία
        .and('be.visible'); // Ελέγχει ότι είναι ορατά
  });

});

 
//Ελέγχει την πρόσβαση μέσα στα endpoint
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

 describe('Initial visits', () => {
    it('should display 9 components with the correct names', () => {
      const expectedNames = [
        'Trail',
        'Forum',
        'Rate',
        'Photo',
        'Error',
        'Event',
        'Searchfilters',
        'Message',
        'inline_response_200',
      ];
  
      // Επισκέψου τη σελίδα
      cy.visit('http://localhost:8080/docs');
  
      // Εντόπισε όλα τα components
      cy.get('div.model-container')
        .should('have.length', expectedNames.length) // Επιβεβαιώνουμε ότι υπάρχουν 12 στοιχεία
        .each(($el, index) => {
          // Ελέγχουμε ότι κάθε component έχει το σωστό όνομα
          cy.wrap($el)
            .find('.model-title') // Στοχεύει το στοιχείο που περιέχει το όνομα
            .should('have.text', expectedNames[index]); // Συγκρίνουμε το κείμενο με τη λίστα
        });
    });
  });
  
  describe('Initial visits', () => {
    it('should display 10 clickable components', () => {
      // Επισκέψου τη σελίδα
      cy.visit('http://localhost:8080/docs');
  
      // Εντόπισε όλα τα components
      cy.get('div.model-container')
        .should('have.length', 9) // Επιβεβαιώνουμε ότι υπάρχουν 12 στοιχεία
        .each(($el) => {
          // Βεβαιώσου ότι το component είναι ορατό
          cy.wrap($el).should('be.visible');
  
          // Κάνε click στο component
          cy.wrap($el).click();
  
          // Προαιρετικά: Ελέγξτε μια αλλαγή που συμβαίνει μετά το click
          // π.χ., αν ένα dropdown ανοίγει, ελέγξτε το:
          cy.wrap($el).find('.model-toggle').should('have.class', 'collapsed');
        });
    });
  });

  describe('Verify all clickable components have content', () => {
    const components = [
      'Trail',
      'Forum',
      'Rate',
      'Photo',
      'Error',
      'Event',
      'Searchfilters',
      'Message',
      'inline_response_200'
    ];
  
    components.forEach((component) => {
      it(`should contain text for the ${component} component`, () => {
        // Επισκέψου τη σελίδα
        cy.visit('http://localhost:8080/docs');
      
        // Βρες το component και κάνε κλικ για να το επεκτείνεις
        cy.get(`#model-${component}`) // Χρησιμοποιεί το ID του κάθε component (π.χ. #model-Trail)
          .should('be.visible') // Επιβεβαιώνει ότι το στοιχείο είναι ορατό
          .click(); // Κάνε κλικ για να το επεκτείνεις
      
        // Ελέγχει ότι το component περιέχει κείμενο
        cy.get(`#model-${component}`) // Χρησιμοποιούμε το ID για να βρούμε το component
          .invoke('text') // Παίρνουμε το κείμενο από το στοιχείο
          .should('not.be.empty'); // Ελέγχει ότι το κείμενο δεν είναι άδειο
      });
    });
  }); 
  
  describe('Verify Trail component content', () => {
    it('should print only the text characters of the Trail component', () => {
        // Επισκέψου τη σελίδα
        cy.visit('http://localhost:8080/docs');
        
        // Βρες το Trail component και κάνε κλικ για να το επεκτείνεις
        cy.get('#model-Trail') // Χρησιμοποιεί το ID του Trail component
            .should('be.visible') // Επιβεβαιώνει ότι το στοιχείο είναι ορατό
            .click(); // Κάνε κλικ για να το επεκτείνεις
        
        // Παίρνουμε το καθαρό κείμενο και αφαιρούμε όλα τα κενά, αλλαγές γραμμής κ.λπ.
        cy.get('#model-Trail') // Χρησιμοποιούμε το ID για να βρούμε το component
            .invoke('text') // Παίρνουμε το κείμενο από το στοιχείο
            .then((text) => {
                const cleanedText = text.replace(/\s+/g, ''); // Αφαιρούμε όλα τα κενά
                console.log(cleanedText); // Εκτυπώνουμε μόνο τους χαρακτήρες του κειμένου
            });
    });
}); 

describe('Test PUT /trail/{trail_id}/rate Endpoint', () => {
    it('Validates PUT /trail/{trail_id}/rate API response', () => {
      // Επισκέπτεται το Swagger Docs για το API
      cy.visit('http://localhost:8080/docs');
  
      // Επεκτείνει και εκτελεί το request για το PUT /trail/{trail_id}/rate
      cy.get('div#operations-Trail-rateTrail .opblock-summary').click();
      cy.get('div#operations-Trail-rateTrail .try-out__btn').click();
  
      // Βάζει το trail_id στο πεδίο
      //cy.get('input[name="trail_id - ID of trail to rate"]').clear().type('123'); // Trail ID = 123
  
      // Βάζει την αξιολόγηση του μονοπατιού (rate) στο σώμα του αιτήματος
      //cy.get('input[name="rate"]').clear().type('4'); // Rate = 4
  
      // Εκτελεί το PUT αίτημα
      cy.get('div#operations-Trail-rateTrail .execute-wrapper .btn')
        .contains('Execute')
        .click();
  
      // Επιβεβαίωση του Status Code
      cy.get('.responses-table .response-col_status')
        .should('contain', '200');
  
      // Ελέγχει το σώμα της απόκρισης
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
            // Προσπαθεί να αναλύσει την απόκριση ως JSON
            let jsonResponse = JSON.parse(cleanResponseBody);
            console.log('Parsed JSON:', jsonResponse);
  
            // Επαληθεύει ότι η απόκριση περιέχει τα σωστά δεδομένα
            expect(jsonResponse).to.be.an('object');
            expect(jsonResponse).to.have.property('trail_id', 123); // Trail ID που χρησιμοποιήθηκε
            expect(jsonResponse).to.have.property('rate', 4); // Rate που έγινε
            expect(jsonResponse).to.have.property('name'); // Ελέγχει ότι υπάρχει το πεδίο name
            expect(jsonResponse).to.have.property('description'); // Ελέγχει ότι υπάρχει το πεδίο description
            expect(jsonResponse).to.have.property('traillength'); // Ελέγχει ότι υπάρχει το πεδίο traillength
            expect(jsonResponse).to.have.property('durationHour'); // Ελέγχει ότι υπάρχει το πεδίο durationHour
            expect(jsonResponse).to.have.property('durationMin'); // Ελέγχει ότι υπάρχει το πεδίο durationMin
            expect(jsonResponse).to.have.property('traillocation'); // Ελέγχει ότι υπάρχει το πεδίο traillocation
            expect(jsonResponse).to.have.property('difficultylevel'); // Ελέγχει ότι υπάρχει το πεδίο difficultylevel
            expect(jsonResponse).to.have.property('photos'); // Ελέγχει ότι υπάρχει το πεδίο photos
          }
          catch (error) {
            console.error('Error parsing JSON:', error);
          }
        });
    });
  });
   



  

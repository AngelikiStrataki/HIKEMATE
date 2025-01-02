'use strict';

// Mock δεδομένα για trails
let trails = [
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
    photos: ["forest1.jpg", "forest2.jpg", "forest3.jpg"]
  },
  {
    trail_id: 3,
    name: "River Walk",
    description: "A relaxing trail along the river.",
    traillength: 5.0,
    durationHour: 1,
    durationMin: 45,
    rate: [5],
    traillocation: "Riverside",
    difficultylevel: 1,
    photos: []
  },
  {
  trail_id: 4,
  name: "Desert Trek",
  description: "An adventurous journey through the arid desert.",
  traillength: 15.0,
  durationHour: 5,
  durationMin: 0,
  rate: [4],
  traillocation: "Sahara Dunes",
  difficultylevel: 4,
  photos: []
}
];

// Mock δεδομένα για forums
let forums = [
  {
    trail_id: 1, // Θέση 1 στη λίστα
    messages: [
      { userName: "Alice", userComment: "Great experience!", timestamp: "2024-12-01T10:00:00Z" },
      { userName: "Bob", userComment: "Loved the view!", timestamp: "2024-12-02T12:15:00Z" }
    ]
  },
  {
    trail_id: 2, // Θέση 2 στη λίστα
    messages: [
      { userName: "Charlie", userComment: "Quite challenging!", timestamp: "2024-11-28T14:45:00Z" }
    ]
  },
  {
    trail_id: 3, // Θέση 3 στη λίστα
    messages: []
  }
];


// Mock δεδομένα για φωτογραφίες
let trailPhotos = {
  1: ["mountain1.jpg", "mountain2.jpg"],
  2: ["forest1.jpg", "forest2.jpg"],
  3: []
};



/**
 * Delete a specific trail
 * FR10: The user must be able to delete a specific trail. 
 *
 * trail_id Long ID of trail to delete
 * no response value expected for this operation
 **/
 exports.deleteTrail = function(trail_id) {
  return new Promise(function(resolve, reject) {
    const index = trails.findIndex(t => t.trail_id === trail_id);
    if (index === -1) {
      reject(new Error(`Trail with ID ${trail_id} not found.`));
      return;
    }
    trails.splice(index, 1); // Αφαιρεί το στοιχείο
    resolve({ message: `Trail with ID ${trail_id} deleted successfully.` });
  });
};


/**
 * Rate a trail
 * FR7: The user must be able to rate the trail. 
 *
 * body Rate Rate the trail
 * trail_id Long ID of trail to rate
 * returns Trail
 **/
 exports.rateTrail = function(body, trail_id) {
  return new Promise(function(resolve, reject) {
    // Εύρεση της διαδρομής με το συγκεκριμένο trail_id
    const trail = trails.find(t => t.trail_id === trail_id);
    if (!trail) {
      reject(new Error(`Trail with ID ${trail_id} not found.`));
      return;
    }

    // Έλεγχος αν το rate είναι έγκυρο (π.χ. μεταξύ 1 και 5)
    if (typeof body.rate !== "number" || body.rate < 1 || body.rate > 5) {
      reject(new Error("Invalid rate value. Must be between 1 and 5."));
      return;
    }

    // Ενημέρωση της αξιολόγησης
    trail.rate = body.rate;

    // Επιστροφή της ενημερωμένης διαδρομής
    resolve(trail);
  });
};



/**
 * Upload photos
 * FR12: The user must be able to upload photos. 
 *
 * trail_id Long ID of trail to upload photos
 * returns Photo
 **/
// Πίνακας για αποθήκευση φωτογραφιών ανά trail

/**
 * Upload photos for a specific trail.
 * @param {number} trail_id - The ID of the trail.
 * @param {Object} body - Contains photo data.
 * @returns {Promise<Object>} - Returns the updated list of photos for the trail.
 */


exports.uploadPhotos = function (trail_id, body) {
  return new Promise((resolve, reject) => {
    // Έλεγχος αν υπάρχει το πεδίο photo στο body
    if (!body.photo) {
      const error = new Error("Missing required field: photo.");
      error.statusCode = 400;
      reject(error);
      return;
    }

    // Εύρεση του trail με το trail_id
    const trail = trails.find((t) => t.trail_id === parseInt(trail_id, 10));

    if (!trail) {
      const error = new Error("Trail not found.");
      error.statusCode = 404;
      reject(error);
      return;
    }

    // Προσθήκη φωτογραφίας στο photos
    trail.photos.push(body.photo);

    resolve({
      trail_id: trail.trail_id,
      photos: trail.photos,
    });
  });
};







/**
 * View photos
 * FR13: The user must be able to view the uploaded photos. 
 *
 * trail_id Long ID of trail to view photos
 * returns List
 **/
/**
 
 * View all photos for a specific trail.
 * @param {Number} trail_id - The ID of the trail to view photos.
 * @returns {Promise<Array>} - Returns a list of photos for the specified trail.
 */

exports.viewPhotos = function(trail_id) {
  return new Promise(function(resolve, reject) {
    // Εύρεση του trail στο οποίο ανήκει το trail_id
    const trail = trails.find(t => t.trail_id === trail_id);

    if (!trail) {
      const error = new Error(`Trail with ID ${trail_id} not found.`);
      error.statusCode = 404; // Ρυθμίζουμε το σωστό status code
      reject(error);
      return;
    }
    
    resolve(trail.photos || []); // Επιστρέφει τις φωτογραφίες ή άδειο πίνακα
  });
};



/**
 * View trail rating
 * FR8: The user must be able to view the trail's rating. 
 *
 * trail_id Long ID of trail to view rating
 * returns inline_response_200
 **/
/**
 * View the average rating of a specific trail.
 * @param {Number} trail_id - The ID of the trail to view its rating.
 * @returns {Promise<Object>} - Returns the trail's average rating.
 */
 exports.viewTrailRating = function(trail_id) {
  return new Promise(function(resolve, reject) {
    // Εύρεση της διαδρομής με το συγκεκριμένο trail_id
    const trail = trails.find(t => t.trail_id === trail_id);
    
    // Αν η διαδρομή δεν βρεθεί, επιστρέφουμε σφάλμα
    if (!trail) {
      reject(new Error(`Trail with ID ${trail_id} not found.`));
      return;
    }

    // Υπολογισμός του μέσου όρου της αξιολόγησης αν υπάρχουν αξιολογήσεις
    if (trail.rate && trail.rate.length > 0) {
      const totalRating = trail.rate.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / trail.rate.length;
      
      resolve({
        trail_id: trail.trail_id,
        average_rating: averageRating
      });
    } else {
      resolve({
        trail_id: trail.trail_id,
        average_rating: 0  // Αν δεν υπάρχουν αξιολογήσεις, επιστρέφεται 0
      });
    }
  });
};





/**
 * Use forum for a specific trail.
 * @param {number} trail_id - The ID of the trail.
 * @returns {Promise<Object>} - Returns all forum comments for the trail.
 */

exports.useForum = function(trail_id) {
  return new Promise(function(resolve, _) {
    // Έλεγχος αν υπάρχει forum για το συγκεκριμένο trail_id
    const forumIndex = trail_id - 1; // Μετατροπή ID σε index
    const forum = forums[forumIndex];

    // Για παράδειγμα, εάν θέλεις να ελέγξεις αν τα σχόλια είναι μη κενά
  if (forum.messages.length === 0) {
    resolve({
      trail_id: trail_id,
      messages: "No comments available."
    });
  }
    // Επιστροφή σχολίων του forum
    resolve({
      trail_id: trail_id,
      messages: forum.messages
    });
  });
}

/**
 * View a specific trail by ID.
 * @param {number} trail_id - The ID of the trail to view.
 * @returns {Promise<Object>} - Returns the trail object if found.
 */
  exports.view_a_specific_trail = function (trail_id) {
  return new Promise(function (resolve, reject) {
    if (typeof trail_id !== "number" || trail_id <= 0) {
      reject(new Error("Invalid trail ID. It must be a positive number."));
      return;
    }

    // Find the event by ID
    const trail = trails.find((t) => t.trail_id === trail_id);

    if (!trail) {
      reject(new Error(`not found`));
      return;
    }

    resolve(trail);
  });
}

/**
 * View trails.
 * FR3: The user must be able to view the trails. 
 *
 * returns Trail
 **/
/**
 * View all available trails.
 * @returns {Promise<Array>} - Returns a list of all trails.
 */

 exports.view_trails= function () {
  return new Promise(function(resolve, reject) {
    // Έλεγχος αν υπάρχουν διαθέσιμες διαδρομές
    console.log('Checking available trails...');
    if (trails.length === 0) {
      reject(new Error("No trails available."));
      return;
    }

    // Επιστροφή όλων των διαδρομών 
    resolve(trails);
  });
}

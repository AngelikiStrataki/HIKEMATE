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
  }
];

// Mock δεδομένα για forums
let forums = [
  { 
    forum_id: 1, 
    trail_id: 1, 
    messages: [
      { userName: "Alice", userComment: "Great experience!", timestamp: "2024-12-01T10:00:00Z" },
      { userName: "Bob", userComment: "Loved the view!", timestamp: "2024-12-02T12:15:00Z" }
    ]
  },
  { 
    forum_id: 2, 
    trail_id: 2, 
    messages: [
      { userName: "Charlie", userComment: "Quite challenging!", timestamp: "2024-11-28T14:45:00Z" }
    ]
  },
  { 
    forum_id: 3, 
    trail_id: 3, 
    messages: []
  }
];

// Mock δεδομένα για αγαπημένες διαδρομές
let usersFavourites = {
  1: [1, 3], // Ο χρήστης 1 έχει αποθηκεύσει τις διαδρομές 1 και 3 ως αγαπημένες
  2: [2] // Ο χρήστης 2 έχει αποθηκεύσει μόνο τη διαδρομή 2
};

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
 * Send messages to forum.
 * FR6: The user must be able to use a forum for each trail. 
 *
 * body Forum forum
 * forum_id Long ID of forum
 * trail_id Long ID of trail
 * returns Forum
 **/

exports.sendmessage = function(body, forum_id, trail_id) {
  return new Promise(function(resolve, reject) {
    // Εύρεση του forum που ταιριάζει με το forum_id και trail_id
    const forum = forums.find(f => f.forum_id === forum_id && f.trail_id === trail_id);
    if (!forum) {
      reject(new Error(`Forum with ID ${forum_id} for trail ID ${trail_id} not found.`));
      return;
    }

    // Έλεγχος αν το body περιέχει τα απαραίτητα πεδία
    if (!body.userComment || !body.userName) {
      reject(new Error("Missing required fields: userComment or userName."));
      return;
    }

    // Δημιουργία νέου μηνύματος
    const newMessage = {
      userName: body.userName,
      userComment: body.userComment,
      timestamp: new Date().toISOString() // Προσθήκη χρονικής σήμανσης
    };

    // Προσθήκη του μηνύματος στη λίστα του forum
    forum.messages.push(newMessage);

    // Επιστροφή του αποθηκευμένου μηνύματος
    resolve(newMessage);
  });
};



/**
 * Store favourite trail
 * FR9: The user must be able to store favourite trails. 
 *
 * body Favourite Store favourite trails
 * trail_id Long ID of trail to add to favourites
 * returns Favourite
 **/



/**
 * Store a trail as a favourite for a user.
 * @param {Object} body - Contains the user ID.
 * @param {number} trail_id - The ID of the trail to add to favourites.
 * @returns {Promise<Object>} - Returns the updated favourites list for the user.
 */


exports.storeFavourite = function(body, trail_id) {
  return new Promise(function(resolve, reject) {
    if (!body.user_id) {
      reject(new Error("Missing required field: user_id."));
      return;
    }

    const user_id = body.user_id;

    if (!usersFavourites[user_id]) {
      usersFavourites[user_id] = [];
    }

    if (usersFavourites[user_id].includes(trail_id)) {
      reject(new Error(`Trail with ID ${trail_id} is already in the favourites list.`));
      return;
    }

    usersFavourites[user_id].push(trail_id);

    // Επιστρέφουμε τα δεδομένα
    resolve({
      user_id: user_id,
      favourites: usersFavourites[user_id]
    });
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
 * Use forum.
 * FR6: The user must be able to use a forum for each trail. 
 *
 * trail_id Long ID of trail to use forum
 * returns Forum
 **/

// Αποθήκευση σχολίων φόρουμ ανά trail_id
let forumData = {};

/**
 * Use forum for a specific trail.
 * @param {number} trail_id - The ID of the trail.
 * @returns {Promise<Object>} - Returns all forum comments for the trail.
 */
exports.useForum = function(trail_id) {
  return new Promise(function(resolve, reject) {
    // Έλεγχος αν υπάρχει forum για το συγκεκριμένο trail_id
    if (!forumData[trail_id]) {
      reject(new Error(`No forum found for trail with ID ${trail_id}.`));
      return;
    }

    // Επιστροφή σχολίων του forum
    resolve({
      trail_id: trail_id,
      comments: forumData[trail_id]
    });
  });
};



/**
 * View a specific trail
 * FR3: The user must be able to view the trails. 
 *
 * trail_id Long ID of trail
 * returns Trail
 **/
 /**
 /**
 * View a specific trail by ID.
 * @param {number} trail_id - The ID of the trail to view.
 * @returns {Promise<Object>} - Returns the trail object if found, or an error if not.
 */
 exports.view_a_specific_trail = function(trail_id) {
  return new Promise(function(resolve, reject) {
    // Έλεγχος αν το trail_id είναι αριθμός
    if (typeof trail_id !== "number" || trail_id <= 0) {
      return reject({
        statusCode: 400,
        message: "Invalid trail ID. It must be a positive number."
      });
    }

    // Αναζήτηση διαδρομής με το συγκεκριμένο ID
    const trail = trails.find(t => t.trail_id === trail_id);

    // Έλεγχος αν βρέθηκε η διαδρομή
    if (!trail) {
      return reject({
        statusCode: 404,
        message: `Trail with ID ${trail_id} not found.`
      });
    }

    // Επιστροφή της διαδρομής
    resolve(trail);
  });
};





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
 exports.view_trails = function() {
  return new Promise(function(resolve, reject) {
    // Έλεγχος αν υπάρχουν διαθέσιμες διαδρομές
    if (trails.length === 0) {
      reject(new Error("No trails available."));
      return;
    }

    // Επιστροφή όλων των διαδρομών
    resolve(trails);
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





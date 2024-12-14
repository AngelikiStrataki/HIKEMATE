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
    photos: ["photo1.jpg", "photo2.jpg"]
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

/**
 * Create trails
 * FR4: The user must be able to create trails. 
 *
 * body Trail Create a trail
 * returns Trail
 **/
exports.creatTrail = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "traillength" : 1,
  "durationHour" : 5,
  "rate" : 7,
  "name" : "name",
  "description" : "description",
  "trail_id" : 0,
  "traillocation" : 6,
  "difficultylevel" : 2,
  "durationMin" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a specific trail
 * FR10: The user must be able to delete a specific trail. 
 *
 * trail_id Long ID of trail to delete
 * no response value expected for this operation
 **/
exports.deleteTrail = function(trail_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Rate a trail
 * FR7: The user must be able to rate the trail. 
 *
 * body Rate Rate the trail
 * trail_id Long ID of trail to rate
 * returns Trail
 **/
exports.rateTrail = function(body,trail_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "traillength" : 1,
  "durationHour" : 5,
  "rate" : 7,
  "name" : "name",
  "description" : "description",
  "trail_id" : 0,
  "traillocation" : 6,
  "difficultylevel" : 2,
  "durationMin" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Send messages to forum.
 * FR6: The user must be able to use a forum for each trail. 
 *
 * body Forum forum
 * forum_id Long ID of forum
 * trail_id Long ID of trail
 * returns Forum
 **/
exports.sendmessage = function(body,forum_id,trail_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "userComment" : "userComment",
  "userName" : "userName"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Store favourite trail
 * FR9: The user must be able to store favourite trails. 
 *
 * body Favourite Store favourite trails
 * trail_id Long ID of trail to add to favourites
 * returns Favourite
 **/
exports.storeFavourite = function(body,trail_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "favourite" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Upload photos
 * FR12: The user must be able to upload photos. 
 *
 * trail_id Long ID of trail to upload photos
 * returns Photo
 **/
exports.uploadPhotos = function(trail_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photo" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


// Αποθήκευση σχολίων φόρουμ ανά trail_id
let forumData = {};

/**
 * Use forum for a specific trail.
 * @param {number} trail_id - The ID of the trail.
 * @returns {Promise<Object>} - Returns all forum comments for the trail.
 */

export function useForum(trail_id) {
  return new Promise(function(resolve, reject) {
    // Έλεγχος αν υπάρχει forum για το συγκεκριμένο trail_id
    //const forum1 = forums.find(f => f.trail_id === trailId);
    const forumIndex = trail_id - 1; // Μετατροπή ID σε index
    const forum = forums[forumIndex];
    if (forum === 0) {
      reject(new Error(`No forum found for trail with ID ${trail_id}.`));
      return;
    }

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
 * View a specific trail
 * FR3: The user must be able to view the trails. 
 *
 * trail_id Long ID of trail
 * returns Trail
 **/
 /**
 * View a specific trail by ID.
 * @param {number} trail_id - The ID of the trail to view.
 * @returns {Promise<Object>} - Returns the trail object if found.
 */
export function view_a_specific_trail(trail_id) {
  return new Promise(function(resolve, reject) {
    // Έλεγχος αν το trail_id είναι αριθμός
    if (typeof trail_id !== "number" || trail_id <= 0) {
      //reject(new Error("Invalid trail ID. It must be a positive number."));
      return reject(new Error("Invalid trail ID. It must be a positive number."));
    }

    // Αναζήτηση διαδρομής με το συγκεκριμένο ID
    const trail = trails.find(t => t.trail_id === trail_id);

    // Έλεγχος αν βρέθηκε η διαδρομή
    if (!trail) {
      //reject(new Error(`Trail with ID ${trail_id} not found.`));
      return res.status(404).json({ message: `Trail with ID ${trailId} not found.` });
    }

    // Επιστροφή της διαδρομής
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

/**
 * View photos
 * FR13: The user must be able to view the uploaded photos. 
 *
 * trail_id Long ID of trail to view photos
 * returns List
 **/
exports.viewPhotos = function(trail_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "photo" : ""
}, {
  "photo" : ""
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * View trail rating
 * FR8: The user must be able to view the trail's rating. 
 *
 * trail_id Long ID of trail to view rating
 * returns inline_response_200
 **/
exports.viewTrailRating = function(trail_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "trail_id" : 0,
  "average_rating" : 6.0274563
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


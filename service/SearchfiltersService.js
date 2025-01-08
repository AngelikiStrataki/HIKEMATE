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


 
 /**
  * Εισαγωγή φίλτρων αναζήτησης για τα events
  *
  * body Object Οι φίλτρα αναζήτησης (π.χ. name, location, date)
  * returns Object
  **/

 exports.enterSearchfilters = function (body) {
  return new Promise(function (resolve, reject) {

    // Έλεγχος αν δεν υπάρχουν φίλτρα
    if (!body || Object.keys(body).length === 0) {
      reject({ code: 400, message: "No filters provided" });
      return;
    }

    // Έλεγχος ορίων για το "length" (μέγιστο 14, ελάχιστο 0.5)
    if (body.length !== undefined) {
      if (body.length > 14 || body.length < 0.5) {
        reject({ code: 400, message: "Length must be between 0.5 and 14" });
        return;
      }
    }

    // Έλεγχος ορίων για το "durationHour" (μέγιστο 8, ελάχιστο 0)
    if (body.durationHour !== undefined) {
      if (body.durationHour > 8 || body.durationHour < 0) {
        reject({ code: 400, message: "DurationHour must be between 0 and 8" });
        return;
      }
    }

    // Έλεγχος ορίων για το "durationMin" (μέγιστο 59, ελάχιστο 0)
    if (body.durationMin !== undefined) {
      if (body.durationMin > 59 || body.durationMin < 0) {
        reject({ code: 400, message: "DurationMin must be between 0 and 59" });
        return;
      }
    }

    // Έλεγχος ορίων για το "difficultylevel" (μέγιστο 5, ελάχιστο 1)
    if (body.difficulty !== undefined) {
      if (body.difficulty > 5 || body.difficulty < 1) {
        reject({ code: 400, message: "DifficultyLevel must be between 1 and 5" });
        return;
      }
    }

    // Δημιουργία του αρχικού πίνακα filteredTrails
    let filteredTrails = trails;

    // Αν δεν υπάρχει κανένα φίλτρο, επιστρέφουμε error 400
    if (!body.name && !body.location && !body.difficulty) {
      reject({ code: 400, message: "At least one filter must be provided" });
      return;
    }

    // Φιλτράρισμα κατά όνομα
    if (body.name) {
      filteredTrails = filteredTrails.filter(trail =>
        trail.name.toLowerCase().includes(body.name.toLowerCase())
      );
    }

    // Φιλτράρισμα κατά τοποθεσία
    if (body.location) {
      filteredTrails = filteredTrails.filter(trail =>
        trail.traillocation.toLowerCase().includes(body.location.toLowerCase())
      );
    }

    // Φιλτράρισμα κατά δυσκολία
    if (body.difficulty) {
      filteredTrails = filteredTrails.filter(trail =>
        trail.difficultylevel === body.difficulty
      );
    }

    // Αν δεν βρέθηκαν trails μετά το φιλτράρισμα
    if (filteredTrails.length === 0) {
      reject({ code: 404, message: "No trails found matching the filters" });
      return;
    }

    // Επιστροφή των φιλτραρισμένων trails
    resolve({
      code: 0,
      message: "Filtered trails found",
      data: filteredTrails
    });
  });
};

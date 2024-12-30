'use strict';

var utils = require('../utils/writer.js');
var Trail = require('../service/TrailService');
//var { trailPhotos } = require('../service/TrailService'); // Εάν το αρχείο είναι μέσα στον φάκελο service

module.exports.deleteTrail = function deleteTrail (_, res, next, trail_id) {
  Trail.deleteTrail(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rateTrail = function rateTrail (req, res, next, body, trail_id) {
  Trail.rateTrail(body, trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.uploadPhotos = function uploadPhotos(req, res, next, body, trail_id) {



  Trail.uploadPhotos(trail_id, body)
    .then((response) => {
      utils.writeJson(res, response, 201); // Επιστροφή επιτυχούς απόκρισης
    })
    .catch((error) => {
      console.error("Error in uploadPhotos:", error); // Εκτύπωση του σφάλματος
      console.error("Error stack trace:", error.stack); // Εκτύπωση του stack trace
      const statusCode = error.statusCode || 500;
      const message = error.message || "Internal Server Error";
      utils.writeJson(res, { message }, statusCode); // Επιστροφή σφάλματος
    });

};



module.exports.useForum = function useForum (req, res, next, trail_id) {
  Trail.useForum(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.view_a_specific_trail = function view_a_specific_trail(req, res, _, trail_id) {
  Trail.view_a_specific_trail(trail_id)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message }, 404);
    });
};

module.exports.view_trails = function view_trails (req, res, next) {
  Trail.view_trails()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.viewPhotos = function viewPhotos(req, res, next, trail_id) {
  Trail.viewPhotos(trail_id)
    .then(function (response) {
      utils.writeJson(res, response, 200); // Επιστρέφει επιτυχία με status 200
    })
    .catch(function (error) {
      // Διασφαλίζουμε ότι το σφάλμα περιέχει statusCode και μήνυμα
      const statusCode = error.statusCode || 500; // Default status 500 αν δεν υπάρχει
      const message = error.message || 'Internal Server Error';

      // Γράφουμε την απόκριση σφάλματος
      utils.writeJson(res, { message }, statusCode);
    });
};


module.exports.viewTrailRating = function viewTrailRating (req, res, next, trail_id) {
  Trail.viewTrailRating(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

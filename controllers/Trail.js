'use strict';

var utils = require('../utils/writer.js');
var Trail = require('../service/TrailService');

module.exports.deleteTrail = function deleteTrail(_, res, next, trail_id) {
  Trail.deleteTrail(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      next(error); // Προώθηση στο error handler middleware
    });
};


module.exports.rateTrail = function rateTrail (_, res, next, body, trail_id) {
  Trail.rateTrail(body, trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  console.log(next);
};


module.exports.uploadPhotos = function uploadPhotos(_, res, __, body, trail_id) {

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



module.exports.useForum = function useForum (_, res, __, trail_id) {
  Trail.useForum(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.view_a_specific_trail = function view_a_specific_trail(_, res, __, trail_id) {
  Trail.view_a_specific_trail(trail_id)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message }, 404);
    });
};

module.exports.view_trails = function view_trails (_, res, __) {
  Trail.view_trails()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.viewPhotos = function viewPhotos(_, res, __, trail_id) {
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


module.exports.viewTrailRating = function viewTrailRating (_, res, __, trail_id) {
  Trail.viewTrailRating(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

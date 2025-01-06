'use strict';

var utils = require('../utils/writer.js');
var Trail = require('../service/TrailService');

/**
 * Deletes a specific trail by its ID.
 */
module.exports.deleteTrail = function deleteTrail(_, res, __, trail_id) {
  Trail.deleteTrail(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Rates a specific trail based on user input.
 */
module.exports.rateTrail = function rateTrail (_, res, __, body, trail_id) {
  Trail.rateTrail(body, trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Uploads photos for a specific trail.
 */
module.exports.uploadPhotos = function uploadPhotos(_, res, __, body, trail_id) {
  Trail.uploadPhotos(trail_id, body)
    .then((response) => {
      utils.writeJson(res, response, 201); // Successful response
    })
    .catch((error) => {
      console.error("Error in uploadPhotos:", error); // Print the error
      console.error("Error stack trace:", error.stack); // Print the stack trace
      const statusCode = error.statusCode || 500;
      const message = error.message || "Internal Server Error";
      utils.writeJson(res, { message }, statusCode); // Return error response
    });
};

/**
 * Accesses the forum associated with a specific trail.
 */
module.exports.useForum = function useForum (_, res, __, trail_id) {
  Trail.useForum(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Retrieves details of a specific trail by its ID.
 */
module.exports.view_a_specific_trail = function view_a_specific_trail(_, res, __, trail_id) {
  Trail.view_a_specific_trail(trail_id)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message }, 404);
    });
};

/**
 * Retrieves a list of all available trails.
 */
module.exports.view_trails = function view_trails (_, res, __) {
  Trail.view_trails()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Retrieves photos associated with a specific trail.
 */
module.exports.viewPhotos = function viewPhotos(_, res, __, trail_id) {
  Trail.viewPhotos(trail_id)
    .then(function (response) {
      utils.writeJson(res, response, 200); // Successful response
    })
    .catch(function (error) {
      // Ensure the error contains a statusCode and message
      const statusCode = error.statusCode || 500; // Default status 500 if not present
      const message = error.message || 'Internal Server Error';

      // Write the error response
      utils.writeJson(res, { message }, statusCode);
    });
};

/**
 * Retrieves the rating of a specific trail.
 */
module.exports.viewTrailRating = function viewTrailRating (_, res, __, trail_id) {
  Trail.viewTrailRating(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

'use strict';

var utils = require('../utils/writer.js');
var Trail = require('../service/TrailService');

module.exports.deleteTrail = function deleteTrail (req, res, next, trail_id) {
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

module.exports.uploadPhotos = function uploadPhotos (req, res, next, trail_id) {
  Trail.uploadPhotos(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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

module.exports.view_a_specific_trail = function view_a_specific_trail(req, res, next, trail_id) {
  Trail.view_a_specific_trail(trail_id)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message }, 404);
    });
};

module.exports.view trails = function view trails (req, res, next) {
  Trail.view trails()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.viewPhotos = function viewPhotos (req, res, next, trail_id) {
  Trail.viewPhotos(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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

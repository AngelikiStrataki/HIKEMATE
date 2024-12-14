'use strict';

var utils = require('../utils/writer.js');
var Trail = require('../service/TrailService');

module.exports.creatTrail = function creatTrail (req, res, next, body) {
  Trail.creatTrail(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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

module.exports.sendmessage = function sendmessage (req, res, next, body, forum_id, trail_id) {
  Trail.sendmessage(body, forum_id, trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.storeFavourite = function storeFavourite (req, res, next, body, trail_id) {
  Trail.storeFavourite(body, trail_id)
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

module.exports.view a specific trail = function view a specific trail (req, res, next, trail_id) {
  Trail.view a specific trail(trail_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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

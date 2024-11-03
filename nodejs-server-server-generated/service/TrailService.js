'use strict';


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


/**
 * Use forum.
 * FR6: The user must be able to use a forum for each trail. 
 *
 * trail_id Long ID of trail to use forum
 * returns Forum
 **/
exports.useForum = function(trail_id) {
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
 * View a specific trail
 * FR3: The user must be able to view the trails. 
 *
 * trail_id Long ID of trail
 * returns Trail
 **/
exports.view a specific trail = function(trail_id) {
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
 * View trails.
 * FR3: The user must be able to view the trails. 
 *
 * returns Trail
 **/
exports.view trails = function() {
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


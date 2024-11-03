'use strict';


/**
 * Enter search filters
 * FR4: The user must be able to enter search filters. 
 *
 * body Searchfilters Enter search filters
 * returns Message
 **/
exports.enterSearchfilters = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * suggests trails
 * FR3: The System suggests trails to the user. 
 *
 * returns Trail
 **/
exports.suggest trails = function() {
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


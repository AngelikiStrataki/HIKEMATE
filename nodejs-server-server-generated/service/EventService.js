'use strict';


/**
 * Create events
 * FR4: The user must be able to create events. 
 *
 * body Event Create event
 * returns Event
 **/
exports.creatEvent = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : 1,
  "event_id" : 0,
  "min" : 5,
  "hour" : 5,
  "name" : "name",
  "description" : "description",
  "location" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * View a specific event
 * FR3: The user must be able to view the events. 
 *
 * event_id Long ID of event
 * returns Event
 **/
exports.view a specific event = function(event_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : 1,
  "event_id" : 0,
  "min" : 5,
  "hour" : 5,
  "name" : "name",
  "description" : "description",
  "location" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * View events.
 * FR3: The user must be able to view the events. 
 *
 * returns Event
 **/
exports.view events = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : 1,
  "event_id" : 0,
  "min" : 5,
  "hour" : 5,
  "name" : "name",
  "description" : "description",
  "location" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


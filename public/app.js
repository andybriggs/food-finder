'use strict';

var App = (function () {

  var module = {},
  receivedAppData = false,
  users,
  venues,
  conflictVenues = [],
  attendees = [];

  var getUserData = function(userName) {
    var user;
    for(var i = 0; i < users.length; i++) {
      if(users[i].name === userName) {
        user = users[i];
      };
    };
    return user;
  };

  var hasDrink = function(attendee, venue) {
    var drinks = 0;
    for(var i = 0; i < venue.drinks.length; i++) {
      for(var x = 0; x < attendee.drinks.length; x++) {
        if(venue.drinks[i].toUpperCase() === attendee.drinks[x].toUpperCase()) {
          drinks ++;
        };
      };
    };
    return drinks > 0 ? true : false;
  };

  var hasFood = function(attendee, venue) {
    var conflicts = 0;
    for(var i = 0; i < venue.food.length; i++) {
      for(var x = 0; x < attendee.wont_eat.length; x++) {
        if(venue.food[i] === attendee.wont_eat[x]) {
          conflicts ++;
        };
      };
    };
    return conflicts === venue.food.length ? false : true;
  };

  var feedBackMessage = function(hasFood, hasDrink, attendee, venue) {
    var foodMsg = hasFood ? '' : ' nothing to eat ',
    drinkMsg = hasDrink ? '' : ' nothing to drink ',
    msg =  'There is ' + foodMsg + drinkMsg + ' for ' + attendee.name + ' here';
    return msg;
  };

  var addFeedbackMessage = function(venue, message) {
    if(!venue.msg) {
      venue.msg = [message];
    } else {
      var messageExists = false;
      for(var i = 0; i < venue.msg.length; i++) {
        if(venue.msg[i] === message) {
          messageExists = true;
          break;
        };
      };
      if(!messageExists) {
        venue.msg.push(message);
      };
    };
    return venue;
  };

  var checkVenues = function() {
    conflictVenues = [];
    for(var i = 0; i < attendees.length; i++) {
      for(var x = 0; x < venues.length; x++) {
        var food = hasFood(attendees[i], venues[x]),
        drink = hasDrink(attendees[i], venues[x]);
        if(!food || !drink) {
          var feedbackMessage = feedBackMessage(food, drink, attendees[i], venues[x]);
          var conflictVenue = addFeedbackMessage(venues[x], feedbackMessage);
          conflictVenues.push(venues[x]);
        };
      };
    };
  };

  var updateAttendees = function(user, checked) {
    if(checked) {
      attendees.push(user);
    } else {
      for(var i = 0; i < attendees.length; i++) {
        if(attendees[i].name === user.name) {
          attendees.splice(i,1);
        };
      };
    };
  };

  var updateApp = function(el) {
    if(!receivedAppData) {
      users = PageBuilder.formData.users;
      venues = PageBuilder.formData.venues;
    };
    var user = getUserData(el.value);
    receivedAppData = true;
    updateAttendees(user, el.checked);
    checkVenues();
    PageBuilder.scrubVenues(conflictVenues);
  };

  module.run = function() {
    PageBuilder.build(updateApp);
  };

  return module;

}());

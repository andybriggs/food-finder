'use strict';

var App = (function () {

  var module = {},
  receivedAppData = false,
  users,
  venues,
  attendees = [];

  var getUserData = function(userName) {
    var user;
    for(var i = 0; i < users.length; i++) {
      if(users[i].name === userName) {
        user = users[i];
      }
    }
    return user;
  };

  var hasDrink = function(attendee, venue) {
    var drinks = 0;
    for(var i = 0; i < venue.drinks.length; i++) {
      for(var x = 0; x < attendee.drinks.length; x++) {
        if(venue.drinks[i] === attendee.drinks[x]) {
          drinks ++;
        };
      }
    }
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

  var checkVenues = function() {
    for(var i = 0; i < attendees.length; i++) {
      for(var x = 0; x < venues.length; x++) {
        if(!hasFood(attendees[i], venues[x]) || !hasDrink(attendees[i], venues[i])) {
          console.log(venues[x].name + ' is off the cards');
          console.log('Has food: ' + hasFood(attendees[i], venues[x]) + ' for ' + attendees[i].name);
          console.log('Has drink: ' + hasDrink(attendees[i], venues[x]) + ' for ' + attendees[i].name);
        };
      }
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
      users = FormBuilder.formData.users;
      venues = FormBuilder.formData.venues;
    };
    var user = getUserData(el.value);
    receivedAppData = true;
    updateAttendees(user, el.checked);
    checkVenues();
    console.log(attendees);
  };

  module.run = function() {
    FormBuilder.build(updateApp);
  };

  return module;

}());

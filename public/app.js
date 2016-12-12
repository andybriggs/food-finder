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
      };
    };
    return user;
  };

  var scrubVenue = function(venue) {
    var venueListItems = document.getElementsByTagName("li");
    var el;
    for (var i = 0; i < venueListItems.length; i++) {
      if (venueListItems[i].textContent == venue.name) {
        el = venueListItems[i];
        break;
      }
    }
    el.className = 'scrubbed';
  };

  var feedBackMessage = function(hasFood, hasDrink, attendee, venue) {
    var foodMsg = '',
    drinkMsg = '';
    if(!hasFood) {
      foodMsg = ' no food ';
    } else if (!hasDrink) {
      drinkMsg = ' no drink '
    }
    var msg =  'There is ' + foodMsg + drinkMsg + ' for ' + attendee.name + ' at ' + venue.name;
    console.log(msg);
  };

  var hasDrink = function(attendee, venue) {
    var drinks = 0;
    for(var i = 0; i < venue.drinks.length; i++) {
      for(var x = 0; x < attendee.drinks.length; x++) {
        if(venue.drinks[i] === attendee.drinks[x]) {
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

  var checkVenues = function() {
    for(var i = 0; i < attendees.length; i++) {
      for(var x = 0; x < venues.length; x++) {
        var food = hasFood(attendees[i], venues[x]),
        drink = hasDrink(attendees[i], venues[i]);
        if(!food || !drink) {
          feedBackMessage(food, drink, attendees[i], venues[x]);
          scrubVenue(venues[x]);
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

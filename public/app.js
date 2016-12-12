'use strict';

var App = (function () {

  var module = {},
  users,
  venues,
  foodPrefs = [],
  attendees = [],
  receivedAppData = false;

  var getUserData = function(userName) {
    var user;
    for(var i = 0; i < users.length; i++) {
      if(users[i].name === userName) {
        user = users[i];
      }
    }
    return user;
  };

  var checkVenues = function() {
    for(var i = 0; i < venues.length; i++) {
      var conflicts = 0;
      for(var x = 0; x < venues[i].food.length; x++) {
        for(var y = 0; y < foodPrefs.length; y++) {
          if(venues[i].food[x] === foodPrefs[y]) {
            conflicts ++;
            if(conflicts === venues[i].food.length) {
              console.log('=================> ' + venues[i].name);
            }
            break;
          }
        }
      }
    }
  };

  var updatePrefs = function() {
    foodPrefs = [];
    for(var i = 0; i < attendees.length; i++) {
      for(var x = 0; x < attendees[i].wont_eat.length; x++) {
        foodPrefs.push(attendees[i].wont_eat[x]);
      }
    }
  };

  var updateAttendees = function(user, checked) {
    if(checked) {
      attendees.push(user);
    } else {
      for(var i = 0; i < attendees.length; i++) {
        if(attendees[i].name === user.name) {
          attendees.splice(i,1);
        }
      }
    }
  };

  var updateApp = function(el) {
    if(!receivedAppData) {
      users = FormBuilder.formData.users;
      venues = FormBuilder.formData.venues;
    }
    var user = getUserData(el.value);
    receivedAppData = true;
    updateAttendees(user, el.checked);
    updatePrefs();
    checkVenues();
  };

  module.run = function() {
    FormBuilder.build(updateApp);
  };

  return module;

}());

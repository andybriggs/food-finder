'use strict';

var App = (function () {

  var module = {
    receivedAppData: false,
    appData: {
      attendees: [],
      venues: [],
      foodPrefs: []
    }
  };

  var getUserData = function(userName) {
    var users = module.appData.users,
    user;
    for(var i = 0; i < users.length; i++) {
      if(users[i].name === userName) {
        user = users[i];
      }
    }
    return user;
  };

  var checkVenues = function() {
    var venues = module.appData.venues,
    foodPrefs = module.appData.foodPrefs;
    for(var i = 0; i < venues.length; i++) {
      var conflicts = 0;
      console.log('==============================');
      console.log('Venue: ' + venues[i].name);
      for(var x = 0; x < venues[i].food.length; x++) {
        console.log('Compare : ' + venues[i].food[x]);
        for(var y = 0; y < foodPrefs.length; y++) {
          console.log('with: ' + foodPrefs[y]);
          if(venues[i].food[x] === foodPrefs[y]) {
            conflicts ++;
            console.log(conflicts + ' conflict(s): ' + foodPrefs[y]);
            if(conflicts === venues[i].food.length) {
              console.log('=================>' + venues[i].name);
            }
            break;
          }
        }
      }
    }
  };

  var updatePrefs = function() {
    var venues = module.appData.venues,
    attendees = module.appData.attendees,
    prefs = module.appData.foodPrefs;

    for(var i = 0; i < attendees.length; i++) {
      for(var x = 0; x < attendees[i].wont_eat.length; x++) {
        prefs.push(attendees[i].wont_eat[x]);
      }
    }
  };

  var updateAtendees = function(user, checked) {
    var attendees = module.appData.attendees;
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
    if(!module.receivedAppData) {
      module.appData.users = FormBuilder.formData.users;
      module.appData.venues = FormBuilder.formData.venues;
    }
    var user = getUserData(el.value);
    module.receivedAppData = true;
    updateAtendees(user, el.checked);
    updatePrefs();
    checkVenues();
    console.log(module.appData);
  };

  module.run = function() {
    FormBuilder.build(updateApp);
  };

  return module;

}());

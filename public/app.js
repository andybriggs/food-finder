'use strict';

var App = (function () {

  var module = {
    receivedAppData: false,
    appData: {
      attendees: []
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

  var checkFood = function() {
    var venues = module.appData.venues,
    attendees = module.appData.attendees;
    for(var i = 0; i < venues.length; i++) {
      for(var x = 0; x < attendees.length; x++) {
        for(var y = 0; y < attendees[x].wont_eat.length; y++) {
          for(var z = 0; z < venues[i].food.length; z++) {
            if(attendees[x].wont_eat[y] === venues[i].food[z]) {
              console.log(venues[i].food[z]);
            }
          }
        }
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
    checkFood();
    console.log(module.appData);
  };

  module.run = function() {
    FormBuilder.build(updateApp);
  };

  return module;

}());

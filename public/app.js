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
  }

  var updateAtendees = function(user, checked) {
    var attendees = module.appData.attendees;
    if(checked) {
      attendees.push(user);
    } else {
      for(var i = 0; i < attendees.length; i++) {
        if(attendees[i].name === user.name) {
          console.log(i);
          attendees.splice(i,1);
        }
      }
    }
  }

  var updateApp = function(el) {
    if(!module.receivedAppData) {
      module.appData.users = FormBuilder.formData.users;
      module.appData.venues = FormBuilder.formData.users;
    }
    var user = getUserData(el.value);
    module.receivedAppData = true;
    updateAtendees(user, el.checked);
    console.log(module.appData);
  };

  module.run = function() {
    FormBuilder.build(updateApp);
  };

  return module;

}());

'use strict';

var PageBuilder = (function () {

  var module = { formData: {} },
  checkboxUpdate;

  var buildVenueListItem = function(venue) {
    var listItem = document.createElement('li'),
    label = document.createElement('label');
    listItem.appendChild(label);
    label.appendChild(document.createTextNode(venue.name));
    return listItem;
  };

  var buildUserListItem = function(user, id) {
    var listItem = document.createElement('li'),
    checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = user.name;
    checkbox.id = 'chk' + id;
    checkbox.className = 'checkbox';
    checkbox.addEventListener('click', function() {
      checkboxUpdate(this);
    });

    var label = document.createElement('label')
    label.htmlFor = 'chk' + id;
    label.appendChild(document.createTextNode(user.name));

    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    return listItem;
  };

  var buildList = function(listItems, listItemBuilder, el) {
    var newList = document.createElement('ul');
    for (var i = 0; i < listItems.length; i++) {
      var row = listItemBuilder(listItems[i], i);
      newList.appendChild(row);
    };
    document.getElementById(el).appendChild(newList);
  };

  var dataReady = function(data) {
    module.formData = data;
    buildList(module.formData.users, buildUserListItem, 'whos-about');
    buildList(module.formData.venues, buildVenueListItem, 'whats-tasty');
  }

  var clearMessages = function(el) {
    var messages = el.getElementsByTagName('div')[0];
    if(messages) {
      messages.parentNode.removeChild(messages);
    };
  };

  var attachMessages = function(el, messages) {
    clearMessages(el);
    var messageContainer = el.getElementsByTagName('div')[0];
    messageContainer =  messageContainer ? messageContainer : document.createElement('div');
    for(var i = 0; i < messages.length; i++) {
      var msgEl = document.createElement('span');
      msgEl.appendChild(document.createTextNode(messages[i]));
      messageContainer.appendChild(msgEl);
    };
    el.appendChild(messageContainer);
  };

  module.scrubVenues = function(conflictVenues) {
    var venueListItems = document.getElementsByTagName('li');
    for (var i = 0; i < venueListItems.length; i++) {
      if(conflictVenues.length > 0) {
        for(var x = 0; x < conflictVenues.length; x++) {
          var venueName = venueListItems[i].getElementsByTagName('label')[0];
          if (venueName.textContent.toUpperCase() == conflictVenues[x].name.toUpperCase()) {
            venueListItems[i].className = 'scrubbed';
            attachMessages(venueListItems[i], conflictVenues[x].msg);
            break;
          } else {
            venueListItems[i].className = '';
            clearMessages(venueListItems[i]);
          };
        };
      } else {
        venueListItems[i].className = '';
        clearMessages(venueListItems[i]);
      }
    };
  };

  module.formData = function(data) {
    return data;
  }

  module.build = function(update) {
    checkboxUpdate = update;
    MockDataService.getData(dataReady);
  };

  return module;

}());

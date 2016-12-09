'use strict';

var FormBuilder = (function () {

  var module = { formData: {} },
  checkboxUpdate;

  var buildVenueListItem = function(venue) {
    var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(venue.name));
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

  module.formData = function(data) {
    return data;
  }

  module.build = function(update) {
    checkboxUpdate = update;
    MockDataService.getData(dataReady);
  };

  return module;

}());

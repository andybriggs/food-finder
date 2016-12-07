'use strict';

var FoodFinder = (function () {

  var module = {};

  var buildVenueListItem = function(venue) {
    var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(venue.name));
    return listItem;
  };

  var buildUserListItem = function(user, id) {
    console.log(user);
    var listItem = document.createElement('li'),
    checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = user.name;
    checkbox.id = 'chk' + id;

    var label = document.createElement('label')
    label.htmlFor = 'chk' + id;
    label.appendChild(document.createTextNode(user.name));

    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    return listItem;
  };

  var buildList = function(listItems, listItemBuilder) {
    var newList = document.createElement('ul');
    for (var i = 0; i < listItems.length; i++) {
      var row = listItemBuilder(listItems[i], i);
      newList.appendChild(row);
    };
    document.getElementById('app').appendChild(newList);
  };

  var buildForm = function(data) {
    buildList(data.venues, buildVenueListItem);
    buildList(data.users, buildUserListItem);
  }

  module.run = function() {
    MockDataService.getData(buildForm);
  };

  return module;

}());

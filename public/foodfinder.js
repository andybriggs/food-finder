'use strict';

var FoodFinder = (function () {

  var module = {};

  var buildVenuListItem = function(venue) {
    var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(venue));
    return listItem;
  };

  var buildVenueList = function(venues) {
    var newList = document.createElement('ul');
    for (var i = 0; i < venues.length; i++) {
      var row = buildVenuListItem(venues[i].name);
      newList.appendChild(row);
    };
    document.getElementById('app').appendChild(newList);
  };

  var buildForm = function(data) {
    buildVenueList(data.venues);
  }

  module.run = function() {
    MockDataService.getData(buildForm);
  };

  return module;

}());

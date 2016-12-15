var MockDataService = (function () {
  'use strict';

  var module = {};

  module.getData = function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', '/data', true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        callback(data);
      } else {
        console.log('something went wrong');
      }
    };
    request.onerror = function() {
      console.log('Something went wrong');
    };
    request.send();
  };

  return module;

}());

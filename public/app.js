'use strict';

var App = (function () {

  var module = {};

  var checkVenues = function() {
    console.log('check venues');
  };

  module.run = function() {
    FormBuilder.build(checkVenues);
  };

  return module;

}());

'use strict';

var App = (function () {

  var module = {};

  var update = function() {
    console.log(FormBuilder.formData);
  };

  module.run = function() {
    FormBuilder.build(update);
  };

  return module;

}());

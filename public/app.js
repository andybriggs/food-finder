'use strict';

var App = (function () {

  var module = {
    receivedAppData: false,
    appData: {}
  };

  var update = function() {
    if(!module.receivedAppData) {
      module.appData = FormBuilder.formData;
    }
    module.receivedAppData = true;
    console.log(module);
  };

  module.run = function() {
    FormBuilder.build(update);
  };

  return module;

}());

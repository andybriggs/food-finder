// Failed test setup
var jsdom = require('jsdom'),
should = require('should');

describe('Food finder app', function() {
  jsdom.env({
    html: '<body><div id="app"></div></body>',
    scripts: ['./public/app.js'],
    done: function (err, window) {
      it('should be awesome', function(){
        console.log('It is!');
      });
    }
  });
});

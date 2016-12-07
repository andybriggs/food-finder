var path = require('path'),
express = require('express'),
app = express(),
port = process.env.PORT || 8080,
mockData = require('./mockData');

// Routing
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/users', function(req, res) {
  res.json(mockData.users);
});

router.get('/venues', function(req, res) {
  res.json(mockData.venues);
});

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath), router);

app.listen(port);

console.log('App listening on port ' + port);

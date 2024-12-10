var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello-world', function(req, res, next) {
  res.send('Hello World!');
});


router.get('/myjson', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.json(loadJSON('public/my-vars.json'));
});

function loadJSON(fn) {
  data = fs.readFileSync(fn, 'utf8');
  return JSON.parse(data);
}

module.exports = router;

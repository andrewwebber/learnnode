var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('login');
});

router.post('/', function(req, res) {
	console.log('body ' + req.body);
	var user = JSON.parse(req.body);
	console.log(user.userName);
	res.send(user);
});

module.exports = router;

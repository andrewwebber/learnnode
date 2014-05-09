var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('login');
});

router.post('/', function(req, res) {
	console.log('body ' + req.body);
	console.log(req.body.userName);
	res.send(req.body.userName);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var moment = require('moment');
var jwt = require('jwt-simple');
var app = express();
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('login', { title: 'Sample Application' });
});

router.post('/', function(req, res) {
	var userName = req.body.userName;
	var password = req.body.password;

	console.log("authenticating user :%s",req.body.userName);
	if(userName !== password)
	{
		console.log("invalid user :%s",userName);
		return;
	}

	console.log('successfully authenticated user :%s',req.body.userName);
	var expires = moment().add('days', 7).valueOf();
	var token = jwt.encode({
			iss: userName,
			exp: expires
	}, app.get('jwtTokenSecret'));

	res.json({
		token : token,
		expires: expires,
		user: userName
	});

	console.log("generated token");
	console.log(token);
});

module.exports = router;

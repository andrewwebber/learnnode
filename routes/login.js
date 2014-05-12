var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var settings = require('../shared/settings');

var app = express();
var jwtSecret = settings.jwtSecret();

router.post('/', function loginPost(req, res) {
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
	}, jwtSecret);

	res.json({
		token : token,
		expires: expires,
		user: userName
	});

	console.log("generated token");
	console.log(token);
});

module.exports = router;

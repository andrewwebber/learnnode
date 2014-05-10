var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

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
	req.session.regenerate(function(){
		req.session.userName = userName;
		res.redirect('/');
	});
});

module.exports = router;

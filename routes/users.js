var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');

router.use(function(req, res, next){
	console.log('looking for access token');
	var accessToken = req.headers['x-access-token'];
	if(accessToken){
	  console.log('validating access token');
	  try{
		var decoded = jwt.decode(accessToken, 'YOUR_SECRET_STRING');
		console.log('access token decoded');
		if(decoded.exp <= Date.now()){
			res.json({error: 'access token has expired'});
		}

		console.log('access granted');
		next();
	  }catch(err){
		  console.log(err);
		  res.json(500, {error: err});
	  }
	    next();
        } else {
		console.log("access denied");
		res.json({error: "access denied"});
		//next();
	}
});

/* GET users listing. */
router.get('/', function(req, res) {
	res.json({ message: 'protected message hello world'});
});

module.exports = router;

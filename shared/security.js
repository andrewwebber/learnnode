var jwt = require('jwt-simple');
var settings = require('./settings');

var jwtSecret = settings.jwtSecret();

exports.validateTokenFromRequest =function createValidateTokenFromRequest(){ 
	return function validateTokenFromRequest(req, res, next){
		console.log('looking for access token');
		var accessToken = req.headers['x-access-token'];
		if(accessToken){
		  console.log('validating access token');
		  try{
			var decoded = jwt.decode(accessToken, jwtSecret);
			console.log('access token decoded');
			if(decoded.exp <= Date.now()){
				res.json({error: 'access token has expired'});
			}

			console.log('access granted to user %s', decoded.iss);
			next();
		  }catch(err){
			  console.log(err);
			  res.json(500, {error: err});
		  }
		    next();
		} else {
			console.log("access denied");
			res.json({error: "access denied"});
		}
	};
};

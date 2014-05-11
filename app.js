var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var sampleroute = require('./routes/sample');
var loginRoute = require('./routes/login');
var app = express();
var jwt = require('jwt-simple');
var moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser("sampleapplication"));
app.use(session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery',   express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/knockout', express.static(path.join(__dirname, 'node_modules/knockout/build/output/')));

function restrict(req, res, next) {
	console.log('looking for access token');
	var accessToken = req.headers['x-access-token'];
	if(accessToken){
	  console.log('validating access token');
	  try{
		  var decoded = jwt.decode(accessToken, app.get('jwtTokenSecret'));
		console.log('access token decoded');
		if(decoded.exp <= Date.now()){
			res.json(500, {error: 'access token has expired'});
		}

		console.log('access granted');
		return next();
	  }catch(err){
		  console.log(err);
		  res.json(500, {error: err});
	  }
    next();
  } else {
	console.log("access denied");
	  res.json(500, {error: "access denied"});
	  next();
  }
};

app.use('/', routes);
app.use('/users', bodyParser(), restrict, users);
app.use('/sample', restrict, sampleroute);
app.use('/login', loginRoute);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
var debug = require('debug')('SampleApplication');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

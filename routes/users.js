var express = require('express');
var router = express.Router();
var security = require('../shared/security');


router.use(security.validateTokenFromRequest());

router.get('/', function(req, res) {
	res.json({ message: 'protected message hello world' + Date.now()});
});

module.exports = router;

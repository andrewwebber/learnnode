var express = require('express');
var router = express.Router();

router.param('name', function(req, res, next, id){
	req.name = req.params.name;
	next()
});

router.get('/:name', function(req, res) {
	console.log(req.name);
	res.send({name:'sampleapplication', item: req.name});
});


module.exports = router;

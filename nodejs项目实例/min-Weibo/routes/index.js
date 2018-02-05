var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// if(user);
	console.log("index router:"+req.session.user)
	console.dir(req.session)
    res.render('index', { title: 'Express',
    supplies:['app','orange'] });
});
module.exports = router;

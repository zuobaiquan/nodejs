var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	var currentUser=req.session.user;
	var post=new Post(currentUser.name,req.body.post);
	post.save(function(err){
		if(err){
			req.flash('erro',err);
			return res.redirect('/');
		}
		req.flash('success','发表成功');
		res.redirect('/u/'+currentUser.name);
	})
  res.send('respond with a resource');
});

module.exports = router;

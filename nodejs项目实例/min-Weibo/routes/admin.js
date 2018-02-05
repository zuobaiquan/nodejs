var express = require('express');
var User = require('../models/user')
var Post = require('../models/post')
var router = express.Router();

/* GET home page. */
router.get('/info/:info', function(req, res, next) {
    // if(user);
    var info = req.params.info;
    console.log("admin router info:" + info);

    User.getAll(function(err, users) {
        // console.dir(users);
        var uitems = [];
        users.forEach(function(user, index) {
            var temp = {};
            // console.dir('user' + user)
            // console.dir('username' + user.name)

            temp.name = user.name;
            temp.email = user.email;
            // console.dir("temp " + index + ":" + temp.name);

            uitems.push(temp)
        })
        Post.getAll(function(err, posts) {
            res.render('admin', {
                title: 'Express',
                items: users,
                posts: posts,
                info: info
            });

        })
    })
});
router.get('/deletePost', function(req, res, next) {
    var user = req.query.u;
    console.log("admin delete Post router user:" + user);
    
    res.redirect('/admin/info/info')
    next();
})


module.exports = router;

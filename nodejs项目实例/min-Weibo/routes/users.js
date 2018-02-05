var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });
router.post('/:user', function(req, res) {
    var currentUser = req.params.user;
    console.log('currentUser'+currentUser);
    // console.log('currentUser'+locals.user);

    var post = new Post(currentUser, req.body.post);
    post.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发表成功');
        res.redirect('/u/' + currentUser);
    });
});

router.get('/:user', function(req, res) {
    console.log('req' + req)
    User.get(req.params.user, function(err, user) {
        console.log('get:' + user)
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/');
        }
        Post.get(user.name, function(err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            console.log('post routes:'+posts);
            res.render('user', {
                title: user.name,
                posts: posts,
            });
        });
    });
});

module.exports = router;

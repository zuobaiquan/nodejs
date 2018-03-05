var express = require('express');
var User=require('../models/user')
var crypto = require('crypto')

var router = express.Router();

/* GET users listing. */
// router.post('/', function(req, res, next) {
//     res.send('post login');
// });
router.get('/', function(req, res, next) {
    // res.send('get login');
    res.render('login', {
        title: '用户登录',
    })
});
router.post('/', function(req, res) {
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    User.get(req.body.username, function(err, user) {
    	console.log(user.password);
    	console.log(password)
    	console.log(user.name);

        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', '用户口令错误');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', '登入成功');
        return res.redirect('/');
    });
});


module.exports = router;

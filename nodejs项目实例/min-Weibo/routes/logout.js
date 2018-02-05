var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/', function(req, res, next) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/');
    // res.send('respond with a resource');
});

module.exports = router;

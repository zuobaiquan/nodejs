var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('list', {
        title: 'List',
        items: [1991, 'byvoid', 'express', 'Node.js']
    });
});
module.exports = router;

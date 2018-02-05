var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/helper', function(req, res, next) {
   res.render('helper', {
        title: 'Helpers'
    });
});

module.exports = router;
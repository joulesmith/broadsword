var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
    // TODO: set this from database value
    res.render('index', { title: 'Broadsword' });
});

module.exports = router;

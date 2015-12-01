var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var path = require('path');

// connect to database
// TODO: have this set from a configuration file
mongoose.connect('mongodb://localhost/broadsword');

// load schemas to mongoose
require('./models/administrator');
require('./models/user');
require('./models/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// third party middleware
var favicon = require('serve-favicon');
var logger = require('morgan');


// TODO: have this set from configuration file
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

// view routs
app.use('/', require('./routes/index'));

// api routs
//
// TODO: convert these to the combined api/model format
app.use('/api/util', require('./routes/api/util'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));

require('./models/file')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

    var err = new Error('Resource not found.');
    err.status = 404;
    next(err);
});

// error handlers

app.use(function(err, req, res, next) {

  res.status(err.status || 500).json({
    error: {
        status : err.status || 500,
        message : err.message,
        stack : err.stack,
        code : err.code || 'internalerror'
    }
  });
});

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var validator = require('express-validator');

var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
appuse(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());

var session_opt = {
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60 * 60 * 1000 }
};
app.use(session(session_opt));

app.use('/users', users);
app.use('/', index);
app.use('/home', hoem);

// catch 404 and forward to error handler
app.use((req, res, next) => { });

// error handler
app.use((err, req, res, next) => { });

module.exports = app;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

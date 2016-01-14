// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var path       = require('path');

var index      = require('./app/routes/index');
var auth       = require('./app/routes/auth');
var reflect    = require('./app/routes/reflect');

// app.use(express.static(path.join(__dirname, 'public')));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.set('json spaces', 2);

var port = process.env.PORT || 8080;        // set our port

// use morgan to log requests to the console
app.use(morgan('dev'));

/*************To Allow access to cross domain request *************/

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

/*************To Allow access to cross domain request *************/

app.use('/api', index);
app.use('/auth', auth);
app.use('/reflect', reflect);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');

var express = require('express');

const authMiddleware = require('./auth/authMiddleware');

// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// Static directory
app.use(express.static('public'));

app.use(authMiddleware);

// Routes
// =============================================================
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
	app.listen(PORT, function() {
		console.log('App listening on PORT ' + PORT);
	});
});

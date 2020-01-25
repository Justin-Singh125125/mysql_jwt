const jwt = require('jsonwebtoken');
const app = require('express').Router();

app.get('*', function(req, res, next) {
	const token = req.cookies.token;

	if (token) {
		const { id } = jwt.verify(token, process.env.APP_SECRET);

		req.user = id;
	}

	console.log('i am middleware');
	next();
});

module.exports = app;

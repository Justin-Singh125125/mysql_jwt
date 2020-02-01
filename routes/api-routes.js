var db = require('../models');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
	app.get('/api/user', function (req, res) {
		res.json(req.user);
	});

	app.get('/api/user/logout', function (req, res) {
		res.clearCookie('token');

		res.json('logged out user');
	});

	app.post('/api/user/signup', async function (req, res) {
		const email = req.body.email.toLowerCase();

		//hash our password
		// bcrypt.hash(req.body.password, 10).then(function(data) {});
		const password = await bcrypt.hash(req.body.password, 10);

		//create the user in the database
		const user = await db.User.create({
			email: email,
			password: password
		});

		//create our cookie
		const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);

		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});

		res.json(user);
	});
	app.post('/api/user/login', async function (req, res) {
		const user = await db.User.findOne({
			where: {
				email: req.body.email
			}
		});

		if (!user) {
			res.json('NO USER FOUND WITH THAT EMAIL');
		}

		//check if the passwords match
		const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

		if (!isPasswordCorrect) {
			res.json('INVALID PASSWORD');
		}

		//create our cookie
		const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);

		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});

		//delete the password off the user object before we send it back
		//even though it is encrypted
		delete user.dataValues.password;

		res.json(user);
	});
};

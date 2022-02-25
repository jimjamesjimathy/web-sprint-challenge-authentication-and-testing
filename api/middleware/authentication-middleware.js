const db = require('../../data/dbConfig');

const checkBody = (req, res, next) => {
	if (!req.body.username || !req.body.password) {
		next({ status: 401, message: 'username and password required' })
	} else {
		next()
	}
};

const registerUsername = async (req, res, next) => {
	try {
		const user = await db('users').where('username', req.body.username)
		if (user.length || user === req.body.username) {
				next({ status: 409, message: 'That name is taken, try something else!' })
		} else {
			next()
		}
	} catch (err) {
		next(err)
	}
};

const usernameLogin = async (req, res, next) => {
	try {
		const user = await db('users').where('username', req.body.username)
		if (user.length || user === req.body.username) {
				next()
			} else {
				next({ status: 401, message: 'Invalid Credentials, try again!' })
		}
	} catch (err) {
		next(err)
	}
};

module.exports = {
	registerUsername,
	checkBody,
	usernameLogin,
};
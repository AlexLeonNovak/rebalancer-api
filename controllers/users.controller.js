const userService = require('../services/users.service');

class UsersController {
	async register (req, res, next) {
		try {
			const userData = await userService.registration(req.body);

			const cookieConfig = {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true};
			res.cookie('refreshToken', userData.refreshToken, cookieConfig);
			res.cookie('deviceId', userData.deviceId, cookieConfig);

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async login (req, res, next) {
		try {
			const {email, password} = req.body;
			const userData = await userService.login(email, password);

			const cookieConfig = {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true};
			res.cookie('refreshToken', userData.refreshToken, cookieConfig);
			res.cookie('deviceId', userData.deviceId, cookieConfig);

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async logout (req, res, next) {
		try {

		} catch (e) {
			next(e);
		}
	}

	async refresh (req, res, next) {
		try {

		} catch (e) {
			next(e);
		}
	}

	async activate (req, res, next) {
		try {
			const {token} = req.params;
			console.log(token)
			const userData = await userService.activate(token);
			return res.json(userData);
			// return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}

	async getUsers (req, res, next) {
		//console.log(req);
		try {
			res.json(['qwe', 'xcd']);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UsersController();

// 'use strict';
//
// const response = require('./../response');
//
// exports.users = (req, res) => {
// 	const users = [
// 		{
// 			id: 1,
// 			name: 'Alex'
// 		},
// 		{
// 			id: 2,
// 			name: 'John'
// 		}
// 	]
//
// 	response.status(users, res);
// }

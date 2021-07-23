const userService = require('../services/users.service');

class UsersController {
	async register (req, res, next) {
		try {
			const userData = await userService.registration(req.body);
			console.log(userData)

			const cookieConfig = {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true};
			res.cookie('refreshToken', userData.refreshToken, cookieConfig);
			res.cookie('deviceId', userData.deviceId, cookieConfig);

			return res.json(userData);
		} catch (e) {
			console.log(e);
		}
	}

	async login (req, res, next) {
		try {

		} catch (e) {

		}
	}

	async logout (req, res, next) {
		try {

		} catch (e) {

		}
	}

	async refresh (req, res, next) {
		try {

		} catch (e) {

		}
	}

	async getUsers (req, res, next) {
		//console.log(req);
		try {
			res.json(['qwe', 'xcd']);
		} catch (e) {

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

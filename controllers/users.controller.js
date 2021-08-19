const userService = require('../services/users.service');

class UsersController {

	#cookieConfig = {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		signed: true
	};

	register = async (req, res, next) => {
		try {
			const userData = await userService.registration(req.body);


			res.cookie('refreshToken', userData.refreshToken, this.#cookieConfig);
			res.cookie('deviceId', userData.deviceId, this.#cookieConfig);

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	login = async (req, res, next) => {
		try {
			const {email, password} = req.body;
			const {deviceId} = req.cookies;
			const userData = await userService.login(email, password, deviceId);

			res.cookie('refreshToken', userData.refreshToken, this.#cookieConfig);
			res.cookie('deviceId', userData.deviceId, this.#cookieConfig);

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	logout = async (req, res, next) => {
		try {
			const {refreshToken, deviceId} = req.signedCookies;
			await userService.logout(refreshToken, deviceId);
			res.clearCookie('refreshToken');
			res.clearCookie('deviceId');

			return res.status(200).json();
		} catch (e) {
			next(e);
		}
	}

	refresh = async (req, res, next) => {
		try {
			const {refreshToken, deviceId} = req.signedCookies;
			const userData = await userService.refresh(refreshToken, deviceId);

			res.cookie('refreshToken', userData.refreshToken, this.#cookieConfig);
			res.cookie('deviceId', userData.deviceId, this.#cookieConfig);

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	activate = async (req, res, next) => {
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

	getUsers = async (req, res, next) => {
		try {
			const users = await userService.getAllUsers();
			return res.json(users);
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

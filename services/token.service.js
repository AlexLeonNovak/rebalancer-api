const jwt = require('jsonwebtoken');
const {UsersTokens} = require('../models');

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = process.env;

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
			expiresIn: '30m'
		});
		const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
			expiresIn: '30d'
		});
		return {accessToken, refreshToken}
	}

	async saveToken({userId, deviceId, refreshToken}) {
		const tokenData = await UsersTokens.findOne({
			where: {userId, deviceId}
		});
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return await tokenData.save();
		}
		return await UsersTokens.create({userId, deviceId, refreshToken});
	}

	async removeToken(refreshToken, deviceId) {
		try {
			await UsersTokens.destroy({where: {refreshToken, deviceId}});
		} catch (e) {
			// Do nothing
		}
	}

	async findToken(refreshToken, deviceId) {
		return await UsersTokens.findOne({where: {refreshToken, deviceId}});
	}

	validateAccessToken(token) {
		try {
			return jwt.verify(token, JWT_ACCESS_SECRET);
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(token) {
		try {
			return jwt.verify(token, JWT_REFRESH_SECRET);
		} catch (e) {
			return null;
		}
	}

}

module.exports = new TokenService()

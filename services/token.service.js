const jwt = require('jsonwebtoken');
const {UsersTokens} = require('../models');

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
			expiresIn: '30m'
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
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
}

module.exports = new TokenService()

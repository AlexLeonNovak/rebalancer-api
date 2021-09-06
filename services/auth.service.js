const randomstring = require("randomstring");
const uuid = require('uuid');

const {User} = require('../models');
const UserDto = require('../dtos/user.dto');
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const ApiErrorException = require('../exceptions/api-error.exception');

class AuthService {

	async registration({email, password, firstName, lastName}) {
		const candidate = await User.findOne({
			where: {email}
		});

		if (candidate) {
			throw ApiErrorException.BadRequest(`The user with the email address ${email} is already registered`);
		}

		const emailConfirmToken = `${randomstring.generate(32)}_${Date.now()}`;
		const user = User.build({
			email,
			status: User.STATUS_ACTIVE,
			emailConfirmToken,
			firstName,
			lastName
		});
		user.setPassword(password);
		await user.save();
		// await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${emailConfirmToken}`);

		return this._userData(user, {emailConfirmToken});
	}

	async login(email, password, deviceId) {
		const user = await User.findOne({where: {email}});
		if (!user || !user.isValidPassword(password)) {
			throw ApiErrorException.BadRequest('Wrong login or password');
		}

		return this._userData(user, {deviceId});
	}

	async activate(token) {
		const [, time] = token.split('_');
		if (Number(time) + process.env.EMAIL_CONFIRM_TOKEN_EXPIRE >= Date.now()) {
			throw ApiErrorException.BadRequest('Activation token is expired');
		}
		const user = await User.findOne({where: {emailActivationToken: token}});
		if (!user) {
			throw ApiErrorException.BadRequest('User not found');
		}
		user.emailActivationToken = '';
		user.status = User.STATUS_ACTIVE;
		await user.save();
		return {...new UserDto(user)}
	}

	async logout(refreshToken, deviceId) {
		await tokenService.removeToken(refreshToken, deviceId);
	}

	async refresh(refreshToken, deviceId) {
		if (!refreshToken) {
			throw ApiErrorException.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken, deviceId);
		if (!userData || !tokenFromDb) {
			throw ApiErrorException.UnauthorizedError();
		}
		const user = await User.findOne({where: {id: userData.id}});
		return this._userData(user, {deviceId});
	}

	async _userData(user, additional = {}) {
		const userDto = new UserDto(user);
		const {accessToken, refreshToken} = tokenService.generateTokens({...userDto});
		console.log(additional);
		if (!additional.deviceId) {
			additional.deviceId = uuid.v4();
		}
		await tokenService.saveToken({
			userId: userDto.id,
			deviceId : additional.deviceId,
			refreshToken
		});

		return {
			accessToken,
			refreshToken,
			user: userDto,
			...additional
		};
	}
}

module.exports = new AuthService();

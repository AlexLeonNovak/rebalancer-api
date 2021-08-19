const randomstring = require("randomstring");
const bcrypt = require('bcrypt');
const joi = require('joi');
const uuid = require('uuid');

const {Users} = require('../models');
const UserDto = require('../dtos/user.dto');
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const ApiErrorException = require('../exceptions/api-error.exception');

class UsersService {

	async registration({email, password, firstName, lastName}) {
		this._validate({email, password});
		const candidate = await Users.findOne({
			where: {email}
		});

		if (candidate) {
			throw ApiErrorException.BadRequest(`The user with the email address ${email} is already registered`);
		}

		const passwordHash = await bcrypt.hash(password, 5);
		const emailConfirmToken = `${randomstring.generate(32)}_${Date.now()}`;
		const user = await Users.create({
			email,
			passwordHash,
			status: Users.STATUS_WAIT,
			emailConfirmToken,
			firstName,
			lastName
		})
		// await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${emailConfirmToken}`);

		return this._userData(user, {emailConfirmToken});
	}

	async login(email, password, deviceId) {
		const user = await Users.findOne({where: {email}});
		if (!user) {
			throw ApiErrorException.BadRequest('Wrong login or password');
		}
		const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
		if (!isPasswordCorrect) {
			throw ApiErrorException.BadRequest('Wrong login or password');
		}
		return this._userData(user, {deviceId});

	}

	async activate(token) {
		const [, time] = token.split('_');
		if (Number(time) + process.env.EMAIL_CONFIRM_TOKEN_EXPIRE >= Date.now()) {
			throw ApiErrorException.BadRequest('Activation token is expired');
		}
		const user = await Users.findOne({where: {emailActivationToken: token}});
		if (!user) {
			throw ApiErrorException.BadRequest('User not found');
		}
		user.emailActivationToken = '';
		user.status = Users.STATUS_ACTIVE;
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
		const user = await Users.findOne({where: {id: userData.id}});
		return this._userData(user, {deviceId});
	}

	async getAllUsers() {
		return await Users.findAll();
	}

	_validate(obj) {
		const schema = joi.object({
			email: joi.string().email(),
			password: joi.string().alphanum().min(6).max(32)
		});
		const { error, value } = schema.validate(obj, {abortEarly: false});
		console.log(error)
		if (error) {
			throw ApiErrorException.BadRequest('Validation error', error.details);
		}
		return value;
	}

	async _userData(user, additional = {}) {
		const userDto = new UserDto(user);
		const {accessToken, refreshToken} = tokenService.generateTokens({...userDto});
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

module.exports = new UsersService();

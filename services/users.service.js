const randomstring = require("randomstring");
const bcrypt = require('bcrypt');
const joi = require('joi');
const uuid = require('uuid');

const {Users} = require('../models');
const UserDto = require('../dtos/user.dto');
const mailService = require('./mail.service');
const tokenService = require('./token.service');

class UsersService {
	async registration({email, password, firstName, lastName}) {
		this.validate({email, password});
		const candidate = await Users.findOne({
			where: {email}
		});

		if (candidate) {
			throw new Error(`The user with the email address ${email} is already registered`);
		}

		const passwordHash = await bcrypt.hash(password, 5);
		const activationLink = randomstring.generate(32)
		const user = await Users.create({
			email,
			passwordHash,
			status: Users.STATUS_NEW,
			activationLink,
			firstName,
			lastName
		})
		await mailService.sendActivationMail(email, activationLink);

		const userDto = new UserDto(user);
		const {accessToken, refreshToken} = tokenService.generateTokens({...userDto});
		const deviceId = uuid.v4();
		await tokenService.saveToken({
			userId: userDto.id,
			deviceId,
			refreshToken
		});

		return {
			accessToken,
			refreshToken,
			deviceId,
			user: userDto
		};
	}

	validate(obj) {
		const schema = joi.object({
			email: joi.string().email(),
			password: joi.string()
				.pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
		});
		const { error, value } = schema.validate(obj);
		if (error) {
			throw new Error(error);
		}
		return value;
	}
}

module.exports = new UsersService();

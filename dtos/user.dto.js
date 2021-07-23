const {Users} = require('../models');

module.exports = class UserDto {
	constructor(user) {
		this.id = user.id;
		this.email = user.email;
		this.isActivated = user.status === Users.STATUS_ACTIVE
	}
}

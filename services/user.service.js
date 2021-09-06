const {User} = require('../models');

class UserService {

	async getAllUsers() {
		return await User.findAll();
	}
}

module.exports = new UserService()
